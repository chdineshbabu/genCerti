import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Certificate from "../../../models/certificates.model";
import Event from "@/models/events.model";
import crypto, { Hash } from 'crypto'

export async function POST(req) {
  try {
    await connectMongoDB();
    const { eventId } = await req.json();
    const event = await Event.findOne({ eventId }).populate("participants");
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    const participants = event.participants;
    const participantCount = participants.length;
    for (const participant of participants) {
      const hash = crypto
        .createHash("md5")
        .update(participant.pId + event.eventId)
        .digest("hex");

      const newCertificate = new Certificate({
        pId: participant._id,
        eventId: event._id,
        issueDate: new Date(),
        blockchainValidationId : "some",
        certificateHash: hash,
        certificateUrl: hash,
      });

      await newCertificate.save();
    }
    await Event.updateOne({eventId:eventId, $set:{isIssued: true}})
    return NextResponse.json({ participantCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error Getting Certificate", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req){
  try{
    const id = req.nextUrl.searchParams.get("id")
    await connectMongoDB()
    const response = await Certificate.find({eventId:id}).populate("pId").populate("eventId");
    return NextResponse.json(response)
  }catch(err){
    console.log(err)
  }
}