import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Event from '../../../models/events.model'



export async function POST(req){
    try {
        const { eventId, eventName, location, orginizationId, description, certificateTemplate, date } = await req.json();
        const newEvent = new Event({
          eventId,
          eventName,
          location,
          orginizationId,
          description,
          certificateTemplate,
          date,
        });
        await connectMongoDB();
        await newEvent.save();
        return NextResponse.json({ message: "Event created successfully", event: newEvent })
      } catch (error) {
        return NextResponse.json({ message: "Error creating event", error });
      }
}

export async function GET(req){
    const orgId = req.nextUrl.searchParams.get("orgId")
    await connectMongoDB();
    console.log(orgId)
    const events = await Event.find({orginizationId:orgId})
    console.log(events)
    return NextResponse.json(events)
}