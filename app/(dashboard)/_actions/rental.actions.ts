'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createRental(formData: FormData) {
  const startDate = formData.get('startDate');
  const endDate = formData.get('endDate');
  const notes = formData.get('notes');
  const gearId = formData.get('gearId');
  const quantity = Number(formData.get('quantity'));

  const payload = {
    startDate,
    endDate,
    notes,
    rentalItems: [
      {
        gearItemId: gearId,
        quantity,
      },
    ],
  };

  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/rentals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  // console.log('result', result);
  if (result.success) {
    redirect('/dashboard/rentals');
  }
  return result;
}

export async function getCustomerRentals() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/rental`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store', // Ensure fresh data is fetched on each request
  });

  const result = await res.json();
  console.log('result', result);
  return result;
}

export async function getProviderRentals() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/rentals/provider`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store',
  });

  const result = await res.json();
  return result;
}

export async function confirmRental(formData: FormData) {
  const rentalId = formData.get('rentalId');
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/rentals/${rentalId}/confirm`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
  });

  const result = await res.json();
  return result;
}

export const getRentalById = async (rentalId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/rentals/${rentalId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store', // Ensure fresh data is fetched on each request
  });

  const result = await res.json();
  console.log('result', result);
  return result;
};

export const cancelRental = async (rentalId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/rentals/${rentalId}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
  });

  const result = await res.json();
  console.log('result', result);
  return result;
};
