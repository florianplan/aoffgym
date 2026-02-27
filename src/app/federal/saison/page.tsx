'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, ChevronRight, Check, Pen, Settings2,
  CheckCircle2, Lock, XCircle, Circle, Send, Eye, X, Mail, Info
} from 'lucide-react';

type SaisonStatut = 'en_creation' | 'en_preparation' | 'ouverte' | 'fermee';

const saisonStatutFlow: SaisonStatut[] = ['en_creation', 'en_preparation', 'ouverte', 'fermee'];

const getSaisonStatutStyle = (s: SaisonStatut) => {
  switch (s) {
    case 'en_creation':   return { label: 'En création',    Icon: Pen,          class: 'badge-neutral', color: 'text-slate-600' };
    case 'en_preparation': return { label: 'En préparation', Icon: Settings2,    class: 'badge-info',    color: 'text-cyan-600' };
    case 'ouverte':       return { label: 'Ouverte',         Icon: CheckCircle2, class: 'badge-success', color: 'text-emerald-600' };
    case 'fermee':        return { label: 'Fermée',          Icon: Lock,         class: 'badge-neutral', color: 'text-slate-500' };
  }
};

const crSaisie = [
  { code: 'IDF',  label: 'CR Île-de-France', statut: 'complet',   dateEnvoi: '2026-07-15' },
  { code: 'NOR',  label: 'CR Normandie',     statut: 'complet',   dateEnvoi: '2026-07-20' },
  { code: 'ARA',  label: 'CR Auvergne-Rhône-Alpes', statut: 'complet', dateEnvoi: '2026-07-18' },
  { code: 'OCC',  label: 'CR Occitanie',     statut: 'partiel',   dateEnvoi: null },
  { code: 'GES',  label: 'CR Grand Est',     statut: 'manquant',  dateEnvoi: null },
  { code: 'NAQ',  label: 'CR Nouvelle-Aquitaine', statut: 'complet', dateEnvoi: '2026-07-22' },
  { code: 'BFC',  label: 'CR Bourgogne-Franche-Comté', statut: 'partiel', dateEnvoi: null },
  { code: 'PDL',  label: 'CR Pays de la Loire', statut: 'manquant', dateEnvoi: null },
  { code: 'HDF',  label: 'CR Hauts-de-France', statut: 'complet', dateEnvoi: '2026-07-16' },
  { code: 'BRE',  label: 'CR Bretagne',      statut: 'manquant',  dateEnvoi: null },
  { code: 'CVL',  label: 'CR Centre-Val de Loire', statut: 'complet', dateEnvoi: '2026-07-25' },
  { code: 'PAC',  label: 'CR Provence-Alpes-Côte d\'Azur', statut: 'complet', dateEnvoi: '2026-07-19' },
];

const getSaisieStyle = (statut: string) => {
  switch (statut) {
    case 'complet':  return { class: 'badge-success', label: 'Complet',  Icon: CheckCircle2, dot: 'bg-emerald-500' };
    case 'partiel':  return { class: 'badge-warning',  label: 'Partiel',  Icon: Circle,       dot: 'bg-amber-500' };
    case 'manquant': return { class: 'badge-danger',   label: 'Manquant', Icon: XCircle,      dot: 'bg-red-500' };
    default:         return { class: 'badge-neutral',  label: statut,     Icon: Circle,       dot: 'bg-slate-400' };
  }
};

const clubsPreparation = [
  { nom: "Gym'Étoiles Paris 15",  zone: 'IDF-75', statut: 'reaffiliation_anticipee', date: '2026-10-05' },
  { nom: 'RC Versailles Gym',     zone: 'IDF-78', statut: 'reaffiliation_anticipee', date: '2026-10-12' },
  { nom: 'Gym Puteaux',           zone: 'IDF-92', statut: 'en_cours',               date: '2026-11-01' },
];

