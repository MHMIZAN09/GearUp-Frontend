'use server';

import { BACKEND_URL } from '@/lib/backend-url';

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

export type UploadProfileImageActionState = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    profilePhoto?: string;
  };
};

function normalizeProfileResult<T extends { data?: Record<string, unknown> }>(result: T): T {
  if (!result.data) {
    return result;
  }

  const imageUrl =
    typeof result.data.profilePhoto === 'string'
      ? result.data.profilePhoto
      : typeof result.data.imageUrl === 'string'
        ? result.data.imageUrl
        : null;
  const profilePhoto =
    imageUrl?.startsWith('/') && BACKEND_URL
      ? new URL(imageUrl, BACKEND_URL).toString()
      : imageUrl;

  return {
    ...result,
    data: {
      ...result.data,
      profilePhoto,
    },
  } as T;
}

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

  const res = await fetch(`${BACKEND_URL}/api/user/my-profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: `accessToken=${accessToken}`,
    },
    cache: 'no-store',
  });

  const result = await res.json();
  // console.log('result', result);
  return normalizeProfileResult(result);
}

export async function updateUserProfile(
  preState: UpdateUserProfileActionState,
  formData: FormData,
): Promise<UpdateUserProfileActionState> {
  const name = formData.get('name');
  const contactNumber = formData.get('contactNumber');
  const address = formData.get('address');

  const payload = {
    name,
    contactNumber,
    address,
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

  const res = await fetch(`${BACKEND_URL}/api/user/my-profile`, {
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

export async function uploadProfileImage(
  preState: UploadProfileImageActionState,
  formData: FormData,
): Promise<UploadProfileImageActionState> {
  const profileImage = formData.get('profileImage');

  if (!(profileImage instanceof File) || profileImage.size === 0) {
    return {
      success: false,
      statusCode: 400,
      message: 'Please select a profile image.',
    };
  }

  if (!profileImage.type.startsWith('image/')) {
    return {
      success: false,
      statusCode: 400,
      message: 'The selected file must be an image.',
    };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: 'User is not authenticated. Access token is missing.',
    };
  }

  const payload = new FormData();
  payload.append('profileImage', profileImage);

  const res = await fetch(`${BACKEND_URL}/api/user/profile-image`, {
    method: 'PATCH',
    headers: {
      cookie: `accessToken=${accessToken}`,
    },
    body: payload,
  });

  const result = await res.json();

  return normalizeProfileResult(result) as UploadProfileImageActionState;
}
