import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb' 
import Event from '../../../../models/events.model'
export async function GET(req, {params}){
    const {id} = params;
    await connectMongoDB();
    const event = await Event.findOne({eventId:id})
    return NextResponse.json(event)
}