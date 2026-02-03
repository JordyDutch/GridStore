# GridStore

A marketplace for Universal Profile grid templates built on LUKSO. Browse, preview, and apply beautiful grid templates to your Universal Profile with a single transaction.

## Features

- **RainbowKit Integration**: Connect your Universal Profile using RainbowKit wallet connector
- **Template Marketplace**: Browse curated grid templates with categories and search
- **One-Click Apply**: Apply templates directly to your UP via `setData` transaction
- **On-Chain Storage**: Templates are stored using ERC725Y data keys on your Universal Profile
- **LUKSO Native**: Built specifically for the LUKSO blockchain and Universal Profiles

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **RainbowKit** - Wallet connection UI
- **Wagmi v2** - React hooks for Ethereum
- **Viem** - TypeScript Ethereum library
- **ERC725.js** - LUKSO's library for reading/writing UP data
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+
- A LUKSO Universal Profile (create one at [universaleverything.io](https://universaleverything.io))
- UP Browser Extension installed ([download here](https://docs.lukso.tech/install-up-browser-extension))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/gridstore.git
cd gridstore
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env.local
```

4. Add your WalletConnect Project ID to `.env.local`:

```
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

Get a free Project ID at [WalletConnect Cloud](https://cloud.walletconnect.com).

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Connecting Your Universal Profile

GridStore uses RainbowKit with LUKSO chain configuration. When you click "Connect Universal Profile", it will prompt the UP Browser Extension to connect.

### Applying Templates

When you select a template and click "Apply to Profile", GridStore:

1. Encodes the template ID using ERC725.js with a custom `GridLayout` data key
2. Calls `setData` on your Universal Profile smart contract
3. Stores the template reference on-chain in your profile's ERC725Y storage

### Data Key Structure

GridStore uses LSP2-compliant data keys:

```typescript
// GridLayout - stores the template ID
{
  name: "GridLayout",
  key: "0x7b4d25d0e02b97c57f6a77e7b5d7d3a3d7e5a7b9d1f3e5c7a9b1d3e5f7a9b1c3",
  keyType: "Singleton",
  valueType: "string",
  valueContent: "String"
}
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/gridstore)

## Project Structure

```
gridstore/
├── app/
│   ├── globals.css       # Global styles with Tailwind
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Home page
│   └── providers.tsx     # RainbowKit + Wagmi providers
├── components/
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Landing hero section
│   ├── Footer.tsx        # Site footer
│   ├── CategoryFilter.tsx # Template category tabs
│   ├── TemplateCard.tsx  # Template preview card
│   ├── TemplateGrid.tsx  # Templates grid layout
│   └── TemplateModal.tsx # Template detail modal
├── lib/
│   ├── erc725.ts         # ERC725.js utilities
│   ├── templates.ts      # Template data and types
│   └── wagmi.ts          # Wagmi + LUKSO config
└── public/               # Static assets
```

## LUKSO Resources

- [LUKSO Documentation](https://docs.lukso.tech)
- [Universal Profile Browser Extension](https://docs.lukso.tech/install-up-browser-extension)
- [ERC725.js Documentation](https://docs.lukso.tech/tools/dapps/erc725js/getting-started)
- [LSP2 - ERC725Y JSON Schema](https://docs.lukso.tech/standards/generic-standards/lsp2-json-schema)
- [Universal Everything](https://universaleverything.io)

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT
