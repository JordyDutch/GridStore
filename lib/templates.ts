export interface GridTemplate {
  id: string;
  name: string;
  description: string;
  preview: string; // URL to preview image or CSS gradient
  category: "minimal" | "creative" | "professional" | "gaming" | "social";
  gridConfig: {
    columns: number;
    rows: number;
    gap: string;
    areas?: string[];
  };
  colors: {
    primary: string;
    secondary: string;
    background: string;
    accent: string;
  };
  featured: boolean;
  author: string;
  downloads: number;
  // On-chain grid data
  gridData?: {
    // Raw encoded value to be used directly in setData (hex string)
    rawValue?: string;
    // Or IPFS URL + hash to encode
    ipfsUrl?: string;
    hash?: string;
  };
}

// Example grid templates for the store
export const gridTemplates: GridTemplate[] = [
  {
    id: "minimal-classic",
    name: "Minimal Classic",
    description: "Clean and simple layout with focus on content. Perfect for personal profiles.",
    preview: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    category: "minimal",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "16px",
    },
    colors: {
      primary: "#667eea",
      secondary: "#764ba2",
      background: "#0f0f0f",
      accent: "#ffffff",
    },
    featured: true,
    author: "GridStore",
    downloads: 1250,
  },
  {
    id: "neon-cyberpunk",
    name: "Neon Cyberpunk",
    description: "Futuristic neon-styled grid with vibrant colors and glowing effects.",
    preview: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    category: "creative",
    gridConfig: {
      columns: 4,
      rows: 3,
      gap: "12px",
    },
    colors: {
      primary: "#f093fb",
      secondary: "#f5576c",
      background: "#0a0a0a",
      accent: "#00ff88",
    },
    featured: true,
    author: "CyberDesigns",
    downloads: 890,
  },
  {
    id: "corporate-pro",
    name: "Corporate Pro",
    description: "Professional layout ideal for business profiles and enterprise use.",
    preview: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    category: "professional",
    gridConfig: {
      columns: 3,
      rows: 4,
      gap: "20px",
    },
    colors: {
      primary: "#4facfe",
      secondary: "#00f2fe",
      background: "#1a1a2e",
      accent: "#eaeaea",
    },
    featured: false,
    author: "ProLayouts",
    downloads: 567,
  },
  {
    id: "gamer-zone",
    name: "Gamer Zone",
    description: "Dynamic gaming-inspired layout with bold colors and aggressive styling.",
    preview: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    category: "gaming",
    gridConfig: {
      columns: 4,
      rows: 4,
      gap: "8px",
    },
    colors: {
      primary: "#fa709a",
      secondary: "#fee140",
      background: "#0d0d0d",
      accent: "#ff4444",
    },
    featured: true,
    author: "GameMasters",
    downloads: 2340,
  },
  {
    id: "social-hub",
    name: "Social Hub",
    description: "Community-focused layout perfect for social profiles and networking.",
    preview: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    category: "social",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "14px",
    },
    colors: {
      primary: "#a8edea",
      secondary: "#fed6e3",
      background: "#1f1f1f",
      accent: "#333333",
    },
    featured: false,
    author: "SocialStyles",
    downloads: 780,
  },
  {
    id: "dark-elegance",
    name: "Dark Elegance",
    description: "Sophisticated dark theme with subtle gradients and premium feel.",
    preview: "linear-gradient(135deg, #434343 0%, #000000 100%)",
    category: "minimal",
    gridConfig: {
      columns: 2,
      rows: 3,
      gap: "24px",
    },
    colors: {
      primary: "#434343",
      secondary: "#000000",
      background: "#0a0a0a",
      accent: "#d4af37",
    },
    featured: true,
    author: "GridStore",
    downloads: 1567,
  },
  {
    id: "sunset-vibes",
    name: "Sunset Vibes",
    description: "Warm, inviting colors inspired by beautiful sunsets.",
    preview: "linear-gradient(135deg, #f5af19 0%, #f12711 100%)",
    category: "creative",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "16px",
    },
    colors: {
      primary: "#f5af19",
      secondary: "#f12711",
      background: "#1a1a1a",
      accent: "#ffffff",
    },
    featured: false,
    author: "SunsetArt",
    downloads: 445,
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    description: "Calming blue tones reminiscent of the deep ocean.",
    preview: "linear-gradient(135deg, #667db6 0%, #0082c8 50%, #0082c8 50%, #667db6 100%)",
    category: "professional",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "18px",
    },
    colors: {
      primary: "#667db6",
      secondary: "#0082c8",
      background: "#0d1b2a",
      accent: "#e0e1dd",
    },
    featured: false,
    author: "AquaDesigns",
    downloads: 623,
  },
  {
    id: "pixel-retro",
    name: "Pixel Retro",
    description: "Retro gaming aesthetic with pixel-perfect styling.",
    preview: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    category: "gaming",
    gridConfig: {
      columns: 4,
      rows: 3,
      gap: "4px",
    },
    colors: {
      primary: "#11998e",
      secondary: "#38ef7d",
      background: "#000000",
      accent: "#ffffff",
    },
    featured: false,
    author: "RetroPixels",
    downloads: 1890,
  },
  {
    id: "aurora-borealis",
    name: "Aurora Borealis",
    description: "Magical northern lights inspired color palette.",
    preview: "linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)",
    category: "creative",
    gridConfig: {
      columns: 3,
      rows: 4,
      gap: "12px",
    },
    colors: {
      primary: "#00c9ff",
      secondary: "#92fe9d",
      background: "#0c0c0c",
      accent: "#ff66b2",
    },
    featured: true,
    author: "NorthernLights",
    downloads: 2100,
  },
  {
    id: "community-connect",
    name: "Community Connect",
    description: "Perfect for DAOs and community-driven profiles.",
    preview: "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
    category: "social",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "16px",
    },
    colors: {
      primary: "#ee0979",
      secondary: "#ff6a00",
      background: "#141414",
      accent: "#ffffff",
    },
    featured: false,
    author: "DAOStyles",
    downloads: 934,
  },
  {
    id: "jordys-grid",
    name: "Jordy's Grid",
    description: "Custom grid template with LUKSO brand colors and styling.",
    preview: "linear-gradient(135deg, #FE005B 0%, #7B3FE4 100%)",
    category: "professional",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "16px",
    },
    colors: {
      primary: "#FE005B",
      secondary: "#7B3FE4",
      background: "#0D0D0D",
      accent: "#ffffff",
    },
    featured: true,
    author: "Jordy",
    downloads: 3450,
    // Grid data from Universal Profile - using the exact decoded values from ERC725 Inspect
    // URL: ipfs://QmbTtb9znWdoCjw9qC5Zxr7KGguWAtj7qbre5gnyaiQ5rE
    // Hash: 0x66340de3fa939c35952afeb01bb1bc0c411160a548a8f39457d03414698e35b6
    gridData: {
      rawValue: "0x00006f357c6a002066340de3fa939c35952afeb01bb1bc0c411160a548a8f39457d03414698e35b6697066733a2f2f516d62547462397a6e57646f436a77397143355a7872374b4767755741746a377162726535676e79616951357245",
    },
  },
];

export const categories = [
  { id: "all", name: "All Templates", icon: "Grid3X3" },
  { id: "minimal", name: "Minimal", icon: "Minus" },
  { id: "creative", name: "Creative", icon: "Sparkles" },
  { id: "professional", name: "Professional", icon: "Briefcase" },
  { id: "gaming", name: "Gaming", icon: "Gamepad2" },
  { id: "social", name: "Social", icon: "Users" },
] as const;

export type Category = (typeof categories)[number]["id"];
