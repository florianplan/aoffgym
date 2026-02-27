'use client';

import { useState } from 'react';
import clubData from '@/data/club.json';
import {
  CloudUpload, AlertTriangle, Clock, FolderOpen, CheckCircle2, FileText,
  CalendarX, Download, X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollText, Hammer, Award, Lightbulb, Book } from 'lucide-react';

const { club } = clubData;

const documents = [
  { id: 'DOC-001', nom: 'Statuts du club (version 2025)', type: 'statuts', date: '2024-06-10', validiteJusquau: '2027-06-10', statut: 'valide', taille: '1.2 Mo', format: 'PDF', badgeCR: true },
  { id: 'DOC-002', nom: 'PV Assemblée Générale 2026', type: 'pv_ag', date: '2026-06-15', validiteJusquau: '2027-06-15', statut: 'valide', taille: '380 Ko', format: 'PDF', badgeCR: true },
  { id: 'DOC-003', nom: 'Attestation d\'affiliation 2026-2027', type: 'attestation', date: '2026-09-01', validiteJusquau: '2027-08-31', statut: 'valide', taille: '145 Ko', format: 'PDF', badgeCR: false },
  { id: 'DOC-004', nom: 'Projet associatif 2024-2027', type: 'projet_asso', date: '2024-01-20', validiteJusquau: '2027-01-20', statut: 'valide', taille: '2.1 Mo', format: 'PDF', badgeCR: false },
  { id: 'DOC-005', nom: 'Règlement intérieur', type: 'reglement', date: '2023-09-05', validiteJusquau: '2026-09-05', statut: 'expire', taille: '290 Ko', format: 'PDF', badgeCR: false },
  { id: 'DOC-006', nom: 'PV AG 2027 (projet)', type: 'pv_ag', date: '2027-01-18', validiteJusquau: null, statut: 'en_attente', taille: '220 Ko', format: 'PDF', badgeCR: false },
];

const typeConfig: Record<string, { label: string; Icon: LucideIcon; color: string }> = {
  statuts:      { label: 'Statuts',           Icon: ScrollText,  color: 'text-ffgym-blue bg-ffgym-blue/8' },
  pv_ag:        { label: 'PV AG',             Icon: Hammer,      color: 'text-ffgym-blue bg-ffgym-blue/10' },
  attestation:  { label: 'Attestation',       Icon: Award,       color: 'text-ffgym-blue bg-ffgym-blue/10' },
  projet_asso:  { label: 'Projet asso.',      Icon: Lightbulb,   color: 'text-slate-600 bg-slate-100' },
  reglement:    { label: 'Règlement int.',    Icon: Book,        color: 'text-slate-600 bg-slate-100' },
  facture:      { label: 'Facture',           Icon: FileText,    color: 'text-ffgym-red bg-ffgym-red/10' },
};

const getStatutStyle = (statut: string): { class: string; label: string; Icon: LucideIcon } => {
  switch (statut) {
    case 'valide':     return { class: 'badge-success', label: 'Validé',        Icon: CheckCircle2 };
    case 'en_attente': return { class: 'badge-warning',  label: 'En attente CR', Icon: Clock };
    case 'expire':     return { class: 'badge-danger',   label: 'Expiré',        Icon: CalendarX };
    default:           return { class: 'badge-neutral',  label: statut,          Icon: FileText };
  }
};

