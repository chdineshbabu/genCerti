'use client'

import DashBody from '@/components/DashBody';
import DashNav from '@/components/DashNav';
import { auth } from '@/config/firebase';
import { checkWalletConnection, connectWallet, listenForAccountChanges } from '@/utils/walletConnection';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Dashboard() {
    const router = useRouter()
    const [user] = useAuthState(auth);

    const [account, setAccount] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    useEffect(()=>{

    },[])
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
            router.push('/dash');
        }
    }, [user, router, account]);

    return (
        <main className='min-h-screen'>
            <DashNav />
            <DashBody />
        </main>
    )
}
