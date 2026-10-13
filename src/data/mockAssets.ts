import { 
  ShelfFinish, 
  ArrangementStyle, 
  FinishInfo, 
  RoomPreset, 
  StoredCreation, 
  CustomerLead, 
  AccessCode 
} from '../types';

export const ASSET_IMAGES = {
  hero: '/src/assets/images/hero_scandi_shelves_1791878366990.jpg',
  honeyOakStaggered: '/src/assets/images/honey_oak_staggered_1791878368285.jpg',
  honeyOakGallery: '/src/assets/images/honey_oak_gallery_1791878367212.jpg',
  honeyOakVertical: '/src/assets/images/honey_oak_vertical_1791878415665.jpg',
  wengeAsymmetric: '/src/assets/images/wenge_asymmetric_1791878368542.jpg',
  wengeSymmetrical: '/src/assets/images/wenge_symmetrical_1791878368959.jpg',
  wengeGalleryDining: '/src/assets/images/wenge_gallery_dining_1791878416614.jpg',
  emptyRoom: '/src/assets/images/room_empty_limewash_1791878415794.jpg',
};

export const FINISH_DETAILS: Record<ShelfFinish, FinishInfo> = {
  honey_oak: {
    id: 'honey_oak',
    name: 'Honey Oak',
    woodSpecies: 'Solid Paulownia Wood',
    tone: 'Warm Amber & Golden Undertones',
    hex: '#C89B60',
    grainTexture: 'Silky linear feather grain with subtle matte oiled sheen',
    description: 'A luminous Scandinavian finish that celebrates the organic grain of sustainable Paulownia. Hand-finished with natural plant-based hardwax oil.',
    idealFor: 'Sunlit living rooms, Japandi interiors, calm neutral bedrooms, and limestone plaster walls.',
  },
  wenge: {
    id: 'wenge',
    name: 'Wenge',
    woodSpecies: 'Solid Paulownia Wood',
    tone: 'Deep Espresso & Charcoal Wood Grain',
    hex: '#2B231F',
    grainTexture: 'Rich architectural contrast with visible tactile porous grain',
    description: 'An architectural dark finish with dramatic depth. Precision-stained to preserve the feather-light strength and natural character of solid Paulownia.',
    idealFor: 'Executive home offices, high-contrast dining spaces, modern gallery walls, and warm taupe backgrounds.',
  },
};

export const ROOM_PRESETS: RoomPreset[] = [
  {
    id: 'nordic_living',
    name: 'Nordic Living Room',
    category: 'Living',
    description: 'Warm textured limewash plaster with gentle morning daylight and white bouclé seating.',
    wallColor: '#EBE5DC',
    image: ASSET_IMAGES.hero,
  },
  {
    id: 'japandi_bedroom',
    name: 'Japandi Bedroom',
    category: 'Bedroom',
    description: 'Soft linen textiles, calm sand plaster wall, and tranquil natural ambiance.',
    wallColor: '#E6DFD4',
    image: ASSET_IMAGES.honeyOakVertical,
  },
  {
    id: 'architect_study',
    name: 'Architectural Study',
    category: 'Office',
    description: 'Clean off-white wall above a minimalist solid wood desk with task illumination.',
    wallColor: '#F0ECE6',
    image: ASSET_IMAGES.wengeSymmetrical,
  },
  {
    id: 'scandi_dining',
    name: 'Contemporary Dining',
    category: 'Dining',
    description: 'Warm taupe accent wall above a mid-century credenza and oak dining ensemble.',
    wallColor: '#DFD8CC',
    image: ASSET_IMAGES.wengeGalleryDining,
  },
];

