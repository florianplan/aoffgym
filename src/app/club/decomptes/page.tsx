'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Plus, AlertTriangle, CreditCard, ReceiptText, CheckCircle2, Layers,
  X, Clock, XCircle, Send, Download, GitMerge, Scissors, Trash2,
} from 'lucide-react';
import clubData from '@/data/club.json';

const { club } = clubData;

type DecompteStatut = 'valide' | 'en_attente_validation_cr' | 'en_attente_paiement' | 'paye' | 'rejete';

interface Ligne { nom: string; prenom: string; discipline: string; montant: number; }

interface Decompte {
  id: string;
  date: string;
  montant: number;
  nombreLicences: number;
  statut: DecompteStatut;
  statutLabel: string;
  lignes?: Ligne[];
}

const decomptesMock: Decompte[] = [
  {
    id: 'DC-2027-042', date: '2027-01-15', montant: 1850.00, nombreLicences: 15,
    statut: 'en_attente_paiement', statutLabel: 'En attente de paiement',
    lignes: [
      { nom: 'Martin',  prenom: 'Lucas',  discipline: 'GAM', montant: 123.33 },
      { nom: 'Dupont',  prenom: 'Emma',   discipline: 'GAF', montant: 123.33 },
      { nom: 'Bernard', prenom: 'Tom',    discipline: 'GAM', montant: 123.33 },
      { nom: 'Petit',   prenom: 'Chloé',  discipline: 'GAF', montant: 123.33 },
      { nom: 'Robert',  prenom: 'Nathan', discipline: 'TRA', montant: 123.33 },
    ],
  },
  {
    id: 'DC-2027-041', date: '2026-12-10', montant: 2340.00, nombreLicences: 19,
    statut: 'en_attente_validation_cr', statutLabel: 'En attente validation CR',
    lignes: [
      { nom: 'Morel', prenom: 'Julie',   discipline: 'GAF', montant: 123.16 },
      { nom: 'Simon', prenom: 'Antoine', discipline: 'GAM', montant: 123.16 },
    ],
  },
  {
    id: 'DC-2026-040', date: '2026-10-20', montant: 3200.00, nombreLicences: 26,
    statut: 'paye', statutLabel: 'Payé', lignes: [],
  },
  {
    id: 'DC-2026-039', date: '2026-09-15', montant: 2450.00, nombreLicences: 20,
    statut: 'paye', statutLabel: 'Payé', lignes: [],
  },
];

const licenciesDisponibles = [
  { id: 'L001', nom: 'Fontaine',  prenom: 'Sofia',   discipline: 'GAF', montant: 123.33 },
  { id: 'L002', nom: 'Garnier',   prenom: 'Hugo',    discipline: 'GAM', montant: 123.33 },
  { id: 'L003', nom: 'Chevalier', prenom: 'Léa',     discipline: 'GR',  montant: 123.33 },
  { id: 'L004', nom: 'Roux',      prenom: 'Ethan',   discipline: 'TRA', montant: 150.00 },
  { id: 'L005', nom: 'Bonnet',    prenom: 'Inès',    discipline: 'GAF', montant: 123.33 },
  { id: 'L006', nom: 'Dupuis',    prenom: 'Mathieu', discipline: 'GAM', montant: 123.33 },
];

type StatutStyle = { class: string; dot: string; Icon: React.ElementType };

const statutStyles: Record<DecompteStatut, StatutStyle> = {
  valide:                   { class: 'badge-success', dot: 'bg-emerald-500', Icon: CheckCircle2 },
  en_attente_validation_cr: { class: 'badge-warning', dot: 'bg-amber-500',   Icon: Clock },
  en_attente_paiement:      { class: 'badge-danger',  dot: 'bg-red-500',     Icon: CreditCard },
  paye:                     { class: 'badge-success', dot: 'bg-emerald-500', Icon: CheckCircle2 },
  rejete:                   { class: 'badge-danger',  dot: 'bg-red-500',     Icon: XCircle },
};

