'use server';

import { BACKEND_URL } from '@/lib/backend-url';
import { readApiResponse } from '@/lib/read-api-response';

type GearListResponse = {
  data?: unknown[] | { gear?: unknown[]; currentPage?: number; totalPages?: number; totalCount?: number };
  [key: string]: unknown;
};

type GearDetailsResponse = {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: unknown;
};

export const getAllGears = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();

  if (!query) {
    query = {};
  }

  Object.entries(query).forEach(([key, value]) => {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.set(key, value);
    }
  });

  try {
    const res = await fetch(`${BACKEND_URL}/api/gear?${params.toString()}`, {
      cache: 'force-cache',
      next: {
        revalidate: 60,
        tags: ['gears'],
      },
    });

    const result = await readApiResponse<GearListResponse>(res);
    const data = result?.data;
    const paginatedData = !Array.isArray(data) ? data : undefined;

    return {
      ...result,
      data: Array.isArray(data) ? data : paginatedData?.gear ?? [],
      meta: {
        page: Number(paginatedData?.currentPage ?? query?.page ?? 1),
        totalPages: Number(paginatedData?.totalPages ?? 1),
        total: Number(paginatedData?.totalCount ?? 0),
      },
    };
  } catch (error) {
    console.error('Unable to load gears.', error);
    return {
      success: false,
      statusCode: 503,
      message: 'Gears are temporarily unavailable.',
      data: [],
      meta: {
        page: Number(query?.page ?? 1),
        totalPages: 0,
        total: 0,
      },
    };
  }
};

export const getGearById = async (id: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/gear/${id}`, {
      cache: 'force-cache',
      next: {
        revalidate: 60,
        tags: ['gears'],
      },
    });

    return await readApiResponse<GearDetailsResponse>(res);
  } catch (error) {
    console.error(`Unable to load gear ${id}.`, error);
    return {
      success: false,
      statusCode: 503,
      message: 'Gear is temporarily unavailable.',
      data: null,
    };
  }
};
