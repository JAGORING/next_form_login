'use client';
import { useOptimistic, useState } from 'react';
import { formatDate } from '@/utils/date';
import { createTweetComment } from '../tweets/[id]/action';
import Link from 'next/link';

interface CommentType {
  id: number;
  comment: string;
  created_at: Date;
  user: { id: number; username: string };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TweetComments = ({ comments, tweetId }: { comments: any; tweetId: number }) => {
  const [formState, setFormState] = useState({ comment: '' });
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };
  const [state, addCommentOptimistically] = useOptimistic(
    comments,
    (currentComments, newComment) => [...currentComments, newComment],
  );
  const handleCommentClick = async () => {
    const newComment = {
      id: Math.random(),
      comment: formState.comment,
      created_at: new Date(),
      user: { id: null, username: '' },
    };

    addCommentOptimistically(newComment);

    try {
      await createTweetComment(newComment.comment, tweetId);
    } catch (error) {
      console.log('get Error : ', error);

      addCommentOptimistically((currentComments: CommentType[]) =>
        currentComments.filter((comment: CommentType) => comment.id !== newComment.id),
      );
    }
  };
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-[#6b4f4f] mb-4">Replies</h3>
      <ul className="space-y-4">
        {state.map((comment: CommentType) => (
          <li key={comment.id} className="p-3 bg-white border border-[#e2ddd7] rounded-lg shadow">
            <div>
              <Link href={`/${comment.user.id}/user-tweets`}>
                <span className="text-sm text-[#6b4f4f] font-medium">@{comment.user.username}</span>
              </Link>
              <span className="text-xs text-[#8a6a6a]"> {formatDate(comment.created_at)}</span>
            </div>
            <p className="mt-1 text-[#4a4a4a] text-sm">{comment.comment}</p>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-3 bg-white p-4 border border-[#e2ddd7] rounded-lg shadow">
        <textarea
          name="comment"
          value={formState.comment}
          onChange={handleInputChange}
          placeholder="Write your reply..."
          rows={2}
          maxLength={100}
          className="w-full px-3 py-1 border border-[#e2ddd7] rounded-lg text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f] focus:border-transparent"
        />
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#8a6a6a]">Max: 100 characters</p>
          <button
            onClick={handleCommentClick}
            className="px-4 py-2 bg-[#6b4f4f] text-white rounded-lg font-semibold hover:bg-[#5a4040] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f] focus:ring-offset-2"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetComments;