export default function DocumentsPage() {
  const [filterType, setFilterType] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState('');
  const [uploadType, setUploadType] = useState('statuts');
  const [uploadDone, setUploadDone] = useState(false);

  const filtered = documents.filter(d =>
    (filterType === '' || d.type === filterType) &&
    (filterStatut === '' || d.statut === filterStatut)
  );

  const expires = documents.filter(d => d.statut === 'expire').length;
  const enAttente = documents.filter(d => d.statut === 'en_attente').length;

  const handleUpload = () => {
    setUploadDone(true);
    setTimeout(() => { setShowUploadModal(false); setUploadDone(false); setUploadFile(''); }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Header compact */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Espace documentaire</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{club.nom} · {documents.length} documents</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="btn-primary flex items-center gap-2 text-sm flex-shrink-0"
          >
            <CloudUpload className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Déposer un document</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-6">

        {/* Alertes */}
        {(expires > 0 || enAttente > 0) && (
          <div className="space-y-3">
            {expires > 0 && (
              <div className="card bg-red-50 border-red-200 !p-4 flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm text-red-700 font-medium">
                  <strong>{expires} document{expires > 1 ? 's' : ''} expiré{expires > 1 ? 's' : ''}</strong> — Renouvellement requis pour maintenir la conformité.
                </p>
                <button onClick={() => setFilterStatut('expire')} className="ml-auto text-xs font-semibold text-red-700 border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap">
                  Voir →
                </button>
              </div>
            )}
            {enAttente > 0 && (
              <div className="card bg-amber-50 border-amber-200 !p-4 flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm text-amber-700 font-medium">
                  <strong>{enAttente} document{enAttente > 1 ? 's' : ''} en attente</strong> de validation par le CR Île-de-France.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Liste + filtres */}
        <div className="card !p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center gap-3 bg-gradient-to-r from-slate-50/80 to-white">
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="select-base !w-auto min-w-[150px] !py-2 text-sm">
              <option value="">Tous types</option>
              {Object.entries(typeConfig).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            <select value={filterStatut} onChange={e => setFilterStatut(e.target.value)} className="select-base !w-auto min-w-[140px] !py-2 text-sm">
              <option value="">Tous statuts</option>
              <option value="valide">Validé</option>
              <option value="en_attente">En attente CR</option>
              <option value="expire">Expiré</option>
            </select>
            {(filterType || filterStatut) && (
              <button onClick={() => { setFilterType(''); setFilterStatut(''); }} className="btn-ghost !px-3 !py-2 text-sm">
                Réinitialiser
              </button>
            )}
            <span className="ml-auto text-xs font-semibold text-slate-400">{filtered.length} document{filtered.length > 1 ? 's' : ''}</span>
          </div>
          <div className="divide-y divide-slate-100">
            {filtered.map(doc => {
              const tc = typeConfig[doc.type] ?? typeConfig.statuts;
              const sc = getStatutStyle(doc.statut);
              const isExpiring = doc.validiteJusquau && new Date(doc.validiteJusquau) < new Date(Date.now() + 90 * 24 * 3600 * 1000);
              return (
                <div key={doc.id} className="px-6 py-5 flex items-center gap-4 hover:bg-slate-50 transition-colors group">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${tc.color}`}>
                    <tc.Icon className="w-5 h-5" aria-hidden="true" />
                  </div>

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-slate-900 text-sm">{doc.nom}</p>
                      {doc.badgeCR && (
                        <span className="text-[9px] font-bold text-ffgym-blue bg-ffgym-blue/10 border border-ffgym-blue/20 px-1.5 py-0.5 rounded-full flex-shrink-0">
                          Validé CR
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs text-slate-400">{tc.label}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="text-xs text-slate-400">{doc.format} · {doc.taille}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="text-xs text-slate-400">Déposé le {new Date(doc.date).toLocaleDateString('fr-FR')}</span>
                      {doc.validiteJusquau && (
                        <>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span className={`text-xs font-medium ${isExpiring ? 'text-amber-600' : 'text-slate-400'}`}>
                            Valide jusqu'au {new Date(doc.validiteJusquau).toLocaleDateString('fr-FR')}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Statut */}
                  <span className={`badge ${sc.class} flex-shrink-0`}>
                    <sc.Icon className="w-3 h-3" aria-hidden="true" />
                    {sc.label}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-ffgym-blue transition-colors" title="Télécharger">
                      <Download className="w-4 h-4" aria-hidden="true" />
                    </button>
                    {doc.statut === 'expire' && (
                      <button
                        onClick={() => setShowUploadModal(true)}
                        className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap"
                      >
                        Renouveler
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="py-16 text-center text-slate-400">
                <FolderOpen className="w-10 h-10 mx-auto mb-3" aria-hidden="true" />
                <p className="font-medium">Aucun document trouvé</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowUploadModal(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {uploadDone ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Document déposé</h3>
                <p className="text-sm text-slate-500">En attente de validation par le CR Île-de-France</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-slate-900">Déposer un document</h3>
                  <button onClick={() => setShowUploadModal(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Type de document</label>
                    <select value={uploadType} onChange={e => setUploadType(e.target.value)} className="select-base text-sm">
                      {Object.entries(typeConfig).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Fichier (simulation)</label>
                    <div
                      className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-ffgym-blue/50 hover:bg-ffgym-blue/5 transition-all cursor-pointer"
                      onClick={() => setUploadFile('document_club.pdf')}
                    >
                      {uploadFile ? (
                        <div className="flex items-center justify-center gap-2 text-ffgym-blue">
                          <FileText className="w-6 h-6" aria-hidden="true" />
                          <span className="font-semibold text-sm">{uploadFile}</span>
                        </div>
                      ) : (
                        <>
                          <CloudUpload className="w-7 h-7 text-slate-300 mx-auto mb-2" aria-hidden="true" />
                          <p className="text-sm text-slate-500 font-medium">Cliquer pour sélectionner un fichier</p>
                          <p className="text-xs text-slate-400 mt-1">PDF, Word · Max 10 Mo</p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs text-amber-700 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                      Le document sera soumis au CR Île-de-France pour validation. Délai habituel : 3 à 5 jours ouvrés.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleUpload}
                  disabled={!uploadFile}
                  className="w-full mt-5 py-3 bg-ffgym-blue text-white font-semibold rounded-xl hover:bg-ffgym-gradient-start transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Soumettre au CR
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
