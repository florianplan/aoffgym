import { NextResponse } from 'next/server';
import licencieData from '@/data/licencie.json';

export async function GET() {
  return NextResponse.json(licencieData);
}
