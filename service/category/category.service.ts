'use server';

export const getAllCategories = async () => {
  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/category`, {
    cache: 'no-store',
    next: { tags: ['categories'] },
  });

  const result = await res.json();
  // console.log('result', result);
  return result;
};

export const getCategoryById = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/category/${id}`, {
    cache: 'no-store',
    next: { tags: ['categories'] },
  });

  const result = await res.json();
  // console.log('result', result);
  return result;
};
