import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Participant from '@/models/participants.model'
import Event from "@/models/events.model";

export async function POST(req){
    try {
        const { pId, pName, pEmail, phone, eventId } = await req.json();
        await connectMongoDB()
        const event = await Event.findOne({ eventId });
        if (!event) {
          return res.status(404).json({ message: "Event not found" });
        }
        const newParticipant = new Participant({
          pId,
          pName,
          pEmail,
          phone,
          eventId,
        });
        console.log(event, newParticipant)
    
        await newParticipant.save();
        event.participants.push(newParticipant._id);
        await event.save();
        return NextResponse.json({ message: "Participant added to event successfully", participant: newParticipant });
      } catch (error) {
        return NextResponse.json({ message: "Error adding participant to event", error });
      }
}

export async function GET(req){
  try{
    const eventId = req.nextUrl.searchParams.get("eventId")
    const event = await Event.findOne({ eventId }).populate("participants");
    console.log(eventId)
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