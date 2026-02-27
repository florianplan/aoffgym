'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Euro, CreditCard, Search, History, Download, FileText
} from 'lucide-react';

const decomptes = [
  { id: 'DC-2027-IDF-75-001', club: 'Gym\'Étoiles Paris 15',     zone: 'IDF-75', date: '2027-01-15', licences: 15, montant: 1850, statut: 'en_attente_paiement' },
  { id: 'DC-2027-IDF-75-002', club: 'Club Gym Marais',            zone: 'IDF-75', date: '2027-01-12', licences: 22, montant: 2720, statut: 'clos' },
  { id: 'DC-2027-IDF-78-001', club: 'RC Versailles',              zone: 'IDF-78', date: '2027-01-10', licences: 18, montant: 2210, statut: 'controle_cr' },
  { id: 'DC-2027-IDF-91-001', club: 'AS Gym Palaiseau',           zone: 'IDF-91', date: '2027-01-08', licences: 9,  montant: 1110, statut: 'clos' },
  { id: 'DC-2027-IDF-92-001', club: 'Gym Puteaux',                zone: 'IDF-92', date: '2027-01-05', licences: 26, montant: 3200, statut: 'clos' },
  { id: 'DC-2026-IDF-75-003', club: 'Paris Acrobatie',            zone: 'IDF-75', date: '2026-12-20', licences: 12, montant: 1480, statut: 'clos' },
  { id: 'DC-2026-IDF-93-001', club: 'Gym Club Saint-Denis',       zone: 'IDF-93', date: '2026-12-18', licences: 8,  montant: 980,  statut: 'litige' },
  { id: 'DC-2026-IDF-77-001', club: 'Trampoline Meaux',           zone: 'IDF-77', date: '2026-12-15', licences: 11, montant: 1350, statut: 'clos' },
];

const getStatutStyle = (statut: string) => {
  switch (statut) {
    case 'clos':               return { class: 'badge-success', label: 'Clos',                dot: 'bg-emerald-500' };
    case 'controle_cr':        return { class: 'badge-warning',  label: 'Contrôle CR',         dot: 'bg-amber-500' };
    case 'en_attente_paiement': return { class: 'badge-info',    label: 'En attente paiement', dot: 'bg-cyan-500' };
    case 'litige':             return { class: 'badge-danger',   label: 'Litige',              dot: 'bg-red-500' };
    default:                   return { class: 'badge-neutral',  label: statut,                dot: 'bg-slate-400' };
  }
};

