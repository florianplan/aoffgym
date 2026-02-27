'use client';

import { useState } from 'react';
import {
  CreditCard, GraduationCap, Briefcase, Award,
  Hammer, HeartPulse, Activity, Heart,
  CheckCircle2, Calendar, MapPin, Download, Info, Share2
} from 'lucide-react';
import licencieData from '@/data/licencie.json';

const { licencie } = licencieData;

const allSeasons = [
  {
    saison: licencie.licence.saison,
    club: licencie.club,
    discipline: licencie.licence.disciplinePrincipale,
    fonction: licencie.licence.fonction,
    statut: 'En cours',
    current: true,
    numeroLicence: licencie.numeroLicence,
  },
  ...licencie.historique.map(h => ({
    saison: h.saison,
    club: h.club,
    discipline: h.discipline,
    fonction: h.fonction || 'pratiquant',
    statut: h.statut,
    current: false,
    numeroLicence: null,
  })),
];

const formations = [
  {
    id: 'F001',
    titre: 'Formation Arbitrage GAM — Niveau 1',
    organisme: 'Comité Régional Île-de-France',
    date: '2025-11-18',
    lieu: 'Paris',
    statut: 'obtenu',
    type: 'arbitrage',
    Icon: Hammer,
    color: 'text-amber-600 bg-amber-50',
  },
  {
    id: 'F002',
    titre: 'PSC1 — Prévention et Secours Civiques',
    organisme: 'Croix-Rouge Française',
    date: '2025-06-10',
    lieu: 'Paris 15e',
    statut: 'obtenu',
    type: 'securite',
    Icon: HeartPulse,
    color: 'text-red-600 bg-red-50',
  },
];

const fonctions = [
  {
    titre: 'Pratiquant',
    club: 'Gym\'Étoiles Paris 15',
    dateDebut: '2023-09-01',
    dateFin: null,
    actif: true,
    Icon: Activity,
    color: 'text-ffgym-blue bg-ffgym-blue/10',
  },
  {
    titre: 'Bénévole événementiel',
    club: 'Gym\'Étoiles Paris 15',
    dateDebut: '2025-06-15',
    dateFin: '2025-06-16',
    actif: false,
    Icon: Heart,
    color: 'text-emerald-600 bg-emerald-50',
  },
];

const openBadges = [
  {
    id: 'OB001',
    titre: 'Arbitrage Niveau 1 — GAM',
    description: 'Maîtrise des règles d\'arbitrage en Gym Artistique Masculine, niveau régional',
    emetteur: 'FFGym / Académie Gym',
    date: '2025-11-20',
    image: null,
    color: 'from-amber-400 to-orange-500',
    Icon: Hammer,
  },
];

const seasonDotColors = [
  'from-ffgym-red to-ffgym-red/80',
  'from-ffgym-blue to-ffgym-blue/80',
  'from-violet-600 to-violet-500',
  'from-amber-500 to-orange-500',
];

type Tab = 'licences' | 'formations' | 'fonctions' | 'badges';

