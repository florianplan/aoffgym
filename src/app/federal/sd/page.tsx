'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Landmark, Network, AlertTriangle,
  CloudUpload, FileText, Download, FolderOpen,
  CheckCircle2, Clock
} from 'lucide-react';

const structures = [
  {
    id: 'CR-IDF', code: 'IDF', label: 'CR Île-de-France', type: 'CR',
    president: 'Marie Dupont', email: 'president@cr-idf.ffgym.fr',
    clubs: 127, licencies: 8432, statut: 'actif', documents: 5,
  },
  { id: 'CD-75', code: '75', label: 'CD Paris',              type: 'CD', president: 'André Simon',       email: 'cd75@cr-idf.ffgym.fr', clubs: 32, licencies: 2140, statut: 'actif',               documents: 3 },
  { id: 'CD-77', code: '77', label: 'CD Seine-et-Marne',     type: 'CD', president: 'Claire Perrin',     email: 'cd77@cr-idf.ffgym.fr', clubs: 18, licencies: 980,  statut: 'actif',               documents: 2 },
  { id: 'CD-78', code: '78', label: 'CD Yvelines',           type: 'CD', president: 'Marc Laurent',      email: 'cd78@cr-idf.ffgym.fr', clubs: 21, licencies: 1120, statut: 'actif',               documents: 4 },
  { id: 'CD-91', code: '91', label: 'CD Essonne',            type: 'CD', president: 'Sophie Renault',    email: 'cd91@cr-idf.ffgym.fr', clubs: 16, licencies: 870,  statut: 'actif',               documents: 2 },
  { id: 'CD-92', code: '92', label: 'CD Hauts-de-Seine',     type: 'CD', president: 'Paul Martin',       email: 'cd92@cr-idf.ffgym.fr', clubs: 19, licencies: 1050, statut: 'actif',               documents: 3 },
  { id: 'CD-93', code: '93', label: 'CD Seine-Saint-Denis',  type: 'CD', president: 'Fatima Benali',     email: 'cd93@cr-idf.ffgym.fr', clubs: 11, licencies: 620,  statut: 'attente_reaffiliation', documents: 1 },
  { id: 'CD-94', code: '94', label: 'CD Val-de-Marne',       type: 'CD', president: 'Jean-Michel Faure', email: 'cd94@cr-idf.ffgym.fr', clubs: 7,  licencies: 412,  statut: 'actif',               documents: 2 },
  { id: 'CD-95', code: '95', label: "CD Val-d'Oise",         type: 'CD', president: 'Hélène Morin',      email: 'cd95@cr-idf.ffgym.fr', clubs: 8,  licencies: 445,  statut: 'actif',               documents: 2 },
];

const documentsSD = [
  { nom: 'Statuts CR Île-de-France',      type: 'Statuts',     date: '2025-09-15', statut: 'valide',     taille: '245 Ko' },
  { nom: 'PV AG 2026',                    type: 'PV AG',       date: '2026-06-20', statut: 'valide',     taille: '180 Ko' },
  { nom: 'Rapport activité 2025-2026',    type: 'Rapport',     date: '2026-07-01', statut: 'valide',     taille: '1.2 Mo' },
  { nom: 'Budget prévisionnel 2026-2027', type: 'Budget',      date: '2026-08-10', statut: 'valide',     taille: '95 Ko'  },
  { nom: 'Convention CR-CD 2026',         type: 'Convention',  date: '2026-10-05', statut: 'en_attente', taille: '320 Ko' },
];

const getStatutStyle = (statut: string) => {
  switch (statut) {
    case 'actif':                return { class: 'badge-success', label: 'Actif' };
    case 'attente_reaffiliation': return { class: 'badge-warning', label: 'Ré-affil. en attente' };
    default:                     return { class: 'badge-neutral',  label: statut };
  }
};

const getDocStatutStyle = (statut: string) => {
  switch (statut) {
    case 'valide':     return { class: 'badge-success', label: 'Validé',     Icon: CheckCircle2 };
    case 'en_attente': return { class: 'badge-warning',  label: 'En attente', Icon: Clock };
    default:           return { class: 'badge-neutral',  label: statut,       Icon: FileText };
  }
};