export const ARRANGEMENT_STYLES: {
  id: ArrangementStyle;
  label: string;
  tagline: string;
  description: string;
  layoutPattern: string;
}[] = [
  {
    id: 'symmetrical',
    label: 'Symmetrical Layout',
    tagline: 'Balanced & Orderly',
    description: 'Equal vertical rhythm with perfectly centered lengths for harmonious architectural presence.',
    layoutPattern: 'Centered vertical stack with uniform spacing',
  },
  {
    id: 'asymmetrical',
    label: 'Asymmetrical Layout',
    tagline: 'Modern & Dynamic',
    description: 'Offset horizontal balances that create visual tension and highlight sculptural decor pieces.',
    layoutPattern: 'Left and right weighted offset lengths',
  },
  {
    id: 'staggered',
    label: 'Staggered Layout',
    tagline: 'Casual & Rhythmic',
    description: 'Alternating tier offsets providing expansive vertical headroom for tall plants and art.',
    layoutPattern: 'Alternating stair-step horizontal offsets',
  },
  {
    id: 'vertical',
    label: 'Vertical Composition',
    tagline: 'Tower & Minimalist',
    description: 'Compact horizontal footprint maximizing vertical storage and curated display columns.',
    layoutPattern: 'Compact uniform vertical column',
  },
  {
    id: 'gallery',
    label: 'Modern Gallery',
    tagline: 'Curated Architectural',
    description: 'Multi-length museum composition engineered for art prints, framed photographs, and ceramics.',
    layoutPattern: 'Tri-level salon arrangement with varied spans',
  },
];

// Curated 5-image sets for combinations
export interface VisualOutputSet {
  arrangementStyle: ArrangementStyle;
  finish: ShelfFinish;
  title: string;
  subtitle: string;
  primaryImage: string;
  images: {
    id: string;
    label: string;
    caption: string;
    url: string;
  }[];
}

