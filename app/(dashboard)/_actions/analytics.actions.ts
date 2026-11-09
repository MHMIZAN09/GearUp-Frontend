'use server';

import { BACKEND_URL } from '@/lib/backend-url';
import { cookies } from 'next/headers';

export const getCustomerAnalytics = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${BACKEND_URL}/api/user/analytics`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store',
  });

  const result = await res.json();
  return result;
};

export const getAdminAnalytics = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${BACKEND_URL}/api/admin/analytics`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store',
  });

  const result = await res.json();
  return result;
};

export const getProviderAnalytics = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${BACKEND_URL}/api/provider/analytics`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store',
  });

  const result = await res.json();
  return result;
};
