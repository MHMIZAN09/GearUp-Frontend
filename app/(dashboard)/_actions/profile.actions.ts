'use server';

import { cookies } from 'next/headers';

type UpdateUserProfileActionState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    name?: string;
    contactNumber?: string;
    address?: string;
    profilePhoto?: string;
  };
};

export async function getUserProfile() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/user/my-profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store',
  });

  const result = await res.json();
  console.log('result', result);
  return result;
}

export async function updateUserProfile(
  preState: UpdateUserProfileActionState,
  formData: FormData,
): Promise<UpdateUserProfileActionState> {
  const name = formData.get('name');
  const contactNumber = formData.get('contactNumber');
  const address = formData.get('address');
  const profilePhoto = formData.get('profilePhoto');

  const payload = {
    name,
    contactNumber,
    address,
    profilePhoto,
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

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/user/my-profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },

    body: JSON.stringify(payload),
  });

  const result = await res.json();

  return result;
}
