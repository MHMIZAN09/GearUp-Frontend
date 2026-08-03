'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const BASE_URL = `${process.env.BACKEND_URL_LOCAL}/api/provider/gears`;

// Get My Gears
export async function getMyGears() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(BASE_URL, {
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

// Get Single Gear
export async function getMyGearById(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${BASE_URL}/${id}`, {
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

// Create Gear
export async function createGear(prevState: unknown, formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const payload = {
    name: formData.get('name'),
    description: formData.get('description'),
    brand: formData.get('brand'),
    imageUrl: formData.get('imageUrl'),
    pricePerDay: Number(formData.get('pricePerDay')),
    quantityTotal: Number(formData.get('quantityTotal')),
    quantityAvailable: Number(formData.get('quantityTotal')),
    categoryId: formData.get('categoryId'),
  };

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag('provider-gears', { expire: 0 });
  }

  return result;
}

// Update Gear
export async function updateGear(id: string, prevState: unknown, formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const payload = {
    name: formData.get('name'),
    description: formData.get('description'),
    brand: formData.get('brand'),
    imageUrl: formData.get('imageUrl'),
    pricePerDay: Number(formData.get('pricePerDay')),
    quantityTotal: Number(formData.get('quantityTotal')),
    categoryId: formData.get('categoryId'),
  };

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag('provider-gears', { expire: 0 });
  }

  return result;
}

// Delete Gear
export async function deleteGear(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
  });

  const result = await res.json();
  // console.log('result', result);

  if (result.success) {
    revalidateTag('provider-gears', { expire: 0 });
  }

  return result;
}

// Update Stock
export async function updateGearStock(id: string, prevState: unknown, formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const quantityAvailable = Number(formData.get('quantityAvailable'));

  const res = await fetch(`${BASE_URL}/${id}/stock`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify({
      quantityAvailable,
    }),
  });

  const result = await res.json();
  if (result.success) {
    revalidateTag('provider-gears', { expire: 0 });
  }
  return result;
}

// Update Status
export async function updateGearStatus(id: string, prevState: unknown, formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const status = formData.get('status') as string;

  const res = await fetch(`${BASE_URL}/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify({
      status,
    }),
  });

  const result = await res.json();
  if (result.success) {
    revalidateTag('provider-gears', { expire: 0 });
  }
  return result;
}

// admin get all gears
export async function getAllGears() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/admin/gears`, {
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
