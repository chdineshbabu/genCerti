'use client'

import DashBody from '@/components/DashBody';
import DashNav from '@/components/DashNav';

export default function Dashboard(){

    return(
        <main className='min-h-screen'>
            <DashNav />
            <DashBody />
        </main>
    )
}
