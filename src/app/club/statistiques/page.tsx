'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { FileText, Users, TrendingUp, Clock, Euro } from 'lucide-react';
import clubData from '@/data/club.json';

const { club } = clubData;

const evolutionData = [
  { saison: '2022-23', licencies: 38 },
  { saison: '2023-24', licencies: 44 },
  { saison: '2024-25', licencies: 51 },
  { saison: '2025-26', licencies: 56 },
  { saison: '2026-27', licencies: club.statistiques.nombreLicencies },
];

const disciplineColors: Record<string, string> = {
  'GAF': 'bg-ffgym-red',
  'GAM': 'bg-ffgym-blue',
  'GR':  'bg-ffgym-blue/60',
  'TRA': 'bg-ffgym-red/60',
  'GPT': 'bg-slate-400',
  'AER': 'bg-slate-500',
};

/* ─── KPI cards — style dashboard ─── */

const evolution = club.statistiques.nombreLicencies - club.statistiques.nombreLicenciesSaisonPrecedente;

const kpis = [
  {
    label: 'Licenciés actifs',
    value: club.statistiques.nombreLicencies.toString(),
    subtext: `+${evolution} vs saison précédente`,
    Icon: Users,
    iconColor: 'text-ffgym-red',
    iconBg: 'bg-ffgym-red/10',
    trend: true,
  },
  {
    label: 'Pré-licences en attente',
    value: club.statistiques.preLicencesEnAttente.toString(),
    subtext: 'À valider',
    Icon: Clock,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
    trend: false,
    alert: club.statistiques.preLicencesEnAttente > 0,
  },
  {
    label: 'Décompte en cours',
    value: `${club.statistiques.decompteEnCours.montant.toLocaleString('fr-FR')} €`,
    subtext: `${club.statistiques.decompteEnCours.nombreLicences} licences`,
    Icon: Euro,
    iconColor: 'text-ffgym-blue',
    iconBg: 'bg-ffgym-blue/10',
    trend: false,
  },
];