const moisLabels = ['Sep', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar'];
const moisData   = [12400, 18600, 14200, 31800, 22500, 8400, 0];
const maxVal = Math.max(...moisData);

export default function FederalAdminPage() {
  const [filterZone, setFilterZone] = useState('');
  const [filterStatut, setFilterStatut] = useState('');

  const filtered = decomptes.filter(d =>
    (filterZone === '' || d.zone === filterZone) &&
    (filterStatut === '' || d.statut === filterStatut)
  );

  const totalMontant = decomptes.filter(d => d.statut === 'clos').reduce((s, d) => s + d.montant, 0);
  const totalLicences = decomptes.reduce((s, d) => s + d.licences, 0);
  const enControle = decomptes.filter(d => d.statut === 'controle_cr').length;
  const enAttentePaiement = decomptes.filter(d => d.statut === 'en_attente_paiement').length;

  const handleExport = () => {
    const csv = [
      'ID;Club;Zone;Date;Licences;Montant;Statut',
      ...decomptes.map(d => `${d.id};${d.club};${d.zone};${d.date};${d.licences};${d.montant};${d.statut}`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'decomptes_idf_2026-2027.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const kpisData = [
    { label: 'Total collecté (clos)', value: `${totalMontant.toLocaleString('fr-FR')} €`, Icon: Euro,    color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Licences traitées',     value: totalLicences,                               Icon: CreditCard, color: 'text-ffgym-blue',  bg: 'bg-ffgym-blue/8' },
    { label: 'En contrôle CR',        value: enControle,                                  Icon: Search,  color: 'text-amber-600',  bg: 'bg-amber-50' },
    { label: 'En attente paiement',   value: enAttentePaiement,                           Icon: History, color: 'text-cyan-600',   bg: 'bg-cyan-50' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/federal" className="text-slate-500 hover:text-slate-700 rounded-lg p-1" aria-label="Retour">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Admin & Financier</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">CR Île-de-France · Saison 2026-2027</p>
            </div>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 border-2 border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition-all"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-6">

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpisData.map((kpi, i) => (
            <div key={i} className="card !p-4 flex items-center gap-4">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${kpi.bg}`}>
                <kpi.Icon className={`w-4 h-4 ${kpi.color}`} aria-hidden="true" />
              </div>
              <div>
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <p className="text-xs font-semibold text-slate-500">{kpi.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard financier — Toucan Toco */}
        <div className="card !p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/80 to-white">
            <h3 className="text-sm font-bold text-slate-900">Dashboard financier — Flux par mois</h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full tracking-wider">Powered by Toucan Toco</span>
              <span className="badge badge-info text-[10px] px-2">Simulation</span>
            </div>
          </div>
          <div className="p-6">
            {/* Bar chart simulation */}
            <div className="flex items-end gap-3 h-40">
              {moisLabels.map((mois, i) => {
                const height = moisData[i] > 0 ? Math.round((moisData[i] / maxVal) * 100) : 0;
                return (
                  <div key={mois} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-semibold text-slate-500">
                      {moisData[i] > 0 ? `${(moisData[i] / 1000).toFixed(0)}k` : ''}
                    </span>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        moisData[i] === 0 ? 'bg-slate-100 border-2 border-dashed border-slate-200' :
                        i === moisLabels.length - 2 ? 'bg-ffgym-red/80' : 'bg-ffgym-blue/80'
                      }`}
                      style={{ height: `${Math.max(height, moisData[i] > 0 ? 8 : 4)}%` }}
                    />
                    <span className="text-xs font-semibold text-slate-500">{mois}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-ffgym-blue/80" />Mois clos</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-ffgym-red/80" />Mois en cours</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border-2 border-dashed border-slate-300" />Mois à venir</div>
            </div>
          </div>
        </div>

        {/* Liste décomptes */}
        <div className="card !p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3 bg-gradient-to-r from-slate-50/80 to-white">
            <h3 className="text-sm font-bold text-slate-900">Liste des décomptes</h3>
            <div className="flex gap-3">
              <select
                value={filterZone}
                onChange={e => setFilterZone(e.target.value)}
                className="select-base !w-auto min-w-[140px] !py-2 text-sm"
              >
                <option value="">Toutes zones</option>
                {Array.from(new Set(decomptes.map(d => d.zone))).sort().map(z => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
              <select
                value={filterStatut}
                onChange={e => setFilterStatut(e.target.value)}
                className="select-base !w-auto min-w-[170px] !py-2 text-sm"
              >
                <option value="">Tous statuts</option>
                <option value="clos">Clos</option>
                <option value="controle_cr">Contrôle CR</option>
                <option value="en_attente_paiement">En attente paiement</option>
                <option value="litige">Litige</option>
              </select>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Référence</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Club</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Zone</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Licences</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Montant</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(d => {
                const style = getStatutStyle(d.statut);
                return (
                  <tr key={d.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-mono text-sm font-semibold text-slate-900">{d.id}</p>
                      <p className="text-xs text-slate-400">{new Date(d.date).toLocaleDateString('fr-FR')}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{d.club}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-ffgym-blue bg-ffgym-blue/8 px-2 py-1 rounded-lg">{d.zone}</span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-900">{d.licences}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">{d.montant.toLocaleString('fr-FR')} €</td>
                    <td className="px-6 py-4">
                      <span className={`badge ${style.class}`}>
                        <span className={`w-2 h-2 ${style.dot} rounded-full`} />
                        {style.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {d.statut === 'controle_cr' && (
                          <button className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                            Valider
                          </button>
                        )}
                        <button className="text-xs font-semibold text-ffgym-blue hover:underline">
                          Voir →
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-7 h-7 mx-auto mb-3" aria-hidden="true" />
              <p className="font-medium">Aucun décompte pour ces filtres</p>
            </div>
          )}
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <p className="text-sm text-slate-500 font-medium">
              {filtered.length} décompte{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
            </p>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-ffgym-blue transition-colors"
            >
              <FileText className="w-3 h-3" aria-hidden="true" />
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
