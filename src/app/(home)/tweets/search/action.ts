import db from '@/lib/db';

export const getTweetsByKeyword = async (keyword: string) => {
  try {
    const tweets = await db.tweet.findMany({
      where: {
        tweet: {
          contains: keyword,
        },
      },
      select: {
        id: true,
        title: true,
        tweet: true,
        created_at: true,
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return tweets;
  } catch (e) {
    return [];
  }
};
