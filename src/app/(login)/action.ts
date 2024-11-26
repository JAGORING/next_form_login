'use server';

export const handleSubmitForm = async (prevStatus: any, data: FormData) => {
  'use server';
  await new Promise((res) => setTimeout(res, 1000));
  if (data.get('password') !== '12345')
    return {
      error: {
        password: '❌ Wrong Password',
      },
    };
};
