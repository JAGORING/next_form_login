'use server';

import db from '@/lib/db';
import { getSession } from '@/lib/session';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { notFound, redirect } from 'next/navigation';
import { MIN_LENGTH_PASSWORD, MIN_LENGTH_USERNAME } from '@/constants';

const updateUserSchema = z
  .object({
    username: z.string().min(MIN_LENGTH_USERNAME, '🚫 At least 5 characters.').optional(),
    email: z.string().email().optional(),
    bio: z.string().optional(),
    currentPassword: z.string(),
    newPassword: z
      .union([
        z.string().min(MIN_LENGTH_PASSWORD, "🚫 At  10 characters. Let's make it stronger!"),
        z.literal('').transform(() => undefined),
      ])
      .optional(),
  })
  .superRefine(async ({ currentPassword }, ctx) => {
    const session = await getSession();
    const user = await db.user.findUnique({
      where: { id: session.id },
      select: {
        password: true,
      },
    });
    if (!user) {
      return notFound();
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      ctx.addIssue({
        code: 'custom',
        message: '🚫 The current password is incorrect.',
        path: ['currentPassword'],
        fatal: true,
      });
    }
  });

export const updateUserProfile = async (prevStatus: unknown, formData: FormData) => {
  console.log(prevStatus);
  const data = {
    username: formData.get('username') || '',
    email: formData.get('email') || '',
    bio: formData.get('bio') || '',
    currentPassword: formData.get('currentpassword') || '',
    newPassword: formData.get('newpassword') || '',
  };

  const result = await updateUserSchema.safeParseAsync(data);
  if (!result.success) {
    return { success: false, errors: result.error.flatten() };
  }

  const session = await getSession();
  const user = await db.user.findUnique({
    where: { id: session.id },
  });
  if (!session || !session.id || !user) {
    return redirect('/');
  }

  const updatedData: { username: string; email: string; bio: string | null; password?: string } = {
    username: result.data.username || user.username,
    email: result.data.email || user.email,
    bio: result.data.bio || user.bio,
  };

  if (result.data.newPassword !== undefined && result.data.newPassword.trim() !== '') {
    updatedData.password = await bcrypt.hash(result.data.newPassword, 12);
  }

  await db.user.update({
    where: { id: session.id },
    data: updatedData,
  });
  redirect(`/${session.id}/user-tweets`);
};
