import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="p-4 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
          Axoloti AI Image Studio
        </h1>
        <p className="text-gray-400 mt-2">Create & Edit Your Perfect Axolotl Companion</p>
      </div>
    </header>
  );
};
