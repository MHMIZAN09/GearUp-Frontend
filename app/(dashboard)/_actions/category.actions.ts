/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
export async function createCategory(prevState: any, formData: FormData) {
  const name = formData.get('name');
  const description = formData.get('description');
  // console.log('Creating category with Form Data:', formData);

  const payload = {
    name,
    description,
  };
}

export async function updateCategory(id: string, prevState: any, formData: FormData) {
  const name = formData.get('name');
  const description = formData.get('description');

  const payload = {
    name,
    description,
  };
}
