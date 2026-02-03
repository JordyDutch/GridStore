import type { GridTemplate } from "@/lib/types";

// Templates with on-chain grid data (rawValue or ipfsUrl)
export const gridTemplates: GridTemplate[] = [
    {
        id: "artist-showcase",
        name: "Artist Showcase",
        description:
            "For artists to showcase a signature piece and share their bio and creative statement.",
        preview: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)",
        category: "creative",
        gridConfig: {
            columns: 3,
            rows: 3,
            gap: "12px",
        },
        featured: true,
        author: "GridStore",
        gridData: {
            rawValue:
                "0x00006f357c6a0020ed1d0f7d3781c4b89ab7cd9fc8d70ba739209b52591049791e738c291c0d927a697066733a2f2f516d595745734346583236585a31524d72484d54384d705339665a6f75376b666a45754456617347784d634e7736",
        },
    },
    {
        id: "memetoken",
        name: "Meme Token",
        description:
            "Meme-style grid layout for token and crypto culture profiles.",
        preview:
            "linear-gradient(135deg, #ff6b35 0%, #f7c59f 50%, #2ec4b6 100%)",
        category: "creative",
        gridConfig: {
            columns: 3,
            rows: 3,
            gap: "12px",
        },
        featured: false,
        author: "GridStore",
        gridData: {
            rawValue:
                "0x00006f357c6a0020487a094d6a1f114cad1234a49782ee52ef37b0fef6fc19b45e0561b432d63b51697066733a2f2f516d6651354179475732743231314c394a3535686e7544546f7467724c506d4d4e6e524e73513966474665354765",
        },
    },
    {
        id: "car-brand",
        name: "Car Brand",
        description:
            "Sleek automotive-inspired grid layout for car and brand profiles.",
        preview:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        category: "professional",
        gridConfig: {
            columns: 3,
            rows: 3,
            gap: "16px",
        },
        featured: false,
        author: "GridStore",
        gridData: {
            rawValue:
                "0x00006f357c6a002067ad9338b8b01cb7d5556d01caa9e7a19e6cadad7bfa814554ad469ee4924298697066733a2f2f516d646e5844676d79474e46445367313869314c485a34655871466d66466d6a7554583765415878665775705236",
        },
    },
    {
        id: "staking-provider",
        name: "Staking Provider",
        description:
            "Grid layout for staking providers and validator profiles.",
        preview:
            "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
        category: "professional",
        gridConfig: {
            columns: 3,
            rows: 3,
            gap: "16px",
        },
        featured: true,
        author: "GridStore",
        gridData: {
            rawValue:
                "0x00006f357c6a0020b65690ac95c9ee801173e050c7a7043352215e5e26cf2e72feb41442811788ae697066733a2f2f516d59467a654d6e4e32393279636f687475645039693274396e4345693843464b37664276614b796f3756756276",
        },
    },
    {
        id: "photography-portfolio",
        name: "Photography Portfolio",
        description:
            "Grid layout for professional and enthusiast photographers.",
        preview:
            "linear-gradient(135deg, #1e3a5f 0%, #4a7c9b 50%, #7fb3d5 100%)",
        category: "professional",
        gridConfig: {
            columns: 3,
            rows: 3,
            gap: "16px",
        },
        featured: true,
        author: "GridStore",
        gridData: {
            rawValue:
                "0x00006f357c6a0020e43d83b08210437cc08943cc4fe7c62a08e276f7ceff4bd93f893f3df565a1b968747470733a2f2f6170692e756e6976657273616c70726f66696c652e636c6f75642f697066732f6261666b7265696562707475677a37666f7932713276776861786979726f746163716c376333636b7337756b777736337062793379626b76657275",
        },
    },
    {
        id: "founder-profile",
        name: "Founder Profile",
        description: "Grid layout for startup founders.",
        preview:
            "linear-gradient(135deg, #1e3a5f 0%, #4a7c9b 50%, #7fb3d5 100%)",
        category: "professional",
        gridConfig: {
            columns: 3,
            rows: 3,
            gap: "16px",
        },
        featured: true,
        author: "GridStore",
        gridData: {
            rawValue:
                "0x00006f357c6a00204534096dcb035c0531374b1288006808e4d30b3f9fdd097cfb353705990fad9368747470733a2f2f6170692e756e6976657273616c70726f66696c652e636c6f75642f697066732f6261666b726569647835767a796f6e64747865726f76756d367670646d35756574766435796c7571753561646465656d7377376532376a78786875",
        },
    },
    {
        id: "magazine",
        name: "Magazine",
        description:
            "Grid layout for paper and digital magazine to highlight articles, and content.",
        preview:
            "linear-gradient(135deg, #1e3a5f 0%, #4a7c9b 50%, #7fb3d5 100%)",
        category: "professional",
        gridConfig: {
            columns: 3,
            rows: 3,
            gap: "16px",
        },
        featured: true,
        author: "GridStore",
        gridData: {
            rawValue:
                "0x00006f357c6a00204c6b8af1c40466f58a24c5283a8892ee6f342b056d6215f92b8201cf653d0f7668747470733a2f2f6170692e756e6976657273616c70726f66696c652e636c6f75642f697066732f6261666b72656967797a71716f786c6a6d6f66377a7a753369746a71346274726d796233687964366c343469766333646c3779747a626f6f327779",
        },
    },
    {
        id: "event-conference",
        name: "Event & Conference",
        description: "Grid layout to promote events and conferences.",
        preview:
            "linear-gradient(135deg, #1e3a5f 0%, #4a7c9b 50%, #7fb3d5 100%)",
        category: "professional",
        gridConfig: {
            columns: 3,
            rows: 3,
            gap: "16px",
        },
        featured: true,
        author: "GridStore",
        gridData: {
            rawValue:
                "0x00006f357c6a0020aa0959d907b8fef5d1cc91838def8b8608e157b08b84277c7ff6390d30db5f6c68747470733a2f2f6170692e756e6976657273616c70726f66696c652e636c6f75642f697066732f6261666b726569676e6b346a78716c6665766333646c6b77653470766f6d763666326562736834797173617837346f78713336706f3435626d356d",
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
    { id: "community", name: "Community", icon: "Users" },
] as const;

export type Category = (typeof categories)[number]["id"];
