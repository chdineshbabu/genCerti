'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import DashNav from './DashNav'
import DashBody from './DashBody'

export default function DashboardLayout() {
    const [user, loading] = useAuthState(auth)
    const router = useRouter()

    useEffect(() => {
        if (!user && !loading) {
            router.push('/')
        }
    }, [user, loading, router])

    if (loading) return null

    return (
        <div className='min-h-screen bg-black text-white'>
            <DashNav />
            <DashBody />
        </div>
    )
} 