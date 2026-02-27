import { NextResponse } from 'next/server';
import doublonData from '@/data/doublon.json';

export async function POST(request: Request) {
  const body = await request.json();
  
  const isDoublonScenario =
    body.nom?.toLowerCase() === 'martin' &&
    body.prenom?.toLowerCase().startsWith('luc') &&
    body.dateNaissance === '2012-03-15';

  if (isDoublonScenario) {
    return NextResponse.json({
      ...doublonData,
      doublonDetecte: true,
    });
  }

  return NextResponse.json({
    doublonDetecte: false,
    message: 'Aucun doublon détecté. La pré-licence peut être créée.',
  });
}
