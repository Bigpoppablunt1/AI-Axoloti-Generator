import { GoogleGenAI, Modality, GenerateContentResponse } from '@google/genai';
import type { GeneratorOptions, GroundingChunk } from '../types';

// Read what Vite injects (from your vite.config.ts `define` block)
const API_KEY = process.env.GEMINI_API_KEY as string;
if (!API_KEY) throw new Error("API key missing");

const ai = new GoogleGenAI({ apiKey: API_KEY });


export const generateAxolotlImage = async (options: GeneratorOptions): Promise<{base64: string; mimeType: string}> => {
  const prompt = `A high-resolution vector illustration of a ${options.gender.toLowerCase()} ${options.size.toLowerCase()} ${options.color.toLowerCase()} axolotl. The axolotl is wearing a ${options.accessory.toLowerCase()}. The style is ${options.style.toLowerCase()}, with clean lines and flat colors. The image should be on a simple, light-colored background, perfect for print-on-demand merchandise like t-shirts and stickers. Prominently display the name "${options.name}" above the axolotl in a fun, matching, stylized font. No other text or watermarks.`;

  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/png',
      aspectRatio: '1:1',
    },
  });

  if (response.generatedImages && response.generatedImages.length > 0) {
    const image = response.generatedImages[0];
    return {
        base64: image.image.imageBytes,
        mimeType: 'image/png'
    };
  }
  throw new Error("Image generation failed");
};

export const editImage = async (prompt: string, imageBase64: string, mimeType: string): Promise<{base64: string; mimeType: string}> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: imageBase64,
            mimeType: mimeType,
          },
        },
        { text: prompt },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  const firstPart = response.candidates?.[0]?.content?.parts?.[0];
  if (firstPart?.inlineData) {
    return {
      base64: firstPart.inlineData.data,
      mimeType: firstPart.inlineData.mimeType
    };
  }
  throw new Error("Image editing failed or returned no image data.");
};

export const getComplexAnswer = async (prompt: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            thinkingConfig: { thinkingBudget: 32768 }
        }
    });
    return response.text;
};

export const getGroundedAnswer = async (prompt: string): Promise<{ text: string, sources: GroundingChunk[] }> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return { text: response.text, sources: sources as GroundingChunk[] };
};

export const getQuickResponse = async (prompt: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: prompt
    });
    return response.text;
};
