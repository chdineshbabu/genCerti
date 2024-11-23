'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/config/firebase'
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker'
import { generateRandom } from '@/utils/randomId'
import { useRouter } from "next/navigation";

type Event = {
    eventId: string;
    eventName: string;
    location: string;
    description: string;
    certificateTemplate: string | null;
    date: Date;
}

export default function EventRecord() {

    const [user] = useAuthState(auth);
    const [events, setEvents] = useState<Event[]>([])
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [certificateTemplate, setCertificateTemplate] = useState<string | null>(null)
    const [date, setDate] = useState<Date | null>(null);
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (name && location && description && date) {
            await axios.post('/api/events', {
                eventId: generateRandom(),
                eventName: name,
                location: location,
                orginizationId: 122,
                description: description,
                certificateTemplate: certificateTemplate,
                date: date,
            }).then(() => {
                alert("Event Created successfully");
                setName('');
                setLocation('');
                setDescription('');
                setCertificateTemplate(null);
                setDate(null);
                getEvents();
            }).catch((error) => {
                console.error('Error creating event:', error);
                alert('Failed to create the event.');
            });
        }
    };

    async function getEvents() {
        await axios.get('/api/events?orgId=122')
            .then((response) => {
                setEvents(response.data);
            }).catch((error) => {
                console.error('Error fetching events:', error);
            });
    }

    useEffect(() => {
        getEvents();
    }, [user]);

    return (
        <div className="flex flex-col md:flex-row gap-8 ml-64 max-h-screen">
            <div className="shadow-lg rounded-lg w-[80%] md:w-1/2">
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
                        <label htmlFor="certificateTemplate" className="block text-sm font-medium text-gray-200">Certificate Template URL</label>
                        <input
                            id="certificateTemplate"
                            type="url"
                            value={certificateTemplate || ''}
                            onChange={(e) => setCertificateTemplate(e.target.value)}
                            placeholder="Enter URL for the certificate template"
                            className="w-full p-3 border border-gray-300 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-200">Date</label>
                        <div className="relative">
                            <DatePicker
                                selected={date}
                                onChange={(selectedDate) => setDate(selectedDate)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholderText="Pick a date"
                                dateFormat="PPP"
                                customInput={
                                    <button
                                        type="button"
                                        className="w-full p-3 border border-gray-300 rounded-md flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
                                        {date ? format(date, "PPP") : <span className="text-gray-400">Pick a date</span>}
                                    </button>
                                }
                            />
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
                        <li key={event.eventId} onClick={() => { router.push(`event/${event.eventId}`); }} className="flex font-medium justify-between items-center border-b pb-3 hover:scale-105 transition-transform delay-75 hover:bg-customGreen hover:text-black hover:font-extrabold cursor-pointer">
                            <span className="text-md ">{event.eventName}</span>
                            <span className="text-sm text-gray-500">{format(event.date, 'PPP')}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
