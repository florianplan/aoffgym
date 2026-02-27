import { NextResponse } from 'next/server';
import licenciesData from '@/data/licencies.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase();
  const statut = searchParams.get('statut');
  const discipline = searchParams.get('discipline');
  const fonction = searchParams.get('fonction');

  let filteredLicencies = [...licenciesData.licencies];

  if (search) {
    filteredLicencies = filteredLicencies.filter(
      (l) =>
        l.nom.toLowerCase().includes(search) ||
        l.prenom.toLowerCase().includes(search) ||
        (l.numeroLicence && l.numeroLicence.toLowerCase().includes(search))
    );
  }

  if (statut) {
    filteredLicencies = filteredLicencies.filter((l) => l.statut === statut);
  }

  if (discipline) {
    filteredLicencies = filteredLicencies.filter(
      (l) => l.disciplinePrincipale === discipline || l.disciplineSecondaire === discipline
    );
  }

  if (fonction) {
    filteredLicencies = filteredLicencies.filter((l) => l.fonction === fonction);
  }

  return NextResponse.json({ licencies: filteredLicencies, total: filteredLicencies.length });
}
