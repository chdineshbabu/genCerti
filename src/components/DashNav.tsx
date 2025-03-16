import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/gencertiLogo.png';
import { connectWallet, listenForAccountChanges, checkWalletConnection } from '../utils/walletConnection'

export default function DashNav() {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    const [isOpen, setIsOpen] = useState(false);
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        if (!user && !loading) {
            router.push('/');
        }
    }, [user, loading, router]);

    function handleSignOut() {
        signOut(auth).then(() => {
            router.push('/');
        });
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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
    const trimAddress = (address:any) => `${address.slice(0, 6)}...${address.slice(-4)}`;

    return (
        <div className="border-b-2 min-h-20 flex justify-between items-center px-36">
            <h1 className="text-3xl font-bold">Block<span className="bg-lime-500 text-black">Verify</span></h1>
            <div className='flex gap-6 items-center'>
                {isConnected ? (
                    <p className=''>{trimAddress(account)}</p>
                ) : (
                    <button onClick={connect} className='px-4 py-2 rounded-full hover:text-black border hover:bg-customGreen'>Connect Wallet</button>

                )}
                <div className="relative">
                    <button
                        id="dropdownAvatarNameButton"
                        onClick={toggleDropdown}
                        className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
                        type="button"
                    >
                        <span className="sr-only">Open user menu</span>

                        {user?.displayName}
                        <svg
                            className="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>

                    {isOpen && (
                        <div
                            id="dropdownAvatarName"
                            className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 border rounded-lg shadow w-44 dark:bg-black   dark:divide-gray-600"
                        >
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div className="truncate">{user?.email}</div>
                            </div>
                            <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownAvatarNameButton"
                            >
                                <li>
                                    <a
                                        href="/settings"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/profile"
                                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        Profile
                                    </a>
                                </li>
                            </ul>
                            <div className="py-2">
                                <a
                                    href="#"
                                    onClick={handleSignOut}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Sign out
                                </a>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
