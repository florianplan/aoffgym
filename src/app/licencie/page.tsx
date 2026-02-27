'use client';

import { useState } from 'react';
import Link from 'next/link';
import licencieData from '@/data/licencie.json';
import { jsPDF } from 'jspdf';
import {
  CheckCircle2, Dumbbell, CalendarCheck, History,
  FileDown, MapPin, ArrowRight, Medal, ShieldHalf, ChevronRight, Building2,
} from 'lucide-react';

const { licencie } = licencieData;

const totalSaisons = 1 + licencie.historique.length;

/* ─── KPIs ─── */

const kpis = [
  {
    label: 'Statut licence',
    value: 'Valide',
    subtext: `Saison ${licencie.licence.saison}`,
    Icon: CheckCircle2,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-50',
    valueColor: 'text-emerald-600',
  },
  {
    label: 'Discipline',
    value: licencie.licence.disciplinePrincipale,
    subtext: `Rôle : ${licencie.licence.fonction}`,
    Icon: Dumbbell,
    iconColor: 'text-ffgym-blue',
    iconBg: 'bg-ffgym-blue/10',
    valueColor: 'text-slate-900',
  },
  {
    label: 'Cert. médical',
    value: 'Valide',
    subtext: `Jusqu'au ${new Date(licencie.certificatMedical.dateValidite).toLocaleDateString('fr-FR')}`,
    Icon: CalendarCheck,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
    valueColor: 'text-emerald-600',
  },
  {
    label: 'Historique',
    value: `${totalSaisons} saisons`,
    subtext: 'Toutes avec FFGym',
    Icon: History,
    iconColor: 'text-violet-500',
    iconBg: 'bg-violet-50',
    valueColor: 'text-slate-900',
    href: '/licencie/historique',
  },
];

/* ─── Page ─── */

