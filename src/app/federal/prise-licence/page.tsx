'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, CreditCard, Euro, Search, ArrowLeftRight, ArrowRight, Lock, X, Info
} from 'lucide-react';

const zones = [
  { code: 'IDF-75', label: 'Paris (75)',          clubs: 32, licences: 2140, decomptes: 4, montantTotal: 48600, statut: 'ouvert' },
  { code: 'IDF-77', label: 'Seine-et-Marne (77)',  clubs: 18, licences: 980,  decomptes: 2, montantTotal: 22400, statut: 'ouvert' },
  { code: 'IDF-78', label: 'Yvelines (78)',         clubs: 21, licences: 1120, decomptes: 3, montantTotal: 26800, statut: 'controle' },
  { code: 'IDF-91', label: 'Essonne (91)',          clubs: 16, licences: 870,  decomptes: 2, montantTotal: 19200, statut: 'ouvert' },
  { code: 'IDF-92', label: 'Hauts-de-Seine (92)',   clubs: 19, licences: 1050, decomptes: 3, montantTotal: 24500, statut: 'ouvert' },
  { code: 'IDF-93', label: 'Seine-Saint-Denis (93)', clubs: 11, licences: 620,  decomptes: 1, montantTotal: 13800, statut: 'attente' },
  { code: 'IDF-94', label: 'Val-de-Marne (94)',     clubs: 7,  licences: 412,  decomptes: 1, montantTotal: 9200,  statut: 'clos' },
  { code: 'IDF-95', label: "Val-d'Oise (95)",       clubs: 8,  licences: 445,  decomptes: 1, montantTotal: 10200, statut: 'controle' },
];

const tarifs = [
  { categorie: 'Licence fédérale', national: 12.50, regional: 4.00, total: 16.50 },
  { categorie: 'Assurance licencié', national: 8.00, regional: 0, total: 8.00 },
  { categorie: 'Affiliation club', national: 45.00, regional: 15.00, total: 60.00 },
];

const mutations = [
  { id: 'MUT-2027-001', licencie: 'Thomas Bernard',   numero: '2027-IDF-100045', origine: 'Gym Club Paris 18', destination: 'Gym\'Étoiles Paris 15', discipline: 'GAM', date: '2027-01-12', statut: 'valide' },
  { id: 'MUT-2027-002', licencie: 'Clara Rousseau',   numero: '2027-IDF-100067', origine: 'AS Lyon GAF',       destination: 'RC Versailles',          discipline: 'GAF', date: '2027-01-14', statut: 'en_attente' },
  { id: 'MUT-2027-003', licencie: 'Nathan Lefebvre',  numero: '2027-IDF-100089', origine: 'Trampoline Cergy',  destination: 'Paris Acrobatie',        discipline: 'TRA', date: '2027-01-15', statut: 'commission' },
];

const getZoneStyle = (statut: string) => {
  switch (statut) {
    case 'ouvert':   return { class: 'badge-success', label: 'Ouvert',       dot: 'bg-emerald-500' };
    case 'controle': return { class: 'badge-warning',  label: 'En contrôle', dot: 'bg-amber-500' };
    case 'attente':  return { class: 'badge-neutral',  label: 'En attente',  dot: 'bg-slate-400' };
    case 'clos':     return { class: 'badge-info',     label: 'Clos',        dot: 'bg-cyan-500' };
    default:         return { class: 'badge-neutral',  label: statut,        dot: 'bg-slate-400' };
  }
};

const getMutationStyle = (statut: string) => {
  switch (statut) {
    case 'valide':     return { class: 'badge-success', label: 'Validée' };
    case 'en_attente': return { class: 'badge-warning',  label: 'En attente' };
    case 'commission': return { class: 'badge-violet',   label: 'Commission nationale' };
    default:           return { class: 'badge-neutral',  label: statut };
  }
};

