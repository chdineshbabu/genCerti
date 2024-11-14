import { NextResponse } from "next/server";
import connectMongoDB from '../../../../libs/mongodb'
import Orginization from '../../../../models/orginization.model'


export async function PUT(request, { params }) {
    const {id} = params;
    const {isContract,contractAddress, publicAddress} = await request.json()
    await connectMongoDB();
    const update = await Orginization.findOneAndUpdate({orgId:id} ,{isContract,contractAddress,publicAddress})
    return NextResponse.json({messege:'Orginazation Update'},{status:201});
}