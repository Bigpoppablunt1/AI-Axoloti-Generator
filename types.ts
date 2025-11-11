export interface GeneratorOptions {
  color: string;
  size: string;
  gender: string;
  accessory: string;
  style: string;
  name: string;
}

export interface ImageResult {
  base64: string;
  mimeType: string;
  name: string;
}

export type HallOfFameEntry = ImageResult;

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}
