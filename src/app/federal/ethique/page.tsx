'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, CheckCircle2, AlertTriangle, Clock, CalendarX,
  Send, X, Lock, Info, Shield, Ban
} from 'lucide-react';

const controles = [
  { id: 'HON-001', nom: 'MARTIN', prenom: 'Jacques',   dateNaissance: '1978-03-14', club: 'Gym\'Étoiles Paris 15', fonction: 'Entraîneur',  statut: 'valide',     dateControle: '2026-09-01', renouvellement: '2028-09-01' },
  { id: 'HON-002', nom: 'DUVAL',  prenom: 'Christine', dateNaissance: '1985-07-22', club: 'RC Versailles',         fonction: 'Dirigeante',  statut: 'valide',     dateControle: '2026-10-15', renouvellement: '2028-10-15' },
  { id: 'HON-003', nom: 'PETIT',  prenom: 'Romain',    dateNaissance: '1992-01-08', club: 'Trampoline Cergy',     fonction: 'Entraîneur',  statut: 'en_cours',   dateControle: '2027-01-10', renouvellement: null },
  { id: 'HON-004', nom: 'THOMAS', prenom: 'Aurore',    dateNaissance: '1990-05-30', club: 'Paris Acrobatie',      fonction: 'Entraîneuse', statut: 'aia',        dateControle: '2027-01-08', renouvellement: null },
  { id: 'HON-005', nom: 'LEROY',  prenom: 'Philippe',  dateNaissance: '1975-11-19', club: 'Gym Club 94',          fonction: 'Président',   statut: 'en_attente', dateControle: null,         renouvellement: null },
  { id: 'HON-006', nom: 'GARCIA', prenom: 'Isabelle',  dateNaissance: '1988-09-03', club: 'Gym Club de Versailles', fonction: 'Entraîneuse', statut: 'expire',   dateControle: '2024-01-15', renouvellement: '2026-01-15' },
];

const radiations = [
  { id: 'RAD-001', nom: 'DUPONT François',  structure: 'Anciennement — Club Gym Val-de-Marne', motif: 'Manquement grave aux règles d\'éthique', dateDecision: '2024-06-15', dateEffet: '2024-06-15', duree: 'Définitive' },
  { id: 'RAD-002', nom: 'MERCIER Stéphane', structure: 'Anciennement — AS Meaux',               motif: 'Non-respect des obligations dirigeants',  dateDecision: '2025-03-22', dateEffet: '2025-03-22', duree: '2 ans' },
];

const getStatutStyle = (statut: string) => {
  switch (statut) {
    case 'valide':     return { class: 'badge-success', label: 'Validé',      Icon: CheckCircle2, color: 'text-emerald-600' };
    case 'en_cours':   return { class: 'badge-info',    label: 'En cours',    Icon: Clock,         color: 'text-cyan-600' };
    case 'aia':        return { class: 'badge-danger',  label: 'AIA',         Icon: AlertTriangle, color: 'text-red-600' };
    case 'en_attente': return { class: 'badge-warning', label: 'En attente',  Icon: Clock,         color: 'text-amber-600' };
    case 'expire':     return { class: 'badge-neutral', label: 'Expiré',      Icon: CalendarX,     color: 'text-slate-500' };
    default:           return { class: 'badge-neutral', label: statut,        Icon: X,             color: 'text-slate-500' };
  }
};

const kpisData = [
  { label: 'Contrôles valides',      Icon: CheckCircle2,  color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'En cours / attente',     Icon: Clock,          color: 'text-amber-600',  bg: 'bg-amber-50' },
  { label: 'AIA (Avis défavorable)', Icon: AlertTriangle,  color: 'text-red-600',    bg: 'bg-red-50' },
  { label: 'Expirés à renouveler',   Icon: CalendarX,      color: 'text-slate-600',  bg: 'bg-slate-100' },
];

