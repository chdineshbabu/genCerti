'use client';

import { useState } from 'react';
import { format } from 'date-fns';

type Event = {
    id: number;
    name: string;
    location: string;
    date: Date;
    certificates: Certificate[];
};

type Certificate = {
    id: number;
    participantName: string;
    date: Date;
    location: string;
};

const sampleEvents: Event[] = [
    {
        id: 1,
        name: "Web Development Workshop",
        location: "Tech Hub, New York",
        date: new Date(2023, 5, 15),
        certificates: [
            { id: 101, participantName: "John Doe", date: new Date(2023, 5, 15), location: "Tech Hub, New York" },
            { id: 102, participantName: "Jane Smith", date: new Date(2023, 5, 15), location: "Tech Hub, New York" },
        ],
    },
    {
        id: 2,
        name: "AI Conference",
        location: "Innovation Center, San Francisco",
        date: new Date(2023, 7, 22),
        certificates: [
            { id: 101, participantName: "John Doe", date: new Date(2023, 5, 15), location: "Tech Hub, New York" },
            { id: 102, participantName: "Jane Smith", date: new Date(2023, 5, 15), location: "Tech Hub, New York" },
            { id: 201, participantName: "Alice Johnson", date: new Date(2023, 7, 22), location: "Innovation Center, San Francisco" },
            { id: 202, participantName: "Bob Williams", date: new Date(2023, 7, 22), location: "Innovation Center, San Francisco" },
            { id: 203, participantName: "Carol Brown", date: new Date(2023, 7, 22), location: "Innovation Center, San Francisco" },
            { id: 101, participantName: "John Doe", date: new Date(2023, 5, 15), location: "Tech Hub, New York" },
            { id: 102, participantName: "Jane Smith", date: new Date(2023, 5, 15), location: "Tech Hub, New York" },
            { id: 201, participantName: "Alice Johnson", date: new Date(2023, 7, 22), location: "Innovation Center, San Francisco" },
            { id: 202, participantName: "Bob Williams", date: new Date(2023, 7, 22), location: "Innovation Center, San Francisco" },
            { id: 203, participantName: "Carol Brown", date: new Date(2023, 7, 22), location: "Innovation Center, San Francisco" },
        ],
    },
];

export default function CertificateRecord() {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    return (
        <div className="space-y-4 ml-64">
            <div className="border  border-gray-200 rounded-lg shadow-md p-4">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Event<span className='bg-customGreen text-black font-extrabold'>Certi</span> Manager</h2>
                </div>
                <div className="relative ">
                    <select
                        className="w-full border rounded-lg p-2 bg-black text-gray-200"
                        onChange={(e) => setSelectedEvent(sampleEvents.find(event => event.id.toString() === e.target.value) || null)}
                    >
                        <option value="" >Select an event</option>
                        {sampleEvents.map((event) => (
                            <option  key={event.id} value={event.id.toString()}>
                                {event.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {selectedEvent && (
                <div className="border border-gray-200 rounded-lg shadow-md p-4 pb-0">
                    <div className="mb-2">
                        <h2 className="text-xl font-semibold">{selectedEvent.name} Certificates</h2>
                        <p className="text-gray-500">
                            Event Date: {format(selectedEvent.date, "PPP")} | Location: {selectedEvent.location}
                        </p>
                    </div>
                    <div className="overflow-y-scroll max-h-96">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="border p-2 text-left text-gray-200">Participant Name</th>
                                    <th className="border p-2 text-left text-gray-200">Date</th>
                                    <th className="border p-2 text-left text-gray-200">Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedEvent.certificates.map((certificate) => (
                                    <tr key={certificate.id} onClick={()=>{console.log(certificate.participantName)}} className="hover:bg-customGreen text-gray-200 hover:text-black cursor-pointer">
                                        <td className="border p-2">{certificate.participantName}</td>
                                        <td className="border p-2">{format(certificate.date, "PPP")}</td>
                                        <td className="border p-2">{certificate.location}</td>
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
