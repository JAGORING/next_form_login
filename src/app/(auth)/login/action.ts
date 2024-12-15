'use server';
import { MIN_LENGTH_PASSWORD } from '@/constants';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

const hasLeastOneNum = (val: string) => /\d/.test(val);

const checkEmailExist = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
    },
  });

  return user ? true : false;
};

const loginUserSchema = z.object({
  email: z
    .string()
    .email()
    .refine(
      checkEmailExist,
      '🚫 This email is not registered. Please check your email or sign up.',
    ),
  password: z
    .string()
    .min(MIN_LENGTH_PASSWORD, '🚫 At least 10 characters.')
    .refine(hasLeastOneNum, '🚫 Must include at least one number.'),
});

export const handleSubmitForm = async (prevStatus: unknown, formData: FormData) => {
  console.log(prevStatus);
  await new Promise((res) => setTimeout(res, 1000));
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await loginUserSchema.safeParseAsync(data);
  if (!result.success) {
    return { success: false, errors: result.error.flatten() };
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: { id: true, password: true },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password);

    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect('/');
    } else {
      return {
        success: false,
        errors: {
          fieldErrors: {
            email: [],
            password: ['🚫 Wrong password!'],
          },
        },
      };
    }
  }
};

export const handleLogout = async () => {
  const session = await getSession();
  await session.destroy();
  redirect('/');
};
