import {Deploy} from './deploy'
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const contract = await Deploy();
    console.log("Contract address:", contract.contractAddress);
    return NextResponse.json(contract);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred during deployment" });
  }
}
