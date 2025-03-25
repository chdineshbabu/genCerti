import { ethers } from "ethers";

interface WalletData {
  account: string;
  provider: ethers.providers.Web3Provider;
  network: ethers.providers.Network;
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
      on: (event: string, callback: (args: any) => void) => void;
      removeListener: (event: string, callback: (args: any) => void) => void;
      isMetaMask?: boolean;
      isConnected?: () => boolean;
    };
  }
}

// Helper function to check if MetaMask is installed
const isMetaMaskInstalled = (): boolean => {
  if (typeof window !== 'undefined') {
    return Boolean(window.ethereum && window.ethereum.isMetaMask);
  }
  return false;
};

// Helper function to wait for MetaMask to be ready
const waitForMetaMask = async (): Promise<boolean> => {
  if (!window.ethereum) {
    return false;
  }

  try {
    // Check if MetaMask is already ready
    if (window.ethereum.isConnected?.()) {
      return true;
    }

    // Wait for MetaMask to be ready
    await new Promise((resolve) => {
      const checkConnection = () => {
        if (window.ethereum?.isConnected?.()) {
          resolve(true);
        } else {
          setTimeout(checkConnection, 100);
        }
      };
      checkConnection();
    });
    return true;
  } catch (error) {
    console.error("Error waiting for MetaMask:", error);
    return false;
  }
};

export async function connectWallet(): Promise<WalletData | null> {
  if (!isMetaMaskInstalled()) {
    alert("MetaMask is not installed. Please install it to use this app.");
    return null;
  }

  try {
    // Wait for MetaMask to be ready
    const isReady = await waitForMetaMask();
    if (!isReady) {
      throw new Error("MetaMask is not ready. Please try again.");
    }

    // Request account access
    const accounts = await window.ethereum?.request({ method: "eth_requestAccounts" });
    if (!accounts || accounts.length === 0) {
      throw new Error("No accounts found");
    }
    const account = accounts[0];

    // Create provider and get network
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const network = await provider.getNetwork();

    return {
      account,
      provider,
      network,
    };
  } catch (error) {
    console.error("Error connecting wallet:", error);
    if (error instanceof Error) {
      alert(`Failed to connect wallet: ${error.message}`);
    }
    return null;
  }
}

export async function checkWalletConnection(): Promise<string | null> {
  if (!isMetaMaskInstalled()) {
    return null;
  }

  try {
    // Wait for MetaMask to be ready
    const isReady = await waitForMetaMask();
    if (!isReady) {
      return null;
    }

    const accounts = await window.ethereum?.request({ method: "eth_accounts" });
    return accounts && accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error("Error checking wallet connection:", error);
    return null;
  }
}

export function listenForAccountChanges(callback: (accounts: string[]) => void): () => void {
  if (!window.ethereum) {
    return () => {};
  }

  const handleAccountsChanged = (accounts: string[]) => {
    callback(accounts);
  };

  window.ethereum.on("accountsChanged", handleAccountsChanged);

  // Return cleanup function
  return () => {
    window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
  };
}

export function listenForNetworkChanges(callback: (chainId: string) => void): () => void {
  if (!window.ethereum) {
    return () => {};
  }

  const handleChainChanged = (chainId: string) => {
    callback(chainId);
  };

  window.ethereum.on("chainChanged", handleChainChanged);

  // Return cleanup function
  return () => {
    window.ethereum?.removeListener("chainChanged", handleChainChanged);
  };
} 