export const SAMPLE_OUTPUT_SETS: VisualOutputSet[] = [
  {
    arrangementStyle: 'staggered',
    finish: 'honey_oak',
    title: 'Honey Oak Staggered Horizon',
    subtitle: 'Dual-tier offset arrangement in warm limewash living room',
    primaryImage: ASSET_IMAGES.honeyOakStaggered,
    images: [
      {
        id: 'ho-stag-1',
        label: 'Hero Elevation',
        caption: 'Eye-level architectural perspective showcasing natural daylight interaction',
        url: ASSET_IMAGES.honeyOakStaggered,
      },
      {
        id: 'ho-stag-2',
        label: 'Wide Living Context',
        caption: 'Full-room view with warm plaster, off-white bouclé sofa, and oak flooring',
        url: ASSET_IMAGES.hero,
      },
      {
        id: 'ho-stag-3',
        label: 'Gallery View',
        caption: 'Compositional balance showing decorative ceramic pottery and botanicals',
        url: ASSET_IMAGES.honeyOakGallery,
      },
      {
        id: 'ho-stag-4',
        label: 'Vertical Perspective',
        caption: 'Linear wood grain detail and seamless concealed bracket installation',
        url: ASSET_IMAGES.honeyOakVertical,
      },
      {
        id: 'ho-stag-5',
        label: 'Architectural Shadow Detail',
        caption: 'Soft shadow projection highlighting the 4 cm solid Paulownia thickness',
        url: ASSET_IMAGES.honeyOakStaggered,
      },
    ],
  },
  {
    arrangementStyle: 'gallery',
    finish: 'honey_oak',
    title: 'Honey Oak Curated Gallery',
    subtitle: 'Tri-level architectural display with framed art and stoneware',
    primaryImage: ASSET_IMAGES.honeyOakGallery,
    images: [
      {
        id: 'ho-gal-1',
        label: 'Hero Elevation',
        caption: 'Three-tiered gallery composition above Scandinavian media console',
        url: ASSET_IMAGES.honeyOakGallery,
      },
      {
        id: 'ho-gal-2',
        label: 'Wide Living Setting',
        caption: 'Spacious Scandinavian living room flooded with soft natural morning light',
        url: ASSET_IMAGES.hero,
      },
      {
        id: 'ho-gal-3',
        label: 'Dual Staggered View',
        caption: 'Alternative dynamic perspective with artisanal ceramics and woven accents',
        url: ASSET_IMAGES.honeyOakStaggered,
      },
      {
        id: 'ho-gal-4',
        label: 'Minimalist Detail',
        caption: 'Close architectural view of squared 90° edges and seamless mounting',
        url: ASSET_IMAGES.honeyOakVertical,
      },
      {
        id: 'ho-gal-5',
        label: 'Warm Afternoon Ambience',
        caption: 'Subtle ambient reflection across natural plant-based hardwax finish',
        url: ASSET_IMAGES.honeyOakGallery,
      },
    ],
  },
  {
    arrangementStyle: 'vertical',
    finish: 'honey_oak',
    title: 'Honey Oak Vertical Column',
    subtitle: 'Four-tier architectural column in tranquil Japandi bedroom',
    primaryImage: ASSET_IMAGES.honeyOakVertical,
    images: [
      {
        id: 'ho-vert-1',
        label: 'Hero Elevation',
        caption: 'Four-shelf column maximizing vertical elegance in a neutral Japandi suite',
        url: ASSET_IMAGES.honeyOakVertical,
      },
      {
        id: 'ho-vert-2',
        label: 'Staggered Living Alternative',
        caption: 'Alternative dynamic horizontal configuration with earthy stoneware vessels',
        url: ASSET_IMAGES.honeyOakStaggered,
      },
      {
        id: 'ho-vert-3',
        label: 'Expansive Living Perspective',
        caption: 'Wide-angle room preview showing natural timber grain and soft furnishings',
        url: ASSET_IMAGES.hero,
      },
      {
        id: 'ho-vert-4',
        label: 'Salon Gallery Option',
        caption: 'Curated multi-tier layout with framed prints and natural clay vases',
        url: ASSET_IMAGES.honeyOakGallery,
      },
      {
        id: 'ho-vert-5',
        label: 'Wood Grain Macro Shot',
        caption: 'Detailed tactile view of solid Paulownia silky linear feather grain',
        url: ASSET_IMAGES.honeyOakVertical,
      },
    ],
  },
  {
    arrangementStyle: 'symmetrical',
    finish: 'honey_oak',
    title: 'Honey Oak Architectural Harmony',
    subtitle: 'Triple symmetric linear shelves in expansive sunlit living room',
    primaryImage: ASSET_IMAGES.hero,
    images: [
      {
        id: 'ho-sym-1',
        label: 'Hero Elevation',
        caption: 'Three 240 cm Honey Oak shelves mounted symmetrically above lounge seating',
        url: ASSET_IMAGES.hero,
      },
      {
        id: 'ho-sym-2',
        label: 'Staggered Variant',
        caption: 'Relaxed offset study with ceramic jug and architectural volumes',
        url: ASSET_IMAGES.honeyOakStaggered,
      },
      {
        id: 'ho-sym-3',
        label: 'Modern Salon Wall',
        caption: 'Multi-length gallery styling over solid oak lowboard',
        url: ASSET_IMAGES.honeyOakGallery,
      },
      {
        id: 'ho-sym-4',
        label: 'Vertical Nook Study',
        caption: 'Four-tier column ideal for reading alcoves and bespoke master suites',
        url: ASSET_IMAGES.honeyOakVertical,
      },
      {
        id: 'ho-sym-5',
        label: 'Depth & Shadow Elevation',
        caption: 'Crisp square edge profile floating seamlessly 20 cm from limewash wall',
        url: ASSET_IMAGES.hero,
      },
    ],
  },
  {
    arrangementStyle: 'asymmetrical',
    finish: 'wenge',
    title: 'Wenge Dynamic Asymmetry',
    subtitle: 'Dramatic dark Paulownia composition on warm taupe plaster wall',
    primaryImage: ASSET_IMAGES.wengeAsymmetric,
    images: [
      {
        id: 'we-asym-1',
        label: 'Hero Elevation',
        caption: 'Dramatic multi-tier offset shelf array with contrasting white vessels',
        url: ASSET_IMAGES.wengeAsymmetric,
      },
      {
        id: 'we-asym-2',
        label: 'Symmetrical Study',
        caption: 'Three-tier symmetrical layout above minimalist workspace desk',
        url: ASSET_IMAGES.wengeSymmetrical,
      },
      {
        id: 'we-asym-3',
        label: 'Contemporary Dining Setting',
        caption: 'Staggered Wenge arrangement over walnut credenza and dining suite',
        url: ASSET_IMAGES.wengeGalleryDining,
      },
      {
        id: 'we-asym-4',
        label: 'Dark Wood Detail Shot',
        caption: 'Rich espresso tone highlighting durable matte clear coat and edge grain',
        url: ASSET_IMAGES.wengeAsymmetric,
      },
      {
        id: 'we-asym-5',
        label: 'Warm Evening Ambience',
        caption: 'Atmospheric table lamp casting soft illumination across the deep finish',
        url: ASSET_IMAGES.wengeGalleryDining,
      },
    ],
  },
  {
    arrangementStyle: 'symmetrical',
    finish: 'wenge',
    title: 'Wenge Executive Symmetry',
    subtitle: 'Clean balanced trio above contemporary architect workspace',
    primaryImage: ASSET_IMAGES.wengeSymmetrical,
    images: [
      {
        id: 'we-sym-1',
        label: 'Hero Elevation',
        caption: 'Tri-level symmetrical installation centered above oak work table',
        url: ASSET_IMAGES.wengeSymmetrical,
      },
      {
        id: 'we-sym-2',
        label: 'Dynamic Asymmetric Flow',
        caption: 'Expansive living room layout with sculptural vessels and table lamp',
        url: ASSET_IMAGES.wengeAsymmetric,
      },
      {
        id: 'we-sym-3',
        label: 'Dining Salon Elevation',
        caption: 'Wenge floating shelves paired with Scandinavian pendant lighting',
        url: ASSET_IMAGES.wengeGalleryDining,
      },
      {
        id: 'we-sym-4',
        label: 'Bookshelf Close-up',
        caption: 'Heavy duty steel bracket concealed mount supporting up to 35 kg per meter',
        url: ASSET_IMAGES.wengeSymmetrical,
      },
      {
        id: 'we-sym-5',
        label: 'Textured Wall Contrast',
        caption: 'Deep charcoal contrast against natural off-white wall plaster',
        url: ASSET_IMAGES.wengeAsymmetric,
      },
    ],
  },
  {
    arrangementStyle: 'gallery',
    finish: 'wenge',
    title: 'Wenge Salon Dining Gallery',
    subtitle: 'Staggered architectural shelving over dining sideboard',
    primaryImage: ASSET_IMAGES.wengeGalleryDining,
    images: [
      {
        id: 'we-gal-1',
        label: 'Hero Elevation',
        caption: 'High-contrast Wenge shelves with artwork and brass pendant light',
        url: ASSET_IMAGES.wengeGalleryDining,
      },
      {
        id: 'we-gal-2',
        label: 'Asymmetrical Living Setting',
        caption: 'Rich dark Paulownia wood balancing warm linen drapery and light oak flooring',
        url: ASSET_IMAGES.wengeAsymmetric,
      },
      {
        id: 'we-gal-3',
        label: 'Symmetrical Studio View',
        caption: 'Balanced trio in a modern architectural office environment',
        url: ASSET_IMAGES.wengeSymmetrical,
      },
      {
        id: 'we-gal-4',
        label: 'Art Gallery Staging',
        caption: 'Framed minimalist prints resting comfortably on 20 cm deep floating ledge',
        url: ASSET_IMAGES.wengeGalleryDining,
      },
      {
        id: 'we-gal-5',
        label: 'Fine Timber Grain',
        caption: 'Subtle Paulownia wood porosity revealed beneath rich satin stain',
        url: ASSET_IMAGES.wengeSymmetrical,
      },
    ],
  },
];

