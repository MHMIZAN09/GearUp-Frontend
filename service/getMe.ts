'use server';

import { cookies } from 'next/headers';

export const getMe = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'force-cache',
    next: { revalidate: 60 * 60 * 24, tags: ['getMe'] },
  });

  const result = await res.json();
  // console.log('getMe result:', result);
  return result;
};
