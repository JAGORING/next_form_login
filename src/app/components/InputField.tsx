import React from 'react';

interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  errors?: string[];
}

const InputField: React.FC<InputFieldProps> = ({ name, label, type, placeholder, errors }) => {
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
      {errors && errors.map((err) => <p className="mt-1 text-xs text-red-600">{err}</p>)}
    </div>
  );
};

export default InputField;
