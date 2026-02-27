'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Phone, Mail, MapPin, Plus, Users2,
  AlertTriangle, ArrowUp, Minus
} from 'lucide-react';

const clubs = [
  {
    id: 'IDF-75-042',
    nom: "Gym'Étoiles Paris 15",
    ville: 'Paris 15e',
    zone: 'IDF-75',
    licencies: 61,
    statut: 'affilié',
    priorite: 'normale',
    dernierEchange: '2027-01-10',
    typeEchange: 'Appel téléphonique',
    interlocuteur: 'Jean Dupont (Président)',
    zones: ['QPV', 'Ville prioritaire'],
    disciplines: ['GAF', 'GPT', 'AER'],
    echanges: [
      { date: '2027-01-10', type: 'Appel', auteur: 'Marie Dupont (CR)', contenu: 'Suivi décompte en attente — club informé du délai de traitement.' },
      { date: '2026-12-05', type: 'Email', auteur: 'Marie Dupont (CR)', contenu: 'Envoi du guide de ré-affiliation 2027.' },
      { date: '2026-11-20', type: 'Visite', auteur: 'Marc Simon (CR)', contenu: 'Visite dans le cadre du programme Gym & Quartiers.' },
    ],
  },
  {
    id: 'IDF-78-012',
    nom: 'RC Versailles Gym',
    ville: 'Versailles',
    zone: 'IDF-78',
    licencies: 145,
    statut: 'affilié',
    priorite: 'haute',
    dernierEchange: '2027-01-08',
    typeEchange: 'Email',
    interlocuteur: 'Sophie Renard (Présidente)',
    zones: [],
    disciplines: ['GAF', 'GAM', 'GR'],
    echanges: [
      { date: '2027-01-08', type: 'Email', auteur: 'Marie Dupont (CR)', contenu: 'Relance contrôle décompte IDF-78 — réponse attendue sous 5 jours.' },
      { date: '2026-10-15', type: 'Appel', auteur: 'Paul Martin (CR)', contenu: 'Discussion sur l\'extension du club — 2 salles supplémentaires prévues.' },
    ],
  },
  {
    id: 'IDF-93-005',
    nom: 'Gym Club Saint-Denis',
    ville: 'Saint-Denis',
    zone: 'IDF-93',
    licencies: 48,
    statut: 'litige',
    priorite: 'urgente',
    dernierEchange: '2026-12-18',
    typeEchange: 'Appel',
    interlocuteur: 'Ahmed Benali (Dir. technique)',
    zones: ['QPV', 'ZRR'],
    disciplines: ['TRA', 'ACR'],
    echanges: [
      { date: '2026-12-18', type: 'Appel', auteur: 'Marie Dupont (CR)', contenu: 'Litige sur décompte DC-2026-IDF-93-001 — montant contesté. Médiation engagée.' },
      { date: '2026-12-10', type: 'Email', auteur: 'Paul Martin (CR)', contenu: 'Mise en demeure de régularisation sous 15 jours.' },
    ],
  },
  {
    id: 'IDF-92-021',
    nom: 'Gym Puteaux',
    ville: 'Puteaux',
    zone: 'IDF-92',
    licencies: 88,
    statut: 'affilié',
    priorite: 'normale',
    dernierEchange: '2026-11-30',
    typeEchange: 'Visio',
    interlocuteur: 'Pierre Moreau (Trésorier)',
    zones: [],
    disciplines: ['GAF', 'TRA'],
    echanges: [
      { date: '2026-11-30', type: 'Visio', auteur: 'Marie Dupont (CR)', contenu: 'Point annuel sur les projets du club — recrutement encadrants prévu.' },
    ],
  },
];

const getStatutStyle = (statut: string) => {
  switch (statut) {
    case 'affilié': return { class: 'badge-success', label: 'Affilié' };
    case 'litige':  return { class: 'badge-danger',  label: 'Litige' };
    default:        return { class: 'badge-neutral',  label: statut };
  }
};

