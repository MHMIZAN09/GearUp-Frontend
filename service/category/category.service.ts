'use server';

export const getAllCategories = async () => {
  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/category`, {
    cache: 'force-cache',
    next: { revalidate: 60 * 60 * 24, tags: ['categories'] }, // Revalidate every 24 hours
  });

  const result = await res.json();
  // console.log('result', result);
  return result;
};

export const getCategoryById = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/category/${id}`, {
    cache: 'force-cache',
    next: { revalidate: 60 * 60 * 24, tags: ['categories'] }, // Revalidate every 24 hours
  });

  const result = await res.json();
  // console.log('result', result);
  return result;
};