const kpisData = [
  { label: 'Licences validées', Icon: CreditCard, color: 'text-ffgym-blue', bg: 'bg-ffgym-blue/8' },
  { label: 'Total collecté',    Icon: Euro,        color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Zones en contrôle', Icon: Search,      color: 'text-amber-600',  bg: 'bg-amber-50' },
  { label: 'Mutations IDF',     Icon: ArrowLeftRight, color: 'text-violet-600', bg: 'bg-violet-50' },
];

export default function FederalPriseLicencePage() {
  const [activeTab, setActiveTab] = useState<'decomptes' | 'tarifs' | 'mutations'>('decomptes');
  const [selectedZone, setSelectedZone] = useState<(typeof zones)[0] | null>(null);

  const totalLicences = zones.reduce((s, z) => s + z.licences, 0);
  const totalMontant = zones.reduce((s, z) => s + z.montantTotal, 0);
  const zonesEnControle = zones.filter(z => z.statut === 'controle').length;

  const kpisValues = [
    totalLicences.toLocaleString('fr-FR'),
    `${(totalMontant / 1000).toFixed(0)}k €`,
    zonesEnControle,
    mutations.length,
  ];

  const tabs = [
    { id: 'decomptes' as const, label: 'Décomptes par zone',  Icon: CreditCard },
    { id: 'tarifs' as const,    label: 'Contrôle des tarifs', Icon: Euro },
    { id: 'mutations' as const, label: 'Mutations',            Icon: ArrowLeftRight },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center gap-3">
          <Link href="/federal" className="text-slate-500 hover:text-slate-700 focus-ring-rgaa rounded-lg p-1" aria-label="Retour">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Prise de licence</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">CR Île-de-France · Saison 2026-2027</p>
          </div>
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
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpisValues[i]}</p>
                <p className="text-xs font-semibold text-slate-500">{kpi.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-white shadow-sm text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.Icon className="w-3 h-3" aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Décomptes tab */}
        {activeTab === 'decomptes' && (
          <div className="card !p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white">
              <h3 className="text-sm font-bold text-slate-900">Tableau de bord des décomptes par zone</h3>
              <p className="text-sm text-slate-500 mt-1">Cliquer sur une zone pour voir le détail</p>
            </div>
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Zone</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Clubs</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Licences</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Décomptes</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Montant</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {zones.map(zone => {
                  const style = getZoneStyle(zone.statut);
                  return (
                    <tr key={zone.code} className="hover:bg-slate-50/80 transition-colors cursor-pointer group" onClick={() => setSelectedZone(zone)}>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900 text-sm">{zone.label}</p>
                        <p className="text-xs font-mono text-slate-400">{zone.code}</p>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-700">{zone.clubs}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">{zone.licences.toLocaleString('fr-FR')}</td>
                      <td className="px-6 py-4 text-right font-semibold text-slate-700">{zone.decomptes}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">{zone.montantTotal.toLocaleString('fr-FR')} €</td>
                      <td className="px-6 py-4">
                        <span className={`badge ${style.class}`}>
                          <span className={`w-2 h-2 ${style.dot} rounded-full`} />
                          {style.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {zone.statut === 'controle' && (
                          <button className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors">
                            Valider →
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-900">Total IDF</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">{zones.reduce((s, z) => s + z.clubs, 0)}</td>
                  <td className="px-6 py-4 text-right font-bold text-ffgym-blue">{totalLicences.toLocaleString('fr-FR')}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900">{zones.reduce((s, z) => s + z.decomptes, 0)}</td>
                  <td className="px-6 py-4 text-right font-bold text-emerald-600">{totalMontant.toLocaleString('fr-FR')} €</td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {/* Tarifs tab */}
        {activeTab === 'tarifs' && (
          <div className="space-y-4">
            <div className="card !p-0 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/80 to-white">
                <h3 className="text-sm font-bold text-slate-900">Grille des tarifs — Saison 2026-2027</h3>
                <span className="badge badge-info text-xs flex items-center gap-1">
                  <Lock className="w-3 h-3" aria-hidden="true" />
                  Validés par le CN
                </span>
              </div>
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Catégorie</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Part nationale</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Part régionale</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tarifs.map((t, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-5 font-semibold text-slate-900">{t.categorie}</td>
                      <td className="px-6 py-5 text-right font-mono text-slate-700">{t.national.toFixed(2)} €</td>
                      <td className="px-6 py-5 text-right font-mono text-slate-700">{t.regional.toFixed(2)} €</td>
                      <td className="px-6 py-5 text-right font-bold text-ffgym-blue font-mono">{t.total.toFixed(2)} €</td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-xs font-semibold text-slate-400 hover:text-ffgym-blue transition-colors">
                          Éditer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card bg-ffgym-blue/5 border-ffgym-blue/20 !p-4 flex items-start gap-3">
              <Info className="w-4 h-4 text-ffgym-blue mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-slate-700">
                Les tarifs nationaux sont fixés par le Comité National et ne peuvent être modifiés au niveau CR.
                Les parts régionales peuvent être ajustées avant ouverture de la saison, dans le respect du plafond fixé.
              </p>
            </div>
          </div>
        )}

        {/* Mutations tab */}
        {activeTab === 'mutations' && (
          <div className="card !p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/80 to-white">
              <h3 className="text-sm font-bold text-slate-900">Suivi des mutations</h3>
              <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full font-medium">{mutations.length} en cours</span>
            </div>
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Licencié</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Origine → Destination</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mutations.map(m => {
                  const style = getMutationStyle(m.statut);
                  return (
                    <tr key={m.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900 text-sm">{m.licencie}</p>
                        <p className="text-xs font-mono text-slate-400">{m.numero}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="text-slate-500 text-xs">{m.origine}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                          <span className="font-semibold text-slate-900 text-xs">{m.destination}</span>
                        </div>
                        <span className="badge badge-discipline text-[10px] mt-1">{m.discipline}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(m.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge ${style.class}`}>{style.label}</span>
                      </td>
                      <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                        {m.statut === 'en_attente' && (
                          <button className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
                            Valider
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Zone detail panel */}
      {selectedZone && (
        <div className="fixed inset-0 z-40 flex justify-end" onClick={() => setSelectedZone(null)}>
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-sm bg-white h-full overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">{selectedZone.label}</h2>
                <p className="text-xs font-mono text-slate-500">{selectedZone.code}</p>
              </div>
              <button onClick={() => setSelectedZone(null)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <span className={`badge ${getZoneStyle(selectedZone.statut).class} text-sm px-4 py-2`}>
                {getZoneStyle(selectedZone.statut).label}
              </span>
              {[
                { label: 'Clubs actifs', value: selectedZone.clubs },
                { label: 'Licences validées', value: selectedZone.licences.toLocaleString('fr-FR') },
                { label: 'Décomptes soumis', value: selectedZone.decomptes },
                { label: 'Montant total', value: `${selectedZone.montantTotal.toLocaleString('fr-FR')} €` },
              ].map(f => (
                <div key={f.label} className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm text-slate-500">{f.label}</span>
                  <span className="font-bold text-slate-900">{f.value}</span>
                </div>
              ))}
              {selectedZone.statut === 'controle' && (
                <button className="w-full py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors mt-4">
                  Valider le décompte
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