const getPrioriteStyle = (priorite: string) => {
  switch (priorite) {
    case 'urgente': return { class: 'text-red-600 bg-red-50 border-red-200',     label: 'Urgente',  Icon: AlertTriangle };
    case 'haute':   return { class: 'text-amber-600 bg-amber-50 border-amber-200', label: 'Haute',  Icon: ArrowUp };
    default:        return { class: 'text-slate-500 bg-slate-50 border-slate-200', label: 'Normale', Icon: Minus };
  }
};

const getTypeEchangeIcon = (type: string): React.ElementType => {
  switch (type) {
    case 'Appel':  return Phone;
    case 'Email':  return Mail;
    case 'Visio':  return Mail;
    case 'Visite': return MapPin;
    default:       return Mail;
  }
};

export default function FederalAccompagnementPage() {
  const [selectedClub, setSelectedClub] = useState<(typeof clubs)[0] | null>(null);
  const [filterPriorite, setFilterPriorite] = useState('');
  const [showNewEchange, setShowNewEchange] = useState(false);
  const [newEchange, setNewEchange] = useState({ type: 'Appel', contenu: '' });

  const filtered = clubs.filter(c =>
    filterPriorite === '' || c.priorite === filterPriorite
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center gap-3">
          <Link href="/federal" className="text-slate-500 hover:text-slate-700 rounded-lg p-1" aria-label="Retour">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Accompagnement clubs</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">CR Île-de-France · {clubs.length} clubs suivis</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Liste clubs */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <select
                value={filterPriorite}
                onChange={e => setFilterPriorite(e.target.value)}
                className="select-base !py-2.5 text-sm flex-1"
              >
                <option value="">Toutes priorités</option>
                <option value="urgente">Urgente</option>
                <option value="haute">Haute</option>
                <option value="normale">Normale</option>
              </select>
            </div>

            <div className="space-y-3">
              {filtered.map(club => {
                const prioStyle = getPrioriteStyle(club.priorite);
                const TypeEchangeIcon = getTypeEchangeIcon(club.typeEchange);
                return (
                  <button
                    key={club.id}
                    onClick={() => setSelectedClub(club)}
                    className={`w-full text-left card !p-4 transition-all ${
                      selectedClub?.id === club.id ? 'border-ffgym-blue ring-2 ring-ffgym-blue/20 shadow-md' : 'hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-ffgym-blue/10 text-ffgym-blue flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {club.nom.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-slate-900 text-sm truncate">{club.nom}</p>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border flex-shrink-0 flex items-center gap-0.5 ${prioStyle.class}`}>
                            <prioStyle.Icon className="w-2.5 h-2.5" aria-hidden="true" />
                            {prioStyle.label}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{club.ville} · {club.licencies} licenciés</p>
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                          <TypeEchangeIcon className="w-3 h-3" aria-hidden="true" />
                          <span>{club.typeEchange}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span>{new Date(club.dernierEchange).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <span className={`badge ${getStatutStyle(club.statut).class} text-[10px] px-2 flex-shrink-0`}>
                        {getStatutStyle(club.statut).label}
                      </span>
                    </div>
                    {club.zones.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {club.zones.map(z => (
                          <span key={z} className="text-[9px] font-bold text-violet-700 bg-violet-50 border border-violet-200 px-1.5 py-0.5 rounded-full">
                            {z}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fiche CRM */}
          <div className="lg:col-span-3">
            {selectedClub ? (
              <div className="space-y-5">
                {/* Infos club */}
                <div className="card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-ffgym-blue/10 text-ffgym-blue flex items-center justify-center font-bold flex-shrink-0">
                        {selectedClub.nom.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">{selectedClub.nom}</h2>
                        <p className="text-sm text-slate-500 font-mono">{selectedClub.id}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <span className={`badge ${getStatutStyle(selectedClub.statut).class}`}>{getStatutStyle(selectedClub.statut).label}</span>
                          {selectedClub.zones.map(z => (
                            <span key={z} className="text-[10px] font-bold text-violet-700 bg-violet-50 border border-violet-200 px-2 py-1 rounded-full">
                              {z}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5 pt-5 border-t border-slate-100">
                    {[
                      { label: 'Zone', value: selectedClub.zone },
                      { label: 'Ville', value: selectedClub.ville },
                      { label: 'Licenciés', value: `${selectedClub.licencies}` },
                      { label: 'Disciplines', value: selectedClub.disciplines.join(', ') },
                      { label: 'Interlocuteur', value: selectedClub.interlocuteur },
                    ].map(f => (
                      <div key={f.label}>
                        <p className="text-xs text-slate-500">{f.label}</p>
                        <p className="text-sm font-semibold text-slate-900 mt-0.5">{f.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Historique échanges */}
                <div className="card !p-0 overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/80 to-white">
                    <h3 className="text-sm font-bold text-slate-900">Historique des échanges</h3>
                    <button
                      onClick={() => setShowNewEchange(true)}
                      className="flex items-center gap-2 text-sm font-semibold text-ffgym-blue border border-ffgym-blue/20 px-3 py-1.5 rounded-lg hover:bg-ffgym-blue/5 transition-colors"
                    >
                      <Plus className="w-3 h-3" aria-hidden="true" />
                      Consigner
                    </button>
                  </div>

                  {showNewEchange && (
                    <div className="px-6 py-4 bg-ffgym-blue/5 border-b border-ffgym-blue/15">
                      <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Nouvel échange</p>
                      <div className="flex gap-3 mb-3">
                        {['Appel', 'Email', 'Visio', 'Visite'].map(t => {
                          const TypeIcon = getTypeEchangeIcon(t);
                          return (
                            <button
                              key={t}
                              onClick={() => setNewEchange(e => ({ ...e, type: t }))}
                              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border transition-all ${
                                newEchange.type === t
                                  ? 'bg-ffgym-blue text-white border-ffgym-blue'
                                  : 'bg-white text-slate-600 border-slate-200 hover:border-ffgym-blue/40'
                              }`}
                            >
                              <TypeIcon className="w-3 h-3" aria-hidden="true" />
                              {t}
                            </button>
                          );
                        })}
                      </div>
                      <textarea
                        value={newEchange.contenu}
                        onChange={e => setNewEchange(prev => ({ ...prev, contenu: e.target.value }))}
                        placeholder="Résumé de l'échange..."
                        className="input-base !resize-none h-20 text-sm mb-3"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setShowNewEchange(false); setNewEchange({ type: 'Appel', contenu: '' }); }}
                          className="px-4 py-2 bg-ffgym-blue text-white text-sm font-semibold rounded-lg hover:bg-ffgym-gradient-start transition-colors"
                        >
                          Enregistrer
                        </button>
                        <button
                          onClick={() => setShowNewEchange(false)}
                          className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="divide-y divide-slate-100">
                    {selectedClub.echanges.map((e, i) => {
                      const EchangeIcon = getTypeEchangeIcon(e.type);
                      return (
                        <div key={i} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <EchangeIcon className="w-4 h-4" aria-hidden="true" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 flex-wrap mb-1">
                                <span className="text-xs font-bold text-slate-700">{e.type}</span>
                                <span className="text-xs text-slate-400">{new Date(e.date).toLocaleDateString('fr-FR')}</span>
                                <span className="text-xs text-ffgym-blue font-medium">{e.auteur}</span>
                              </div>
                              <p className="text-sm text-slate-600 leading-relaxed">{e.contenu}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-300 flex items-center justify-center mb-4">
                  <Users2 className="w-7 h-7" aria-hidden="true" />
                </div>
                <p className="font-semibold text-slate-500">Sélectionnez un club</p>
                <p className="text-sm text-slate-400 mt-1">pour voir son historique d'échanges</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
