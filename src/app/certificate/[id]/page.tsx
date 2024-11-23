'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Download, Share2 ,House} from 'lucide-react';
import { format } from 'date-fns';
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

export default function CertificatePage() {
  const router = useRouter()
  const { id } = useParams() as { id: string };
  const [certificateData, setCertificate] = useState<Certificate | null>(null);
  console.log(certificateData)

  async function getCertificate(id: string) {
    try {
      const response = await axios.get(`/api/certificates/${id}`);
      setCertificate(response.data);
    } catch (error) {
      console.error('Error fetching certificate data:', error);
    }
  }

  useEffect(() => {
    if (id) {
      getCertificate(id);
    }
  }, [id]);

  const handleDownload = () => {
    if (certificateData) {
      console.log(`Downloading certificate ${certificateData.certificateHash}`);
    }
  };

  const handleShare = async () => {
    if (certificateData && navigator.share) {
      try {
        await navigator.share({
          title: 'My Certificate',
          text: `Check out my certificate (ID: ${certificateData.certificateHash})`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      console.log('Share API not supported or certificate data missing.');
    }
  };

  if (!certificateData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading certificate data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div onClick={()=>{router.push('/dash')}} className='fixed top-10 left-10 flex gap-2 cursor-pointer hover:underline '> <House />Home</div>
      <div className="flex flex-col items-center max-w-4xl w-full mx-auto">
        <div className="relative w-[80%] aspect-[16/9] mb-6 border text-black">
          <img
            src={certificateData.certificateUrl}
            alt="Certificate Background"
            className="rounded-lg shadow-lg object-contain w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-between p-12 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-primary">
                {certificateData.organizationName}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-secondary">
                {certificateData.eventName}
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-xl md:text-2xl">This certificate is awarded to</p>
              <p className="text-3xl md:text-4xl font-bold text-primary">
                {certificateData.participantName}
              </p>
              <p className="text-lg md:text-xl">for successfully completing the event on</p>
              <p className="text-xl md:text-2xl font-semibold">{format(certificateData.eventDate, "PPP")}</p>
            </div>
            <div className="w-full flex justify-between text-xs  text-muted-foreground">
              <p>Certificate ID: {certificateData.certificateHash}</p>
              <p>Issued on: {format(certificateData.issueDate, "PPP")}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button
            onClick={handleDownload}
            className="flex justify-center items-center bg-customGreen text-black p-2 border rounded-md hover:border-customGreen hover:text-customGreen hover:bg-transparent"
          >
            <Download className="mr-2 h-4 w-4" /> Download Certificate
          </button>
          <button
            onClick={handleShare}
            className="flex justify-center items-center bg-black text-customGreen hover:text-black p-2 border rounded-md hover:border-customGreen hover:bg-customGreen"
          >
            <Share2 className="mr-2 h-4 w-4" /> Share Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
