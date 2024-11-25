import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Orginization from '../../../models/orginization.model'


export async function POST(request) {
    const {orgName, address, orgEmail, orgId, isContract, contractAddress} =await request.json();
    await connectMongoDB();
    await Orginization.create({orgName,address,orgEmail,orgId,isContract, contractAddress})
    return NextResponse.json({messege:'Orginazation Created'},{status:201});
}
export async function GET(request){
    const orgId =  request.nextUrl.searchParams.get("orgId")
    await connectMongoDB();
    console.log(orgId)
    const org = await Orginization.findOne({orgId:orgId})
    return NextResponse.json(org)
}
export async function DELETE(request){
    const orgId =  request.nextUrl.searchParams.get("orgId")
    await connectMongoDB();
    await Orginization.deleteOne({orgId:orgId})
    return new NextResponse({messege:"Orginization deleted Successfully"},{status:201})
}