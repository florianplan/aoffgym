'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import {
  FileText, ArrowLeftRight, Plus, Search, FileDown, Eye, Send, X,
  CheckCircle2, ArrowRight, Check, MoreHorizontal, UserX, Users, Clock, TrendingDown,
} from 'lucide-react';
import licenciesData from '@/data/licencies.json';
import disciplinesData from '@/data/disciplines.json';

const { licencies } = licenciesData;
const { disciplines } = disciplinesData;

const getStatutStyle = (statut: string) => {
  switch (statut) {
    case 'valide':      return { class: 'badge-success',    label: 'Valide',       dot: 'bg-emerald-500' };
    case 'en_attente':  return { class: 'badge-warning',    label: 'En attente',   dot: 'bg-amber-500'   };
    case 'expire':      return { class: 'badge-neutral',    label: 'Expiré',       dot: 'bg-slate-400'   };
    case 'pre_licence': return { class: 'badge-discipline', label: 'Pré-licence',  dot: 'bg-ffgym-blue'  };
    default:            return { class: 'badge-neutral',    label: statut,         dot: 'bg-slate-400'   };
  }
};

const getInitials = (nom: string, prenom: string) => `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR');

function generateAttestation(licencie: (typeof licencies)[0]) {
  const doc = new jsPDF();
  doc.setFillColor(0, 43, 85);
  doc.rect(0, 0, 210, 40, 'F');
  doc.setFillColor(200, 16, 46);
  doc.rect(0, 35, 210, 5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ATTESTATION DE LICENCE', 105, 20, { align: 'center' });
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Fédération Française de Gymnastique', 105, 31, { align: 'center' });
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text(`Saison ${licencie.saison}`, 105, 55, { align: 'center' });
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(20, 65, 170, 85, 4, 4, 'F');
  const fields = [
    { label: 'Nom',               value: licencie.nom.toUpperCase() },
    { label: 'Prénom',            value: licencie.prenom },
    { label: 'Date de naissance', value: formatDate(licencie.dateNaissance) },
    { label: 'N° de licence',     value: licencie.numeroLicence ?? 'En attente' },
    { label: 'Discipline',        value: licencie.disciplinePrincipale },
  ];
  let y = 78;
  fields.forEach(f => {
    doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 116, 139); doc.setFontSize(10);
    doc.text(`${f.label} :`, 28, y);
    doc.setFont('helvetica', 'bold'); doc.setTextColor(15, 23, 42);
    doc.text(f.value, 80, y);
    y += 13;
  });
  doc.setFillColor(licencie.statut === 'valide' ? 16 : 234, licencie.statut === 'valide' ? 185 : 179, licencie.statut === 'valide' ? 129 : 8);
  doc.roundedRect(20, 158, 170, 22, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(licencie.statut === 'valide' ? 'LICENCE VALIDE' : 'EN ATTENTE DE VALIDATION', 105, 170, { align: 'center' });
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Fédération Française de Gymnastique — 7 ter Cour des Petites Écuries 75010 Paris — www.ffgym.fr', 105, 285, { align: 'center' });
  doc.save(`attestation_${licencie.numeroLicence ?? licencie.id}.pdf`);
}

/* ─── KPI stats — calculés sur le dataset complet ─── */

const kpiStats = [
  {
    id: 'total',
    label: 'Total licenciés',
    value: licencies.length,
    Icon: Users,
    iconColor: 'text-ffgym-red',
    iconBg: 'bg-ffgym-red/10',
    filterValue: '',
    alert: false,
  },
  {
    id: 'valides',
    label: 'Valides',
    value: licencies.filter(l => l.statut === 'valide').length,
    Icon: CheckCircle2,
    iconColor: 'text-ffgym-blue',
    iconBg: 'bg-ffgym-blue/10',
    filterValue: 'valide',
    alert: false,
  },
  {
    id: 'pre_licence',
    label: 'Pré-licences',
    value: licencies.filter(l => l.statut === 'pre_licence').length,
    Icon: Clock,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
    filterValue: 'pre_licence',
    alert: licencies.filter(l => l.statut === 'pre_licence').length > 0,
  },
  {
    id: 'expires',
    label: 'Expirés',
    value: licencies.filter(l => l.statut === 'expire').length,
    Icon: TrendingDown,
    iconColor: 'text-slate-500',
    iconBg: 'bg-slate-100',
    filterValue: 'expire',
    alert: false,
  },
];

export default function LicenciesPage() {
  const [search, setSearch] = useState('');
  const [filterStatut, setFilterStatut] = useState('');
  const [filterDiscipline, setFilterDiscipline] = useState('');
  const [filterFonction, setFilterFonction] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLicencie, setSelectedLicencie] = useState<(typeof licencies)[0] | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<'infos' | 'historique'>('infos');
  const [showMutationModal, setShowMutationModal] = useState(false);
  const [mutationSearch, setMutationSearch] = useState('');
  const [mutationResult, setMutationResult] = useState<null | { nom: string; club: string; numero: string }>(null);
  const [mutationDone, setMutationDone] = useState(false);
  const [showPreLicenceModal, setShowPreLicenceModal] = useState(false);
  const [preLicenceStep, setPreLicenceStep] = useState<'form' | 'email' | 'suivi'>('form');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const itemsPerPage = 10;

  const hasFilters = search !== '' || filterStatut !== '' || filterDiscipline !== '' || filterFonction !== '';

  const filteredLicencies = useMemo(() => {
    return licencies.filter(l => {
      const matchSearch = search === '' ||
        l.nom.toLowerCase().includes(search.toLowerCase()) ||
        l.prenom.toLowerCase().includes(search.toLowerCase()) ||
        (l.numeroLicence && l.numeroLicence.toLowerCase().includes(search.toLowerCase()));
      const matchStatut = filterStatut === '' || l.statut === filterStatut;
      const matchDiscipline = filterDiscipline === '' || l.disciplinePrincipale === filterDiscipline;
      const matchFonction = filterFonction === '' || l.fonction === filterFonction;
      return matchSearch && matchStatut && matchDiscipline && matchFonction;
    });
  }, [search, filterStatut, filterDiscipline, filterFonction]);

  const totalPages = Math.ceil(filteredLicencies.length / itemsPerPage);
  const paginatedLicencies = filteredLicencies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSearch(''); setFilterStatut(''); setFilterDiscipline(''); setFilterFonction(''); setCurrentPage(1);
  };

  const toggleRow = (id: string) => {
    setSelectedRows(r => r.includes(id) ? r.filter(x => x !== id) : [...r, id]);
  };

  const handleKpiClick = (filterValue: string) => {
    setFilterStatut(prev => prev === filterValue ? '' : filterValue);
    setCurrentPage(1);
  };

  const handleMutationSearch = () => {
    if (mutationSearch.length > 2) {
      setMutationResult({ nom: 'Étienne RENARD', club: 'AS Lyon Gym', numero: '2027-ARA-200456' });
    }
  };

  /* ─── Pagination helpers ─── */
  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const half = 2;
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + 4);
    start = Math.max(1, end - 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="min-h-screen">

      {/* Header compact */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Gestion des licenciés</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {filteredLicencies.length} résultat{filteredLicencies.length > 1 ? 's' : ''} · Saison 2026-2027
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {selectedRows.length > 0 && (
              <button className="flex items-center gap-2 text-sm font-semibold text-ffgym-blue border border-ffgym-blue/30 bg-ffgym-blue/5 px-4 py-2 rounded-xl hover:bg-ffgym-blue/10 transition-all">
                <FileText className="w-3 h-3" aria-hidden="true" />
                <span className="hidden sm:inline">Rattacher {selectedRows.length} licence{selectedRows.length > 1 ? 's' : ''}</span>
                <span className="sm:hidden">{selectedRows.length}</span>
              </button>
            )}
            <button
              onClick={() => { setShowMutationModal(true); setMutationResult(null); setMutationDone(false); setMutationSearch(''); }}
              className="flex items-center gap-2 text-sm font-semibold border-2 border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition-all"
            >
              <ArrowLeftRight className="w-3 h-3" aria-hidden="true" />
              <span className="hidden sm:inline">Mutation</span>
            </button>
            <button
              onClick={() => { setShowPreLicenceModal(true); setPreLicenceStep('form'); }}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span className="hidden sm:inline">Pré-licence</span>
              <span className="sm:hidden">+</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-6">

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiStats.map(kpi => {
            const isActive = filterStatut === kpi.filterValue && kpi.filterValue !== '';
            return (
              <button
                key={kpi.id}
                onClick={() => handleKpiClick(kpi.filterValue)}
                className={`card relative text-left h-full hover:scale-[1.02] transition-all ${kpi.alert ? 'border-amber-200' : ''} ${isActive ? 'ring-2 ring-ffgym-blue shadow-md' : ''}`}
              >
                {kpi.alert && (
                  <span className="absolute top-3 right-3 w-2 h-2 bg-ffgym-red rounded-full" aria-hidden="true" />
                )}
                <div className={`w-9 h-9 ${kpi.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                  <kpi.Icon className={`w-4 h-4 ${kpi.iconColor}`} aria-hidden="true" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{kpi.label}</p>
                {isActive && (
                  <p className="text-[10px] font-semibold mt-1.5 text-ffgym-blue">Filtre actif · cliquer pour annuler</p>
                )}
              </button>
            );
          })}
        </div>

        {/* Table dans une card unifiée */}
        <div className="card !p-0 overflow-hidden">

          {/* Header filtres */}
          <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center gap-3 bg-gradient-to-r from-slate-50/80 to-white">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input
                type="search"
                placeholder="Rechercher par nom, prénom ou n° licence..."
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                className="input-base !pl-10 !py-2 text-sm"
              />
            </div>
            <select
              value={filterStatut}
              onChange={e => { setFilterStatut(e.target.value); setCurrentPage(1); }}
              className="select-base !w-auto min-w-[140px] !py-2 text-sm"
            >
              <option value="">Tous statuts</option>
              <option value="valide">Valide</option>
              <option value="en_attente">En attente</option>
              <option value="pre_licence">Pré-licence</option>
              <option value="expire">Expiré</option>
            </select>
            <select
              value={filterDiscipline}
              onChange={e => { setFilterDiscipline(e.target.value); setCurrentPage(1); }}
              className="select-base !w-auto min-w-[140px] !py-2 text-sm"
            >
              <option value="">Toutes disciplines</option>
              {disciplines.map(d => <option key={d.code} value={d.abreviation}>{d.abreviation}</option>)}
            </select>
            <select
              value={filterFonction}
              onChange={e => { setFilterFonction(e.target.value); setCurrentPage(1); }}
              className="select-base !w-auto min-w-[140px] !py-2 text-sm"
            >
              <option value="">Toutes fonctions</option>
              <option value="pratiquant">Pratiquant</option>
              <option value="encadrant">Encadrant</option>
              <option value="dirigeant">Dirigeant</option>
            </select>
            {hasFilters && (
              <button onClick={resetFilters} className="btn-ghost !px-3 !py-2 text-sm">
                Réinitialiser
              </button>
            )}
            <span className="ml-auto text-xs font-semibold text-slate-400 flex-shrink-0">
              {filteredLicencies.length} résultat{filteredLicencies.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Table */}
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100/50">
              <tr>
                <th className="px-4 py-4 w-10">
                  <input
                    type="checkbox"
                    className="rounded"
                    onChange={e => setSelectedRows(e.target.checked ? paginatedLicencies.map(l => l.id) : [])}
                    checked={selectedRows.length === paginatedLicencies.length && paginatedLicencies.length > 0}
                  />
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Licencié</th>
                <th className="hidden lg:table-cell px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-48">N° Licence</th>
                <th className="hidden md:table-cell px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date naiss.</th>
                <th className="hidden md:table-cell px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Discipline</th>
                <th className="hidden lg:table-cell px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Fonction</th>
                <th className="px-5 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                <th className="px-5 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedLicencies.map(licencie => {
                const statutStyle = getStatutStyle(licencie.statut);
                const isSelected = selectedRows.includes(licencie.id);
                return (
                  <tr key={licencie.id} className={`hover:bg-slate-50/80 transition-colors group ${isSelected ? 'bg-ffgym-blue/5' : ''}`}>
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={isSelected}
                        onChange={() => toggleRow(licencie.id)}
                      />
                    </td>
                    <td className="px-5 py-4 max-w-0 w-full">
                      <button
                        className="flex items-center gap-3 text-left w-full min-w-0"
                        onClick={() => { setSelectedLicencie(licencie); setActiveDetailTab('infos'); }}
                      >
                        <div className="avatar avatar-md flex-shrink-0">{getInitials(licencie.nom, licencie.prenom)}</div>
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 truncate">{licencie.prenom} {licencie.nom.toUpperCase()}</p>
                          <p className="text-sm text-slate-500 truncate">{licencie.email}</p>
                        </div>
                      </button>
                    </td>
                    <td className="hidden lg:table-cell px-5 py-4 whitespace-nowrap">
                      {licencie.numeroLicence
                        ? <span className="text-sm text-slate-600 font-mono bg-slate-100 px-3 py-1.5 rounded-xl">{licencie.numeroLicence}</span>
                        : <span className="text-sm text-slate-400 italic">En attente</span>
                      }
                    </td>
                    <td className="hidden md:table-cell px-5 py-4 text-sm text-slate-600">{formatDate(licencie.dateNaissance)}</td>
                    <td className="hidden md:table-cell px-5 py-4">
                      <span className="badge badge-discipline">{licencie.disciplinePrincipale}</span>
                    </td>
                    <td className="hidden lg:table-cell px-5 py-4 text-sm text-slate-600 capitalize">{licencie.fonction}</td>
                    <td className="px-5 py-4">
                      <span className={`badge ${statutStyle.class}`}>
                        <span className={`w-2 h-2 ${statutStyle.dot} rounded-full`} />
                        {statutStyle.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => generateAttestation(licencie)}
                          className="p-2 text-slate-400 hover:text-ffgym-blue hover:bg-ffgym-blue/10 rounded-xl transition-colors"
                          title="Télécharger l'attestation"
                        >
                          <FileDown className="w-5 h-5" aria-hidden="true" />
                        </button>
                        <button
                          onClick={() => { setSelectedLicencie(licencie); setActiveDetailTab('infos'); }}
                          className="p-2 text-slate-400 hover:text-ffgym-red hover:bg-ffgym-red/10 rounded-xl transition-colors"
                          title="Voir la fiche"
                        >
                          <Eye className="w-5 h-5" aria-hidden="true" />
                        </button>
                        {licencie.statut === 'pre_licence' && (
                          <button
                            onClick={() => { setSelectedLicencie(licencie); setShowPreLicenceModal(true); setPreLicenceStep('form'); }}
                            className="p-2 text-slate-400 hover:text-ffgym-blue hover:bg-ffgym-blue/10 rounded-xl transition-colors"
                            title="Envoyer formulaire au futur licencié"
                          >
                            <Send className="w-5 h-5" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredLicencies.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <UserX className="w-6 h-6 text-slate-400" aria-hidden="true" />
              </div>
              <p className="text-slate-500 font-medium mb-3">Aucun licencié trouvé</p>
              {hasFilters && (
                <button onClick={resetFilters} className="btn-ghost !px-4 !py-2 text-sm">
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          )}

          {filteredLicencies.length > 0 && (
            <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-sm text-slate-500 font-medium">
                {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, filteredLicencies.length)} / {filteredLicencies.length}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border-2 border-slate-200 rounded-xl text-sm text-slate-600 font-semibold hover:bg-slate-50 disabled:opacity-40 transition-all"
                  aria-label="Page précédente"
                >
                  ←
                </button>
                {getPageNumbers().map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${currentPage === p ? 'bg-ffgym-red text-white' : 'border-2 border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border-2 border-slate-200 rounded-xl text-sm text-slate-600 font-semibold hover:bg-slate-50 disabled:opacity-40 transition-all"
                  aria-label="Page suivante"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fiche licencié — panel */}
      {selectedLicencie && !showMutationModal && !showPreLicenceModal && (
        <div className="fixed inset-0 z-40 flex justify-end" onClick={() => setSelectedLicencie(null)}>
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="avatar avatar-md">{getInitials(selectedLicencie.nom, selectedLicencie.prenom)}</div>
                <div>
                  <p className="font-bold text-slate-900">{selectedLicencie.prenom} {selectedLicencie.nom.toUpperCase()}</p>
                  <span className={`badge ${getStatutStyle(selectedLicencie.statut).class} text-xs`}>
                    {getStatutStyle(selectedLicencie.statut).label}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedLicencie(null)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex gap-1 bg-slate-100 p-1 mx-4 mt-4 rounded-xl">
              {(['infos', 'historique'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveDetailTab(tab)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeDetailTab === tab ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>
                  {tab === 'infos' ? 'Informations' : 'Historique'}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-4">
              {activeDetailTab === 'infos' && (
                <>
                  {[
                    { label: 'N° Licence',        value: selectedLicencie.numeroLicence ?? 'En attente', mono: true },
                    { label: 'Date de naissance',  value: formatDate(selectedLicencie.dateNaissance) },
                    { label: 'Email',              value: selectedLicencie.email },
                    { label: 'Téléphone',          value: selectedLicencie.telephone },
                    { label: 'Adresse',            value: `${selectedLicencie.adresse.rue}, ${selectedLicencie.adresse.codePostal} ${selectedLicencie.adresse.ville}` },
                    { label: 'Discipline',         value: selectedLicencie.disciplinePrincipale },
                    { label: 'Fonction',           value: selectedLicencie.fonction },
                  ].map(f => (
                    <div key={f.label} className="flex justify-between py-2.5 border-b border-slate-100">
                      <span className="text-sm text-slate-500">{f.label}</span>
                      <span className={`text-sm font-semibold text-slate-900 ${f.mono ? 'font-mono' : ''}`}>{f.value}</span>
                    </div>
                  ))}
                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={() => generateAttestation(selectedLicencie)}
                      className="w-full py-3 bg-ffgym-blue text-white font-semibold rounded-xl hover:bg-ffgym-gradient-start transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <FileDown className="w-4 h-4" aria-hidden="true" />
                      Télécharger l'attestation PDF
                    </button>
                  </div>
                </>
              )}

              {activeDetailTab === 'historique' && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Historique des saisons</p>
                  <div className="flex items-start gap-3 p-3 bg-ffgym-blue/5 rounded-xl border border-ffgym-blue/15">
                    <div className="w-1.5 h-1.5 rounded-full bg-ffgym-blue mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900 text-sm">{selectedLicencie.saison}</p>
                        <span className="badge badge-success text-[10px]">Actuelle</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Gym'Étoiles Paris 15 · {selectedLicencie.disciplinePrincipale}</p>
                    </div>
                  </div>
                  {selectedLicencie.historique?.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-700 text-sm">{h.saison}</p>
                          <span className="badge badge-success text-[10px]">{h.statut}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{h.club} · {h.discipline}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mutation Modal */}
      {showMutationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowMutationModal(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900">Créer une mutation</h3>
              <button onClick={() => setShowMutationModal(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {mutationDone ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Mutation soumise</h4>
                <p className="text-sm text-slate-500">La demande de mutation a été transmise au CR pour validation.</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-slate-500 mb-4">Recherchez le licencié à muter dans votre club par n° de licence ou nom/prénom.</p>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={mutationSearch}
                      onChange={e => setMutationSearch(e.target.value)}
                      placeholder="N° licence, nom ou prénom..."
                      className="input-base flex-1 text-sm"
                    />
                    <button onClick={handleMutationSearch} className="px-4 py-2.5 bg-ffgym-blue text-white font-semibold rounded-xl hover:bg-ffgym-gradient-start transition-colors text-sm">
                      <Search className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  {mutationResult && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{mutationResult.nom}</p>
                          <p className="text-xs font-mono text-slate-500">{mutationResult.numero}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Club actuel : {mutationResult.club}</p>
                        </div>
                        <span className="badge badge-success text-xs">Trouvé</span>
                      </div>
                      <div className="text-xs text-slate-600 bg-ffgym-blue/5 border border-ffgym-blue/15 rounded-lg p-2 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3 text-ffgym-blue" aria-hidden="true" />
                        Vers : <strong>Gym'Étoiles Paris 15</strong>
                      </div>
                      <button
                        onClick={() => setMutationDone(true)}
                        className="w-full py-3 bg-ffgym-blue text-white font-semibold rounded-xl hover:bg-ffgym-gradient-start transition-colors text-sm"
                      >
                        Confirmer la mutation
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Pré-licence workflow */}
      {showPreLicenceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowPreLicenceModal(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900">
                Pré-licence{selectedLicencie ? ` — ${selectedLicencie.prenom} ${selectedLicencie.nom}` : ''}
              </h3>
              <button onClick={() => setShowPreLicenceModal(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-5">
              {(['form', 'email', 'suivi'] as const).map((s, i) => (
                <button key={s} onClick={() => setPreLicenceStep(s)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${preLicenceStep === s ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}>
                  {i + 1}. {s === 'form' ? 'Formulaire' : s === 'email' ? 'Envoi' : 'Suivi'}
                </button>
              ))}
            </div>

            {preLicenceStep === 'form' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">Vérifiez les informations du futur licencié avant d'envoyer le formulaire de complétion.</p>
                <div className="space-y-3">
                  {[
                    { label: 'Nom',               value: selectedLicencie?.nom ?? '' },
                    { label: 'Prénom',             value: selectedLicencie?.prenom ?? '' },
                    { label: 'Date de naissance',  value: selectedLicencie ? formatDate(selectedLicencie.dateNaissance) : '' },
                    { label: 'Email',              value: selectedLicencie?.email ?? '' },
                    { label: 'Discipline',         value: selectedLicencie?.disciplinePrincipale ?? '' },
                  ].map(f => (
                    <div key={f.label} className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{f.label}</label>
                      <input type="text" defaultValue={f.value} className="input-base text-sm" />
                    </div>
                  ))}
                </div>
                <button onClick={() => setPreLicenceStep('email')} className="w-full py-3 bg-ffgym-blue text-white font-semibold rounded-xl text-sm">
                  Préparer l'envoi →
                </button>
              </div>
            )}

            {preLicenceStep === 'email' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">Aperçu de l'email qui sera envoyé au futur licencié.</p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                  <p className="text-xs text-slate-400">De : <strong>Gym'Étoiles Paris 15</strong> &lt;licences@gymetoiles.fr&gt;</p>
                  <p className="text-xs text-slate-400">À : <strong>{selectedLicencie?.email ?? '—'}</strong></p>
                  <p className="text-xs text-slate-400">Objet : Complétez votre demande de licence FFGym</p>
                  <hr className="border-slate-200" />
                  <p className="text-sm text-slate-700">Bonjour <strong>{selectedLicencie?.prenom ?? ''}</strong>,</p>
                  <p className="text-sm text-slate-600 mt-2">
                    Le club Gym'Étoiles Paris 15 a préparé votre dossier de pré-licence pour la saison 2026-2027.
                    Cliquez sur le lien ci-dessous pour compléter vos informations (adresse, certificat médical, photo).
                  </p>
                  <div className="bg-ffgym-blue/8 border border-ffgym-blue/20 rounded-lg px-3 py-2 text-xs font-mono text-ffgym-blue mt-2 break-all">
                    https://licence.ffgym.fr/pre-licence/{selectedLicencie?.id ?? 'new'}/complete?token=abc123xyz
                  </div>
                  <p className="text-xs text-slate-400 mt-2">Ce lien est valable 14 jours.</p>
                </div>
                <button
                  onClick={() => setPreLicenceStep('suivi')}
                  className="w-full py-3 bg-ffgym-blue text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Envoyer le formulaire
                </button>
              </div>
            )}

            {preLicenceStep === 'suivi' && (
              <div className="space-y-4">
                <div className="text-center py-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <Send className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <p className="font-semibold text-slate-900">Email envoyé !</p>
                  <p className="text-sm text-slate-500 mt-1">À {selectedLicencie?.email ?? '—'}</p>
                </div>
                <div className="card bg-slate-50 border-slate-200 !p-4 space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Suivi de complétion</p>
                  {[
                    { label: 'Email envoyé',       done: true,  date: 'Il y a quelques secondes' },
                    { label: 'Formulaire ouvert',  done: false, date: '' },
                    { label: 'Données complétées', done: false, date: '' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${s.done ? 'bg-ffgym-blue text-white' : 'bg-slate-200 text-slate-400'}`}>
                        {s.done ? <Check className="w-3 h-3" aria-hidden="true" /> : <MoreHorizontal className="w-3 h-3" aria-hidden="true" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${s.done ? 'text-slate-900' : 'text-slate-400'}`}>{s.label}</p>
                        {s.date && <p className="text-xs text-slate-400">{s.date}</p>}
                      </div>
                    </div>
                  ))}
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Progression</span><span>33%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-2 bg-ffgym-blue rounded-full" style={{ width: '33%' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
