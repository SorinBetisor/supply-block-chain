# Blockchain Supply Chain Demo

A demonstration of blockchain technology applied to supply chain management. This interactive demo showcases how products can be tracked through their entire journey from origin to destination using cryptographic verification and tamper-proof blockchain records.

## Features

- **Custom Blockchain Creation**: Build your own supply chain blockchain by adding blocks step-by-step
- **Zara Demo**: Explore a complete real-world example tracking a Zara sweatshirt from cotton farm to retail store
- **Cryptographic Verification**: Each block is linked to the previous one through SHA-256 hashing
- **Supply Chain Data Tracking**: Record detailed information including:
  - Company and location data
  - Product details and batch IDs
  - Transportation information
  - Certifications and compliance documents
  - Legal documentation with file hashing
- **Visual Blockchain Display**: See the complete chain with visual connectors showing the relationship between blocks
- **Tamper Detection**: Blockchain integrity ensures any modifications are immediately detectable

## Tech Stack

- **SvelteKit** - Modern web framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Styling
- **Web Crypto API** - Cryptographic hashing (SHA-256)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, pnpm, or yarn

### Installation

```sh
cd demo-app
npm install
```

### Development

Start the development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

The app will be available at `http://localhost:5173`

### Building

To create a production version:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Deployment

This project is ready to deploy to Vercel. Simply connect your repository and deploy!

## How It Works

1. **Genesis Block**: Start by creating the first block in the chain
2. **Add Blocks**: Each new block contains supply chain step data and is cryptographically linked to the previous block
3. **Verification**: The blockchain maintains integrity through hash-based linking - any tampering breaks the chain
4. **Visualization**: See the complete supply chain journey with all blocks connected

## Demo Pages

- **Custom Blockchain**: Create your own supply chain from scratch
- **Zara Demo**: Explore a pre-built example following a Zara sweatshirt through 7 supply chain steps

## License

This is a demonstration project for educational purposes.