export const INITIAL_CREATIONS: StoredCreation[] = [
  {
    id: 'creation-001',
    title: 'Nordic Horizon Trio',
    date: 'October 12, 2026',
    finish: 'honey_oak',
    arrangement: 'symmetrical',
    shelves: [
      { id: 'sh-1', lengthCm: 220, order: 1 },
      { id: 'sh-2', lengthCm: 220, order: 2 },
      { id: 'sh-3', lengthCm: 220, order: 3 },
    ],
    roomName: 'Nordic Living Room',
    primaryImage: ASSET_IMAGES.hero,
    galleryImages: [
      ASSET_IMAGES.hero,
      ASSET_IMAGES.honeyOakStaggered,
      ASSET_IMAGES.honeyOakGallery,
      ASSET_IMAGES.honeyOakVertical,
      ASSET_IMAGES.hero,
    ],
    totalLengthCm: 660,
  },
  {
    id: 'creation-002',
    title: 'Studio Asymmetric Duo',
    date: 'October 10, 2026',
    finish: 'honey_oak',
    arrangement: 'staggered',
    shelves: [
      { id: 'sh-1', lengthCm: 160, order: 1 },
      { id: 'sh-2', lengthCm: 120, order: 2 },
    ],
    roomName: 'Nordic Living Room',
    primaryImage: ASSET_IMAGES.honeyOakStaggered,
    galleryImages: [
      ASSET_IMAGES.honeyOakStaggered,
      ASSET_IMAGES.hero,
      ASSET_IMAGES.honeyOakGallery,
      ASSET_IMAGES.honeyOakVertical,
      ASSET_IMAGES.honeyOakStaggered,
    ],
    totalLengthCm: 280,
  },
  {
    id: 'creation-003',
    title: 'Wenge Executive Trio',
    date: 'October 8, 2026',
    finish: 'wenge',
    arrangement: 'symmetrical',
    shelves: [
      { id: 'sh-1', lengthCm: 140, order: 1 },
      { id: 'sh-2', lengthCm: 140, order: 2 },
      { id: 'sh-3', lengthCm: 140, order: 3 },
    ],
    roomName: 'Architectural Study',
    primaryImage: ASSET_IMAGES.wengeSymmetrical,
    galleryImages: [
      ASSET_IMAGES.wengeSymmetrical,
      ASSET_IMAGES.wengeAsymmetric,
      ASSET_IMAGES.wengeGalleryDining,
      ASSET_IMAGES.wengeSymmetrical,
      ASSET_IMAGES.wengeAsymmetric,
    ],
    totalLengthCm: 420,
  },
];

