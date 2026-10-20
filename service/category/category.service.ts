'use server';

const normalizeImageUrl = (value?: string | null) => {
  if (!value) {
    return '';
  }

  const markdownMatch = value.match(/\]\((https?:\/\/[^)]+)\)/);
  return markdownMatch?.[1] ?? value;
};

export const getAllCategories = async () => {
  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/category`, {
    cache: 'force-cache',
    next: { revalidate: 60, tags: ['categories'] },
  });

  const result = await res.json();
  // console.log('result', result);
  return result;
};

export const getCategoryById = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_URL_LOCAL}/api/category/${id}`, {
    cache: 'force-cache',
    next: { revalidate: 60, tags: ['categories'] },
  });

  const result = await res.json();

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
