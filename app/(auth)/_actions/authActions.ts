'use server';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const loginAction = async (prevState: unknown, formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  console.log(process.env.BACKEND_API_URL);
  // console.log(email, password);
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
