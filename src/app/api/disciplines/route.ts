import { NextResponse } from 'next/server';
import disciplinesData from '@/data/disciplines.json';

export async function GET() {
  return NextResponse.json(disciplinesData);
}
