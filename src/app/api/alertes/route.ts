import { NextResponse } from 'next/server';
import alertesData from '@/data/alertes.json';

export async function GET() {
  return NextResponse.json(alertesData);
}