export default function FederalSaisonPage() {
  const [currentStatut, setCurrentStatut] = useState<SaisonStatut>('ouverte');
  const [activeTab, setActiveTab] = useState<'tarifs' | 'lettre' | 'suivi' | 'preparation'>('tarifs');
  const [showStatusModal, setShowStatusModal] = useState<SaisonStatut | null>(null);
  const [showLetterPreview, setShowLetterPreview] = useState(false);

  const [tarifsNationaux, setTarifsNationaux] = useState({ licence: '12.50', assurance: '8.00', affiliation: '45.00' });
  const [tarifsRegionaux, setTarifsRegionaux] = useState(
    crSaisie.map(cr => ({ code: cr.code, cotisationIndiv: '4.00', cotisationAffil: '15.00', cotisationDepart: '2.00' }))
  );

  const [lettreContenu, setLettreContenu] = useState(
    `Objet : Ouverture de la saison gymnique {{saison}} — Prise de licence et affiliation\n\nChers responsables de clubs,\n\nNous avons le plaisir de vous informer de l'ouverture officielle de la saison {{saison}}. Les modalités de ré-affiliation et de prise de licence sont disponibles sur la plateforme FFGym Licence.\n\nNous vous rappelons que :\n• La période de ré-affiliation est ouverte du 1er septembre 2026 au 28 février 2027\n• Les tarifs de la saison {{saison}} sont consultables dans votre espace club\n• Le formulaire de demande d'attestations médicales est disponible en téléchargement\n\nCordialement,\nL'équipe FFGym — Comité National\nwww.ffgym.fr`
  );

  const saison = '2026-2027';
  const lettreAvecSaison = lettreContenu.replace(/{{saison}}/g, saison);

  const completCount = crSaisie.filter(c => c.statut === 'complet').length;
  const progressPct = Math.round((completCount / crSaisie.length) * 100);

  const currentIndex = saisonStatutFlow.indexOf(currentStatut);
  const nextStatut = currentIndex < saisonStatutFlow.length - 1 ? saisonStatutFlow[currentIndex + 1] : null;

  const currentStyle = getSaisonStatutStyle(currentStatut);

  const tabs = [
    { id: 'tarifs' as const,      label: 'Tarifs',         Icon: Mail },
    { id: 'lettre' as const,      label: 'Lettre info',    Icon: Mail },
    { id: 'suivi' as const,       label: 'Suivi saisie',   Icon: CheckCircle2 },
    { id: 'preparation' as const, label: 'Préparation',    Icon: Settings2 },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/federal" className="text-slate-500 hover:text-slate-700 rounded-lg p-1" aria-label="Retour">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900">Ouverture de saison</h1>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-ffgym-blue/10 text-ffgym-blue">CN</span>
              </div>
              <p className="text-slate-500 text-sm font-medium mt-0.5">Comité National · Saison {saison}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`badge ${currentStyle.class} text-sm px-4 py-2 flex items-center gap-1.5`}>
              <currentStyle.Icon className="w-3 h-3" aria-hidden="true" />
              {currentStyle.label}
            </span>
            {nextStatut && (
              <button
                onClick={() => setShowStatusModal(nextStatut)}
                className="flex items-center gap-2 text-sm font-semibold border-2 border-slate-200 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all"
              >
                Passer à : {getSaisonStatutStyle(nextStatut).label}
                <ChevronRight className="w-3 h-3" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">

        {/* Timeline statut */}
        <div className="card">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Progression de la saison</p>
          <div className="flex items-center gap-0">
            {saisonStatutFlow.map((s, i) => {
              const style = getSaisonStatutStyle(s);
              const isDone = saisonStatutFlow.indexOf(currentStatut) >= i;
              const isCurrent = s === currentStatut;
              return (
                <div key={s} className="flex items-center flex-1">
                  <div className={`flex flex-col items-center gap-2 flex-1 ${i === 0 ? '' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                      isCurrent ? 'bg-ffgym-blue text-white border-ffgym-blue shadow-ffgym-blue' :
                      isDone ? 'bg-emerald-500 text-white border-emerald-500' :
                      'bg-white text-slate-400 border-slate-200'
                    }`}>
                      {isDone && !isCurrent
                        ? <Check className="w-4 h-4" aria-hidden="true" />
                        : <style.Icon className="w-4 h-4" aria-hidden="true" />
                      }
                    </div>
                    <p className={`text-xs font-semibold text-center ${isCurrent ? 'text-ffgym-blue' : isDone ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {style.label}
                    </p>
                  </div>
                  {i < saisonStatutFlow.length - 1 && (
                    <div className={`h-0.5 flex-1 -mt-6 ${isDone && s !== currentStatut ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit flex-wrap">
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

        {/* Tarifs */}
        {activeTab === 'tarifs' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tarifs nationaux */}
            <div className="card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900">Tarifs nationaux — Saison {saison}</h3>
                <span className="text-xs font-semibold text-ffgym-blue bg-ffgym-blue/8 px-2.5 py-1 rounded-lg">CN</span>
              </div>
              <div className="space-y-4">
                {[
                  { key: 'licence', label: 'Licence fédérale (par licencié)' },
                  { key: 'assurance', label: 'Assurance licencié' },
                  { key: 'affiliation', label: 'Affiliation club (par saison)' },
                ].map(f => (
                  <div key={f.key} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{f.label}</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        value={tarifsNationaux[f.key as keyof typeof tarifsNationaux]}
                        onChange={e => setTarifsNationaux(prev => ({ ...prev, [f.key]: e.target.value }))}
                        className="input-base !pr-12"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">€</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 bg-ffgym-blue text-white font-semibold rounded-xl hover:bg-ffgym-gradient-start transition-colors text-sm">
                Valider les tarifs nationaux
              </button>
              <div className="bg-ffgym-blue/5 border border-ffgym-blue/15 rounded-xl p-3">
                <p className="text-xs text-slate-600">
                  <span className="font-semibold text-ffgym-blue">Template notification : </span>
                  Les tarifs de la saison <code className="bg-ffgym-blue/10 px-1 rounded">{'{{saison}}'}</code> = <strong>{saison}</strong> seront automatiquement inclus dans les communications aux clubs.
                </p>
              </div>
            </div>

            {/* Tarifs régionaux */}
            <div className="card !p-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">Tarifs régionaux — Saisie par CR</h3>
                <p className="text-xs text-slate-500 mt-1">Saisie inline — cliquer sur une valeur pour modifier</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px]">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">CR</th>
                      <th className="px-3 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Cotis. indiv.</th>
                      <th className="px-3 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Cotis. affil.</th>
                      <th className="px-3 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Cotis. départ.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tarifsRegionaux.slice(0, 6).map((cr, i) => (
                      <tr key={cr.code} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3">
                          <span className="text-xs font-bold text-ffgym-blue bg-ffgym-blue/8 px-2 py-1 rounded-lg">{cr.code}</span>
                        </td>
                        {(['cotisationIndiv', 'cotisationAffil', 'cotisationDepart'] as const).map(field => (
                          <td key={field} className="px-3 py-3 text-right">
                            <div className="relative inline-block">
                              <input
                                type="number"
                                step="0.01"
                                value={tarifsRegionaux[i][field]}
                                onChange={e => {
                                  const updated = [...tarifsRegionaux];
                                  updated[i] = { ...updated[i], [field]: e.target.value };
                                  setTarifsRegionaux(updated);
                                }}
                                className="w-20 text-right text-sm font-mono font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:border-ffgym-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-ffgym-blue/20 transition-all"
                              />
                              <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">€</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-slate-400 text-center py-2">+{tarifsRegionaux.length - 6} autres CR…</p>
              </div>
              <div className="px-6 py-4 border-t border-slate-100">
                <button className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors text-sm">
                  Valider tous les tarifs régionaux
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lettre d'information */}
        {activeTab === 'lettre' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card space-y-4">
              <h3 className="font-bold text-slate-900">Rédiger la lettre d'information aux clubs</h3>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Destinataires</label>
                <div className="flex flex-wrap gap-2">
                  {['Présidents', 'Secrétaires', 'Responsables licences'].map(d => (
                    <label key={d} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      {d}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Corps du message
                  <span className="ml-2 font-normal text-slate-400 normal-case">
                    — utiliser <code className="bg-slate-100 px-1 rounded">{'{{saison}}'}</code> pour l'année automatique
                  </span>
                </label>
                <textarea
                  value={lettreContenu}
                  onChange={e => setLettreContenu(e.target.value)}
                  className="input-base !resize-none h-48 text-sm font-mono leading-relaxed"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Pièce jointe (URL)</label>
                <input type="url" placeholder="https://..." className="input-base text-sm" />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLetterPreview(true)}
                  className="flex-1 py-3 text-sm font-semibold border-2 border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  Prévisualiser
                </button>
                <button className="flex-1 py-3 bg-ffgym-blue text-white text-sm font-semibold rounded-xl hover:bg-ffgym-gradient-start transition-colors flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Envoyer aux clubs
                </button>
              </div>
            </div>
            <div className="card bg-slate-50 border-slate-200">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Aperçu — variables résolues</p>
              <pre className="text-sm text-slate-700 whitespace-pre-wrap leading-relaxed font-sans">{lettreAvecSaison}</pre>
            </div>
          </div>
        )}

        {/* Suivi saisie tarifs */}
        {activeTab === 'suivi' && (
          <div className="space-y-4">
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-slate-900">Progression globale</p>
                <span className="font-bold text-2xl text-ffgym-blue">{completCount}/{crSaisie.length}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-ffgym-blue to-emerald-500 transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">{progressPct}% des CR ont validé leurs tarifs</p>
            </div>
            <div className="card !p-0 overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Comité Régional</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut saisie</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date envoi</th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {crSaisie.map(cr => {
                    const style = getSaisieStyle(cr.statut);
                    return (
                      <tr key={cr.code} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-bold text-ffgym-blue bg-ffgym-blue/8 px-2 py-1 rounded-lg text-xs mr-2">{cr.code}</span>
                          <span className="text-sm font-medium text-slate-800">{cr.label}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`badge ${style.class} flex items-center gap-1 w-fit`}>
                            <style.Icon className="w-3 h-3" aria-hidden="true" />
                            {style.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {cr.dateEnvoi ? new Date(cr.dateEnvoi).toLocaleDateString('fr-FR') : '—'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {cr.statut !== 'complet' && (
                            <button className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-colors">
                              Relancer
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Préparation */}
        {activeTab === 'preparation' && (
          <div className="space-y-4">
            <div className="card bg-cyan-50 border-cyan-200 !p-4 flex items-start gap-3">
              <Info className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <p className="text-sm text-slate-700">
                <span className="font-semibold text-cyan-700">Phase de préparation — </span>
                Certains clubs ont déjà anticipé leur ré-affiliation avant l'ouverture officielle de la saison. Ces dossiers sont en attente de validation.
              </p>
            </div>
            <div className="card !p-0 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">Clubs en phase de préparation ({clubsPreparation.length})</h3>
              </div>
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Club</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Zone</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date dépôt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {clubsPreparation.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900 text-sm">{c.nom}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-ffgym-blue bg-ffgym-blue/8 px-2 py-1 rounded-lg">{c.zone}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`badge ${c.statut === 'reaffiliation_anticipee' ? 'badge-info' : 'badge-warning'}`}>
                          {c.statut === 'reaffiliation_anticipee' ? 'Ré-affiliation anticipée' : 'En cours'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{new Date(c.date).toLocaleDateString('fr-FR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Status change modal */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowStatusModal(null)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            {(() => {
              const modalStyle = getSaisonStatutStyle(showStatusModal);
              return (
                <div className="w-14 h-14 rounded-xl bg-ffgym-blue/10 text-ffgym-blue flex items-center justify-center mx-auto mb-4">
                  <modalStyle.Icon className="w-6 h-6" aria-hidden="true" />
                </div>
              );
            })()}
            <h3 className="text-lg font-bold text-slate-900 text-center mb-1">
              Passer la saison à : <span className="text-ffgym-blue">{getSaisonStatutStyle(showStatusModal).label}</span>
            </h3>
            <p className="text-sm text-slate-500 text-center mb-6">
              Cette action est irréversible. Les clubs seront notifiés automatiquement.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { setCurrentStatut(showStatusModal); setShowStatusModal(null); }}
                className="flex-1 py-3 bg-ffgym-blue text-white font-semibold rounded-xl hover:bg-ffgym-gradient-start transition-colors"
              >
                Confirmer
              </button>
              <button
                onClick={() => setShowStatusModal(null)}
                className="flex-1 py-3 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Letter preview modal */}
      {showLetterPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowLetterPreview(false)}>
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 animate-scale-in max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900">Prévisualisation de la lettre</h3>
              <button onClick={() => setShowLetterPreview(false)} className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <div className="prose prose-sm max-w-none">
              <div className="mb-4 pb-4 border-b border-slate-100">
                <p className="text-xs text-slate-400 mb-1">De : Comité National FFGym &lt;cn@ffgym.fr&gt;</p>
                <p className="text-xs text-slate-400">À : Présidents, Secrétaires, Responsables licences — Tous clubs affiliés</p>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-sans">{lettreAvecSaison}</pre>
            </div>
            <button
              onClick={() => setShowLetterPreview(false)}
              className="w-full mt-6 py-3 bg-ffgym-blue text-white font-semibold rounded-xl hover:bg-ffgym-gradient-start transition-colors"
            >
              Envoyer à tous les clubs
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
