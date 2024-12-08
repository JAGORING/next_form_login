'use server';
import { MAX_COMMENT_LENGTH } from '@/constants';
import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';

export const postLike = async (tweetId: number) => {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        tweetId,
        userId: session.id!,
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
};

export const postDislike = async (tweetId: number) => {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
};

const createCommentSchema = z.object({
  comment: z
    .string({ required_error: '🚫 Title is required.' })
    .max(MAX_COMMENT_LENGTH, `🚫 Maximum ${MAX_COMMENT_LENGTH} characters allowed.`),
});

export const createTweetComment = async (comment: string, tweetId: number) => {
  const data = {
    comment: comment,
  };
  const result = await createCommentSchema.safeParseAsync(data);

  if (!result.success) {
    return { success: false, errors: result.error.flatten() };
  } else {
    const session = await getSession();
    if (session.id) {
      await db.comment.create({
        data: {
          comment: result.data.comment,
          user: {
            connect: {
              id: session.id,
            },
          },
          tweet: {
            connect: {
              id: tweetId,
            },
          },
        },
        select: { id: true },
      });
      revalidateTag(`comment-${tweetId}`);
    }
  }
};
