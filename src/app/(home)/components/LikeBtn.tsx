'use client';
import { useOptimistic } from 'react';
import { postDislike, postLike } from '../tweets/[id]/action';

interface LikeBtnProps {
  isLiked: boolean;
  likeCnt: number;
  tweetId: number;
}
const LikeBtn = ({ isLiked, likeCnt, tweetId }: LikeBtnProps) => {
  const [state, reducerFn] = useOptimistic({ isLiked, likeCnt }, (previousState) => ({
    isLiked: !previousState.isLiked,
    likeCnt: previousState.isLiked ? previousState.likeCnt - 1 : previousState.likeCnt + 1,
  }));

  const onClick = async () => {
    const nextState = !state.isLiked;
    reducerFn(undefined);
    try {
      if (nextState) {
        await postLike(tweetId);
      } else {
        await postDislike(tweetId);
      }
    } catch (error) {
      console.error(error);
      reducerFn(undefined);
    }
  };
  return (
    <div className="mt-4 flex items-center space-x-2">
      <button
        onClick={onClick}
        className={`px-3 py-1 text-sm font-semibold rounded-lg ${
          state.isLiked ? 'bg-[#fdf0e4] text-[#e67a5f]' : 'bg-[#e2ddd7] text-[#6b4f4f]'
        } hover:bg-[#e6d9d0] transition`}
      >
        {state.isLiked ? '❤️ Liked' : '🤍 Like'}
      </button>
      <p className="text-sm text-[#6b4f4f]">{state.likeCnt || 0} likes</p>
    </div>
  );
};

export default LikeBtn;
