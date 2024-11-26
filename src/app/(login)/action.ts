'use server';

export const handleSubmitForm = async (prevStatus: any, data: FormData) => {
  'use server';

  await new Promise((res) => setTimeout(res, 1000));

  const validateField = (field: string | null, errorMessage: string) => {
    if (!field || field.trim() === '') {
      return `${errorMessage} is required`;
    }
    return null;
  };

  const email = data.get('email') as string | null;
  const userName = data.get('username') as string | null;
  const password = data.get('password') as string | null;

  const error: Record<string, string> = {
    ...(validateField(email, '❌ Email') && { email: '❌ Email is required' }),
    ...(validateField(userName, '❌ UserName') && { userName: '❌ UserName is required' }),
    ...(validateField(password, '❌ Password') && { password: '❌ Password is required' }),
    ...(password && password !== '12345' && { password: '❌ Wrong Password' }),
  };

  if (Object.keys(error).length > 0) {
    return { error };
  }

  return { success: true };
};
