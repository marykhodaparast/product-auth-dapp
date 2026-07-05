import { BrowserProvider, Contract } from "ethers";
import abi from "../abi/ProductRegistry.json";
import { CONTRACT_ADDRESS } from "../config/contract";

export async function getContract() {
  const provider = new BrowserProvider(window.ethereum);

  const network = await provider.getNetwork();
  console.log("Chain:", network.chainId);

  const signer = await provider.getSigner();
  console.log("Signer:", await signer.getAddress());

  const contract = new Contract(CONTRACT_ADDRESS, abi.abi, signer);

  console.log("Contract:", contract.target);

  return contract;
}