export default function LicencieDashboardPage() {
  const [isDownloading, setIsDownloading] = useState(false);

  const generatePDF = async () => {
    setIsDownloading(true);
    const doc = new jsPDF();

    doc.setFillColor(219, 39, 119);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setFillColor(217, 70, 239);
    doc.rect(0, 35, 210, 10, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('ATTESTATION DE LICENCE', 105, 22, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Fédération Française de Gymnastique', 105, 32, { align: 'center' });

    doc.setTextColor(51, 65, 85);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Saison ${licencie.licence.saison}`, 105, 55, { align: 'center' });

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, 65, 170, 80, 5, 5, 'F');

    const fields = [
      { label: 'Nom',               value: licencie.nom.toUpperCase() },
      { label: 'Prénom',            value: licencie.prenom },
      { label: 'Date de naissance', value: new Date(licencie.dateNaissance).toLocaleDateString('fr-FR') },
      { label: 'N° de licence',     value: licencie.numeroLicence },
      { label: 'Discipline',        value: 'Gymnastique Artistique Masculine' },
      { label: 'Club',              value: licencie.club.nom },
    ];

    let y = 78;
    fields.forEach(field => {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text(`${field.label} :`, 30, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(field.value, 80, y);
      y += 12;
    });

    doc.setFillColor(16, 185, 129);
    doc.roundedRect(20, 155, 170, 25, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('LICENCE VALIDE', 105, 167, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Du 01/09/2026 au 31/08/2027', 105, 175, { align: 'center' });

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, 190, 170, 40, 3, 3, 'F');
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(9);
    doc.text('Assurance : MMA Sports - Contrat n° 120.987.654', 30, 205);
    doc.text('Type : Individuelle Accident', 30, 215);

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(8);
    doc.text('Fédération Française de Gymnastique', 105, 260, { align: 'center' });
    doc.text('7 ter, Cour des Petites Écuries - 75010 Paris', 105, 267, { align: 'center' });
    doc.text('www.ffgym.fr', 105, 274, { align: 'center' });
    doc.setFontSize(7);
    doc.text(`Document généré le ${new Date().toLocaleDateString('fr-FR')} - POC FFGym Licence`, 105, 285, { align: 'center' });

    doc.save(`attestation_licence_${licencie.numeroLicence}.pdf`);
    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <div className="min-h-screen">

      {/* Header — profil intégré */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-ffgym-blue to-ffgym-gradient-start text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              LM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  {licencie.prenom} {licencie.nom.toUpperCase()}
                </span>
                <span className="badge badge-success text-[10px]">Valide</span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block font-mono">
                {licencie.numeroLicence} · {licencie.licence.disciplinePrincipale} · {licencie.club.nom}
              </p>
            </div>
          </div>
          <button
            onClick={generatePDF}
            disabled={isDownloading}
            className="btn-primary flex items-center gap-2 text-sm flex-shrink-0"
            aria-label="Télécharger l'attestation de licence en PDF"
          >
            {isDownloading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span className="hidden sm:inline">Génération...</span>
              </>
            ) : (
              <>
                <FileDown className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Mon attestation</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-6">

        {/* KPIs compacts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => {
            const inner = (
              <div className="card h-full">
                <div className={`w-9 h-9 ${kpi.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                  <kpi.Icon className={`w-4 h-4 ${kpi.iconColor}`} aria-hidden="true" />
                </div>
                <p className={`text-2xl font-bold ${kpi.valueColor}`}>{kpi.value}</p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{kpi.label}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-1.5">{kpi.subtext}</p>
              </div>
            );
            return kpi.href ? (
              <Link key={i} href={kpi.href} className="block hover:scale-[1.02] transition-transform">
                {inner}
              </Link>
            ) : (
              <div key={i}>{inner}</div>
            );
          })}
        </div>

        {/* Deux colonnes */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Gauche — Prochaines compétitions */}
          <div className="lg:col-span-3 card !p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-slate-900 text-sm">Prochaines compétitions</h2>
              <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">EngaGym</span>
            </div>

            <div className="divide-y divide-slate-50">
              {licencie.competition.prochaines.map((comp, i) => (
                <div key={i} className="px-5 py-4 flex items-start gap-4 hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 flex flex-col items-center justify-center text-amber-600 flex-shrink-0">
                    <span className="text-base font-bold leading-none">{new Date(comp.date).getDate()}</span>
                    <span className="text-[10px] uppercase font-semibold mt-0.5">
                      {new Date(comp.date).toLocaleDateString('fr-FR', { month: 'short' })}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm">{comp.nom}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" aria-hidden="true" />
                      {comp.lieu}
                    </p>
                    {comp.agres && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {comp.agres.slice(0, 4).map(agres => (
                          <span key={agres} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                            {agres}
                          </span>
                        ))}
                        {comp.agres.length > 4 && (
                          <span className="text-[10px] text-slate-400">+{comp.agres.length - 4}</span>
                        )}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" aria-hidden="true" />
                </div>
              ))}
            </div>

            <div className="px-5 py-3.5 border-t border-slate-100">
              <Link href="/licencie/competitions" className="text-ffgym-blue text-sm font-semibold flex items-center gap-1.5 hover:underline">
                Voir toutes mes compétitions
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Droite — Résultat + Club + Assurance */}
          <div className="lg:col-span-2 space-y-4">

            {/* Dernier résultat */}
            {licencie.competition.resultats.length > 0 && (
              <div className="card bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
                <p className="text-xs font-semibold text-amber-600 uppercase mb-3 flex items-center gap-1.5">
                  <Medal className="w-4 h-4" aria-hidden="true" />
                  Dernier résultat
                </p>
                <p className="text-3xl font-bold text-slate-900">{licencie.competition.resultats[0].classement}</p>
                <p className="font-semibold text-slate-700 mt-1 text-sm">{licencie.competition.resultats[0].nom}</p>
                <p className="text-xs text-slate-500 mt-0.5">Catégorie {licencie.competition.resultats[0].categorie}</p>
                <Link href="/licencie/competitions?tab=resultats" className="mt-3 text-amber-600 text-xs font-semibold flex items-center gap-1 hover:underline">
                  Mon palmarès <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            )}

            {/* Mon club */}
            <div className="card">
              <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Mon club</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-ffgym-blue/10 flex items-center justify-center text-ffgym-blue font-bold text-xs flex-shrink-0">
                  GE
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm truncate">{licencie.club.nom}</p>
                  <p className="text-xs text-slate-500">{licencie.club.ville} · Affilié</p>
                </div>
                <Building2 className="w-4 h-4 text-slate-300 flex-shrink-0" aria-hidden="true" />
              </div>
            </div>

            {/* Assurance */}
            <div className="card bg-slate-50 border-slate-200">
              <div className="flex items-start gap-3">
                <ShieldHalf className="w-5 h-5 text-ffgym-blue mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-1.5">Assurance</p>
                  <p className="font-bold text-slate-900 text-sm">MMA Sports</p>
                  <p className="text-xs text-slate-500 mt-0.5">Contrat n° 120.987.654</p>
                  <p className="text-xs text-slate-500">Individuelle Accident</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
