'use client';

import { useState } from 'react';
import { format } from 'date-fns';

type Certificate = {
  id: string;
  participantName: string;
  eventName: string;
  eventDate: Date;
  issueDate: Date;
  blockHash: string;
  certificateHash: string;
  organizationName: string;
};
const fetchCertificate = (id: string): Certificate | null => {
  const certificates: Record<string, Certificate> = {
    "CERT001": {
      id: "CERT001",
      participantName: "John Doe",
      eventName: "Web Development Workshop",
      eventDate: new Date(2023, 5, 15),
      issueDate: new Date(2023, 5, 20),
      blockHash: "0x1234...5678",
      certificateHash: "0xabcd...ef01",
      organizationName: "Tech Academy",
    },
  };
  return certificates[id] || null;
};

export default function ValiidateCerti() {
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState<Certificate | null>(null);

  const handleValidate = () => {
    const result = fetchCertificate(certificateId);
    setCertificate(result);
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
                  <td className="p-2 ">{certificate.blockHash}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-medium p-2 ">Certificate Hash</td>
                  <td className="p-2 ">{certificate.certificateHash}</td>
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
      
      <div className="w-full lg:w-1/2 border border-gray-200 rounded-lg shadow-md p-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Certificate Preview</h2>
          <p className="text-gray-500">Preview and actions for the validated certificate.</p>
        </div>
        {certificate ? (
          <div className="border p-4 rounded-md space-y-4 text-center">
            <h2 className="text-2xl font-bold">{certificate.organizationName}</h2>
            <h3 className="text-xl">Certificate of Completion</h3>
            <p>This is to certify that</p>
            <p className="text-2xl font-bold">{certificate.participantName}</p>
            <p>has successfully completed</p>
            <p className="text-xl font-semibold">{certificate.eventName}</p>
            <p>on {format(certificate.eventDate, "PPPP")}</p>
            <div className="text-sm text-gray-500">
              <p>Certificate ID: {certificate.id}</p>
              <p>Issued on: {format(certificate.issueDate, "PPPP")}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No certificate to preview</p>
        )}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={handleDownload}
            disabled={!certificate}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              certificate ? "px-4 py-2 bg-transparent hover:border-black border hover:text-black  hover:bg-customGreen text-white rounded-lg" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <span>Download</span>
          </button>
          <button
            onClick={handleShare}
            disabled={!certificate}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              certificate ? "px-4 py-2 bg-transparent hover:border-black border hover:text-black  hover:bg-customGreen text-white rounded-lg" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
