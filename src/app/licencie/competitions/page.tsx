'use client';

import { useState } from 'react';
import {
  CalendarDays, Medal, Star, MapPin, UserPlus, Dumbbell,
  Trophy, Calendar, Users, Info, CheckCircle2, X, Clock,
  ExternalLink, Square, Minus, Circle, ArrowUp, Equal, Ruler, ArrowUpDown
} from 'lucide-react';
import licencieData from '@/data/licencie.json';

const { licencie } = licencieData;

type Tab = 'a_venir' | 'resultats' | 'haut_niveau';

const agresIcons: Record<string, React.ElementType> = {
  'Sol':                  Square,
  'Arçons':               Minus,
  'Anneaux':              Circle,
  'Saut':                 ArrowUp,
  'Barres Parallèles':    Equal,
  'Barre Fixe':           Minus,
  'Poutre':               Ruler,
  'Barres Asymétriques':  ArrowUpDown,
};

const medalColors: Record<string, string> = {
  '1er': 'from-yellow-400 to-amber-500',
  '2e':  'from-slate-300 to-slate-400',
  '3e':  'from-orange-400 to-amber-600',
};

export default function CompetitionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('a_venir');
  const [inscriptionModal, setInscriptionModal] = useState<(typeof prochaines)[0] | null>(null);
  const [inscriptionDone, setInscriptionDone] = useState(false);

  const prochaines = licencie.competition?.prochaines ?? [];
  const resultats = licencie.competition?.resultats ?? [];

  const handleInscription = () => {
    setInscriptionDone(true);
    setTimeout(() => {
      setInscriptionModal(null);
      setInscriptionDone(false);
    }, 2000);
  };

  const tabs: { id: Tab; label: string; Icon: React.ElementType }[] = [
    { id: 'a_venir',     label: 'À venir',      Icon: CalendarDays },
    { id: 'resultats',   label: 'Résultats',    Icon: Medal },
    { id: 'haut_niveau', label: 'Haut niveau',  Icon: Star },
  ];

  return (
    <div className="min-h-screen">
      {/* Header compact */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Compétitions</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {licencie.prenom} {licencie.nom.toUpperCase()} · {licencie.competition.niveau}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="badge badge-discipline">{licencie.licence.disciplinePrincipale}</span>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full hidden sm:flex items-center gap-1">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              Île-de-France
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-6">

        {/* KPIs — style dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
              <Trophy className="w-4 h-4 text-amber-500" aria-hidden="true" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{licencie.competition.niveau}</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Niveau</p>
          </div>
          <div className="card">
            <div className="w-9 h-9 bg-ffgym-blue/10 rounded-xl flex items-center justify-center mb-3">
              <CalendarDays className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{prochaines.length}</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Compétitions à venir</p>
          </div>
          <div className="card">
            <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
              <Medal className="w-4 h-4 text-amber-500" aria-hidden="true" />
            </div>
            <p className="text-2xl font-bold text-amber-500">{resultats.filter(r => ['1er','2e','3e'].includes(r.classement)).length}</p>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Podiums</p>
            <p className="text-[10px] font-semibold text-amber-400 mt-1.5">cette saison</p>
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

        {/* --- TAB À VENIR --- */}
        {activeTab === 'a_venir' && (
          <div className="space-y-4">
            {prochaines.length > 0 ? (
              <>
                <div className="card bg-ffgym-blue/5 border-ffgym-blue/20 !p-4 flex items-center gap-3">
                  <Info className="w-4 h-4 text-ffgym-blue flex-shrink-0" aria-hidden="true" />
                  <p className="text-sm text-slate-700">
                    <strong>EngaGym</strong> — Plateforme officielle d'engagement compétitif de la FFGym. L'inscription aux compétitions se fait via ce module.
                  </p>
                </div>

                {prochaines.map((comp, i) => (
                  <div key={i} className="card !p-0 overflow-hidden">
                    <div className="p-6 flex items-start gap-4">
                      {/* Date block */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center text-amber-700">
                        <span className="text-2xl font-bold leading-none">{new Date(comp.date).getDate()}</span>
                        <span className="text-xs uppercase font-semibold mt-0.5">
                          {new Date(comp.date).toLocaleDateString('fr-FR', { month: 'short' })}
                        </span>
                        <span className="text-[10px] text-amber-500 font-medium">
                          {new Date(comp.date).getFullYear()}
                        </span>
                      </div>

                      {/* Infos */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-bold text-slate-900 text-lg">{comp.nom}</p>
                            <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                              <MapPin className="w-4 h-4 text-slate-400" aria-hidden="true" />
                              {comp.lieu}
                            </div>
                          </div>
                          <button
                            onClick={() => setInscriptionModal(comp)}
                            className="btn-primary text-sm flex-shrink-0 flex items-center gap-1.5"
                          >
                            <UserPlus className="w-4 h-4" aria-hidden="true" />
                            S'inscrire via EngaGym
                          </button>
                        </div>

                        {/* Agrès */}
                        {comp.agres && comp.agres.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-100">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Agrès au programme</p>
                            <div className="flex flex-wrap gap-2">
                              {comp.agres.map(agres => {
                                const AgresIcon = agresIcons[agres] ?? Star;
                                return (
                                  <span key={agres} className="flex items-center gap-1.5 text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
                                    <AgresIcon className="w-3 h-3 text-slate-400" aria-hidden="true" />
                                    {agres}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Dumbbell className="w-3 h-3" aria-hidden="true" />
                        {licencie.licence.disciplinePrincipale}
                      </span>
                      <span className="flex items-center gap-1">
                        <Trophy className="w-3 h-3" aria-hidden="true" />
                        {licencie.competition.niveau}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" aria-hidden="true" />
                        {new Date(comp.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="card text-center py-16">
                <CalendarDays className="w-10 h-10 text-slate-200 mx-auto mb-3" aria-hidden="true" />
                <p className="font-semibold text-slate-400">Aucune compétition à venir</p>
                <p className="text-sm text-slate-400 mt-1">Le calendrier sera mis à jour par le Comité Régional</p>
              </div>
            )}
          </div>
        )}

        {/* --- TAB RÉSULTATS --- */}
        {activeTab === 'resultats' && (
          <div className="space-y-4">
            {resultats.length > 0 ? (
              <>
                <div className="card !p-0 overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/80 to-white">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-amber-500" aria-hidden="true" />
                      Palmarès — {licencie.prenom} {licencie.nom.toUpperCase()}
                    </h3>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                      {resultats.length} résultat{resultats.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {resultats.map((r, i) => {
                      const gradient = medalColors[r.classement] ?? 'from-slate-400 to-slate-500';
                      const isPodium = ['1er', '2e', '3e'].includes(r.classement);
                      return (
                        <div key={i} className={`px-6 py-5 flex items-center gap-4 ${isPodium ? 'bg-amber-50/50' : ''}`}>
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0`}>
                            {r.classement}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900">{r.nom}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-slate-400" aria-hidden="true" />
                                Catégorie {r.categorie}
                              </span>
                              <span className="w-1 h-1 bg-slate-300 rounded-full" />
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-slate-400" aria-hidden="true" />
                                {new Date(r.date).toLocaleDateString('fr-FR')}
                              </span>
                              <span className="w-1 h-1 bg-slate-300 rounded-full" />
                              <span className="flex items-center gap-1">
                                <Dumbbell className="w-3 h-3 text-slate-400" aria-hidden="true" />
                                {licencie.licence.disciplinePrincipale}
                              </span>
                            </div>
                          </div>
                          {isPodium && (
                            <Medal className="w-6 h-6 text-amber-400 flex-shrink-0" aria-hidden="true" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="card bg-slate-50 border-slate-200">
                  <p className="text-sm text-slate-600">
                    <Info className="w-4 h-4 text-slate-400 mr-1.5 inline" aria-hidden="true" />
                    En production, les scores, notes d'engins, et relevés de notes détaillés seraient accessibles depuis chaque résultat.
                  </p>
                </div>
              </>
            ) : (
              <div className="card text-center py-16">
                <Medal className="w-10 h-10 text-slate-200 mx-auto mb-3" aria-hidden="true" />
                <p className="font-semibold text-slate-400">Aucun résultat enregistré</p>
              </div>
            )}
          </div>
        )}

        {/* --- TAB HAUT NIVEAU --- */}
        {activeTab === 'haut_niveau' && (
          <div className="space-y-4">
            {/* Statut actuel */}
            <div className="card !p-0 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/80 to-white">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  Statut sportif haut niveau
                </h3>
                <span className="badge badge-neutral">Non inscrit</span>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">Lucas Martin n'est pas inscrit sur les listes sportives haut niveau</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Le niveau actuel est <strong>{licencie.competition.niveau}</strong>. L'accès aux filières haut niveau nécessite une qualification régionale ou nationale.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filières disponibles */}
            <div className="card !p-0 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white">
                <h3 className="font-bold text-slate-900 text-sm">Filières sportives FFGym</h3>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { niveau: 'ESPOIR', description: 'Pôle espoirs régional (CREPS)', seuil: 'Qualif régionale', couleur: 'text-emerald-600 bg-emerald-50' },
                  { niveau: 'FRANCE', description: 'Pôle France / Centre National (Combs-la-Ville)', seuil: 'TOP 12 National', couleur: 'text-ffgym-blue bg-ffgym-blue/10' },
                  { niveau: 'ELITE', description: 'Équipe de France — compétitions internationales', seuil: 'Sélection CN', couleur: 'text-ffgym-red bg-ffgym-red/10' },
                ].map(f => (
                  <div key={f.niveau} className="px-6 py-4 flex items-center gap-4">
                    <span className={`badge ${f.couleur} font-bold text-xs px-3 py-1.5 flex-shrink-0`}>{f.niveau}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 text-sm">{f.description}</p>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0">{f.seuil}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* EngaGym Compétitions Nationales */}
            <div className="card bg-ffgym-red/5 border-ffgym-red/20">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-ffgym-red/10 text-ffgym-red flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 text-sm">Compétitions nationales — EngaGym</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Les Championnats de France, TOP 12 et compétitions internationales sont gérés via EngaGym. L'accès est conditionné à une qualification et à une validation CN.
                  </p>
                  <button className="mt-3 btn-primary text-sm flex items-center gap-1.5">
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    Accéder à EngaGym
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal inscription EngaGym */}
      {inscriptionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setInscriptionModal(null)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {inscriptionDone ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">Inscription enregistrée !</h3>
                <p className="text-sm text-slate-500">La demande a été transmise au club pour validation.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-bold text-slate-900">S'inscrire via EngaGym</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{inscriptionModal.nom}</p>
                  </div>
                  <button onClick={() => setInscriptionModal(null)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Calendar className="w-4 h-4 text-slate-400" aria-hidden="true" />
                    <span className="text-sm font-medium text-slate-700">{new Date(inscriptionModal.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <MapPin className="w-4 h-4 text-slate-400" aria-hidden="true" />
                    <span className="text-sm font-medium text-slate-700">{inscriptionModal.lieu}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <Users className="w-4 h-4 text-slate-400" aria-hidden="true" />
                    <span className="text-sm font-medium text-slate-700">{licencie.prenom} {licencie.nom.toUpperCase()} · Catégorie Benjamin</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5">
                  <p className="text-xs text-amber-700 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    L'inscription doit être validée par l'encadrant du club avant la date limite de clôture.
                  </p>
                </div>

                <button
                  onClick={handleInscription}
                  className="w-full py-3 bg-ffgym-blue text-white font-semibold rounded-xl hover:bg-ffgym-gradient-start transition-colors flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4" aria-hidden="true" />
                  Confirmer l'inscription
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
