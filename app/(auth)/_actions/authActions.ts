'use server';

export const loginAction = async (formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  console.log(process.env.BACKEND_API_URL);
  // console.log(email, password);
  const payload = {
    email,
    password,
  };
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  console.log(result);
};

export const registerAction = async (formData: FormData) => {
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const role = formData.get('role');
  console.log(name, email, password, role);

  const payload = {
    name,
    email,
    password,
    role,
  };
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();
  console.log(result);
};
