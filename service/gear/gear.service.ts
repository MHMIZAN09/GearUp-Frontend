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
    cache: 'no-store',
    next: {
      tags: ['gears'],
    },
  });

  return res.json();
};

export const getGearById = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/gear/${id}`, {
    cache: 'no-store',
    next: {
      tags: ['gears'],
    },
  });

  return res.json();
};
