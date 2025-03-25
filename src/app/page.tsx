"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import Logo from "../../public/gencertiLogo.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { checkWalletConnection, connectWallet, listenForAccountChanges, listenForNetworkChanges } from "@/utils/walletConnection";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      const walletData = await connectWallet();
      if (walletData) {
        setAccount(walletData.account);
        setIsConnected(true);
      }
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const checkConnection = async () => {
    try {
      setIsCheckingConnection(true);
      const currentAccount = await checkWalletConnection();
      if (currentAccount) {
        setAccount(currentAccount);
        setIsConnected(true);
      } else {
        setIsConnected(false);
        setAccount(null);
      }
    } catch (error) {
      console.error("Connection check error:", error);
      setIsConnected(false);
      setAccount(null);
    } finally {
      setIsCheckingConnection(false);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      const account = await checkWalletConnection();
      setAccount(account);
      setIsConnected(!!account);
    };

    const handleAccountsChanged = (accounts: string[]) => {
      setAccount(accounts[0] || null);
      setIsConnected(!!accounts[0]);
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    checkConnection();
    const unsubscribeAccounts = listenForAccountChanges(handleAccountsChanged);
    const unsubscribeNetwork = listenForNetworkChanges(handleChainChanged);

    // Cleanup function
    return () => {
      if (typeof unsubscribeAccounts === 'function') unsubscribeAccounts();
      if (typeof unsubscribeNetwork === 'function') unsubscribeNetwork();
    };
  }, []);

  const handleNext = () => {
    if (user && isConnected) {
      router.push("/login");
    } else {
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen px-48 pb-0 py-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Block<span className="bg-lime-500 text-black">Verify</span></h1>
        <div className="flex items-center gap-4">
          {isCheckingConnection ? (
            <div className="text-sm text-gray-600">Checking connection...</div>
          ) : isConnected ? (
            <div className="text-sm text-gray-600">
              Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
            </div>
          ) : null}
          {user ? (
            <div className="flex items-center gap-2">
              <IoPersonCircleOutline /> {user?.displayName}
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <IoPersonCircleOutline />
              guest
            </div>
          )}
        </div>
      </div>
      <div className="py-36 pb-0 flex flex-col justify-center items-center">
        <h1 className="text-7xl font-bold text-center">
          The NextGen <span className="text-black bg-customGreen">Certificate</span>
          <br /> Creation Method
        </h1>
        <h1 className="text-center p-8 font-thin text-xl">
          Unlock a new era of trust with NextGen Certificates leveraging
          <span className="text-customGreen"> blockchain</span> for secure validation. <br />
          Instantly verify your achievements and success with confidence.
        </h1>
        <div className="flex gap-4">
          {!isConnected && !isConnecting && (
            <button 
              className="border-2 font-bold hover:scale-110 transition-transform delay-75 hover:border-white border-gray-500 px-8 py-2 hover:bg-customGreen hover:text-black hover:shadow-inner shadow-black"
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
          <button 
            className="border-2 font-bold hover:scale-110 transition-transform delay-75 hover:border-white border-gray-500 px-8 py-2 hover:bg-customGreen hover:text-black hover:shadow-inner shadow-black"
            onClick={handleNext}
          >
            Get Started
          </button>
        </div>
      </div>
    </main>
  );
}
