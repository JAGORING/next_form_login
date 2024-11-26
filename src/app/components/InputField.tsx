import React from 'react';

interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, label, type, placeholder, error }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-[#8a6a6a]">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        className="w-full mt-1 px-4 py-2 bg-[#fdfcf9] border border-[#d3c9c3] rounded-lg focus:ring-2 focus:ring-[#9b8c85] focus:outline-none"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
