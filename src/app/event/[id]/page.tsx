"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";
import { generateRandom } from "@/utils/randomId";

interface Participant {
  pId: string;
  pName: string;
  pEmail: string;
  phone: string;
}

type Event = {
  eventId: string | undefined;
  eventName: string;
  location: string;
  description: string;
  certificateTemplate: string | null;
  date: Date | undefined;
  isIssued: boolean;
};

export default function Page() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);

  // const addParticipant = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (name && email && phone) {
  //     const newParticipant: Participant = {
  //       pId: generateRandom(),
  //       pName: name,
  //       pEmail: email,
  //       phone,
  //     };
  //     setParticipants([...participants, newParticipant]);
  //     setName("");
  //     setEmail("");
  //     setPhone("");
  //   }
  // };

  const getEvent = async () => {
    if (!id) return;
    try {
      const response = await axios.get(`/api/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const getParticipants = async () => {
    if (!id) return;
    try {
      const response = await axios.get(`/api/participants?eventId=${id}`);
      setParticipants(response.data.participants || []);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && phone) {
      try {
        await axios.post("/api/participants", {
          pId: generateRandom(),
          pName: name,
          pEmail: email,
          phone,
          eventId: id,
        });
        alert("Participant added successfully");
        setName("");
        setEmail("");
        setPhone("");
        getParticipants();
      } catch (error) {
        console.error("Error adding participant:", error);
      }
    }
  };

  const deleteParticipant = async (participantId: string) => {
    try {
      await axios.delete("/api/participants", {
        data: { participantId },
      });
      alert("Participant deleted successfully");
      getParticipants();
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  };

  const issueCertificates = async () => {
    if (!id) return;
    try {
      await axios.post("/api/certificates", { eventId: id });
      alert("Certificates issued successfully");
      getEvent();
      getParticipants();
    } catch (error) {
      console.error("Error issuing certificates:", error);
    }
  };

  useEffect(() => {
    getEvent();
    getParticipants();
  }, [id]);

  return (
    <div className="p-4 m-8 flex flex-col gap-6">
      {/* Event Details */}
      <div className="shadow-md border rounded-md p-6">
        <h2 className="text-xl font-bold">{event?.eventName}</h2>
        <p className="text-gray-600 mt-2">{event?.description}</p>
        <div className="mt-4 space-y-1">
          <p>
            <strong>Date:</strong> {event?.date?.toString()}
          </p>
          <div className="flex justify-between">
            <p>
              <strong>Location:</strong> {event?.location}
            </p>
            <div className="flex text-lg">
              Status:{" "}
              {event?.isIssued ? (
                <p className="font-semibold text-customGreen">Already Issued</p>
              ) : (
                <p className="font-semibold text-gray-300">Not Issued</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Add Participant */}
        {!event?.isIssued && (
          <div className="shadow-md border rounded-md p-6 w-full md:w-1/2">
            <h3 className="text-lg font-bold mb-4">Add Participant</h3>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300"
                >
                  Phone No.
                </label>
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add Participant
              </button>
            </form>
          </div>
        )}

        {/* Participants */}
        <div className={`shadow-md border rounded-md p-6  ${!event?.isIssued ? "max-h-96 w-full md:w-1/2 overflow-y-scroll":"min-h-fit min-w-full px-32"}`}>
          <h3 className="text-lg font-bold mb-4 text-customGreen">Participants</h3>
          {participants.length === 0 ? (
            <p className="text-gray-600">No participants yet.</p>
          ) : (
            <ul className="space-y-4">
              {participants.map((participant) => (
                <li
                  key={participant.pId}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span>
                    {participant.pName} ({participant.pEmail},{" "}
                    {participant.phone})
                  </span>
                  {!event?.isIssued && (
                    <button
                      className="text-red-600 hover:text-red-800 focus:outline-none"
                      onClick={() => deleteParticipant(participant.pId)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Issue Certificates */}
      {!event?.isIssued && (
        <button
          onClick={issueCertificates}
          disabled={participants.length === 0}
          className={`py-2 w-full px-4 rounded-md ${
            participants.length === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          }`}
        >
          Issue Certificates
        </button>
      )}
    </div>
  );
}
