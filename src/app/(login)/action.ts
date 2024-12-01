'use server';
import { MIN_LENGTH_PASSWORD, MIN_LENGTH_USERNAME } from '@/constants';
import { z } from 'zod';

const hasLeastOneNum = (val: string) => /\d/.test(val);

const loginUserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(MIN_LENGTH_USERNAME, '🚫 At least 5 characters.'),
  password: z
    .string()
    .min(MIN_LENGTH_PASSWORD, "🚫 At least 10 characters. Let's make it stronger!")
    .refine(hasLeastOneNum, '🚫 Must include at least one number.'),
});

export const handleSubmitForm = async (prevStatus: any, formData: FormData) => {
  await new Promise((res) => setTimeout(res, 1000));
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  };
  const result = loginUserSchema.safeParse(data);
  if (!result.success) {
    return { success: false, errors: result.error.flatten() };
  } else {
    return { success: true };
  }
  //
};

// zod 사용하기 전 코드
// export const handleSubmitForm = async (prevStatus: any, data: FormData) => {
//   await new Promise((res) => setTimeout(res, 1000));

//   const validateField = (field: string | null, errorMessage: string) => {
//     if (!field || field.trim() === '') {
//       return `${errorMessage} is required`;
//     }
//     return null;
//   };

//   const email = data.get('email') as string | null;
//   const userName = data.get('username') as string | null;
//   const password = data.get('password') as string | null;

//   const error: Record<string, string> = {
//     ...(validateField(email, '❌ Email') && { email: '❌ Email is required' }),
//     ...(validateField(userName, '❌ UserName') && { userName: '❌ UserName is required' }),
//     ...(validateField(password, '❌ Password') && { password: '❌ Password is required' }),
//     ...(password && password !== '12345' && { password: '❌ Wrong Password' }),
//   };

//   if (Object.keys(error).length > 0) {
//     return { error };
//   }

//   return { success: true };
// };