type NouveauStep = 'selection' | 'recap' | 'succes';
type ScindreGroup = 'A' | 'B';

export default function DecomptesPage() {
  /* ─── état existant ─── */
  const [decomptes, setDecomptes]           = useState<Decompte[]>(decomptesMock);
  const [selectedDecompte, setSelectedDecompte] = useState<Decompte | null>(null);
  const [showNouveauModal, setShowNouveauModal]  = useState(false);
  const [nouveauStep, setNouveauStep]            = useState<NouveauStep>('selection');
  const [selectedLicencies, setSelectedLicencies] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting]           = useState(false);
  const [newDecompteId, setNewDecompteId]         = useState('');

  /* ─── multi-sélection ─── */
  const [selectedRows, setSelectedRows]         = useState<string[]>([]);
  const [showFusionnerModal, setShowFusionnerModal]   = useState(false);
  const [showScindreModal, setShowScindreModal]       = useState(false);
  const [showSupprimerConfirm, setShowSupprimerConfirm] = useState(false);
  const [scindreAssignment, setScindreAssignment] = useState<Record<number, ScindreGroup>>({});
  const [scindreCount, setScindreCount]           = useState(1);

  /* ─── computed ─── */
  const totalValide      = decomptes.filter(d => d.statut === 'paye').reduce((s, d) => s + d.montant, 0);
  const enAttentePaiement = decomptes.find(d => d.statut === 'en_attente_paiement');
  const montantNouveauDecompte = licenciesDisponibles
    .filter(l => selectedLicencies.includes(l.id))
    .reduce((s, l) => s + l.montant, 0);

  const allSelected  = decomptes.length > 0 && selectedRows.length === decomptes.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < decomptes.length;

  const scindreSource    = decomptes.find(d => d.id === selectedRows[0]);
  const scindreHasLignes = (scindreSource?.lignes?.length ?? 0) > 0;
  const scindreGroupBCount = scindreHasLignes
    ? Object.values(scindreAssignment).filter(v => v === 'B').length
    : scindreCount;
  const scindreGroupACount = scindreHasLignes
    ? (scindreSource?.lignes?.length ?? 0) - scindreGroupBCount
    : (scindreSource?.nombreLicences ?? 0) - scindreCount;
  const scindreCanConfirm = scindreHasLignes
    ? scindreGroupBCount > 0 && scindreGroupACount > 0
    : scindreCount >= 1 && scindreCount < (scindreSource?.nombreLicences ?? 2);

  /* ─── handlers existants ─── */
  const handleToggleLicencie = (id: string) =>
    setSelectedLicencies(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleSubmitDecompte = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const id = `DC-2027-${String(decomptes.length + 43).padStart(3, '0')}`;
      setNewDecompteId(id);
      const lignes = licenciesDisponibles.filter(l => selectedLicencies.includes(l.id));
      setDecomptes(prev => [{
        id, date: new Date().toISOString().split('T')[0],
        montant: montantNouveauDecompte, nombreLicences: selectedLicencies.length,
        statut: 'en_attente_validation_cr', statutLabel: 'En attente validation CR',
        lignes: lignes.map(l => ({ ...l })),
      }, ...prev]);
      setIsSubmitting(false);
      setNouveauStep('succes');
    }, 1800);
  };

  const closeNouveauModal = () => {
    setShowNouveauModal(false);
    setNouveauStep('selection');
    setSelectedLicencies([]);
    setNewDecompteId('');
  };

  /* ─── handlers multi-sélection ─── */
  const toggleRow = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedRows(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAllRows = () =>
    setSelectedRows(allSelected ? [] : decomptes.map(d => d.id));

  const handleExtraire = () => {
    const selected = decomptes.filter(d => selectedRows.includes(d.id));
    const csv = [
      'ID;Date;Licences;Montant;Statut',
      ...selected.map(d => `${d.id};${d.date};${d.nombreLicences};${d.montant.toFixed(2)};${d.statutLabel}`),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `decomptes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFusionner = () => {
    const selected = decomptes.filter(d => selectedRows.includes(d.id));
    const newId = `DC-2027-${String(decomptes.length + 43).padStart(3, '0')}`;
    setDecomptes(prev => [{
      id: newId,
      date: new Date().toISOString().split('T')[0],
      montant: selected.reduce((s, d) => s + d.montant, 0),
      nombreLicences: selected.reduce((s, d) => s + d.nombreLicences, 0),
      statut: 'en_attente_validation_cr',
      statutLabel: 'En attente validation CR',
      lignes: selected.flatMap(d => d.lignes ?? []),
    }, ...prev.filter(d => !selectedRows.includes(d.id))]);
    if (selectedDecompte && selectedRows.includes(selectedDecompte.id)) setSelectedDecompte(null);
    setSelectedRows([]);
    setShowFusionnerModal(false);
  };

  const handleScindre = () => {
    if (!scindreSource) return;
    const lignes = scindreSource.lignes ?? [];
    let lignesA: Ligne[], lignesB: Ligne[], montantA: number, montantB: number, countA: number, countB: number;

    if (scindreHasLignes) {
      lignesA = lignes.filter((_, i) => (scindreAssignment[i] ?? 'A') === 'A');
      lignesB = lignes.filter((_, i) => scindreAssignment[i] === 'B');
      if (lignesA.length === 0 || lignesB.length === 0) return;
      montantA = lignesA.reduce((s, l) => s + l.montant, 0);
      montantB = lignesB.reduce((s, l) => s + l.montant, 0);
      countA = lignesA.length;
      countB = lignesB.length;
    } else {
      countA = Math.max(1, Math.min(scindreCount, scindreSource.nombreLicences - 1));
      countB = scindreSource.nombreLicences - countA;
      montantA = Math.round((countA / scindreSource.nombreLicences) * scindreSource.montant * 100) / 100;
      montantB = scindreSource.montant - montantA;
      lignesA = []; lignesB = [];
    }

    const idA = `DC-2027-${String(decomptes.length + 43).padStart(3, '0')}`;
    const idB = `DC-2027-${String(decomptes.length + 44).padStart(3, '0')}`;
    const mkDecompte = (id: string, montant: number, n: number, ligs: Ligne[]): Decompte => ({
      id, date: new Date().toISOString().split('T')[0], montant, nombreLicences: n,
      statut: 'en_attente_validation_cr', statutLabel: 'En attente validation CR', lignes: ligs,
    });

    setDecomptes(prev => [
      mkDecompte(idA, montantA, countA, lignesA),
      mkDecompte(idB, montantB, countB, lignesB),
      ...prev.filter(d => d.id !== scindreSource.id),
    ]);
    if (selectedDecompte?.id === scindreSource.id) setSelectedDecompte(null);
    setSelectedRows([]);
    setScindreAssignment({});
    setScindreCount(1);
    setShowScindreModal(false);
  };

  const handleSupprimer = () => {
    setDecomptes(prev => prev.filter(d => !selectedRows.includes(d.id)));
    if (selectedDecompte && selectedRows.includes(selectedDecompte.id)) setSelectedDecompte(null);
    setSelectedRows([]);
    setShowSupprimerConfirm(false);
  };

  /* ─── render ─── */
  return (
    <div className="min-h-screen">

      {/* Header compact */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Gestion des décomptes</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Saison {club.saison} · {club.nom}</p>
          </div>
          <button
            onClick={() => { setShowNouveauModal(true); setNouveauStep('selection'); }}
            className="btn-primary flex items-center gap-2 text-sm flex-shrink-0"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Nouveau décompte</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-6">

        {/* Alerte paiement en attente */}
        {enAttentePaiement && (
          <div className="card bg-red-50 border-red-200 !p-4 flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-sm text-red-700 font-semibold">Décompte en attente de paiement</p>
              <p className="text-xs text-red-600 mt-0.5">{enAttentePaiement.id} · {enAttentePaiement.montant.toLocaleString('fr-FR')} € · {enAttentePaiement.nombreLicences} licences</p>
            </div>
            <Link
              href={`/club/decomptes/paiement?id=${enAttentePaiement.id}&montant=${enAttentePaiement.montant}`}
              className="flex-shrink-0 flex items-center gap-1.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl transition-colors"
            >
              <CreditCard className="w-4 h-4" aria-hidden="true" />
              Payer maintenant
            </Link>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card">
            <div className="w-9 h-9 bg-ffgym-red/10 rounded-xl flex items-center justify-center mb-3">
              <ReceiptText className="w-4 h-4 text-ffgym-red" aria-hidden="true" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{club.statistiques.decompteEnCours.montant.toLocaleString('fr-FR')} €</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Décompte en cours</p>
            <p className="text-[10px] font-semibold text-slate-400 mt-1.5">{club.statistiques.decompteEnCours.nombreLicences} licences en attente</p>
          </div>
          <div className="card">
            <div className="w-9 h-9 bg-ffgym-blue/10 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle2 className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{totalValide.toLocaleString('fr-FR')} €</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Total payé</p>
            <p className="text-[10px] font-semibold text-slate-400 mt-1.5">{decomptes.filter(d => d.statut === 'paye').reduce((s, d) => s + d.nombreLicences, 0)} licences validées</p>
          </div>
          <div className="card">
            <div className="w-9 h-9 bg-ffgym-blue/10 rounded-xl flex items-center justify-center mb-3">
              <Layers className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{decomptes.length}</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Décomptes</p>
            <p className="text-[10px] font-semibold text-slate-400 mt-1.5">depuis début de saison</p>
          </div>
        </div>

        {/* Table */}
        <div className="card !p-0 overflow-hidden">

            {/* Card header — normal ou barre d'actions */}
            <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white min-h-[3.25rem] flex items-center">
              {selectedRows.length > 0 ? (
                <div className="flex items-center gap-2 w-full flex-wrap">
                  <span className="text-sm font-bold text-slate-900 flex-shrink-0 mr-1">
                    {selectedRows.length} sélectionné{selectedRows.length > 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={handleExtraire}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 border border-slate-200 bg-white px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    Extraire
                  </button>
                  <button
                    onClick={() => setShowFusionnerModal(true)}
                    disabled={selectedRows.length < 2}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 border border-slate-200 bg-white px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <GitMerge className="w-3.5 h-3.5" aria-hidden="true" />
                    Fusionner
                  </button>
                  <button
                    onClick={() => { setScindreAssignment({}); setScindreCount(1); setShowScindreModal(true); }}
                    disabled={selectedRows.length !== 1}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 border border-slate-200 bg-white px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Scissors className="w-3.5 h-3.5" aria-hidden="true" />
                    Scinder
                  </button>
                  <button
                    onClick={() => setShowSupprimerConfirm(true)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-red-600 border border-red-200 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Supprimer
                  </button>
                  <button
                    onClick={() => setSelectedRows([])}
                    className="ml-auto text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                <h3 className="font-bold text-slate-900 text-sm">Historique des décomptes</h3>
              )}
            </div>

            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el: HTMLInputElement | null) => { if (el) el.indeterminate = someSelected; }}
                      onChange={toggleAllRows}
                      className="w-4 h-4 rounded text-ffgym-blue cursor-pointer"
                      aria-label="Tout sélectionner"
                    />
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Référence</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Licences</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Montant</th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {decomptes.map(d => {
                  const style = statutStyles[d.statut] ?? statutStyles.valide;
                  const isRowChecked = selectedRows.includes(d.id);
                  return (
                    <tr
                      key={d.id}
                      onClick={() => setSelectedDecompte(d)}
                      className={`cursor-pointer transition-colors ${
                        isRowChecked ? 'bg-slate-100' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="px-4 py-4 w-10">
                        <input
                          type="checkbox"
                          checked={isRowChecked}
                          onChange={() => {}}
                          onClick={e => toggleRow(e, d.id)}
                          className="w-4 h-4 rounded text-ffgym-blue cursor-pointer"
                          aria-label={`Sélectionner ${d.id}`}
                        />
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono font-semibold text-slate-900 text-sm">{d.id}</span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600 hidden md:table-cell">
                        {new Date(d.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-5 py-4 hidden sm:table-cell">
                        <span className="font-semibold text-slate-900">{d.nombreLicences}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-bold text-slate-900">{d.montant.toLocaleString('fr-FR')} €</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`badge ${style.class} text-xs`}>
                          <style.Icon className="w-3 h-3" aria-hidden="true" />
                          {d.statutLabel}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        {d.statut === 'en_attente_paiement' && (
                          <Link
                            href={`/club/decomptes/paiement?id=${d.id}&montant=${d.montant}`}
                            onClick={e => e.stopPropagation()}
                            className="text-xs font-bold text-white bg-ffgym-red px-3 py-1.5 rounded-lg hover:bg-ffgym-red/90 transition-colors"
                          >
                            Payer
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
        </div>
      </div>

      {/* ═══ Modal : Détail décompte ═══ */}
      {selectedDecompte && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDecompte(null)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
              <div>
                <p className="font-bold text-slate-900 font-mono">{selectedDecompte.id}</p>
                <p className="text-xs text-slate-400 mt-0.5">{new Date(selectedDecompte.date).toLocaleDateString('fr-FR')}</p>
              </div>
              <button onClick={() => setSelectedDecompte(null)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* KPIs */}
            <div className="px-6 py-4 grid grid-cols-2 gap-3 border-b border-slate-100 flex-shrink-0">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-400 font-semibold uppercase">Montant</p>
                <p className="font-bold text-slate-900 text-lg mt-0.5">{selectedDecompte.montant.toLocaleString('fr-FR')} €</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-400 font-semibold uppercase">Licences</p>
                <p className="font-bold text-slate-900 text-lg mt-0.5">{selectedDecompte.nombreLicences}</p>
              </div>
            </div>

            {/* Statut */}
            <div className="px-6 py-4 border-b border-slate-100 flex-shrink-0">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Statut</p>
              {(() => {
                const style = statutStyles[selectedDecompte.statut];
                return (
                  <span className={`badge ${style.class} text-sm`}>
                    <style.Icon className="w-3 h-3" aria-hidden="true" />
                    {selectedDecompte.statutLabel}
                  </span>
                );
              })()}
            </div>

            {/* Lignes */}
            <div className="px-6 py-4 flex-1 overflow-y-auto">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Détail des licences</p>
              {selectedDecompte.lignes && selectedDecompte.lignes.length > 0 ? (
                <div className="space-y-2">
                  {selectedDecompte.lignes.map((l, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-ffgym-blue/10 text-ffgym-blue flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {l.prenom[0]}{l.nom[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{l.prenom} {l.nom.toUpperCase()}</p>
                          <span className="text-[10px] badge badge-discipline">{l.discipline}</span>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-slate-700">{l.montant.toLocaleString('fr-FR')} €</span>
                    </div>
                  ))}
                  {selectedDecompte.nombreLicences > (selectedDecompte.lignes?.length ?? 0) && (
                    <p className="text-xs text-slate-400 text-center py-2">
                      +{selectedDecompte.nombreLicences - (selectedDecompte.lignes?.length ?? 0)} autres licences...
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-400 text-center py-4">Détail non disponible</p>
              )}
            </div>

            {/* Action paiement */}
            {selectedDecompte.statut === 'en_attente_paiement' && (
              <div className="px-6 pb-5 pt-2 flex-shrink-0 border-t border-slate-100">
                <Link
                  href={`/club/decomptes/paiement?id=${selectedDecompte.id}&montant=${selectedDecompte.montant}`}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-ffgym-red text-white font-bold rounded-xl hover:bg-ffgym-red/90 transition-colors text-sm"
                >
                  <CreditCard className="w-4 h-4" aria-hidden="true" />
                  Procéder au paiement
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ Modal : Fusionner ═══ */}
      {showFusionnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowFusionnerModal(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900">Fusionner les décomptes</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedRows.length} décomptes sélectionnés</p>
              </div>
              <button onClick={() => setShowFusionnerModal(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600">Les décomptes sélectionnés seront regroupés en un seul. Cette action est irréversible.</p>
              <div className="space-y-2">
                {decomptes.filter(d => selectedRows.includes(d.id)).map(d => {
                  const style = statutStyles[d.statut];
                  return (
                    <div key={d.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-mono font-semibold text-slate-900 text-sm">{d.id}</p>
                        <span className={`badge ${style.class} text-[10px] mt-1`}>{d.statutLabel}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">{d.montant.toLocaleString('fr-FR')} €</p>
                        <p className="text-xs text-slate-500">{d.nombreLicences} licences</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-ffgym-blue/5 border border-ffgym-blue/20 rounded-xl p-3 flex items-center justify-between">
                <p className="text-xs font-bold text-ffgym-blue">Décompte fusionné</p>
                <p className="text-sm font-bold text-slate-900">
                  {decomptes.filter(d => selectedRows.includes(d.id)).reduce((s, d) => s + d.montant, 0).toLocaleString('fr-FR')} €
                  · {decomptes.filter(d => selectedRows.includes(d.id)).reduce((s, d) => s + d.nombreLicences, 0)} licences
                </p>
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3 justify-end">
              <button onClick={() => setShowFusionnerModal(false)} className="btn-outline">Annuler</button>
              <button onClick={handleFusionner} className="btn-primary flex items-center gap-2">
                <GitMerge className="w-4 h-4" aria-hidden="true" />
                Confirmer la fusion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Modal : Scinder ═══ */}
      {showScindreModal && scindreSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowScindreModal(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="font-bold text-slate-900">Scinder le décompte</h3>
                <p className="text-xs text-slate-400 mt-0.5">{scindreSource.id} · {scindreSource.montant.toLocaleString('fr-FR')} € · {scindreSource.nombreLicences} licences</p>
              </div>
              <button onClick={() => setShowScindreModal(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Compteurs A / B */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-ffgym-blue/5 border border-ffgym-blue/20 rounded-xl p-3 text-center">
                  <p className="text-xs font-bold text-ffgym-blue">Décompte A</p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">{scindreGroupACount}</p>
                  <p className="text-[10px] text-slate-400">licences</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                  <p className="text-xs font-bold text-amber-600">Décompte B</p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">{scindreGroupBCount}</p>
                  <p className="text-[10px] text-slate-400">licences</p>
                </div>
              </div>

              {scindreHasLignes ? (
                <>
                  <p className="text-sm text-slate-600">Cliquez sur le badge <strong>A</strong> ou <strong>B</strong> pour affecter chaque licence à un décompte.</p>
                  <div className="space-y-2">
                    {scindreSource.lignes!.map((l, i) => {
                      const group: ScindreGroup = scindreAssignment[i] ?? 'A';
                      return (
                        <div
                          key={i}
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                            group === 'A' ? 'border-ffgym-blue/30 bg-ffgym-blue/5' : 'border-amber-300 bg-amber-50'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {l.prenom[0]}{l.nom[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{l.prenom} {l.nom.toUpperCase()}</p>
                            <span className="badge badge-discipline text-[9px]">{l.discipline}</span>
                          </div>
                          <span className="text-sm font-bold text-slate-700 flex-shrink-0">{l.montant.toFixed(2)} €</span>
                          <button
                            onClick={() => setScindreAssignment(prev => ({ ...prev, [i]: group === 'A' ? 'B' : 'A' }))}
                            className={`w-8 h-8 rounded-full text-xs font-bold flex-shrink-0 flex items-center justify-center transition-colors ${
                              group === 'A' ? 'bg-ffgym-blue text-white hover:bg-ffgym-blue/80' : 'bg-amber-500 text-white hover:bg-amber-400'
                            }`}
                          >
                            {group}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-slate-600">Le détail des lignes n'est pas disponible. Indiquez le nombre de licences à affecter au décompte A.</p>
                  <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-end gap-4">
                      <div className="flex-1">
                        <label className="text-xs font-semibold text-ffgym-blue block mb-1">Décompte A — nombre de licences</label>
                        <input
                          type="number"
                          min={1}
                          max={scindreSource.nombreLicences - 1}
                          value={scindreCount}
                          onChange={e => setScindreCount(Math.max(1, Math.min(parseInt(e.target.value) || 1, scindreSource.nombreLicences - 1)))}
                          className="input-base w-full"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs font-semibold text-amber-600 block mb-1">Décompte B — reste</label>
                        <div className="input-base bg-slate-100 text-slate-900 font-bold cursor-not-allowed select-none">
                          {scindreSource.nombreLicences - scindreCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex gap-3 justify-end flex-shrink-0">
              <button onClick={() => setShowScindreModal(false)} className="btn-outline">Annuler</button>
              <button
                onClick={handleScindre}
                disabled={!scindreCanConfirm}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Scissors className="w-4 h-4" aria-hidden="true" />
                Confirmer la scission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Modal : Supprimer ═══ */}
      {showSupprimerConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowSupprimerConfirm(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                Supprimer {selectedRows.length} décompte{selectedRows.length > 1 ? 's' : ''} ?
              </h3>
              <p className="text-sm text-slate-500 mb-2">Les décomptes suivants seront supprimés définitivement :</p>
              <div className="flex flex-wrap gap-1.5 justify-center mb-6">
                {decomptes.filter(d => selectedRows.includes(d.id)).map(d => (
                  <span key={d.id} className="font-mono text-xs font-semibold bg-slate-100 text-slate-700 px-2 py-1 rounded-lg">{d.id}</span>
                ))}
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setShowSupprimerConfirm(false)} className="btn-outline">Annuler</button>
                <button
                  onClick={handleSupprimer}
                  className="flex items-center gap-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Modal : Nouveau décompte ═══ */}
      {showNouveauModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeNouveauModal}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Étape succès */}
            {nouveauStep === 'succes' ? (
              <div className="p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-2">Décompte créé avec succès</h3>
                <p className="text-slate-500 mb-1">Référence : <span className="font-mono font-bold text-slate-900">{newDecompteId}</span></p>
                <p className="text-sm text-slate-500 mb-6">Le décompte a été transmis au CR Île-de-France pour validation. Vous recevrez une notification sous 48h.</p>
                <button onClick={closeNouveauModal} className="btn-outline">Fermer</button>
              </div>
            ) : (
              <>
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {nouveauStep === 'selection' ? 'Sélectionner les licenciés' : 'Récapitulatif du décompte'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Étape {nouveauStep === 'selection' ? '1' : '2'} / 2</p>
                  </div>
                  <button onClick={closeNouveauModal} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Étape 1 */}
                {nouveauStep === 'selection' && (
                  <>
                    <div className="flex-1 overflow-y-auto p-6">
                      <p className="text-sm text-slate-600 mb-4">Sélectionnez les licenciés à inclure dans ce décompte. Seuls les licenciés non encore décomptés sont affichés.</p>
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                        <span className="text-sm font-semibold text-slate-700">
                          {selectedLicencies.length} / {licenciesDisponibles.length} sélectionné(s)
                        </span>
                        <button
                          onClick={() => setSelectedLicencies(
                            selectedLicencies.length === licenciesDisponibles.length ? [] : licenciesDisponibles.map(l => l.id)
                          )}
                          className="text-xs font-semibold text-ffgym-blue"
                        >
                          {selectedLicencies.length === licenciesDisponibles.length ? 'Tout désélectionner' : 'Tout sélectionner'}
                        </button>
                      </div>
                      <div className="space-y-2">
                        {licenciesDisponibles.map(l => {
                          const isChecked = selectedLicencies.includes(l.id);
                          return (
                            <label
                              key={l.id}
                              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                isChecked ? 'border-ffgym-blue bg-ffgym-blue/5' : 'border-slate-100 hover:border-slate-200 bg-white'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleLicencie(l.id)}
                                className="w-4 h-4 text-ffgym-blue rounded"
                              />
                              <div className="w-10 h-10 rounded-full bg-ffgym-blue/10 text-ffgym-blue flex items-center justify-center font-bold text-sm flex-shrink-0">
                                {l.prenom[0]}{l.nom[0]}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-slate-900">{l.prenom} {l.nom.toUpperCase()}</p>
                                <span className="text-[10px] badge badge-discipline">{l.discipline}</span>
                              </div>
                              <span className="font-bold text-slate-700 flex-shrink-0">{l.montant.toFixed(2)} €</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between flex-shrink-0 bg-white">
                      <div>
                        <span className="text-sm text-slate-500">Total sélectionné :</span>
                        <span className="font-bold text-slate-900 text-lg ml-2">{montantNouveauDecompte.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</span>
                      </div>
                      <button
                        onClick={() => setNouveauStep('recap')}
                        disabled={selectedLicencies.length === 0}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continuer →
                      </button>
                    </div>
                  </>
                )}

                {/* Étape 2 */}
                {nouveauStep === 'recap' && (
                  <>
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <p className="text-xs text-slate-400 uppercase font-semibold">Club</p>
                          <p className="font-bold text-slate-900 mt-1">{club.nom}</p>
                          <p className="text-xs text-slate-500 font-mono">{club.numeroAffiliation}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <p className="text-xs text-slate-400 uppercase font-semibold">Saison</p>
                          <p className="font-bold text-slate-900 mt-1">{club.saison}</p>
                        </div>
                      </div>
                      <div className="card !p-0 overflow-hidden">
                        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
                          <p className="text-xs font-bold text-slate-500 uppercase">Licenciés inclus ({selectedLicencies.length})</p>
                        </div>
                        <div className="divide-y divide-slate-100">
                          {licenciesDisponibles.filter(l => selectedLicencies.includes(l.id)).map(l => (
                            <div key={l.id} className="px-5 py-3 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-ffgym-blue/10 text-ffgym-blue flex items-center justify-center text-xs font-bold">
                                  {l.prenom[0]}{l.nom[0]}
                                </div>
                                <p className="text-sm font-semibold text-slate-900">{l.prenom} {l.nom.toUpperCase()}</p>
                                <span className="badge badge-discipline text-[9px]">{l.discipline}</span>
                              </div>
                              <span className="text-sm font-bold text-slate-700">{l.montant.toFixed(2)} €</span>
                            </div>
                          ))}
                        </div>
                        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between">
                          <span className="font-bold text-slate-900">Total</span>
                          <span className="font-bold text-slate-900 text-lg">{montantNouveauDecompte.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</span>
                        </div>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                        <p className="text-xs text-amber-700">
                          <Clock className="w-3 h-3 mr-1.5 inline" aria-hidden="true" />
                          Le décompte sera soumis au CR Île-de-France pour validation. Délai habituel : 24 à 48h ouvrées.
                        </p>
                      </div>
                    </div>
                    <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between flex-shrink-0 bg-white">
                      <button onClick={() => setNouveauStep('selection')} className="btn-outline">← Retour</button>
                      <button
                        onClick={handleSubmitDecompte}
                        disabled={isSubmitting}
                        className="btn-primary flex items-center gap-2 disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Envoi au CR...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" aria-hidden="true" />
                            Soumettre au CR
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
