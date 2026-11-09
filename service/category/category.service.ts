'use server';

import { BACKEND_URL } from '@/lib/backend-url';
import { readApiResponse } from '@/lib/read-api-response';

const normalizeImageUrl = (value?: string | null) => {
  if (!value) {
    return '';
  }

  const markdownMatch = value.match(/\]\((https?:\/\/[^)]+)\)/);
  return markdownMatch?.[1] ?? value;
};

type CategoryListResponse = {
  data?: Array<{ imageUrl?: string | null }>;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  [key: string]: unknown;
};

type CategoryDetailsResponse = {
  data?: {
    gearItems?: Array<{ imageUrl?: string | null }>;
  } | null;
  [key: string]: unknown;
};

export const getAllCategories = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
} = {}) => {
  const params = new URLSearchParams();
  const safeQuery = query ?? {};

  Object.entries(safeQuery).forEach(([key, value]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else {
      params.set(key, value);
    }
  });

  const res = await fetch(`${BACKEND_URL}/api/category?${params.toString()}`, {
    cache: 'force-cache',
    next: { revalidate: 60, tags: ['categories'] },
  });

  let result: CategoryListResponse;
  try {
    result = await readApiResponse<CategoryListResponse>(res);
  } catch (error) {
    console.error('Unable to load categories.', error);
    return {
      success: false,
      statusCode: 503,
      message: 'Categories are temporarily unavailable.',
      data: [],
      meta: {
        page: Number(safeQuery.page ?? 1),
        limit: 10,
        total: 0,
        totalPages: 0,
      },
    };
  }

  if (Array.isArray(result?.data)) {
    result.data = result.data.map((category: { imageUrl?: string | null }) => ({
      ...category,
      imageUrl: normalizeImageUrl(category.imageUrl),
    }));
  }

  return {
    ...result,
    meta: {
      page: Number(result?.meta?.page ?? safeQuery.page ?? 1),
      limit: Number(result?.meta?.limit ?? 10),
      total: Number(result?.meta?.total ?? 0),
      totalPages: Number(result?.meta?.totalPages ?? 1),
    },
  };
};

export const getCategoryById = async (id: string) => {
  const res = await fetch(`${BACKEND_URL}/api/category/${id}`, {
    cache: 'force-cache',
    next: { revalidate: 60, tags: ['categories'] },
  });

  let result: CategoryDetailsResponse;
  try {
    result = await readApiResponse<CategoryDetailsResponse>(res);
  } catch (error) {
    console.error(`Unable to load category ${id}.`, error);
    return {
      success: false,
      statusCode: 503,
      message: 'Category is temporarily unavailable.',
      data: null,
    };
  }

  if (result?.data?.gearItems) {
    result.data.gearItems = result.data.gearItems.map(
      (gear: { imageUrl?: string | null }) => ({
        ...gear,
        imageUrl: normalizeImageUrl(gear.imageUrl),
      }),
    );
  }

  return result;
};
