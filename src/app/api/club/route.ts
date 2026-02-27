import { NextResponse } from 'next/server';
import clubData from '@/data/club.json';

export async function GET() {
  return NextResponse.json(clubData);
}
