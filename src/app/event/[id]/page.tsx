"use client";
import { useEffect, useState, useCallback } from "react";
import { Trash2, MoveLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { generateRandom } from "@/utils/randomId";
import { addCertificate } from "@/app/api/contract/deploy";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";

interface Participant {
  pId: string;
  pName: string;
  pEmail: string;
  phone: string;
}

type Event = {
  _id:string;
  eventId: string | undefined;
  eventName: string;
  location: string;
  description: string;
  certificateTemplate: string | null;
  date: Date | undefined;
  isIssued: boolean;
};

export default function Page() {
  const [user] = useAuthState(auth);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const router = useRouter();
  const [hashes, setHashes] = useState([])
  const [contractAddress,setContractAddress] = useState(null)

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [eventResponse, participantsResponse] = await Promise.all([
        axios.get(`/api/events/${id}`),
        axios.get(`/api/participants?eventId=${id}`),
      ]);
      setEvent(eventResponse.data);
      setParticipants(participantsResponse.data.participants || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const checkOrganizationExists = useCallback(async () => {
    if (user) {
      try {
        const response = await axios.get(`/api/orginization?orgId=${user.uid}`);
        setContractAddress(response.data?.contractAddress)
      } catch (error) {
        console.error("Error checking organization:", error);
      }
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setLoading(true);
    try {
      await axios.post("/api/participants", {
        pId: generateRandom(),
        pName: name,
        pEmail: email,
        phone,
        eventId: id,
      });
      setName("");
      setEmail("");
      setPhone("");
      fetchData(); // Refresh data after successful submission
    } catch (error) {
      console.error("Error adding participant:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteParticipant = async (participantId: string) => {
    setLoading(true);
    try {
      await axios.delete("/api/participants", {
        data: { participantId },
      });
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting participant:", error);
    } finally {
      setLoading(false);
    }
  };

  const issueCertificates = async () => {
    if (!id) return;
    setLoading(true);
    try {
      
      await axios.post("/api/certificates", { eventId: id }).then((response)=>{
        setHashes(response.data)
      })
      const vaild = await addCertificate(contractAddress,hashes)
      await axios.put('/api/certificates',{
        eventId: event?._id,
        blockHash: vaild
      })
      console.log(vaild)
      fetchData(); // Refresh data after issuing certificates
    } catch (error) {
      console.error("Error issuing certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    checkOrganizationExists();
  }, [fetchData, checkOrganizationExists]);

  return (
    <div className="p-4 m-8 flex flex-col gap-6">
      <div
        onClick={() => router.push("/dash")}
        className="fixed top-4 left-12 flex gap-2 cursor-pointer hover:underline"
      >
        <MoveLeft /> Home
      </div>
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
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                type="submit"
                className={`w-full py-2 px-4 rounded-md ${
                  loading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                }`}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Participant"}
              </button>
            </form>
          </div>
        )}

        {/* Participants */}
        <div
          className={`shadow-md border rounded-md p-6 ${
            !event?.isIssued
              ? "max-h-96 w-full md:w-1/2 overflow-y-scroll"
              : "min-h-fit min-w-full px-32"
          }`}
        >
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
                      disabled={loading}
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
          disabled={participants.length === 0 || loading}
          className={`py-2 w-full px-4 rounded-md ${
            participants.length === 0 || loading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          }`}
        >
          {loading ? "Issuing..." : "Issue Certificates"}
        </button>
      )}
    </div>
  );
}
