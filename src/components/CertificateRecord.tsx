'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

type Event = {
    _id: string | undefined;
    eventId: string;
    eventName: string;
    location: string;
    description: string;
    certificateTemplate: string | null;
    date: string;
    certificates: Certificate[];
};

type Certificate = {
    id: number;
    pName: string;
    createdAt: string;
    location: string;
    pId:string;
    certificateUrl:string;
};

export default function CertificateRecord() {
    const { id } = useParams();
    const [participants, setParticipants] = useState<Certificate[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const router = useRouter();

    // Fetch events
    const getEvents = async () => {
        try {
            const response = await axios.get('/api/events?orgId=122');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    // Fetch certificates for the selected event
    const getCertificates = async (eventId: string) => {
        try {
            const response = await axios.get(`/api/certificates?id=${eventId}`);
            setParticipants(response.data || []);
        } catch (err) {
            console.error('Error fetching certificates:', err);
        }
    };

    // Fetch events on component mount
    useEffect(() => {
        getEvents();
    }, []);

    // Handle event selection
    const handleEventChange = (eventId: string) => {
        const event = events.find((e) => e.eventId === eventId) || null;
        setSelectedEvent(event);

        if (event && event._id) {
            getCertificates(event._id); // Use the `_id` for querying certificates
        } else {
            setParticipants([]); // Clear participants if no event is selected
        }
    };
    console.log(participants)

    return (
        <div className="space-y-4 ml-64">
            {/* Event Selector */}
            <div className="border border-gray-200 rounded-lg shadow-md p-4">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">
                        Event<span className="bg-customGreen text-black font-extrabold">Certi</span> Manager
                    </h2>
                </div>
                <div className="relative">
                    <select
                        className="w-full border rounded-lg p-2 bg-black text-gray-200"
                        onChange={(e) => handleEventChange(e.target.value)}
                    >
                        <option value="">Select an event</option>
                        {events.map((event) => (
                            <option key={event.eventId} value={event.eventId}>
                                {event.eventName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Certificates Display */}
            {selectedEvent && (
                <div className="border border-gray-200 rounded-lg shadow-md p-4 pb-0">
                    <div className="mb-2">
                        <h2 className="text-xl font-semibold">{selectedEvent.eventName} Certificates</h2>
                        <p className="text-gray-500">
                            Event Date: {new Date(selectedEvent.date).toLocaleDateString()} | Location: {selectedEvent.location}
                        </p>
                    </div>
                    <div className="overflow-y-scroll max-h-96">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="border p-2 text-left text-gray-200">Participant Name</th>
                                    <th className="border p-2 text-left text-gray-200">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {participants.map((certificate) => (
                                    <tr
                                        key={certificate.id}
                                        onClick={() => router.push(`/certificate/${certificate.certificateUrl}`)} // Redirect on row click
                                        className="hover:bg-customGreen text-gray-200 hover:text-black cursor-pointer"
                                    >
                                        <td className="border p-2">{certificate.pId.pName}</td>
                                        <td className="border p-2">
                                            {new Date(certificate.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
