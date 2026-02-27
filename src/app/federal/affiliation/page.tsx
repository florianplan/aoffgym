'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Clock, FolderOpen, CheckCircle2, XCircle,
  AlertTriangle, X, HelpCircle
} from 'lucide-react';

const demandes = [
  {
    id: 'AFF-2027-001',
    nom: 'Gym Club de Versailles',
    siret: '87654321000012',
    ville: 'Versailles',
    departement: '78',
    disciplines: ['GAF', 'GPT'],
    dateSoumission: '2027-01-10',
    statut: 'en_attente',
    statutLabel: 'En attente',
    contact: 'Marie Leclerc',
    email: 'contact@gcv78.fr',
    telephone: '01 39 45 67 89',
    dirigeants: 2,
    remarques: '',
  },
  {
    id: 'AFF-2027-002',
    nom: 'Association Trampoline Cergy',
    siret: '76543210000023',
    ville: 'Cergy',
    departement: '95',
    disciplines: ['TRA'],
    dateSoumission: '2027-01-08',
    statut: 'docs_manquants',
    statutLabel: 'Docs manquants',
    contact: 'Pierre Moreau',
    email: 'atc95@gmail.com',
    telephone: '01 30 21 44 55',
    dirigeants: 1,
    remarques: 'PV AG 2026 manquant',
  },
  {
    id: 'AFF-2027-003',
    nom: 'Parkour Academy Paris 11',
    siret: '65432100000034',
    ville: 'Paris',
    departement: '75',
    disciplines: ['PKR'],
    dateSoumission: '2026-12-20',
    statut: 'approuve',
    statutLabel: 'Approuvé',
    contact: 'Julien Favre',
    email: 'contact@pap11.fr',
    telephone: '01 43 56 78 90',
    dirigeants: 3,
    remarques: '',
  },
  {
    id: 'AFF-2027-004',
    nom: 'Gym Rythm Seine-et-Marne',
    siret: '54321000000045',
    ville: 'Meaux',
    departement: '77',
    disciplines: ['GR', 'AER'],
    dateSoumission: '2026-12-15',
    statut: 'rejete',
    statutLabel: 'Rejeté',
    contact: 'Sophie Blanchard',
    email: 's.blanchard@grse77.fr',
    telephone: '01 64 33 12 78',
    dirigeants: 2,
    remarques: 'SIRET invalide — à régulariser',
  },
];

const getStatutStyle = (statut: string) => {
  switch (statut) {
    case 'en_attente':     return { class: 'badge-warning',  dot: 'bg-amber-500',   Icon: Clock };
    case 'docs_manquants': return { class: 'badge-neutral',  dot: 'bg-orange-400',  Icon: HelpCircle };
    case 'approuve':       return { class: 'badge-success',  dot: 'bg-emerald-500', Icon: CheckCircle2 };
    case 'rejete':         return { class: 'badge-danger',   dot: 'bg-red-500',     Icon: XCircle };
    default:               return { class: 'badge-neutral',  dot: 'bg-slate-400',   Icon: X };
  }
};

const kpisData = [
  { label: 'Total demandes',         value: (f: typeof demandes) => f.length,                                                       color: 'text-slate-900', bg: 'bg-slate-100/60', Icon: FolderOpen },
  { label: 'En attente',             value: (f: typeof demandes) => f.filter(d => d.statut === 'en_attente').length,                 color: 'text-amber-600', bg: 'bg-amber-50',     Icon: Clock },
  { label: 'Approuvées',             value: (f: typeof demandes) => f.filter(d => d.statut === 'approuve').length,                   color: 'text-emerald-600', bg: 'bg-emerald-50', Icon: CheckCircle2 },
  { label: 'Rejetées / Incomplets',  value: (f: typeof demandes) => f.filter(d => d.statut === 'rejete' || d.statut === 'docs_manquants').length, color: 'text-red-600', bg: 'bg-red-50', Icon: XCircle },
];

