import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageGenerator } from './components/ImageGenerator';
import { ImageEditor } from './components/ImageEditor';
import { HallOfFame } from './components/HallOfFame';
import type { ImageResult, HallOfFameEntry } from './types';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { TrophyIcon } from './components/icons/TrophyIcon';

// Mock data to pre-populate the Hall of Fame
const mockHallOfFame: HallOfFameEntry[] = [
    { name: 'Sir Reginald', base64: 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABTSURBVHhe7c+xCQAgEEBA/f+nGo2qBnwpaMkB4uZnAMB3gwAAMDAAAGBgAADAAAAwMAAAYGAAAGBgAADAwAAAwMAAAGBgAADAAAAwMAAAYGAAALgBwL2Z8hM84wAAAABJRU5ErkJggg==', mimeType: 'image/png'},
    { name: 'Cosmic Bubbles', base64: 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABRSURBVHhe7c+BCQAgdAAAXv/nuBqgCfwpaMkBYvZnAMB3gwAAMDAAAGBgAADAAAAwMAAAYGAAAGBgAADAwAAAwMAAAGBgAADAAAAwMAAAYGAAALgBNOqZ8gEBmSgAAAAASUVORK5CYII=', mimeType: 'image/png'},
    { name: 'Captain Finley', base64: 'iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABSSURBVHhe7c+BCQAQDEBw/w+dGqAJ/CloSQPi9mcAwHeDAAAwMAAAYGAAAMDAAADAwAAAwMAAAGBgAADAwAAAwMAAAGBgAADAwAAAwMAAAGBgAAC4AUwWmPICjlUMAAAAAElFTkSuQmCC', mimeType: 'image/png'},
];

type Tab = 'create' | 'hallOfFame';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [imageResult, setImageResult] = useState<ImageResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hallOfFame, setHallOfFame] = useState<HallOfFameEntry[]>(mockHallOfFame);

  const handleImageUpdate = (result: ImageResult) => {
    setImageResult(result);
    // Auto-add new designs to the Hall of Fame, preventing duplicates based on content
    setHallOfFame(prev => {
        const isAlreadyInFame = prev.some(item => item.base64 === result.base64);
        if (!isAlreadyInFame) {
            return [result, ...prev];
        }
        return prev;
    });
  };

  const TabButton: React.FC<{ tabName: Tab; label: string; icon: React.ReactElement }> = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${
        activeTab === tabName
          ? 'bg-pink-500 text-white shadow-lg'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex justify-center mb-8 space-x-4">
          <TabButton tabName="create" label="Create" icon={<SparklesIcon />} />
          <TabButton tabName="hallOfFame" label="Hall of Fame" icon={<TrophyIcon />} />
        </div>

        {activeTab === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <ImageGenerator onImageGenerated={handleImageUpdate} isGenerating={isGenerating} setIsGenerating={setIsGenerating} />
            <ImageEditor
              initialImage={imageResult}
              isGeneratorLoading={isGenerating}
              onImageEdited={handleImageUpdate}
            />
          </div>
        )}

        {activeTab === 'hallOfFame' && (
          <HallOfFame entries={hallOfFame} />
        )}
      </main>
       <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Built with Gemini API & React. Axolotl designs are for creative exploration.</p>
      </footer>
    </div>
  );
};

export default App;
