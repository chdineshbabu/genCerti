import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Participant from '@/models/participants.model'
import Event from "@/models/events.model";

export async function POST(req) {
    try {
        const { pId, pName, pEmail, phone, eventId } = await req.json();
        await connectMongoDB()
        const event = await Event.findOne({ eventId: eventId });
        if (!event) {
            return NextResponse.json({ message: "Event not found" }, { status: 404 });
        }
        const newParticipant = new Participant({
            pId,
            pName,
            pEmail,
            phone,
            eventId,
        });
        await newParticipant.save();
        event.participants = event.participants || [];
        event.participants.push(newParticipant._id);
        await event.save();
        return NextResponse.json({
            message: "Participant added to event successfully",
            participant: newParticipant,
        });
    } catch (error) {
        console.error("Error:", error); 
        return NextResponse.json({
            message: "Error adding participant to event",
            error: error.message || error,
        }, { status: 500 });
    }
}

export async function GET(req){
  try{
    const id = req.nextUrl.searchParams.get("eventId")
    console.log(id)
    const event = await Event.findOne({ eventId:id }).populate("participants");
    if (!event) {
      return NextResponse.json({ message: "Event not found" });
    }
    return NextResponse.json(event)
  }catch(error){
    return NextResponse.json({message:"Error getting Participent",error})
  }
}
export async function DELETE(req) {
  try {
    const { participantId } = await req.json();
    await connectMongoDB();
    const participant = await Participant.findOne({ pId: participantId });
    if (!participant) {
      return NextResponse.json({ message: "Participant not found" }, { status: 404 });
    }
    await Participant.deleteOne({ pId: participantId });
    return NextResponse.json({ message: "Participant deleted successfully" });
  } catch (error) {
    console.error("Error deleting participant:", error);
    return NextResponse.json({ message: "Error deleting participant", error }, { status: 500 });
  }
}