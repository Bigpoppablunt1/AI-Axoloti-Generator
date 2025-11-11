import React, { useState, useEffect } from 'react';
import type { ImageResult } from '../types';
import * as geminiService from '../services/geminiService';
import { Spinner } from './Spinner';
import { Button } from './Button';
import { SparklesIcon } from './icons/SparklesIcon';
import { SocialShareButtons } from './SocialShareButtons';
import { fileToBase64 } from '../utils/fileUtils';

interface ImageEditorProps {
  initialImage: ImageResult | null;
  isGeneratorLoading: boolean;
  onImageEdited: (result: ImageResult) => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ initialImage, isGeneratorLoading, onImageEdited }) => {
  const [currentImage, setCurrentImage] = useState<ImageResult | null>(initialImage);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentImage(initialImage);
  }, [initialImage]);

  const handleEdit = async () => {
    if (!prompt || !currentImage) return;
    setIsLoading(true);
    setError(null);
    try {
      const { base64, mimeType } = await geminiService.editImage(prompt, currentImage.base64, currentImage.mimeType);
      const updatedImage = { base64, mimeType, name: currentImage.name };
      onImageEdited(updatedImage);
      setCurrentImage(updatedImage);
    } catch (err) {
      setError('Failed to edit image. Please try a different prompt.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        // We'll prompt for a name or give a default one for uploaded images
        const name = prompt('Please name your new Axolotl!') || 'My Uploaded Friend';
        const newImage: ImageResult = { base64, mimeType: file.type, name };
        setCurrentImage(newImage);
        onImageEdited(newImage);
        setError(null);
      } catch (err) {
        setError('Failed to load image.');
        console.error(err);
      }
    }
  };

  const hasImage = currentImage !== null;

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Image Preview & Editor</h2>
      <div className="w-full h-80 bg-gray-700/50 rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-gray-600">
        {isGeneratorLoading ? (
            <Spinner message="Generating..." />
        ) : hasImage ? (
          <img
            src={`data:${currentImage.mimeType};base64,${currentImage.base64}`}
            alt={currentImage.name}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        ) : (
          <p className="text-gray-400">Your generated image will appear here</p>
        )}
      </div>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      {hasImage && !isGeneratorLoading && (
        <div className="w-full flex flex-col gap-4">
           {currentImage.name && <h3 className="text-xl font-bold text-center -mb-2 text-white">{currentImage.name}</h3>}
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'Add a retro filter' or 'Make it a sticker'"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 focus:ring-pink-500 focus:border-pink-500 transition"
            disabled={isLoading}
          />
          <Button onClick={handleEdit} disabled={isLoading || !prompt} icon={<SparklesIcon />}>
            {isLoading ? 'Editing...' : 'Apply Edit'}
          </Button>
        </div>
      )}
      <div className="w-full mt-4">
        <label htmlFor="image-upload" className="w-full text-center cursor-pointer bg-gray-600 text-gray-200 hover:bg-gray-500 px-6 py-3 font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out block">
            {hasImage ? 'Or Upload New Image' : 'Upload Image to Edit'}
        </label>
        <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>
       {hasImage && !isGeneratorLoading && <SocialShareButtons axolotlName={currentImage.name} />}
    </div>
  );
};
