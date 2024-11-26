import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Certificate from "../../../models/certificates.model";
import Event from "@/models/events.model";
import crypto, { Hash } from "crypto";
import { addCertificate } from "../contract/deploy";
import Orginization from "@/models/orginization.model";

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
    const hashes = []
    for (const participant of participants) {
      const hash = crypto
        .createHash("md5")
        .update(participant.pId + event.eventId)
        .digest("hex");
      const newCertificate = new Certificate({
        pId: participant._id,
        eventId: event._id,
        issueDate: new Date(),
        blockchainValidationId: "blockHash",
        certificateHash: hash,
        certificateUrl: hash,
      });
      hashes.push(hash)
      await newCertificate.save();
    }
    await Event.updateOne({ eventId: eventId }, { $set: { isIssued: true } });
    console.log(hashes)
    return NextResponse.json({ hashes });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error Getting Certificate", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    const response = await Certificate.find({ eventId: id })
      .populate("pId")
      .populate("eventId");
    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
  }
}

export async function PUT(req){
  try{
    const {eventId, blockHash} = await req.json()
    await connectMongoDB();
    const update = await Certificate.updateMany(
      { eventId:eventId },
      { $set: { blockchainValidationId: blockHash } }
    );
    return NextResponse.json({message:"Updated successfully",update})
  }catch(error){
    console.log(error)
  }
}