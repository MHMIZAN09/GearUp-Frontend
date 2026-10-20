'use server';

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

  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/gear?${params.toString()}`, {
    cache: 'force-cache',
    next: {
      revalidate: 60,
      tags: ['gears'],
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to load gears: ${res.status} ${res.statusText}`);
  }

  const result = await res.json();
  const data = result?.data;

  return {
    ...result,
    data: Array.isArray(data) ? data : data?.gear ?? [],
    meta: {
      page: Number(data?.currentPage ?? query?.page ?? 1),
      totalPages: Number(data?.totalPages ?? 1),
      total: Number(data?.totalCount ?? 0),
    },
  };
};

export const getGearById = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/gear/${id}`, {
    cache: 'force-cache',
    next: {
      revalidate: 60,
      tags: ['gears'],
    },
  });

  return res.json();
};
