'use server';
import { MIN_LENGTH_PASSWORD, MIN_LENGTH_USERNAME } from '@/constants';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

const hasLeastOneNum = (val: string) => /\d/.test(val);

const createUserSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(MIN_LENGTH_USERNAME, '🚫 At least 5 characters.'),
    password: z
      .string()
      .min(MIN_LENGTH_PASSWORD, "🚫 At least 10 characters. Let's make it stronger!")
      .refine(hasLeastOneNum, '🚫 Must include at least one number.'),
    confirmPassword: z.string(),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '🚫 Looks like this username is already taken. Maybe try another one?',
        path: ['username'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '🚫 Looks like this email is already taken. Maybe try another one?',
        path: ['email'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '🚫 Passwords do not match.',
    path: ['confirmPassword'],
  });

export const handleSubmitForm = async (prevStatus: any, formData: FormData) => {
  await new Promise((res) => setTimeout(res, 1000));
  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
  };
  const result = await createUserSchema.safeParseAsync(data);

  if (!result.success) {
    return { success: false, errors: result.error.flatten() };
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPassword,
      },
      select: { id: true },
    });

    const session = await getSession();

    session.id = user.id;
    await session.save();
    redirect('/user-profile');
  }
};
