import React, { useState, useCallback } from 'react';
import { Select } from './Select';
import { Button } from './Button';
import {
  COLORS,
  SIZES,
  GENDERS,
  ACCESSORIES,
  STYLES,
} from '../constants';
import * as geminiService from '../services/geminiService';
import type { GeneratorOptions, ImageResult } from '../types';
import { RandomIcon } from './icons/RandomIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface ImageGeneratorProps {
  onImageGenerated: (result: ImageResult) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

type GeneratorStateOptions = Omit<GeneratorOptions, 'name'>;

const initialOptions: GeneratorStateOptions = {
  color: COLORS[0],
  size: SIZES[0],
  gender: GENDERS[0],
  accessory: ACCESSORIES[0],
  style: STYLES[0],
};

const getRandomOption = (options: string[]) => options[Math.floor(Math.random() * options.length)];

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onImageGenerated, isGenerating, setIsGenerating }) => {
  const [options, setOptions] = useState<GeneratorStateOptions>(initialOptions);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOptions((prev) => ({ ...prev, [name]: value }));
  };

  const handleRandomize = useCallback(() => {
    setOptions({
      color: getRandomOption(COLORS),
      size: getRandomOption(SIZES),
      gender: getRandomOption(GENDERS),
      accessory: getRandomOption(ACCESSORIES),
      style: getRandomOption(STYLES),
    });
  }, []);

  const handleGenerate = async () => {
    if (!name.trim()) {
      setError('Please name your Axolotl before generating.');
      return;
    }
    setIsGenerating(true);
    setError(null);
    try {
      const fullOptions: GeneratorOptions = { ...options, name: name.trim() };
      const { base64, mimeType } = await geminiService.generateAxolotlImage(fullOptions);
      onImageGenerated({ base64, mimeType, name: name.trim() });
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Image Generator</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Select label="Color" name="color" value={options.color} onChange={handleOptionChange} options={COLORS} />
        <Select label="Size" name="size" value={options.size} onChange={handleOptionChange} options={SIZES} />
        <Select label="Gender" name="gender" value={options.gender} onChange={handleOptionChange} options={GENDERS} />
        <Select label="Accessory" name="accessory" value={options.accessory} onChange={handleOptionChange} options={ACCESSORIES} />
        <Select label="Style" name="style" value={options.style} onChange={handleOptionChange} options={STYLES} />
      </div>
       <div className="mb-6">
        <label htmlFor="axolotlName" className="block text-sm font-medium text-gray-400 mb-1">Name your Axolotl</label>
        <input
          type="text"
          id="axolotlName"
          name="axolotlName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Captain Cuddles"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 focus:ring-pink-500 focus:border-pink-500 transition"
        />
      </div>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      <div className="flex gap-4">
        <Button onClick={handleRandomize} disabled={isGenerating} icon={<RandomIcon />} variant="secondary">
          Randomize
        </Button>
        <Button onClick={handleGenerate} disabled={isGenerating || !name.trim()} icon={<SparklesIcon />} className="flex-grow">
          {isGenerating ? 'Creating...' : 'Create My Axolotl!'}
        </Button>
      </div>
    </div>
  );
};
