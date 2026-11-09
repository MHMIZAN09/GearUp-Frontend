'use server';

import { BACKEND_URL } from '@/lib/backend-url';

import { cookies } from 'next/headers';

export const getAllPaymentsByAdmin = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${BACKEND_URL}/api/admin/payments`, {
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

export const getAllPaymentsByUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${BACKEND_URL}/api/payment`, {
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

export const getPaymentById = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${BACKEND_URL}/api/payment/${id}`, {
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

export const getAdminPaymentById = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${BACKEND_URL}/api/payment/${id}`, {
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

export const createPayment = async (payload: { rentalOrderId: string }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${BACKEND_URL}/api/payment/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  console.log('Payment creation result:', result);
  return result;
};
