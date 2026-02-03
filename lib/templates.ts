export interface GridTemplate {
  id: string;
  name: string;
  description: string;
  preview: string; // URL to preview image or CSS gradient
  category: "minimal" | "creative" | "professional" | "gaming" | "social" | "community";
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
  profileLink?: string;
  // Universal Profile address for fetching profile/background images
  profileAddress?: string;
}

// Templates with on-chain grid data (rawValue or ipfsUrl)
export const gridTemplates: GridTemplate[] = [
  {
    id: "artist-showcase",
    name: "Artist Showcase",
    description: "For artists to showcase a signature piece and share their bio and creative statement.",
    preview: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
    category: "creative",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "12px"
    },
    featured: true,
    author: "GridStore",
    gridData: {
      rawValue: '0x00006f357c6a0020ed1d0f7d3781c4b89ab7cd9fc8d70ba739209b52591049791e738c291c0d927a697066733a2f2f516d595745734346583236585a31524d72484d54384d705339665a6f75376b666a45754456617347784d634e7736'
    }
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
    id: "photography-portfolio",
    name: "Photography Portfolio",
    description: "Grid layout for professional and enthusiast photographers.",
    preview: "linear-gradient(135deg, #1e3a5f 0%, #4a7c9b 50%, #7fb3d5 100%)",
    category: "professional",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "16px",
    },
    featured: true,
    author: "GridStore",
    gridData: {
      rawValue: "0x00006f357c6a0020e43d83b08210437cc08943cc4fe7c62a08e276f7ceff4bd93f893f3df565a1b968747470733a2f2f6170692e756e6976657273616c70726f66696c652e636c6f75642f697066732f6261666b7265696562707475677a37666f7932713276776861786979726f746163716c376333636b7337756b777736337062793379626b76657275",
    }
  },
  {
    id: "founder-profile",
    name: "Founder Profile",
    description: "Grid layout for startup founders.",
    preview: "linear-gradient(135deg, #1e3a5f 0%, #4a7c9b 50%, #7fb3d5 100%)",
    category: "professional",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "16px",
    },
    featured: true,
    author: "GridStore",
    gridData: {
      rawValue: "0x00006f357c6a00204534096dcb035c0531374b1288006808e4d30b3f9fdd097cfb353705990fad9368747470733a2f2f6170692e756e6976657273616c70726f66696c652e636c6f75642f697066732f6261666b726569647835767a796f6e64747865726f76756d367670646d35756574766435796c7571753561646465656d7377376532376a78786875"
    }
  },
  {
    id: "magazine",
    name: "Magazine",
    description: "Grid layout for paper and digital magazine to highlight articles, and content.",
    preview: "linear-gradient(135deg, #1e3a5f 0%, #4a7c9b 50%, #7fb3d5 100%)",
    category: "professional",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "16px",
    },
    featured: true,
    author: "GridStore",
    gridData: {
      rawValue: '0x00006f357c6a00204c6b8af1c40466f58a24c5283a8892ee6f342b056d6215f92b8201cf653d0f7668747470733a2f2f6170692e756e6976657273616c70726f66696c652e636c6f75642f697066732f6261666b72656967797a71716f786c6a6d6f66377a7a753369746a71346274726d796233687964366c343469766333646c3779747a626f6f327779'
    }
  },
  {
    id: "event-conference",
    name: "Event & Conference",
    description: "Grid layout to promote events and conferences.",
    preview: "linear-gradient(135deg, #1e3a5f 0%, #4a7c9b 50%, #7fb3d5 100%)",
    category: "professional",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "16px",
    },
    featured: true,
    author: "GridStore",
    gridData: {
      rawValue: '0x00006f357c6a0020aa0959d907b8fef5d1cc91838def8b8608e157b08b84277c7ff6390d30db5f6c68747470733a2f2f6170692e756e6976657273616c70726f66696c652e636c6f75642f697066732f6261666b726569676e6b346a78716c6665766333646c6b77653470766f6d763666326562736834797173617837346f78713336706f3435626d356d'
    }
  },

  // Community templates
  {
    id: "jean-cavallera",
    name: "Jean Cavallera",
    description: "Developer oriented grid from Jean Cavallera.",
    preview: "linear-gradient(135deg,rgb(100, 100, 100) 0%,rgb(71, 93, 187) 100%)",
    category: "community",
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
    profileAddress: "0x927aAD446E3bF6eeB776387B3d7A89D8016fA54d"
  },
  {
    id: "jordydutch",
    name: "JordyDutch",
    description: "Custom grid from JordyDutch with LUKSO brand colors and styling.",
    preview: "linear-gradient(135deg, #FE005B 0%, #7B3FE4 100%)",
    category: "community",
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
    profileAddress: "0x378Be8577ede94b9d4b9F45447F21B826501bab8"
  },
  {
    id: "alts-anonymous",
    name: "Alts Anonymous",
    description: "Grid of Alts Anonymous community and altcoin profiles.",
    preview: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)",
    category: "community",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "12px",
    },
    featured: false,
    author: "Alts Anonymous",
    gridData: {
      rawValue: "0x00006f357c6a0020e1c516b43480cdf31791fa8faa71cbd5de7c319cea06260eab6731ac74190b47697066733a2f2f516d635a36513133774d69586635725953456b316b47486d6e53566854765272684a383734525934794678624846",
    },
    profileAddress: "0x29d7c7E4571a83B3eF5C867f75c81D736a9D58aa"
  },
  {
    id: 'datzel',
    name: "Datzel",
    description: "Grid layout of Datzel, designer inspired.",
    preview: "linear-gradient(135deg,rgb(115, 74, 142) 0%, #8b5cf6 50%, #a855f7 100%)",
    category: "community",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "12px",
    },
    featured: true,
    author: "Datzel",
    gridData: {
      rawValue: "0x00006f357c6a0020ef6dadc0dddb6cc3a6641b221829c0da6a9b11ca7137e895e94e154b7d5ac353697066733a2f2f516d50615231726a5a36714e64477253523755456d7642697735593536325761747a704633394a41385666385775",
    },
    profileAddress: "0x24bCBa5b6E5010C6CC3c1272798854CE1dADBd71"
  },
  {
    id: "clubmulticulti",
    name: "Clubmulticulti's Grid",
    description: "Music-focused grid featuring curated audiovibes, mood boards, and creative content with embedded YouTube videos.",
    preview: "linear-gradient(135deg, #1e3a5f 0%, #4a7c9b 50%, #7fb3d5 100%)",
    category: "community",
    gridConfig: {
      columns: 2,
      rows: 3,
      gap: "12px",
    },
    featured: false,
    author: "clubmulticulti",
    gridData: {
      rawValue: "0x00006f357c6a002010b49e9944ad42099fb5f87acf691b11404bd03d850b593064c71013ceffd26e697066733a2f2f516d5556595862625950414e4a797850345732645a757578505a4d5264464837744255486b6e327450486d4b4337"
    },
    profileAddress: "0x261564F5260369438bF7F8977CDFa75Fc0532422"
  },
  {
    id: "speedracer",
    name: "SpeedRacer's Grid",
    description: "Art gallery grid showcasing digital artwork, crypto market caps, dApps, and LUKSO ecosystem content. Perfect for collectors and decentralization maximalists.",
    preview: "linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #1e3799 100%)",
    category: "community",
    gridConfig: {
      columns: 2,
      rows: 3,
      gap: "12px",
    },
    featured: false,
    author: "SpeedRacer",
    gridData: {
      rawValue: "0x00006f357c6a00205be58b4d30d3919837acf4b9e3b474c883212f7403dbc7b2e1bde8d4f6a9761e697066733a2f2f516d5474563777753872737861754c697061523370347a754e72797852417464674263764351334d6a7a75456636"
    },
    profileAddress: '0x7D817EF6adB23A038Bbae352D4E838CabB6454D0'
  },
  {
    id: "t-mass",
    name: "t-mass's Grid",
    description: "Meme culture grid featuring Pepito themes, embedded tweets, NFT art, and dApp integrations like UniversalSwaps.",
    preview: "linear-gradient(135deg, #ff69b4 0%, #ff1493 50%, #c71585 100%)",
    category: "community",
    gridConfig: {
      columns: 3,
      rows: 3,
      gap: "12px",
    },
    featured: false,
    author: "t-mass",
    gridData: {
      rawValue: "0x00006f357c6a002058adc7380790706163e57037ad418e23c50c32552285e69ffb8be28645c33cef697066733a2f2f516d53363563374a62654d353643315434384b575370716b354d5a484c34556d4175516f6e7a6b546a5534454a6e"
    },
    profileAddress: "0xcEcD1798420A533c9627770e052f49aa127c3B3B"
  },
];

export const categories = [
  { id: "all", name: "All Templates", icon: "Grid3X3" },
  { id: "minimal", name: "Minimal", icon: "Minus" },
  { id: "creative", name: "Creative", icon: "Sparkles" },
  { id: "professional", name: "Professional", icon: "Briefcase" },
  { id: "gaming", name: "Gaming", icon: "Gamepad2" },
  { id: "social", name: "Social", icon: "Users" },
  { id: "community", name: "Community", icon: "Users" },
] as const;

export type Category = (typeof categories)[number]["id"];
