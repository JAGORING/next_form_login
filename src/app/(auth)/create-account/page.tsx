'use client';
import React from 'react';
import { useFormState } from 'react-dom';
import { handleSubmitForm } from './action';
import Link from 'next/link';
import Input from '@/app/components/Input';
import FormButton from '@/app/components/FormButton';

export default function CreateAccount() {
  const [state, action] = useFormState(handleSubmitForm, null);

  return (
    <div className="w-full max-w-md p-6 bg-[#fdfcf9] shadow-xl rounded-2xl border border-[#e2ddd7]">
      <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">Create Account</h2>
      <p className="text-sm text-center text-[#8a6a6a] mb-8">
        Start your adventure by creating an account! 🌟
      </p>

      <form action={action} className="space-y-5">
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          errors={state?.errors?.fieldErrors.email}
        />
        <Input
          name="username"
          label="Username"
          type="text"
          placeholder="Enter your username"
          errors={state?.errors?.fieldErrors.username}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          errors={state?.errors?.fieldErrors.password}
        />
        <Input
          name="confirm-password"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          errors={state?.errors?.fieldErrors.confirmPassword}
        />
        <FormButton text="Create Account" />
      </form>
      {state?.success && (
        <>
          <div className="mt-5 text-center text-sm text-green-600 bg-green-100 p-3 rounded-lg">
            🌿 Account created! Welcome aboard!
            <div className="mt-2 text-center">
              <Link href="/login" className="text-[#6b4f4f] text-sm hover:underline font-semibold">
                Go to Log in
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
