'use client';

import { useState } from 'react';
import {
  Building2, MapPin, Dumbbell, Plus, MapPinned, Warehouse, ShieldCheck,
  ScrollText, Users2, Briefcase, Heart, Network, Save, Pen, Trash2, Info
} from 'lucide-react';
import clubData from '@/data/club.json';

const { club } = clubData;

const donneesComplementaires = {
  zoneRevitalisation: false,
  qpv: true,
  qpvNom: 'Quartier Boucicaut - Convention Sud 15',
  equipements: [
    { nom: 'Salle principale — Gymnase Boucicaut',   type: 'Gymnase', surface: '450 m²', statut: 'Propriété commune' },
    { nom: 'Salle annexe — Gymnase Brancion',        type: 'Salle polyvalente', surface: '180 m²', statut: 'Location à la mairie' },
  ],
  projetAssociatif: 'Le club développe la pratique gymnique pour tous les publics, avec un accent sur l\'insertion par le sport dans le quartier Boucicaut (QPV). Convention avec la mairie de Paris 15 pour l\'accès aux équipements.',
  dateFondation: '1987-03-12',
  nombreSalaries: 3,
  nombreBenevoles: 12,
};

const rhRows = [
  { label: 'Salariés', value: donneesComplementaires.nombreSalaries, Icon: Briefcase },
  { label: 'Bénévoles', value: donneesComplementaires.nombreBenevoles, Icon: Heart },
];

