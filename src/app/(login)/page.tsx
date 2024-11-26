'use client';
import { useFormState } from 'react-dom';
import InputField from '../components/InputField';
import FormButton from '../components/FormButton';
import { handleSubmitForm } from './action';

export default function Login() {
  const [state, action] = useFormState(handleSubmitForm, null);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-[#fdfcf9] shadow-xl rounded-2xl border border-[#e2ddd7]">
        <h2 className="text-2xl font-semibold text-center text-[#6b4f4f] mb-6">Welcome</h2>
        <p className="text-sm text-center text-[#8a6a6a] mb-8">Log in and continue your journey 🚀</p>

        <form action={action} className="space-y-5">
          <InputField name="email" label="Email" type="email" placeholder="Enter your email" />
          <InputField name="username" label="Username" type="text" placeholder="Enter your username" />
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={state?.error.password ?? ''}
          />
          <FormButton text="Log in" />
        </form>
        <div className="mt-5 text-center text-sm text-green-600 bg-green-100 p-3 rounded-lg">{'asdsa'}</div>
      </div>
    </div>
  );
}
