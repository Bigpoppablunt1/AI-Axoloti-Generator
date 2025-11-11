import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export const Select: React.FC<SelectProps> = ({ label, options, ...props }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      <select
        className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 focus:ring-pink-500 focus:border-pink-500 transition"
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
