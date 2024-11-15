import { ethers } from "ethers";

export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask is not installed. Please install it to use this app.");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();

    return {
      account,
      provider,
      network,
    };
  } catch (error) {
    console.error("User rejected request or something went wrong:", error);
    return null;
  }
}

export async function checkWalletConnection() {
  if (!window.ethereum) {
    alert("MetaMask is not installed. Please install it to use this app.");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error("Error checking wallet connection:", error);
    return null;
  }
}

export function listenForAccountChanges(callback) {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", callback);
  }
}

export function listenForNetworkChanges(callback) {
  if (window.ethereum) {
    window.ethereum.on("chainChanged", callback);
  }
}