export default function InfosClubPage() {
  const [activeTab, setActiveTab] = useState<'statutaires' | 'complementaires' | 'organigramme'>('statutaires');
  const [editMode, setEditMode] = useState(false);

  const dirigeants = [
    { titre: 'Président',          prenom: club.dirigeants.president.prenom,          nom: club.dirigeants.president.nom,          email: club.dirigeants.president.email,          tel: '06 12 34 56 78' },
    { titre: 'Trésorier',          prenom: club.dirigeants.tresorier.prenom,          nom: club.dirigeants.tresorier.nom,          email: club.dirigeants.tresorier.email,          tel: '06 23 45 67 89' },
    { titre: 'Secrétaire Général', prenom: club.dirigeants.secretaireGeneral.prenom, nom: club.dirigeants.secretaireGeneral.nom, email: club.dirigeants.secretaireGeneral.email, tel: '06 34 56 78 90' },
    { titre: 'Responsable licences', prenom: 'Isabelle', nom: 'Marchand', email: 'i.marchand@gymetoiles.fr', tel: '06 45 67 89 01' },
  ];

  const tabs = [
    { id: 'statutaires' as const,      label: 'Données statutaires',      Icon: Building2 },
    { id: 'complementaires' as const,  label: 'Données complémentaires',  Icon: Network },
    { id: 'organigramme' as const,     label: 'Organigramme',             Icon: Network },
  ];

  return (
    <div className="min-h-screen">
      {/* Header compact */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Infos du club</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{club.nom} · {club.numeroAffiliation}</p>
          </div>
          <button
            onClick={() => setEditMode(e => !e)}
            className={`flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border-2 transition-all ${
              editMode
                ? 'bg-ffgym-blue text-white border-ffgym-blue'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {editMode
              ? <Save className="w-4 h-4" aria-hidden="true" />
              : <Pen className="w-4 h-4" aria-hidden="true" />
            }
            {editMode ? 'Enregistrer' : 'Modifier'}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-5">
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

        {/* Onglet Statutaires */}
        {activeTab === 'statutaires' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card space-y-4">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
                Identification
              </h2>
              {[
                { label: 'Raison sociale',    value: club.nom,               field: 'nom' },
                { label: 'N° affiliation',    value: club.numeroAffiliation, mono: true },
                { label: 'SIRET',             value: club.siret,             mono: true },
                { label: 'Date de création',  value: new Date(donneesComplementaires.dateFondation).toLocaleDateString('fr-FR') },
              ].map(f => (
                <div key={f.label} className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{f.label}</label>
                  {editMode && f.field ? (
                    <input type="text" defaultValue={f.value} className="input-base text-sm" />
                  ) : (
                    <p className={`text-slate-900 font-semibold ${f.mono ? 'font-mono' : ''}`}>{f.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="card space-y-4">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-ffgym-red" aria-hidden="true" />
                Siège social
              </h2>
              {[
                { label: 'Rue',         value: club.adresse.rue },
                { label: 'Code postal', value: club.adresse.codePostal },
                { label: 'Ville',       value: club.adresse.ville },
                { label: 'Email',       value: club.contact.email },
                { label: 'Téléphone',   value: club.contact.telephone },
                { label: 'Site web',    value: club.contact.siteWeb },
              ].map(f => (
                <div key={f.label} className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{f.label}</label>
                  {editMode ? (
                    <input type="text" defaultValue={f.value} className="input-base text-sm" />
                  ) : (
                    <p className="text-slate-900 font-semibold">{f.value}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="card md:col-span-2 space-y-4">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
                Disciplines pratiquées
              </h2>
              <div className="flex flex-wrap gap-2">
                {club.disciplines.map(d => (
                  <span key={d} className="badge badge-discipline text-sm px-4 py-2">{d}</span>
                ))}
                {editMode && (
                  <button className="badge badge-neutral text-sm px-4 py-2 hover:bg-slate-200 transition-colors">
                    <Plus className="w-3 h-3 mr-1" aria-hidden="true" />
                    Ajouter
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Onglet Complémentaires */}
        {activeTab === 'complementaires' && (
          <div className="space-y-6">
            {/* Zonage */}
            <div className="card space-y-4">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <MapPinned className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
                Zonage et politique de la ville
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border-2 ${donneesComplementaires.qpv ? 'bg-ffgym-blue/5 border-ffgym-blue/20' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-slate-900 text-sm">QPV — Quartier Prioritaire de la Ville</p>
                    <span className={`badge ${donneesComplementaires.qpv ? 'badge-discipline' : 'badge-neutral'} text-xs`}>
                      {donneesComplementaires.qpv ? 'Oui' : 'Non'}
                    </span>
                  </div>
                  {donneesComplementaires.qpv && (
                    <p className="text-xs text-slate-600 mt-1">{donneesComplementaires.qpvNom}</p>
                  )}
                </div>
                <div className={`p-4 rounded-xl border-2 ${donneesComplementaires.zoneRevitalisation ? 'bg-ffgym-blue/5 border-ffgym-blue/20' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-slate-900 text-sm">ZRR — Zone de Revitalisation Rurale</p>
                    <span className={`badge ${donneesComplementaires.zoneRevitalisation ? 'badge-success' : 'badge-neutral'} text-xs`}>
                      {donneesComplementaires.zoneRevitalisation ? 'Oui' : 'Non'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Équipements */}
            <div className="card space-y-4">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Warehouse className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
                Équipements sportifs
              </h2>
              <div className="space-y-3">
                {donneesComplementaires.equipements.map((eq, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-ffgym-blue flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 text-sm">{eq.nom}</p>
                      <div className="flex gap-3 mt-1 text-xs text-slate-500">
                        <span>{eq.type}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full self-center" />
                        <span>{eq.surface}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full self-center" />
                        <span>{eq.statut}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projet asso + RH */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card space-y-3">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <ScrollText className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
                  Projet associatif
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">{donneesComplementaires.projetAssociatif}</p>
              </div>
              <div className="card space-y-4">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <Users2 className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
                  Ressources humaines
                </h2>
                {rhRows.map(r => (
                  <div key={r.label} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <r.Icon className="w-4 h-4 text-slate-400" aria-hidden="true" />
                      {r.label}
                    </div>
                    <span className="font-bold text-slate-900">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Onglet Organigramme */}
        {activeTab === 'organigramme' && (
          <div className="card space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900 flex items-center gap-2">
                <Network className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
                Bureau directeur — {club.nom}
              </h2>
              {editMode && (
                <button className="flex items-center gap-1.5 text-sm font-semibold text-ffgym-blue border border-ffgym-blue/20 px-3 py-1.5 rounded-lg hover:bg-ffgym-blue/5 transition-colors">
                  <Plus className="w-3 h-3" aria-hidden="true" />
                  Ajouter un dirigeant
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dirigeants.map((d, i) => {
                const initials = `${d.prenom[0]}${d.nom[0]}`.toUpperCase();
                return (
                  <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 group hover:border-ffgym-blue/30 transition-all">
                    <div className="w-12 h-12 rounded-full bg-ffgym-blue/10 text-ffgym-blue flex items-center justify-center font-bold flex-shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{d.titre}</p>
                      <p className="font-bold text-slate-900 mt-0.5">{d.prenom} {d.nom.toUpperCase()}</p>
                      <p className="text-xs text-slate-500 mt-1 truncate">{d.email}</p>
                      <p className="text-xs text-slate-400">{d.tel}</p>
                    </div>
                    {editMode && (
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-300 hover:text-red-500">
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-2 pt-4 border-t border-slate-100 bg-ffgym-blue/5 rounded-xl p-4">
              <p className="text-xs text-slate-600">
                <Info className="w-3 h-3 text-ffgym-blue mr-1.5 inline" aria-hidden="true" />
                Les changements de dirigeants nécessitent la validation du Comité Régional. En production, chaque modification déclencherait un workflow de vérification (contrôle d'honorabilité).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
