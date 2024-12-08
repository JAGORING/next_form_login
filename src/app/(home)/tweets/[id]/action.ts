'use server';
import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { revalidateTag } from 'next/cache';

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
