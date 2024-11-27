'use server';
import { z } from 'zod';

const loginUserSchema = z.object({
  email: z.string().email().endsWith('@zod.com', '🚫 Must end with @zod.com.'),
  username: z.string().min(5, '🚫 At least 5 characters.'),
  password: z
    .string()
    .min(10, "🚫 At least 10 characters. Let's make it stronger!")
    .regex(/^(?=.*?[0-9])$/, { message: 'dsadsad' }),
});

export const handleSubmitForm = async (prevStatus: any, formData: FormData) => {
  await new Promise((res) => setTimeout(res, 1000));
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  };
  // loginUserSchema.parse(data);
  const result = loginUserSchema.safeParse(data);
  if (!result.success) {
    console.log('result :: ', result.error.flatten());
    return result.error.flatten();
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
