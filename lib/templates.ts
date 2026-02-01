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
  featured: boolean;
  author: string;
  // On-chain grid data
  gridData?: {
    // Raw encoded value to be used directly in setData (hex string)
    rawValue?: string;
    // Or IPFS URL + hash to encode
    ipfsUrl?: string;
    hash?: string;
  };
}

// Templates with on-chain grid data (rawValue or ipfsUrl)
export const gridTemplates: GridTemplate[] = [
  {
    id: "empty-grid",
    name: "Empty Grid",
    description: "Reset your grid to empty. Removes all grid data from your Universal Profile.",
    preview: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
    category: "minimal",
    gridConfig: {
      columns: 1,
      rows: 1,
      gap: "0px",
    },
    featured: false,
    author: "GridStore",
    gridData: {
      rawValue: "0x",
    },
  },
  {
    id: "memetoken",
    name: "Meme Token",
    description: "Meme-style grid layout for token and crypto culture profiles.",
    preview: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 50%, #2ec4b6 100%)",
    category: "creative",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "12px",
    },
    featured: false,
    author: "GridStore",
    gridData: {
      rawValue: "0x00006f357c6a0020487a094d6a1f114cad1234a49782ee52ef37b0fef6fc19b45e0561b432d63b51697066733a2f2f516d6651354179475732743231314c394a3535686e7544546f7467724c506d4d4e6e524e73513966474665354765",
    },
  },
  {
    id: "car-brand",
    name: "Car Brand",
    description: "Sleek automotive-inspired grid layout for car and brand profiles.",
    preview: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    category: "professional",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "16px",
    },
    featured: false,
    author: "GridStore",
    gridData: {
      rawValue: "0x00006f357c6a002067ad9338b8b01cb7d5556d01caa9e7a19e6cadad7bfa814554ad469ee4924298697066733a2f2f516d646e5844676d79474e46445367313869314c485a34655871466d66466d6a7554583765415878665775705236",
    },
  },
  {
    id: "alts-anonymous",
    name: "Alts Anonymous",
    description: "Grid layout for Alts Anonymous community and altcoin profiles.",
    preview: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
    category: "social",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "12px",
    },
    featured: false,
    author: "GridStore",
    gridData: {
      rawValue: "0x00006f357c6a0020e1c516b43480cdf31791fa8faa71cbd5de7c319cea06260eab6731ac74190b47697066733a2f2f516d635a36513133774d69586635725953456b316b47486d6e53566854765272684a383734525934794678624846",
    },
  },
  {
    id: "staking-provider",
    name: "Staking Provider",
    description: "Grid layout for staking providers and validator profiles.",
    preview: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
    category: "professional",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "16px",
    },
    featured: true,
    author: "GridStore",
    gridData: {
      rawValue: "0x00006f357c6a0020b65690ac95c9ee801173e050c7a7043352215e5e26cf2e72feb41442811788ae697066733a2f2f516d59467a654d6e4e32393279636f687475645039693274396e4345693843464b37664276614b796f3756756276",
    },
  },
  {
    id: "jean-cavallera-grid",
    name: "Jean Cavallera's Grid",
    description: "Custom grid template by Jean Cavallera.",
    preview: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
    category: "creative",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "16px",
    },
    featured: true,
    author: "Jean Cavallera",
    gridData: {
      rawValue: "0x00006f357c6a00202d141067a502dce141bea99be776f090d08b9b7f68ca09c6bdf23df1bd0773de697066733a2f2f516d616e4873644576526f6a567a613670736352636e6a6a64597931764367566431577242586861587255487361",
    },
  },
  {
    id: "jordydutch-grid",
    name: "JordyDutch's Grid",
    description: "Custom grid template with LUKSO brand colors and styling.",
    preview: "linear-gradient(135deg, #FE005B 0%, #7B3FE4 100%)",
    category: "professional",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "16px",
    },
    featured: true,
    author: "Jordy",
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
