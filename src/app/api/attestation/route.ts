import { NextResponse } from 'next/server';
import attestationData from '@/data/attestation.json';

export async function GET() {
  return NextResponse.json(attestationData);
}
