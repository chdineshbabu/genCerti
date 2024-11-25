"use client";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { auth, signInWithGooglePopup } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import Logo from "../../../public/gencertiLogo.png";
import Image from "next/image";
import {
  checkWalletConnection,
  connectWallet,
  listenForAccountChanges,
} from "@/utils/walletConnection";

export default function Login() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const connect = async () => {
    const walletData = await connectWallet();
    if (walletData) {
      setAccount(walletData.account);
      setIsConnected(true);
      console.log(account);
    }
  };
  const checkConnection = async () => {
    const account = await checkWalletConnection();
    if (account) {
      setAccount(account);
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkConnection();
    listenForAccountChanges((accounts: any) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });
  }, []);

  useEffect(() => {
    if (user && account) {
      router.push("/setup");
    }
  }, [user, router, account]);

  return (
    <div className="min-h-screen">
      <div className="h-20 bg-gray-950 border-b-2 flex items-center justify-center">
        {" "}
        <Image src={Logo} alt="Logo" width={150} height={150} />{" "}
      </div>
      <div className="flex py-48 items-center gap-6 flex-col text-center">
        <h1 className="text-4xl font-bold">
          Let&apos;s try our{" "}
          <span className="bg-customGreen text-black">service</span> now!
        </h1>
        <p className="font-thin text-xl">
          Everything you need to manage certificates for an event to <br />
          grow your community anywhere on the planet.
        </p>
        {user && !account ? (
          <h1 className="text-3xl font-bold">
            Click Here to 👉
            <button
              onClick={connect}
              className="bg-white text-black hover:scale-110 transition-transform delay-75  hover:bg-customGreen px-2"
            >
              Connect Wallet
            </button>
            <br />
            Start using{" "}
          </h1>
        ) : (
          <h1 className="text-3xl font-bold">
            Click Here to 👉
            <button
              onClick={signInWithGooglePopup}
              className="bg-white text-black hover:scale-110 transition-transform delay-75  hover:bg-customGreen px-2"
            >
              Login{" "}
            </button>
            <br /> and{" "}
            <button
              onClick={connect}
              className="bg-white text-black hover:scale-110 transition-transform delay-75  hover:bg-customGreen px-2"
            >
              Connect Wallet
            </button>
            <br />
            Start using{" "}
          </h1>
        )}
      </div>
    </div>
  );
}
