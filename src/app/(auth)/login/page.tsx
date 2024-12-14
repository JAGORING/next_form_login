'use client';
import { useFormState } from 'react-dom';
import { handleSubmitForm } from './action';
import Link from 'next/link';
import Input from '@/app/components/Input';
import FormButton from '@/app/components/FormButton';

export default function Login() {
  const [state, action] = useFormState(handleSubmitForm, null);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-[#fdfcf9] shadow-xl rounded-2xl border border-[#e2ddd7]">
        <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">Welcome</h2>
        <p className="text-sm text-center text-[#8a6a6a] mb-8">
          Log in and continue your journey 🚀
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
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            errors={state?.errors?.fieldErrors.password}
          />
          <FormButton text="Log in" />
        </form>
        {state?.success && (
          <div className="mt-5 text-center text-sm text-green-600 bg-green-100 p-3 rounded-lg">
            🌿 You’re in. Time to relax and enjoy!
          </div>
        )}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#8a6a6a]">Don't have an account?</p>
          <Link
            href="/create-account"
            className="text-[#6b4f4f] text-sm hover:underline font-semibold"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
