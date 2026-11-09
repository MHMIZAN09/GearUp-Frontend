'use server';

import { BACKEND_URL } from '@/lib/backend-url';

import jwt, { type JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE_URL = `${BACKEND_URL}/api/auth`;

type AuthResponse = {
  success: boolean;
  message?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    user?: { role?: string };
  } | null;
};

type ActionState = AuthResponse | false;

const TRANSIENT_BACKEND_STATUSES = new Set([404, 502, 503, 504]);

async function postAuthRequest(path: string, body: Record<string, unknown>): Promise<AuthResponse> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(`${API_BASE_URL}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache: 'no-store',
        signal: AbortSignal.timeout(10000),
      });

      const rawBody = await response.text();

      try {
        const result = JSON.parse(rawBody) as AuthResponse;

        if (TRANSIENT_BACKEND_STATUSES.has(response.status) && attempt === 0) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          continue;
        }

        return {
          ...result,
          success: result.success === true && response.ok,
          message: result.message ?? (response.ok ? 'Request completed.' : 'Request failed.'),
        };
      } catch (error) {
        console.error(`Authentication endpoint returned invalid JSON for ${path}.`, error);

        if (attempt === 0) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          continue;
        }

        return {
          success: false,
          message: response.ok
            ? 'The authentication server returned an invalid response.'
            : `Authentication server error (${response.status}). Please try again later.`,
        };
      }
    } catch (error) {
      console.error(`Unable to reach authentication endpoint ${path}.`, error);

      if (attempt === 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        continue;
      }

      return {
        success: false,
        message: 'Unable to reach the authentication server. Please try again later.',
      };
    }
  }

  return { success: false, message: 'Authentication request failed. Please try again later.' };
}

function getRole(accessToken?: string, userRole?: string) {
  if (userRole) return userRole;
  if (!accessToken) return undefined;

  try {
    return (jwt.decode(accessToken) as (JwtPayload & { role?: string }) | null)?.role;
  } catch {
    return undefined;
  }
}

async function storeAuthCookies(data: NonNullable<AuthResponse['data']>) {
  if (!data.accessToken || !data.refreshToken) {
    return false;
  }

  const cookieStore = await cookies();
  const secure = process.env.NODE_ENV === 'production';

  cookieStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
  cookieStore.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return true;
}

function redirectForRole(role?: string): never {
  if (role === 'ADMIN') redirect('/admin-dashboard');
  if (role === 'PROVIDER') redirect('/provider-dashboard');
  redirect('/dashboard');
}

async function authenticateUser(email: string, password: string): Promise<AuthResponse> {
  const result = await postAuthRequest('login', { email, password });

  if (result.success && result.data?.accessToken && result.data.refreshToken) {
    await storeAuthCookies(result.data);
    redirectForRole(getRole(result.data.accessToken, result.data.user?.role));
  }

  return result;
}

export async function loginAction(_prevState: ActionState, formData: FormData) {
  return authenticateUser(
    String(formData.get('email') ?? ''),
    String(formData.get('password') ?? ''),
  );
}

export async function registerAction(_prevState: ActionState, formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const result = await postAuthRequest('register', {
    name: String(formData.get('name') ?? '').trim(),
    email,
    password: String(formData.get('password') ?? ''),
    role: String(formData.get('role') ?? 'CUSTOMER'),
  });

  if (result.success) {
    redirect(`/verify-email?email=${encodeURIComponent(email)}`);
  }

  return result;
}

export async function googleLoginAction(_prevState: ActionState, formData: FormData) {
  const result = await postAuthRequest('google', {
    idToken: String(formData.get('idToken') ?? ''),
  });

  if (result.success && result.data?.accessToken && result.data.refreshToken) {
    await storeAuthCookies(result.data);
    redirectForRole(getRole(result.data.accessToken, result.data.user?.role));
  }

  return result;
}

export async function verifyEmailAction(_prevState: ActionState, formData: FormData) {
  const result = await postAuthRequest('verify-email', {
    email: String(formData.get('email') ?? '').trim().toLowerCase(),
    otp: String(formData.get('otp') ?? '').trim(),
  });

  if (result.success && result.data?.accessToken && result.data.refreshToken) {
    await storeAuthCookies(result.data);
    redirectForRole(getRole(result.data.accessToken, result.data.user?.role));
  }

  return result;
}

export async function forgotPasswordAction(_prevState: ActionState, formData: FormData) {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const result = await postAuthRequest('forgot-password', { email });

  if (result.success) {
    redirect(`/reset-password?email=${encodeURIComponent(email)}`);
  }

  return result;
}

export async function resetPasswordAction(_prevState: ActionState, formData: FormData) {
  const password = String(formData.get('password') ?? '');
  const confirmPassword = String(formData.get('confirmPassword') ?? '');

  if (password !== confirmPassword) {
    return { success: false, message: 'Passwords do not match.' };
  }

  const result = await postAuthRequest('reset-password', {
    email: String(formData.get('email') ?? '').trim().toLowerCase(),
    otp: String(formData.get('otp') ?? '').trim(),
    newPassword: password,
  });

  if (result.success) {
    redirect('/login');
  }

  return result;
}

export const demoLoginAction = async (role: 'ADMIN' | 'PROVIDER') => {
  const email = role === 'ADMIN' ? process.env.DEMO_ADMIN_EMAIL : process.env.DEMO_PROVIDER_EMAIL;
  const password =
    role === 'ADMIN' ? process.env.DEMO_ADMIN_PASSWORD : process.env.DEMO_PROVIDER_PASSWORD;

  if (!email || !password) {
    return {
      success: false,
      message: `${role === 'ADMIN' ? 'Admin' : 'Provider'} demo credentials missing.`,
    };
  }

  return authenticateUser(email, password);
};

export async function logoutAction() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (accessToken) {
    await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    }).catch(() => undefined);
  }

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  redirect('/login');
}
