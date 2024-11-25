import { auth } from '@/config/firebase';
import { ArrowRight, Award, CheckCircle, Download, FileText, Users } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {  checkWalletConnection } from '../utils/walletConnection'

export default function Dashboard() {
  
  const [user, loading] = useAuthState(auth);
  const [account, setAccount] = useState(null);

  const checkConnection = async () => {
    const account = await checkWalletConnection();
    if (account) {
        setAccount(account);
    } else {
      console.log("Wallet not connected")
    }
};
useEffect(() => {
  checkConnection();
}, []);

  return (
    <div className="flex flex-col items-center justify-center my-16  p-4 text-center ml-32">
      <Award className="w-16 h-16 mb-4 text-blue-600 dark:text-blue-400" />
      <h1 className="text-4xl font-light tracking-tight sm:text-5xl mb-4">
        Welcome, <span className='font-thin text-customGreen'>{user?.displayName}</span>
       </h1>
       <p className='font-thin'>{account}</p>
       
      <p className="max-w-[600px] font-light text-lg mt-2 text-gray-600 dark:text-gray-300 mb-8">
        Secure, verifiable, and immutable certificates powered by blockchain technology.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 w-full max-w-3xl">
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <FileText className="w-8 h-8 mb-2 text-blue-500" />
          <h3 className="text-lg  font-light mb-1">Create Event</h3>
          <p className="text-sm text-gray-600 font-light dark:text-gray-400">Set up event details</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <Users className="w-8 h-8 mb-2 text-blue-500" />
          <h3 className="text-lg font-light mb-1">Add Participants</h3>
          <p className="text-sm text-gray-600 font-light dark:text-gray-400">Enter participant info</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <CheckCircle className="w-8 h-8 mb-2 text-blue-500" />
          <h3 className="text-lg font-light mb-1">Issue & Validate</h3>
          <p className="text-sm text-gray-600 font-light dark:text-gray-400">Generate & verify certificates</p>
        </div>
      </div>
    </div>
  )
}

