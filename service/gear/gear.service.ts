'use server';

export const getAllGears = async () => {
  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/gear`, {
    cache: 'no-store',
    next: { tags: ['gears'] },
  });

  const result = await res.json();
  // console.log('result', result);
  return result;
};

export const getGearById = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/gear/${id}`, {
    cache: 'no-store',
    next: { tags: ['gears'] },
  });

  const result = await res.json();
  // console.log('result', result);
  return result;
};
