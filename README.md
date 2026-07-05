# 📦 Product Authentication DApp

A decentralized application (DApp) for registering and verifying product authenticity using Ethereum smart contracts.

## Features

- 🔐 Connect MetaMask wallet
- 📦 Register new products on the blockchain
- 🔍 Verify product authenticity
- 🚨 Report counterfeit products
- 📱 Generate QR Code for each product
- 🌐 QR verification page
- ⛓️ Display transaction hash, block number, and network information

## Tech Stack

### Frontend
- React
- Vite
- Ethers.js
- React QR Code

### Blockchain
- Solidity
- Hardhat
- Ethereum

## Smart Contract

The smart contract allows users to:

- Register products
- Retrieve product information
- Report fake products
- Store product authenticity on-chain

## Project Structure

```
product-auth-dapp/
│
├── backend/
│   ├── contracts/
│   ├── scripts/
│   ├── artifacts/
│   └── hardhat.config.js
│
└── frontend/
    ├── src/
    ├── abi/
    └── public/
```

## Getting Started

### Backend

```bash
cd backend
npm install
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Demo

Current demo includes:

- Wallet Connection
- Product Registration
- Product Verification
- Fake Product Reporting
- QR Code Verification
- Blockchain Transaction Details

## Future Improvements

- Deploy smart contract to Sepolia
- Deploy frontend to Vercel
- Product image upload (IPFS)
- Admin dashboard
- Event history
- Product ownership transfer

## Author

**Your Name**

Web Developer | Blockchain Enthusiast
