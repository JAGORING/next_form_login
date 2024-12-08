'use client';

import { useFormState } from 'react-dom';
import { handleSubmitForm } from './action';
import { MAX_TWEET_LENGTH, MAX_TITLE_LENGTH } from '@/constants';

const AddTweet = () => {
  const [state, action] = useFormState(handleSubmitForm, null);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl border border-[#e2ddd7]">
        <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">Add a New Tweet</h2>
        <form action={action} className="space-y-5">
          <div>
            <span className="block text-[#6b4f4f] font-medium mb-2">Username</span>
          </div>
          <div>
            <label htmlFor="title" className="block text-[#6b4f4f] font-medium mb-2">
              Title
            </label>
            <input
              name="title"
              type="text"
              placeholder="Enter the title"
              maxLength={MAX_TITLE_LENGTH}
              className="w-full px-4 py-2 border border-[#e2ddd7] rounded-lg text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f] focus:border-transparent"
            />
            <p className="text-sm text-right text-[#8a6a6a] mt-1">
              {/* {state.values.title?.length || 0} / {MAX_TITLE_LENGTH} */}
            </p>
          </div>
          <div>
            <label htmlFor="tweet" className="block text-[#6b4f4f] font-medium mb-2">
              Tweet
            </label>
            <textarea
              name="tweet"
              placeholder="What's on your mind?"
              maxLength={MAX_TWEET_LENGTH}
              rows={4}
              className="w-full px-4 py-2 border border-[#e2ddd7] rounded-lg text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f] focus:border-transparent"
            />
            <p className="text-sm text-right text-[#8a6a6a] mt-1">
              {/* {state.values.content?.length || 0} / {MAX_CONTENT_LENGTH} */}
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-[#6b4f4f] text-white py-2 rounded-lg font-semibold hover:bg-[#5a4040] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f] focus:ring-offset-2"
          >
            Post Tweet
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTweet;
