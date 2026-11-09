'use server';

import { BACKEND_URL } from '@/lib/backend-url';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const getAllReviews = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/review`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
      next: { revalidate: 60, tags: ['reviews'] },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      return {
        success: false,
        statusCode: res.status,
        message: 'Reviews are temporarily unavailable.',
        data: [],
      };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Unable to fetch public customer reviews.', error);
    return {
      success: false,
      statusCode: 503,
      message: 'Reviews are temporarily unavailable.',
      data: [],
    };
  }
};

export const getMyReviews = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }
  const res = await fetch(`${BACKEND_URL}/api/review/my-reviews`, {
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

export async function createReview(data: {
  rentalOrderId: string;
  gearItemId: string;
  rating: number;
  comment: string;
}) {
  const cookieStore = await cookies();

  const token = cookieStore.get('accessToken')?.value;

  const res = await fetch(`${BACKEND_URL}/api/review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function deleteReview(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      message: 'Unauthorized',
    };
  }

  const res = await fetch(`${BACKEND_URL}/api/review/${id}`, {
    method: 'DELETE',
    headers: {
      cookie: `accessToken=${accessToken}`,
    },
  });

  const result = await res.json();

  if (result.success) {
    revalidatePath('/dashboard/reviews/my-reviews');
  }

  return result;
}
