'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Certificate = {
  organizationName: string;
  eventName: string;
  participantName: string;
  eventDate: string;
  location: string;
  certificateHash: string;
  issueDate: string;
  certificateUrl: string;
};


export default function ValiidateCerti() {
  const router = useRouter()
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  const handleValidate =async () => {
    const result =await axios.get(`/api/certificates/${certificateId}`);
    setCertificate(result.data);
  };


  const handleDownload = () => {
    alert("Downloading certificate...");
  };

  const handleShare = () => {
    alert("Sharing certificate...");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 ml-64">
      <div className="w-full lg:w-1/2 border border-gray-200 rounded-lg shadow-md p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Certificate Validator</h2>
          <p className="text-gray-500">Enter a certificate ID to validate and view details.</p>
        </div>
        <div className="space-y-4">
          <label className="block text-gray-400" htmlFor="certificateId">Certificate ID</label>
          <div className="flex space-x-2">
            <input
              id="certificateId"
              type="text"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              placeholder="Enter certificate ID"
              className="w-full border rounded-lg p-2 bg-transparent text-gray-200"
            />
            <button onClick={handleValidate} className="px-4 py-2 bg-transparent hover:border-black border hover:text-black  hover:bg-customGreen text-white rounded-lg">
              Validate
            </button>
          </div>
          {certificate && (
            <table className="w-full border-collapse text-gray-200">
              <tbody>
                <tr className="border-b">
                  <td className="font-medium p-2 ">Participant Name</td>
                  <td className="p-2 ">{certificate.participantName}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-medium p-2 ">Event Name</td>
                  <td className="p-2 ">{certificate.eventName}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-medium p-2 ">Event Date</td>
                  <td className="p-2 ">{format(certificate.eventDate, "PPP")}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-medium p-2 ">Issue Date</td>
                  <td className="p-2 ">{format(certificate.issueDate, "PPP")}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-medium p-2 ">Block Hash</td>
                  <td className="p-2 ">0x{certificate.certificateHash}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-medium p-2 ">Certificate Hash</td>
                  <td className="p-2 ">0x{certificate.certificateHash}</td>
                </tr>
                <tr>
                  <td className="font-medium p-2 ">Organization Name</td>
                  <td className="p-2 ">{certificate.organizationName}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
      {certificate ?<div className="flex flex-col items-center justify-center">
        <h1 className='text-2xl font-thin mb-4'>Click to Download</h1>
      <div onClick={()=>{router.push(`/certificate/${certificate?.certificateHash}`)}} className="flex flex-col items-center max-w-4xl  hover:opacity-55 cursor-pointer w-full mx-auto">
        <div className="relative w-[80%] aspect-[16/9] mb-6 border text-black">
          <img
            src={certificate?.certificateUrl}
            alt="Certificate Background"
            className="rounded-lg shadow-lg object-contain w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-between p-8 text-center">
            <div className="">
              <h1 className="text-lg font-bold text-primary">
                {certificate?.organizationName}
              </h1>
              <h2 className="text-lg font-semibold text-secondary">
                {certificate?.eventName}
              </h2>
            </div>
            <div className="space-y-2">
              <p className="text-md">This certificate is awarded to</p>
              <p className="text-xl font-bold text-primary">
                {certificate?.participantName}
              </p>
              <p className="text-sm">for successfully completing the event on</p>
              <p className="text-xs font-semibold">{format(certificate?.eventDate, "PPP")}</p>
            </div>
            <div className="w-full flex justify-between text-xs  text-muted-foreground">
              <p>Certificate ID: {certificate?.certificateHash}</p>
              <p>Issued on: {format(certificate?.issueDate, "PPP")}</p>
            </div>
          </div>
        </div>
      </div>
    </div> : <></>}
      
    </div>
  );
}
