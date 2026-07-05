import { useState } from "react";
import { BrowserProvider } from "ethers";

export default function useWallet() {
  const [account, setAccount] = useState("");

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);

    const accounts = await provider.send("eth_requestAccounts", []);

    setAccount(accounts[0]);

    return {
      provider,
      account: accounts[0],
    };
  }

  return {
    account,
    connectWallet,
  };
}
