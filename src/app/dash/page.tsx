"use client";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { checkWalletConnection } from "@/utils/walletConnection";
import Dashboard from "@/components/Dashboard";

export default function Page() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const account = await checkWalletConnection();
      if (account) {
        setAccount(account);
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    };

    checkConnection();
  }, []);

  if (!user) {
    router.push("/login");
    return null;
  }

  return <Dashboard />;
}
