'use client';

import { useFormState } from 'react-dom';
import { handleSubmitForm } from './action';
import { MAX_TWEET_LENGTH, MAX_TITLE_LENGTH } from '@/constants';
import { useState } from 'react';
import FormButton from '@/app/components/FormButton';
import Link from 'next/link';

const AddTweet = () => {
  const [title, setTitle] = useState('');
  const [tweet, setTweet] = useState('');
  const [state, action] = useFormState(handleSubmitForm, null);
  return (
    <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl border border-[#e2ddd7]">
      <Link href="/" className="text-[#6b4f4f] text-sm mb-4 block hover:underline">
        ← Back to Home
      </Link>
      <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">Add a New Tweet</h2>
      <form action={action} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-[#6b4f4f] font-medium mb-2">
            Title
          </label>
          <input
            name="title"
            type="text"
            placeholder="Enter the title"
            onChange={(e) => setTitle(e.target.value)}
            maxLength={MAX_TITLE_LENGTH}
            required
            className="w-full px-4 py-2 border border-[#e2ddd7] rounded-lg text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f] focus:border-transparent"
          />
          <p className="text-sm text-right text-[#8a6a6a] mt-1">
            {title.length || 0} / {MAX_TITLE_LENGTH}
          </p>
        </div>
        <div>
          <label htmlFor="tweet" className="block text-[#6b4f4f] font-medium mb-2">
            Tweet
          </label>
          <textarea
            name="tweet"
            placeholder="What's on your mind?"
            onChange={(e) => setTweet(e.target.value)}
            maxLength={MAX_TWEET_LENGTH}
            rows={4}
            required
            className="w-full px-4 py-2 border border-[#e2ddd7] rounded-lg text-[#4a4a4a] focus:outline-none focus:ring-2 focus:ring-[#6b4f4f] focus:border-transparent"
          />
          <p className="text-sm text-right text-[#8a6a6a] mt-1">
            {tweet.length || 0} / {MAX_TWEET_LENGTH}
          </p>
        </div>
        <FormButton text="Post Tweet" />
      </form>
    </div>
  );
};

export default AddTweet;
