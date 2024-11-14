import { NextResponse } from 'next/server';
import connectMongoDB from '../../../libs/mongodb'
import Certificate from '../../../models/certificates.model'

export async function POST(req){
    try {
        const { pId, eventId, issueDate, blockchainValidationId, certificateHash, certificateUrl } = await req.json();
        await connectMongoDB()
        const newCertificate = new Certificate({
          pId,
          eventId,
          issueDate,
          blockchainValidationId,
          certificateHash,
          certificateUrl,
        });
    
        await newCertificate.save();
        return NextResponse.json({ message: "Certificate issued successfully", certificate: newCertificate });
      } catch (error) {
        return NextResponse.json({ message: "Error issuing certificate", error });
      }
}