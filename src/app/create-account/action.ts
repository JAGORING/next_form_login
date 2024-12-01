'use server';
import { MIN_LENGTH_PASSWORD, MIN_LENGTH_USERNAME } from '@/constants';
import { z } from 'zod';

const hasLeastOneNum = (val: string) => /\d/.test(val);

const loginUserSchema = z.object({
  email: z.string().email().endsWith('@zod.com', '🚫 Must end with @zod.com.'),
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
  // loginUserSchema.parse(data);
  const result = loginUserSchema.safeParse(data);
  if (!result.success) {
    return { success: false, errors: result.error.flatten() };
  } else {
    return { success: true };
  }
};
