export type ShelfFinish = 'honey_oak' | 'wenge';

export type ArrangementStyle = 
  | 'symmetrical'
  | 'asymmetrical'
  | 'staggered'
  | 'vertical'
  | 'gallery';

export interface ShelfItem {
  id: string;
  lengthCm: number;
  order: number;
  yOffsetPercent?: number;
  xOffsetPercent?: number;
}

export interface RoomPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  wallColor: string;
  image: string;
}

export interface FinishInfo {
  id: ShelfFinish;
  name: string;
  woodSpecies: string;
  tone: string;
  hex: string;
  grainTexture: string;
  description: string;
  idealFor: string;
}

export interface StoredCreation {
  id: string;
  title: string;
  date: string;
  finish: ShelfFinish;
  arrangement: ArrangementStyle;
  shelves: ShelfItem[];
  roomName: string;
  primaryImage: string;
  galleryImages: string[];
  isCustomRoom?: boolean;
  totalLengthCm: number;
}

export interface CustomerLead {
  id: string;
  name: string;
  city: string;
  shelvesRequested: number;
  finish: ShelfFinish;
  status: 'Sample Sent' | 'Design Approved' | 'In Production' | 'New Consultation';
  date: string;
  value: string;
}

export interface AccessCode {
  code: string;
  label: string;
  creditsGrant: number;
  active: boolean;
  usesCount: number;
}
