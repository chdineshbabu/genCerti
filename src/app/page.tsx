"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import Logo from "../../public/gencertiLogo.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { checkWalletConnection, connectWallet, listenForAccountChanges } from "@/utils/walletConnection";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [account, setAccount] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const connect = async () => {
    const walletData = await connectWallet();
    if (walletData) {
        setAccount(walletData.account);
        setIsConnected(true);
        console.log(account);
    }
}
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
  function next() {
    if (user && account) {
      router.push("/login");
    } else {
      router.push("/login");
    }
  }

  return (
    <main className="min-h-screen px-48 pb-0 py-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Block<span className="bg-lime-500 text-black">Verify</span></h1>
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
      <div className="py-36 pb-0 flex flex-col justify-center items-center">
        <h1 className="text-7xl font-bold text-center">
          The NextGen <span className="text-black  bg-customGreen">Certificate</span>
          <br /> Creation Method
        </h1>
        <h1 className="text-center p-8 font-thin text-xl">
          Unlock a new era of trust with NextGen Certificates leveraging
          <span className="text-customGreen"> blockchain</span> for secure validation. <br />
          Instantly verify your achievements and success with confidence.
        </h1>
        <button className="border-2 font-bold hover:scale-110 transition-transform delay-75 hover:border-white border-gray-500 px-8 py-2 hover:bg-customGreen hover:text-black hover:shadow-inner shadow-black" onClick={next}>
          Get Start
        </button>{" "}
      </div>
      <div></div>
    </main>
  );
}