export default function FederalEthiquePage() {
  const [activeTab, setActiveTab] = useState<'honorabilite' | 'radiations'>('honorabilite');
  const [selectedPerson, setSelectedPerson] = useState<(typeof controles)[0] | null>(null);
  const [showApiModal, setShowApiModal] = useState(false);

  const stats = {
    valides: controles.filter(c => c.statut === 'valide').length,
    en_cours: controles.filter(c => c.statut === 'en_cours' || c.statut === 'en_attente').length,
    aia: controles.filter(c => c.statut === 'aia').length,
    expires: controles.filter(c => c.statut === 'expire').length,
  };

  const kpisValues = [stats.valides, stats.en_cours, stats.aia, stats.expires];

  const tabs = [
    { id: 'honorabilite' as const, label: 'Contrôle d\'honorabilité', Icon: Shield },
    { id: 'radiations' as const,   label: 'Radiations',               Icon: Ban },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center gap-3">
          <Link href="/federal" className="text-slate-500 hover:text-slate-700 rounded-lg p-1" aria-label="Retour">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Éthique & Honorabilité</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">CR Île-de-France</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-6">

        {/* API Banner */}
        <div className="card bg-amber-50 border-amber-200 !p-4 flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">API Ministère — Contrôle d'honorabilité</p>
              <p className="text-xs text-amber-700 mt-0.5">Les contrôles sont envoyés automatiquement via l'API du Ministère des Sports. Réponse sous 3 à 5 jours ouvrés.</p>
            </div>
          </div>
          <button
            onClick={() => setShowApiModal(true)}
            className="flex-shrink-0 text-xs font-semibold text-amber-700 border border-amber-300 px-3 py-2 rounded-lg hover:bg-amber-100 transition-colors whitespace-nowrap"
          >
            Voir flux API
          </button>
        </div>

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
                activeTab === tab.id ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.Icon className="w-3 h-3" aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Honorabilité */}
        {activeTab === 'honorabilite' && (
          <div className="card !p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/80 to-white">
              <h3 className="text-sm font-bold text-slate-900">Liste des contrôles</h3>
              <button className="btn-primary !py-2 !px-4 text-sm flex items-center gap-2">
                <Send className="w-3 h-3" aria-hidden="true" />
                Soumettre des contrôles
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Personne</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Club / Fonction</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date contrôle</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Renouvellement</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {controles.map(c => {
                  const style = getStatutStyle(c.statut);
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors cursor-pointer group" onClick={() => setSelectedPerson(c)}>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900 text-sm">{c.prenom} {c.nom}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Né(e) le {new Date(c.dateNaissance).toLocaleDateString('fr-FR')}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700 font-medium">{c.club}</p>
                        <p className="text-xs text-slate-500">{c.fonction}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {c.dateControle ? new Date(c.dateControle).toLocaleDateString('fr-FR') : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {c.renouvellement
                          ? <span className={new Date(c.renouvellement) < new Date() ? 'text-red-600 font-semibold' : ''}>
                              {new Date(c.renouvellement).toLocaleDateString('fr-FR')}
                            </span>
                          : '—'
                        }
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge ${style.class} flex items-center gap-1 w-fit`}>
                          <style.Icon className="w-3 h-3" aria-hidden="true" />
                          {style.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs text-ffgym-blue font-semibold">Détail →</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Radiations */}
        {activeTab === 'radiations' && (
          <div className="card !p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/80 to-white">
              <h3 className="text-sm font-bold text-slate-900">Registre des radiations</h3>
              <span className="badge badge-danger text-xs flex items-center gap-1">
                <Lock className="w-3 h-3" aria-hidden="true" />
                Accès CN uniquement
              </span>
            </div>
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Personne</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Motif</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date décision</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Durée</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {radiations.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900 text-sm">{r.nom}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{r.structure}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs">{r.motif}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(r.dateDecision).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${r.duree === 'Définitive' ? 'badge-danger' : 'badge-warning'}`}>
                        {r.duree}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Person detail */}
      {selectedPerson && (
        <div className="fixed inset-0 z-40 flex justify-end" onClick={() => setSelectedPerson(null)}>
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-sm bg-white h-full overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <h2 className="font-bold text-slate-900">{selectedPerson.prenom} {selectedPerson.nom}</h2>
              <button onClick={() => setSelectedPerson(null)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {(() => {
                const style = getStatutStyle(selectedPerson.statut);
                return (
                  <span className={`badge ${style.class} text-sm px-4 py-2 flex items-center gap-1.5 w-fit`}>
                    <style.Icon className="w-3 h-3" aria-hidden="true" />
                    {style.label}
                  </span>
                );
              })()}
              {selectedPerson.statut === 'aia' && (
                <div className="card bg-red-50 border-red-200 !p-4">
                  <p className="text-sm font-semibold text-red-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                    AIA — Avis d'inaptitude à l'accueil de mineurs
                  </p>
                  <p className="text-xs text-red-600 mt-1">Cette personne ne peut pas exercer de fonction en contact avec des mineurs. Signalement transmis au CN.</p>
                </div>
              )}
              {[
                { label: 'Date de naissance', value: new Date(selectedPerson.dateNaissance).toLocaleDateString('fr-FR') },
                { label: 'Club', value: selectedPerson.club },
                { label: 'Fonction', value: selectedPerson.fonction },
                { label: 'Réf. contrôle', value: selectedPerson.id },
                ...(selectedPerson.dateControle ? [{ label: 'Date contrôle', value: new Date(selectedPerson.dateControle).toLocaleDateString('fr-FR') }] : []),
                ...(selectedPerson.renouvellement ? [{ label: 'Renouvellement', value: new Date(selectedPerson.renouvellement).toLocaleDateString('fr-FR') }] : []),
              ].map(f => (
                <div key={f.label} className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm text-slate-500">{f.label}</span>
                  <span className="font-semibold text-slate-900 text-sm">{f.value}</span>
                </div>
              ))}
              {(selectedPerson.statut === 'en_attente' || selectedPerson.statut === 'expire') && (
                <button className="w-full py-3 bg-ffgym-blue text-white font-semibold rounded-xl hover:bg-ffgym-gradient-start transition-colors text-sm mt-2 flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Soumettre contrôle API Ministère
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* API Flux Modal */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowApiModal(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div
            className="relative bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-400 text-xs font-mono ml-2">API Ministère des Sports</span>
              </div>
              <button onClick={() => setShowApiModal(false)} className="text-slate-500 hover:text-slate-300">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <pre className="text-xs font-mono text-emerald-400 leading-relaxed overflow-x-auto">
{`POST /api/honorabilite/controle
Authorization: Bearer [TOKEN_FFGym_API]

{
  "personne": {
    "nom": "THOMAS",
    "prenom": "Aurore",
    "dateNaissance": "1990-05-30",
    "numLicence": "2027-IDF-100089"
  },
  "structure": {
    "code": "IDF-75-042",
    "niveau": "CR"
  }
}

// Réponse (5 jours ouvrés)
HTTP 200 OK
{
  "statut": "AIA",
  "code": "AIA_MINEURS",
  "dateReponse": "2027-01-15",
  "reference": "MIN-2027-004521"
}`}
            </pre>
            <div className="mt-4 p-3 bg-amber-900/30 border border-amber-500/30 rounded-xl">
              <p className="text-xs text-amber-400 font-medium flex items-center gap-1.5">
                <Info className="w-3 h-3" aria-hidden="true" />
                Simulation POC — L'API réelle du Ministère des Sports sera intégrée en phase de développement.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