export default function StatistiquesPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const repartition = club.statistiques.repartitionDisciplines;
  const total = club.statistiques.nombreLicencies;
  const maxEvol = Math.max(...evolutionData.map(d => d.licencies));

  const generatePDF = async () => {
    setIsGenerating(true);

    const doc = new jsPDF();

    doc.setFillColor(0, 43, 85);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setFillColor(200, 16, 46);
    doc.rect(0, 30, 210, 5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('RAPPORT STATISTIQUES CLUB', 105, 16, { align: 'center' });
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fédération Française de Gymnastique — Saison ${club.saison}`, 105, 26, { align: 'center' });

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(club.nom, 20, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text(`N° ${club.numeroAffiliation} — ${club.adresse.ville}`, 20, 58);
    doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 20, 65);

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(15, 72, 55, 28, 3, 3, 'F');
    doc.roundedRect(77, 72, 55, 28, 3, 3, 'F');
    doc.roundedRect(140, 72, 55, 28, 3, 3, 'F');

    const pdfKpis = [
      { label: 'Licenciés actifs', value: `${total}`, sub: `+${evolution} vs N-1`, x: 42 },
      { label: 'Pré-licences', value: `${club.statistiques.preLicencesEnAttente}`, sub: 'En attente', x: 104 },
      { label: 'Décompte cours', value: `${club.statistiques.decompteEnCours.montant.toLocaleString('fr-FR')} €`, sub: `${club.statistiques.decompteEnCours.nombreLicences} licences`, x: 167 },
    ];

    pdfKpis.forEach(kpi => {
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.setFont('helvetica', 'bold');
      doc.text(kpi.label.toUpperCase(), kpi.x, 79, { align: 'center' });
      doc.setFontSize(16);
      doc.setTextColor(15, 23, 42);
      doc.text(kpi.value, kpi.x, 90, { align: 'center' });
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.setFont('helvetica', 'normal');
      doc.text(kpi.sub, kpi.x, 96, { align: 'center' });
    });

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Répartition par discipline', 20, 115);

    let y = 125;
    Object.entries(repartition).forEach(([discipline, count]) => {
      const pct = Math.round((count / total) * 100);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      doc.text(`${discipline}`, 20, y);
      doc.text(`${count} licenciés (${pct}%)`, 170, y, { align: 'right' });
      doc.setFillColor(226, 232, 240);
      doc.roundedRect(60, y - 4, 100, 5, 1, 1, 'F');
      doc.setFillColor(0, 43, 85);
      doc.roundedRect(60, y - 4, pct, 5, 1, 1, 'F');
      y += 12;
    });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Évolution du nombre de licenciés', 20, y + 10);
    y += 20;

    const chartX = 25;
    const chartW = 160;
    const chartH = 40;
    const barW = chartW / evolutionData.length - 4;

    evolutionData.forEach((d, i) => {
      const barH = Math.round((d.licencies / maxEvol) * chartH);
      const bx = chartX + i * (chartW / evolutionData.length);
      doc.setFillColor(i === evolutionData.length - 1 ? 200 : 0, i === evolutionData.length - 1 ? 16 : 43, i === evolutionData.length - 1 ? 46 : 85);
      doc.roundedRect(bx, y + chartH - barH, barW, barH, 1, 1, 'F');
      doc.setFontSize(7);
      doc.setTextColor(100, 116, 139);
      doc.text(d.saison.slice(2), bx + barW / 2, y + chartH + 6, { align: 'center' });
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(`${d.licencies}`, bx + barW / 2, y + chartH - barH - 2, { align: 'center' });
    });

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text('Fédération Française de Gymnastique — POC FFGym Licence — Données de démonstration', 105, 285, { align: 'center' });

    doc.save(`statistiques_${club.numeroAffiliation}_${club.saison}.pdf`);
    setTimeout(() => setIsGenerating(false), 1000);
  };

  return (
    <div className="min-h-screen">

      {/* Header compact */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Statistiques du club</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{club.nom} · Saison {club.saison}</p>
          </div>
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="btn-primary flex items-center gap-2 text-sm flex-shrink-0"
          >
            {isGenerating ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="hidden sm:inline">Génération...</span>
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Exporter en PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-6">

        {/* KPI cards — style dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {kpis.map((kpi, i) => (
            <div key={i} className={`card relative ${kpi.alert ? 'border-amber-200' : ''}`}>
              {kpi.alert && (
                <span className="absolute top-3 right-3 w-2 h-2 bg-ffgym-red rounded-full" aria-hidden="true" />
              )}
              <div className={`w-9 h-9 ${kpi.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                <kpi.Icon className={`w-4 h-4 ${kpi.iconColor}`} aria-hidden="true" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{kpi.label}</p>
              {kpi.trend ? (
                <p className="text-[10px] text-ffgym-blue font-semibold mt-1.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" aria-hidden="true" />
                  {kpi.subtext}
                </p>
              ) : (
                <p className={`text-[10px] font-semibold mt-1.5 ${kpi.alert ? 'text-amber-500' : 'text-slate-400'}`}>
                  {kpi.subtext}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Répartition disciplines */}
        <div className="card !p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/80 to-white">
            <h3 className="font-bold text-slate-900 text-sm">Répartition par discipline</h3>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">Powered by Toucan Toco</span>
          </div>
          <div className="p-5 space-y-4">
            {Object.entries(repartition).map(([discipline, count]) => {
              const pct = total ? Math.round((count / total) * 100) : 0;
              const color = disciplineColors[discipline] ?? 'bg-slate-500';
              return (
                <div key={discipline}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${color}`} />
                      <span className="text-sm font-semibold text-slate-700">{discipline}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-900">{count}</span>
                      <span className="text-xs text-slate-400 w-8 text-right">{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Évolution */}
        <div className="card !p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/80 to-white">
            <h3 className="font-bold text-slate-900 text-sm">Évolution du nombre de licenciés</h3>
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">5 dernières saisons</span>
          </div>
          <div className="p-5">
            <div className="flex items-end gap-4 h-44">
              {evolutionData.map((d, i) => {
                const h = Math.round((d.licencies / maxEvol) * 100);
                const isCurrent = i === evolutionData.length - 1;
                return (
                  <div key={d.saison} className="flex-1 flex flex-col items-center gap-1">
                    <span className={`text-sm font-bold ${isCurrent ? 'text-ffgym-red' : 'text-slate-600'}`}>{d.licencies}</span>
                    <div
                      className={`w-full rounded-t-xl transition-all duration-700 ${isCurrent ? 'bg-ffgym-red' : 'bg-ffgym-blue/70'}`}
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-xs text-slate-400 text-center leading-tight">{d.saison.slice(2)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
