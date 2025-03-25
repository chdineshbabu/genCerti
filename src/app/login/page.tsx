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
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    const walletData = await connectWallet();
    if (walletData) {
      setAccount(walletData.account);
      setIsConnected(true);
      console.log(account);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      const account = await checkWalletConnection();
      if (account) {
        setAccount(account);
        setIsConnected(true);
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    if (user && account) {
      router.push('/dash');
    }
  }, [user, router, account]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col items-center justify-center">
        <Image src={Logo} alt="Logo" width={200} height={200} />
        <h1 className="text-5xl font-thin mb-6">Welcome to <span className="text-customGreen">GenCerti</span></h1>
        <button
          onClick={signInWithGooglePopup}
          className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-customGreen hover:text-black transition-all"
        >
          <FcGoogle className="text-2xl" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </main>
  );
}