export default function FederalAffiliationPage() {
  const [filterStatut, setFilterStatut] = useState('');
  const [selectedDemande, setSelectedDemande] = useState<(typeof demandes)[0] | null>(null);
  const [actionModal, setActionModal] = useState<{ type: 'approuver' | 'rejeter' | 'docs'; demandeId: string } | null>(null);
  const [remarque, setRemarque] = useState('');

  const filtered = demandes.filter(d =>
    filterStatut === '' || d.statut === filterStatut
  );

  const enAttente = demandes.filter(d => d.statut === 'en_attente' || d.statut === 'docs_manquants').length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/federal" className="text-slate-500 hover:text-slate-700 focus-ring-rgaa rounded-lg p-1" aria-label="Retour au tableau de bord">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Affiliation</h1>
              <p className="text-xs text-slate-500 font-medium mt-0.5">CR Île-de-France · Saison 2026-2027</p>
            </div>
          </div>
          {enAttente > 0 && (
            <span className="badge badge-warning text-sm px-4 py-2 flex items-center gap-1.5">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {enAttente} demande{enAttente > 1 ? 's' : ''} à traiter
            </span>
          )}
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
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value(demandes)}</p>
                <p className="text-xs font-semibold text-slate-500">{kpi.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters + Table */}
        <div className="card !p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3 bg-gradient-to-r from-slate-50/80 to-white">
            <h3 className="text-sm font-bold text-slate-900">Demandes d'affiliation</h3>
            <select
              value={filterStatut}
              onChange={e => setFilterStatut(e.target.value)}
              className="select-base !w-auto min-w-[160px] !py-2 text-sm"
            >
              <option value="">Tous statuts</option>
              <option value="en_attente">En attente</option>
              <option value="docs_manquants">Docs manquants</option>
              <option value="approuve">Approuvé</option>
              <option value="rejete">Rejeté</option>
            </select>
          </div>

          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Club</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Dép.</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Disciplines</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Soumission</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(demande => {
                const style = getStatutStyle(demande.statut);
                return (
                  <tr key={demande.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{demande.nom}</p>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">{demande.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {demande.departement}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {demande.disciplines.map(d => (
                          <span key={d} className="badge badge-discipline text-[10px]">{d}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(demande.dateSoumission).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${style.class}`}>
                        <span className={`w-2 h-2 ${style.dot} rounded-full`} />
                        {demande.statutLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedDemande(demande)}
                          className="text-xs font-semibold text-ffgym-blue hover:underline"
                        >
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
              <FolderOpen className="w-7 h-7 mx-auto mb-3" aria-hidden="true" />
              <p className="font-medium">Aucune demande trouvée</p>
            </div>
          )}
        </div>
      </div>

      {/* Fiche demande — Side panel */}
      {selectedDemande && (
        <div className="fixed inset-0 z-40 flex justify-end" onClick={() => setSelectedDemande(null)}>
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">{selectedDemande.nom}</h2>
                <p className="text-xs font-mono text-slate-500 mt-0.5">{selectedDemande.id}</p>
              </div>
              <button
                onClick={() => setSelectedDemande(null)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Statut */}
              <div className="flex items-center gap-3">
                <span className={`badge ${getStatutStyle(selectedDemande.statut).class} text-sm px-4 py-2`}>
                  {selectedDemande.statutLabel}
                </span>
                {selectedDemande.remarques && (
                  <p className="text-xs text-orange-600 font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" aria-hidden="true" />
                    {selectedDemande.remarques}
                  </p>
                )}
              </div>

              {/* Infos club */}
              <div className="card bg-slate-50 border-slate-200 !p-5 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Informations club</h3>
                {[
                  { label: 'SIRET', value: selectedDemande.siret, mono: true },
                  { label: 'Ville', value: `${selectedDemande.ville} (${selectedDemande.departement})` },
                  { label: 'Disciplines', value: selectedDemande.disciplines.join(', ') },
                  { label: 'Dirigeants déclarés', value: `${selectedDemande.dirigeants}` },
                ].map(f => (
                  <div key={f.label} className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{f.label}</span>
                    <span className={`text-sm font-semibold text-slate-900 ${f.mono ? 'font-mono' : ''}`}>{f.value}</span>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div className="card bg-slate-50 border-slate-200 !p-5 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Contact</h3>
                {[
                  { label: 'Référent', value: selectedDemande.contact },
                  { label: 'Email', value: selectedDemande.email },
                  { label: 'Téléphone', value: selectedDemande.telephone },
                ].map(f => (
                  <div key={f.label} className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{f.label}</span>
                    <span className="text-sm font-semibold text-slate-900">{f.value}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              {(selectedDemande.statut === 'en_attente' || selectedDemande.statut === 'docs_manquants') && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setActionModal({ type: 'approuver', demandeId: selectedDemande.id })}
                      className="flex flex-col items-center gap-1.5 py-3 px-2 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors text-emerald-700"
                    >
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                      <span className="text-[11px] font-semibold">Approuver</span>
                    </button>
                    <button
                      onClick={() => setActionModal({ type: 'docs', demandeId: selectedDemande.id })}
                      className="flex flex-col items-center gap-1.5 py-3 px-2 bg-amber-50 border border-amber-200 rounded-xl hover:bg-amber-100 transition-colors text-amber-700"
                    >
                      <HelpCircle className="w-5 h-5" aria-hidden="true" />
                      <span className="text-[11px] font-semibold">Demander docs</span>
                    </button>
                    <button
                      onClick={() => setActionModal({ type: 'rejeter', demandeId: selectedDemande.id })}
                      className="flex flex-col items-center gap-1.5 py-3 px-2 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors text-red-700"
                    >
                      <XCircle className="w-5 h-5" aria-hidden="true" />
                      <span className="text-[11px] font-semibold">Rejeter</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation modal */}
      {actionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setActionModal(null)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
              actionModal.type === 'approuver' ? 'bg-emerald-50 text-emerald-600' :
              actionModal.type === 'rejeter' ? 'bg-red-50 text-red-600' :
              'bg-amber-50 text-amber-600'
            }`}>
              {actionModal.type === 'approuver' ? (
                <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
              ) : actionModal.type === 'rejeter' ? (
                <XCircle className="w-6 h-6" aria-hidden="true" />
              ) : (
                <HelpCircle className="w-6 h-6" aria-hidden="true" />
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center mb-1">
              {actionModal.type === 'approuver' ? 'Approuver la demande' :
               actionModal.type === 'rejeter' ? 'Rejeter la demande' :
               'Demander des documents'}
            </h3>
            <p className="text-sm text-slate-500 text-center mb-4">{actionModal.demandeId}</p>
            <textarea
              value={remarque}
              onChange={e => setRemarque(e.target.value)}
              placeholder={
                actionModal.type === 'approuver' ? 'Remarque éventuelle (optionnel)...' :
                actionModal.type === 'rejeter' ? 'Motif du rejet (obligatoire)...' :
                'Préciser les documents manquants...'
              }
              className="input-base !resize-none h-24 mb-4 text-sm"
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setActionModal(null); setRemarque(''); setSelectedDemande(null); }}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${
                  actionModal.type === 'approuver' ? 'bg-emerald-600 text-white hover:bg-emerald-700' :
                  actionModal.type === 'rejeter' ? 'bg-red-600 text-white hover:bg-red-700' :
                  'bg-amber-500 text-white hover:bg-amber-600'
                }`}
              >
                Confirmer
              </button>
              <button
                onClick={() => { setActionModal(null); setRemarque(''); }}
                className="flex-1 py-3 rounded-xl font-semibold text-sm border-2 border-slate-200 text-slate-600 hover:bg-slate-50 transition-all"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