export default function FederalSDPage() {
  const [selectedSD, setSelectedSD] = useState(structures[0]);
  const [activeTab, setActiveTab] = useState<'organigramme' | 'documents'>('organigramme');

  const cr = structures.find(s => s.type === 'CR')!;
  const cds = structures.filter(s => s.type === 'CD');

  const tabs = [
    { id: 'organigramme' as const, label: 'Organigramme',                       Icon: Network },
    { id: 'documents' as const,   label: `Documents (${selectedSD.documents})`, Icon: FolderOpen },
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
            <h1 className="text-xl font-bold text-slate-900">Structures déconcentrées</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">CR Île-de-France — 1 CR + {cds.length} CD</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Liste SD */}
          <div className="lg:col-span-1 space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Structures</p>

            {/* CR */}
            <button
              onClick={() => setSelectedSD(cr)}
              className={`w-full text-left card !p-4 transition-all ${selectedSD.id === cr.id ? 'border-ffgym-blue ring-2 ring-ffgym-blue/20 shadow-md' : 'hover:shadow-md'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-ffgym-blue/10 text-ffgym-blue flex items-center justify-center flex-shrink-0">
                  <Landmark className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 text-sm">{cr.label}</p>
                  <p className="text-xs text-slate-500">{cr.clubs} clubs · {cr.licencies.toLocaleString('fr-FR')} licenciés</p>
                </div>
                <span className={`badge ${getStatutStyle(cr.statut).class} text-[10px] px-2`}>
                  {getStatutStyle(cr.statut).label}
                </span>
              </div>
            </button>

            {/* CDs */}
            <div className="ml-4 space-y-2 border-l-2 border-slate-100 pl-4">
              {cds.map(cd => (
                <button
                  key={cd.id}
                  onClick={() => setSelectedSD(cd)}
                  className={`w-full text-left card !p-3.5 transition-all ${selectedSD.id === cd.id ? 'border-ffgym-blue ring-2 ring-ffgym-blue/20 shadow-md' : 'hover:shadow-md'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {cd.code}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">{cd.label}</p>
                      <p className="text-xs text-slate-500">{cd.clubs} clubs</p>
                    </div>
                    {cd.statut !== 'actif' && (
                      <span className="text-amber-500">
                        <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Fiche SD */}
          <div className="lg:col-span-2 space-y-5">
            <div className="card">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-ffgym-blue/10 text-ffgym-blue flex items-center justify-center flex-shrink-0">
                  {selectedSD.type === 'CR'
                    ? <Landmark className="w-6 h-6" aria-hidden="true" />
                    : <Network className="w-6 h-6" aria-hidden="true" />
                  }
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <h2 className="text-xl font-bold text-slate-900">{selectedSD.label}</h2>
                    <span className={`badge ${getStatutStyle(selectedSD.statut).class}`}>
                      {getStatutStyle(selectedSD.statut).label}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                    {[
                      { label: 'Président(e)', value: selectedSD.president },
                      { label: 'Email', value: selectedSD.email },
                      { label: 'Clubs actifs', value: `${selectedSD.clubs}` },
                      { label: 'Licenciés', value: selectedSD.licencies.toLocaleString('fr-FR') },
                    ].map(f => (
                      <div key={f.label}>
                        <p className="text-xs text-slate-500">{f.label}</p>
                        <p className="text-sm font-semibold text-slate-900">{f.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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

            {/* Organigramme */}
            {activeTab === 'organigramme' && (
              <div className="card space-y-4">
                <h3 className="font-bold text-slate-900">Bureau exécutif — {selectedSD.label}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { titre: 'Président(e)',        nom: selectedSD.president,  email: selectedSD.email },
                    { titre: 'Secrétaire Général',  nom: 'Poste à pourvoir',   email: '' },
                    { titre: 'Trésorier(e)',         nom: 'Bernard Lefebvre',   email: 'tresorier@sd.ffgym.fr' },
                    { titre: 'Chargé(e) licences',  nom: 'Anne-Marie Girard',  email: 'licences@sd.ffgym.fr' },
                  ].map((p, i) => {
                    const isVacant = p.nom === 'Poste à pourvoir';
                    const initials = isVacant ? '?' : p.nom.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                    return (
                      <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                          isVacant ? 'bg-slate-200 text-slate-400' : 'bg-ffgym-blue/10 text-ffgym-blue'
                        }`}>
                          {initials}
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 font-medium">{p.titre}</p>
                          <p className={`font-semibold text-sm ${isVacant ? 'text-slate-400 italic' : 'text-slate-900'}`}>{p.nom}</p>
                          {p.email && <p className="text-xs text-slate-400 mt-0.5">{p.email}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {selectedSD.type === 'CR' && (
                  <div className="mt-2 pt-4 border-t border-slate-100">
                    <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                      <Network className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
                      Comités départementaux rattachés ({cds.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cds.map(cd => (
                        <button
                          key={cd.id}
                          onClick={() => setSelectedSD(cd)}
                          className="bg-ffgym-blue/8 text-ffgym-blue px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-ffgym-blue/15 transition-colors"
                        >
                          {cd.code} — {cd.label.replace('CD ', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Documents */}
            {activeTab === 'documents' && (
              <div className="card !p-0 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/80 to-white">
                  <h3 className="text-sm font-bold text-slate-900">Espace documentaire</h3>
                  <button className="flex items-center gap-2 text-sm font-semibold text-ffgym-blue border border-ffgym-blue/20 px-3 py-1.5 rounded-lg hover:bg-ffgym-blue/5 transition-colors">
                    <CloudUpload className="w-3 h-3" aria-hidden="true" />
                    Déposer
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {documentsSD.map((doc, i) => {
                    const style = getDocStatutStyle(doc.statut);
                    return (
                      <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors group">
                        <div className="w-10 h-10 rounded-xl bg-ffgym-blue/8 text-ffgym-blue flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm truncate">{doc.nom}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-slate-400">{doc.type}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-xs text-slate-400">{new Date(doc.date).toLocaleDateString('fr-FR')}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-xs text-slate-400">{doc.taille}</span>
                          </div>
                        </div>
                        <span className={`badge ${style.class} text-xs flex-shrink-0 flex items-center gap-1`}>
                          <style.Icon className="w-3 h-3" aria-hidden="true" />
                          {style.label}
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-ffgym-blue">
                          <Download className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
