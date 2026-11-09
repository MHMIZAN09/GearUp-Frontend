'use server';

import { BACKEND_URL } from '@/lib/backend-url';

import { cookies } from 'next/headers';

function normalizeProfileImage(value: unknown) {
  if (typeof value !== 'string' || !value) {
    return null;
  }

  const imageUrl = value.match(/\]\((https?:\/\/[^)]+)\)/)?.[1] ?? value;

  if (imageUrl.startsWith('/')) {
    return new URL(imageUrl, BACKEND_URL).toString();
  }

  return imageUrl;
}

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

  const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store',
  });

  const result = await res.json();

  if (result?.data) {
    result.data = {
      ...result.data,
      profilePhoto: normalizeProfileImage(result.data.profilePhoto ?? result.data.imageUrl),
    };
  }

  // console.log('getMe result:', result);
  return result;
};
