'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

type Event = {
    id: number;
    name: string;
    location: string;
    description: string;
    certificateTemplate: string | null;
    date: Date;
}

export default function EventRecord() {
    const [events, setEvents] = useState<Event[]>([
        { id: 1, name: "Web3 Workshop", date: new Date(2024, 10, 20) },
        { id: 2, name: "Solana Dev Meetup", date: new Date(2024, 11, 5) },
        { id: 3, name: "Blockchain Expo", date: new Date(2024, 11, 15) },
        { id: 4, name: "Full Stack Conference", date: new Date(2024, 11, 25) },
        { id: 5, name: "Hackathon: Code for Good", date: new Date(2025, 0, 10) },
        { id: 6, name: "AI & Machine Learning Summit", date: new Date(2025, 0, 20) },
        { id: 7, name: "Intro to Solidity Workshop", date: new Date(2025, 1, 3) },
        { id: 8, name: "JavaScript Community Gathering", date: new Date(2025, 1, 14) },
        { id: 9, name: "Frontend Masters Conference", date: new Date(2025, 2, 5) },
        { id: 10, name: "Data Science Bootcamp", date: new Date(2025, 2, 12) },
        { id: 11, name: "Next.js Developer Meetup", date: new Date(2025, 2, 20) },
        { id: 12, name: "React Native Workshop", date: new Date(2025, 3, 1) },
        { id: 13, name: "DevOps Conference", date: new Date(2025, 3, 10) },
        { id: 14, name: "Blockchain Innovations Summit", date: new Date(2025, 3, 15) },
        { id: 15, name: "Smart Contracts Deep Dive", date: new Date(2025, 4, 2) },
        { id: 16, name: "Node.js & Express Workshop", date: new Date(2025, 4, 10) },
        { id: 17, name: "Python for Data Science", date: new Date(2025, 4, 25) },
        { id: 18, name: "Tech for Social Good", date: new Date(2025, 5, 5) },
        { id: 19, name: "Ethereum Developer Conference", date: new Date(2025, 5, 15) },
        { id: 20, name: "CSS Mastery Workshop", date: new Date(2025, 5, 22) },
        { id: 21, name: "AI Ethics Roundtable", date: new Date(2025, 6, 8) },
        { id: 22, name: "Introduction to Web3", date: new Date(2025, 6, 20) },
        { id: 23, name: "UI/UX Design Conference", date: new Date(2025, 6, 29) },
        { id: 24, name: "Kubernetes Fundamentals", date: new Date(2025, 7, 3) },
        { id: 25, name: "JavaScript Advanced Patterns", date: new Date(2025, 7, 10) }
    ])
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [certificateTemplate, setCertificateTemplate] = useState<string | null>(null)
    const [date, setDate] = useState<Date | undefined>(undefined)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name && location && description && date) {
            const newEvent: Event = {
                id: Date.now(),
                name,
                location,
                description,
                certificateTemplate,
                date,
            }
            setEvents([...events, newEvent])
            setName('')
            setLocation('')
            setDescription('')
            setCertificateTemplate(null)
            setDate(undefined)
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 ml-64 max-h-screen">
            <div className=" shadow-lg rounded-lg w-[80%] md:w-1/2 ">
                <h2 className="text-xl font-semibold mb-4 text-white">Create New<span className='bg-customGreen text-black font-extrabold'>Event</span></h2>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-200">Event Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-200 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-200">Location</label>
                        <input
                            id="location"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-200">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="certificateTemplate" className="block text-sm font-medium text-gray-200">Certificate Template</label>
                        <input
                            id="certificateTemplate"
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    setCertificateTemplate(file.name)
                                } else {
                                    setCertificateTemplate(null)
                                }
                            }}
                            className="w-full p-3 border border-gray-300  rounded-md"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-200">Date</label>
                        <div className="relative">
                            <button
                                type="button"
                                className="w-full p-3 border border-gray-300 rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
                                {date ? format(date, 'PPP') : <span className="text-gray-400">Pick a date</span>}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full border border-white text-white p-3 rounded-md hover:bg-customGreen hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Create Event
                    </button>
                </form>
            </div>

            <div className="shadow-lg rounded-lg w-full md:w-1/2 p-6 overflow-y-scroll">
                <h2 className="text-2xl font-semibold mb-8">Your<span className='bg-customGreen text-black font-extrabold'>Events</span></h2>

                <ul className="space-y-4 h-80">
                    {events.map((event) => (
                        <li key={event.id} onClick={()=>{console.log(`Clicked ${event.name}`)}} className="flex font-medium justify-between items-center border-b pb-3 hover:scale-105 transition-transform delay-75 hover:bg-customGreen hover:text-black hover:font-extrabold cursor-pointer">
                            <span className="text-md ">{event.name}</span>
                            <span className="text-sm text-gray-500">{format(event.date, 'PPP')}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
