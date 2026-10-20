'use server';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const loginAction = async (prevState: unknown, formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  return authenticateUser(email, password);
};

const authenticateUser = async (email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
  const payload = {
    email,
    password,
  };
  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  // console.log(result);

  if (result.success) {
    const cookieStore = await cookies();

    cookieStore.set('accessToken', result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000, // 1 day in milliseconds
      sameSite: 'lax',
    });

    cookieStore.set('refreshToken', result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'lax',
    });

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    if (decodedToken.role === 'ADMIN') {
      redirect('/admin-dashboard');
    } else if (decodedToken.role === 'PROVIDER') {
      redirect('/provider-dashboard');
    } else if (decodedToken.role === 'CUSTOMER') {
      redirect('/dashboard');
    }
  }

  return result;
};

export const demoLoginAction = async (role: 'ADMIN' | 'PROVIDER') => {
  const credentials =
    role === 'ADMIN'
      ? {
          email: process.env.DEMO_ADMIN_EMAIL,
          password: process.env.DEMO_ADMIN_PASSWORD,
        }
      : {
          email: process.env.DEMO_PROVIDER_EMAIL,
          password: process.env.DEMO_PROVIDER_PASSWORD,
        };

  if (!credentials.email || !credentials.password) {
    return {
      success: false,
      message: `${role === 'ADMIN' ? 'Admin' : 'Provider'} demo credentials are not configured.`,
    };
  }

  return authenticateUser(credentials.email, credentials.password);
};

export const registerAction = async (prevState: unknown, formData: FormData) => {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const role = formData.get('role');
  console.log(name, email, password, role);

  const payload = {
    name,
    email,
    password,
    role,
  };
  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  // console.log(result);
  if (result.success) {
    redirect('/login');
  }
  return result;
};
