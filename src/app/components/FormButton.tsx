'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  text: string;
}

const FormButton: React.FC<FormButtonProps> = ({ text }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full px-4 py-2 text-white bg-[#9b8c85] rounded-lg hover:bg-[#8b7b73] focus:ring-2 focus:ring-[#6b4f4f] focus:outline-none  disabled:bg-[#d6cbc6] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? 'Loading...' : text}
    </button>
  );
};

export default FormButton;
