/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function createCategory(prevState: any, formData: FormData) {
  const name = formData.get('name');
  const description = formData.get('description');
  // console.log('Creating category with Form Data:', formData);

  const payload = {
    name,
    description,
  };

  // TODO: Implement the actual API call to create a category
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/admin/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store',
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  if (result.success) {
    revalidateTag('categories', {
      expire: 0,
    });
  }
  // console.log('result', result);
  return result;
}

export async function updateCategory(id: string, prevState: any, formData: FormData) {
  const name = formData.get('name');
  const description = formData.get('description');

  const payload = {
    name,
    description,
  };
  console.log('Updating category with Form Data:', formData, 'Payload:', payload);

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/admin/category/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store',

    body: JSON.stringify(payload),
  });

  const result = await res.json();
  // console.log('result', result);
  if (result.success) {
    revalidateTag('categories', {
      expire: 0,
    });
  }
  return result;
}

export async function deleteCategory(id: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/admin/category/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store',
  });

  const result = await res.json();
  // console.log('result', result);
  if (result.success) {
    revalidateTag('categories', {
      expire: 0,
    });
  }
  return result;
}
