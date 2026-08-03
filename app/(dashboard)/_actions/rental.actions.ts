'use server';

import { revalidatePath } from 'next/cache';
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

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/rental`, {
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

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/provider/rentals`, {
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

export async function confirmRental(rentalId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_URL_LOCAL}/api/provider/rentals/${rentalId}/confirm`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();
  if (result.success) {
    revalidatePath('/provider-dashboard/rentals');
    revalidatePath('/dashboard/provider-dashboard/rentals');
  }
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

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/provider/rentals/${rentalId}`, {
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

// admin

export const getAllRentals = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/admin/rentals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store', // Ensure fresh data is fetched on each request
  });

  const result = await res.json();
  return result;
};

// admin status update
export const updateRentalStatusByAdmin = async (rentalId: string, status: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/admin/rentals/${rentalId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify({ status }),
  });

  const result = await res.json();
  if (result.success) {
    revalidatePath('/admin-dashboard/rentals');
    revalidatePath('/dashboard/admin-dashboard/rentals');
  }
  return result;
};

export const updateRentalStatusByProvider = async (rentalId: string, status: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_URL_LOCAL}/api/provider/rentals/${rentalId}/status`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify({ status }),
    },
  );

  const result = await res.json();
  if (result.success) {
    revalidatePath('/provider-dashboard/rentals');
    revalidatePath('/dashboard/provider-dashboard/rentals');
  }
  return result;
};
