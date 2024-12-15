'use server';
import { MAX_TWEET_LENGTH, MAX_TITLE_LENGTH } from '@/constants';
import db from '@/lib/db';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

const addTweetSchema = z.object({
  title: z
    .string({ required_error: '🚫 Title is required.' })
    .max(MAX_TITLE_LENGTH, `🚫 Maximum ${MAX_TITLE_LENGTH} characters allowed.`),
  tweet: z
    .string({ required_error: '🚫 Tweet is required.' })
    .max(MAX_TWEET_LENGTH, `🚫 Maximum ${MAX_TWEET_LENGTH} characters allowed.`),
});

export const handleSubmitForm = async (formData: FormData) => {
  await new Promise((res) => setTimeout(res, 1000));
  const data = {
    title: formData.get('title'),
    tweet: formData.get('tweet'),
  };
  const result = await addTweetSchema.safeParseAsync(data);

  if (!result.success) {
    return { success: false, errors: result.error.flatten() };
  } else {
    const session = await getSession();
    if (session.id) {
      await db.tweet.create({
        data: {
          title: result.data.title,
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
      });
      redirect('/');
    }
    return { success: false, errors: 'No Session!' };
  }
};
