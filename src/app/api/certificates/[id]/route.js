import connectMongoDB from "@/libs/mongodb";
import Certificate from "@/models/certificates.model";
import Event from "@/models/events.model";
import Orginization from "@/models/orginization.model";
import Participant from "@/models/participants.model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();

    try {
        const certificate = await Certificate.findOne({ certificateHash: id });
        if (!certificate) {
            return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
        }
        const certiP = await Participant.findById(certificate.pId);
        const certiEvent = await Event.findById(certificate.eventId);
        const org = await Orginization.findOne({ orgId: certiEvent.orginizationId });

        if (!certiP || !certiEvent || !org) {
            return NextResponse.json({ error: "Associated data not found" }, { status: 404 });
        }
        const certiData = {
            participantName: certiP.pName,
            eventName: certiEvent.eventName,
            eventDate: certiEvent.date,
            issueDate: certificate.issueDate,
            blockHash: certificate.blockchainValidationId,
            certificateHash: certificate.certificateHash,
            organizationName: org.orgName,
            certificateUrl: certiEvent.certificateTemplate
        };
        return NextResponse.json(certiData);

    } catch (error) {
        console.error("Error fetching certificate data:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
