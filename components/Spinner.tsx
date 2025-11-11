import React from 'react';

interface SpinnerProps {
    message?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ message = 'Thinking...' }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      <p className="text-gray-400">{message}</p>
    </div>
  );
};