export default function HistoriquePage() {
  const [activeTab, setActiveTab] = useState<Tab>('licences');

  const tabs: { id: Tab; label: string; Icon: React.ElementType; count?: number }[] = [
    { id: 'licences',   label: 'Licences',     Icon: CreditCard,     count: allSeasons.length },
    { id: 'formations', label: 'Formations',   Icon: GraduationCap,  count: formations.length },
    { id: 'fonctions',  label: 'Fonctions',    Icon: Briefcase,      count: fonctions.length },
    { id: 'badges',     label: 'Open Badges',  Icon: Award,          count: openBadges.length },
  ];

  return (
    <div className="min-h-screen">
      {/* Header compact */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Mon historique</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {licencie.prenom} {licencie.nom.toUpperCase()} · {allSeasons.length} saisons
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-6">

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
              {tab.count !== undefined && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id ? 'bg-ffgym-blue/10 text-ffgym-blue' : 'bg-slate-200 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* --- TAB LICENCES --- */}
        {activeTab === 'licences' && (
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-ffgym-red via-ffgym-blue to-slate-200" />
            <div className="space-y-4">
              {allSeasons.map((season, index) => (
                <div key={season.saison} className="relative flex items-start gap-4">
                  <div className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-br ${seasonDotColors[index % seasonDotColors.length]} flex items-center justify-center text-white font-bold shadow-md flex-shrink-0 ${
                    season.current ? 'ring-4 ring-ffgym-red/30 animate-pulse' : ''
                  }`}>
                    {season.saison.split('-')[0].slice(2)}
                  </div>

                  <div className={`flex-1 card ${season.current ? 'border-ffgym-red/30 bg-ffgym-red/5' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-bold text-slate-900">Saison {season.saison}</span>
                          {season.current && (
                            <span className="badge badge-success text-[10px] px-2 py-0.5">En cours</span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500">{season.club.nom}, {season.club.ville}</p>
                      </div>
                      <span className="badge badge-discipline text-[10px]">{season.discipline}</span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Fonction</p>
                        <p className="text-slate-700 font-semibold capitalize mt-0.5">{season.fonction}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-semibold uppercase">Statut</p>
                        <p className={`font-semibold mt-0.5 ${season.statut === 'En cours' ? 'text-ffgym-red' : 'text-emerald-600'}`}>
                          {season.statut === 'validé' ? '✓ Validée' : season.statut}
                        </p>
                      </div>
                      {season.numeroLicence && (
                        <div>
                          <p className="text-xs text-slate-400 font-semibold uppercase">N° licence</p>
                          <p className="font-mono text-slate-700 font-semibold mt-0.5 text-xs">{season.numeroLicence}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB FORMATIONS --- */}
        {activeTab === 'formations' && (
          <div className="space-y-4">
            {formations.length > 0 ? (
              <>
                {formations.map(f => (
                  <div key={f.id} className="card flex items-start gap-4 group hover:border-ffgym-blue/30 transition-all">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${f.color}`}>
                      <f.Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-slate-900">{f.titre}</p>
                          <p className="text-sm text-slate-500 mt-0.5">{f.organisme}</p>
                        </div>
                        <span className="badge badge-success flex-shrink-0">
                          <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                          Obtenu
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" aria-hidden="true" />
                          {new Date(f.date).toLocaleDateString('fr-FR')}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" aria-hidden="true" />
                          {f.lieu}
                        </span>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-semibold text-ffgym-blue border border-ffgym-blue/20 px-2.5 py-1.5 rounded-lg hover:bg-ffgym-blue/5 flex-shrink-0">
                      <Download className="w-3 h-3" aria-hidden="true" />
                      Attestation
                    </button>
                  </div>
                ))}

                <div className="card bg-ffgym-blue/5 border-ffgym-blue/20">
                  <p className="text-sm text-slate-600">
                    <Info className="w-4 h-4 text-ffgym-blue mr-1.5 inline" aria-hidden="true" />
                    Les formations suivies via <strong>l'Académie Gym</strong> (BPJEPS, licences professionnelles, CQP...) apparaissent automatiquement dans cet historique.
                  </p>
                </div>
              </>
            ) : (
              <div className="card text-center py-16">
                <GraduationCap className="w-10 h-10 text-slate-200 mx-auto mb-3" aria-hidden="true" />
                <p className="font-semibold text-slate-400">Aucune formation enregistrée</p>
                <p className="text-sm text-slate-400 mt-1">Les diplômes de l'Académie Gym apparaîtront ici</p>
              </div>
            )}
          </div>
        )}

        {/* --- TAB FONCTIONS --- */}
        {activeTab === 'fonctions' && (
          <div className="space-y-4">
            {fonctions.map((fn, i) => (
              <div key={i} className="card flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${fn.color}`}>
                  <fn.Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-slate-900">{fn.titre}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{fn.club}</p>
                    </div>
                    {fn.actif ? (
                      <span className="badge badge-success flex-shrink-0">Actif</span>
                    ) : (
                      <span className="badge badge-neutral flex-shrink-0">Terminé</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    <span>
                      Depuis le {new Date(fn.dateDebut).toLocaleDateString('fr-FR')}
                      {fn.dateFin && ` — ${new Date(fn.dateFin).toLocaleDateString('fr-FR')}`}
                      {fn.actif && ' (en cours)'}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="card bg-slate-50 border-slate-200 text-sm text-slate-600">
              <p>
                <Info className="w-4 h-4 text-slate-400 mr-1.5 inline" aria-hidden="true" />
                En production, les fonctions de <strong>dirigeant</strong>, <strong>encadrant</strong>, <strong>élu CR/CN</strong>, et <strong>juge-arbitre</strong> seraient également référencées ici, avec contrôle d'honorabilité associé.
              </p>
            </div>
          </div>
        )}

        {/* --- TAB OPEN BADGES --- */}
        {activeTab === 'badges' && (
          <div className="space-y-4">
            <div className="card bg-amber-50 border-amber-200 !p-4 flex items-center gap-3">
              <Award className="w-5 h-5 text-amber-500 flex-shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold text-amber-800 text-sm">Open Badges — Powered by Badgr / Credly</p>
                <p className="text-xs text-amber-700 mt-0.5">Les compétences et réalisations sont certifiées sous forme de badges numériques partageables.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {openBadges.map(badge => (
                <div key={badge.id} className="card !p-0 overflow-hidden hover:shadow-md transition-all group">
                  <div className={`h-24 bg-gradient-to-br ${badge.color} flex items-center justify-center`}>
                    <badge.Icon className="w-10 h-10 text-white/90" aria-hidden="true" />
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-slate-900 text-sm leading-tight">{badge.titre}</p>
                    <p className="text-xs text-slate-500 mt-1">{badge.emetteur}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{new Date(badge.date).toLocaleDateString('fr-FR')}</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{badge.description}</p>
                    <button className="mt-3 w-full text-xs font-semibold text-ffgym-blue border border-ffgym-blue/20 px-2 py-1.5 rounded-lg hover:bg-ffgym-blue/5 transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1">
                      <Share2 className="w-3 h-3" aria-hidden="true" />
                      Partager
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {openBadges.length === 0 && (
              <div className="card text-center py-16">
                <Award className="w-10 h-10 text-slate-200 mx-auto mb-3" aria-hidden="true" />
                <p className="font-semibold text-slate-400">Aucun badge obtenu</p>
                <p className="text-sm text-slate-400 mt-1">Les badges seront décernés lors de formations ou compétitions</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