export const DEMO_LEADS: CustomerLead[] = [
  {
    id: 'lead-101',
    name: 'Astrid Lindgren Interiors',
    city: 'Copenhagen, DK',
    shelvesRequested: 4,
    finish: 'honey_oak',
    status: 'In Production',
    date: 'Oct 11, 2026',
    value: '€1,480',
  },
  {
    id: 'lead-102',
    name: 'Soren Arkitektur Studio',
    city: 'Stockholm, SE',
    shelvesRequested: 6,
    finish: 'wenge',
    status: 'Design Approved',
    date: 'Oct 10, 2026',
    value: '€2,340',
  },
  {
    id: 'lead-103',
    name: 'Elena Rostova Residence',
    city: 'Zurich, CH',
    shelvesRequested: 3,
    finish: 'honey_oak',
    status: 'Sample Sent',
    date: 'Oct 09, 2026',
    value: '€1,120',
  },
  {
    id: 'lead-104',
    name: 'Studio Kanso Design',
    city: 'Berlin, DE',
    shelvesRequested: 5,
    finish: 'wenge',
    status: 'New Consultation',
    date: 'Oct 08, 2026',
    value: '€1,850',
  },
];

export const DEMO_CODES: AccessCode[] = [
  {
    code: 'TARO-DEMO',
    label: 'Standard Client Presentation Pass',
    creditsGrant: 25,
    active: true,
    usesCount: 14,
  },
  {
    code: 'ARCHITECT-VIP',
    label: 'Architect & Trade Studio Pass',
    creditsGrant: 50,
    active: true,
    usesCount: 8,
  },
  {
    code: 'NORDIC-PRESS',
    label: 'Editorial & Press Review Pass',
    creditsGrant: 25,
    active: true,
    usesCount: 3,
  },
];

export const PAULOWNIA_SPECS = {
  scientificName: 'Paulownia Tomentosa / Elongata',
  density: '310 kg/m³ (approx. 40% lighter than white oak)',
  depthFixedCm: 20,
  thicknessFixedCm: 4,
  lengthIncrementCm: 10,
  lengthMinCm: 40,
  lengthMaxCm: 300,
  loadCapacityKgPerM: 35,
  bracketSystem: 'Concealed solid steel rod bracket with micro-leveling eccentricity adjustments',
  moistureResistance: 'Dimensionally stable; minimal expansion or twisting in dry or humid interiors',
  finishingProcess: '2-stage deep vegetable wax impregnating oil, zero VOC, child- and pet-safe',
};
