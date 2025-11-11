import React from 'react';
import type { HallOfFameEntry } from '../types';

interface HallOfFameProps {
  entries: HallOfFameEntry[];
}

export const HallOfFame: React.FC<HallOfFameProps> = ({ entries }) => {
  // Randomize on every render to give a fresh look each time the tab is viewed
  const randomizedEntries = [...entries].sort(() => 0.5 - Math.random());

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
        Hall of Fame
      </h2>
      {entries.length === 0 ? (
        <p className="text-center text-gray-400">The Hall of Fame is empty. Create an Axolotl to add it here!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {randomizedEntries.map((entry, index) => (
            <div key={`${entry.name}-${index}`} className="bg-gray-900/50 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                <img
                  src={`data:${entry.mimeType};base64,${entry.base64}`}
                  alt={entry.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-4 bg-gray-700">
                <h3 className="text-lg font-semibold text-white truncate group-hover:text-pink-400 transition-colors">{entry.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
