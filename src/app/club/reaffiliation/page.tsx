'use client';

import { useState } from 'react';
import Link from 'next/link';
import clubData from '@/data/club.json';
import {
  Building2, Users, Activity, CheckCircle2, Check, ArrowLeft, Info,
  Plus, CreditCard, Landmark, Send, ArrowRight, Home,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const { club } = clubData;

const steps: { id: number; label: string; Icon: LucideIcon }[] = [
  { id: 1, label: 'Infos légales',  Icon: Building2 },
  { id: 2, label: 'Dirigeants',     Icon: Users },
  { id: 3, label: 'Encadrants',     Icon: Activity },
  { id: 4, label: 'Validation',     Icon: CheckCircle2 },
];

const encadrants = [
  { nom: 'Dupont Martin',  fonction: 'Entraîneur GAM', licence: '2027-IDF-100001', honorabilite: 'valide',   diplome: 'BPJEPS Gym' },
  { nom: 'Leblanc Sophie', fonction: 'Éducatrice GAF', licence: '2027-IDF-100023', honorabilite: 'valide',   diplome: 'DE Gym' },
  { nom: 'Bernard Julien', fonction: 'Moniteur TRA',   licence: '2027-IDF-100045', honorabilite: 'en_cours', diplome: 'BPJEPS Gym' },
  { nom: 'Martin Claire',  fonction: 'Éducatrice GPT', licence: null,              honorabilite: 'en_attente', diplome: 'BAFA' },
];

const getHonorabiliteStyle = (s: string) => {
  switch (s) {
    case 'valide':     return { class: 'badge-success', label: 'Validé' };
    case 'en_cours':   return { class: 'badge-info',    label: 'En cours' };
    case 'en_attente': return { class: 'badge-warning',  label: 'En attente' };
    default:           return { class: 'badge-neutral',  label: s };
  }
};

export default function ReaffiliationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const goNext = () => {
    if (currentStep < 4) {
      setCompleted(c => [...c, currentStep]);
      setCurrentStep(s => s + 1);
    } else {
      setSubmitted(true);
    }
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Dossier soumis !</h2>
          <p className="text-slate-500 mb-6">
            Votre dossier de ré-affiliation a été transmis au CR Île-de-France. Vous recevrez une confirmation par email sous 3 à 5 jours ouvrés.
          </p>
          <div className="card bg-slate-50 border-slate-200 !p-4 text-left mb-6">
            {[
              { label: 'Club', value: club.nom },
              { label: 'N° affiliation', value: club.numeroAffiliation },
              { label: 'Saison', value: '2027-2028' },
              { label: 'Date de dépôt', value: new Date().toLocaleDateString('fr-FR') },
            ].map(f => (
              <div key={f.label} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-500">{f.label}</span>
                <span className="text-sm font-semibold text-slate-900">{f.value}</span>
              </div>
            ))}
          </div>
          <Link href="/club" className="btn-primary inline-flex items-center gap-2">
            <Home className="w-4 h-4" aria-hidden="true" />
            Retour au tableau de bord
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header compact */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center gap-3">
          <Link href="/club" className="text-slate-500 hover:text-slate-700 rounded-lg p-1" aria-label="Retour">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Ré-affiliation 2027-2028</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{club.nom} · Étape {currentStep} sur 4</p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8 max-w-3xl mx-auto space-y-8">

        {/* Stepper */}
        <div className="flex items-center">
          {steps.map((step, i) => {
            const isDone = completed.includes(step.id);
            const isCurrent = step.id === currentStep;
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2 flex-1">
                  <button
                    onClick={() => isDone && setCurrentStep(step.id)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                      isDone ? 'bg-ffgym-blue border-ffgym-blue text-white cursor-pointer hover:bg-ffgym-gradient-start' :
                      isCurrent ? 'bg-ffgym-blue border-ffgym-blue text-white shadow-ffgym-blue' :
                      'bg-white border-slate-200 text-slate-400 cursor-default'
                    }`}
                  >
                    {isDone
                      ? <Check className="w-4 h-4" aria-hidden="true" />
                      : <step.Icon className="w-4 h-4" aria-hidden="true" />
                    }
                  </button>
                  <p className={`text-xs font-semibold text-center ${isCurrent ? 'text-ffgym-blue' : isDone ? 'text-ffgym-blue' : 'text-slate-400'}`}>
                    {step.label}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 -mt-6 mx-1 ${isDone ? 'bg-ffgym-blue' : 'bg-slate-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="card">

          {/* Étape 1 — Infos légales */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-ffgym-blue" aria-hidden="true" />
                Vérification des informations légales
              </h2>
              <p className="text-sm text-slate-500">Confirmez ou mettez à jour les informations de votre club pour la saison 2027-2028.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Raison sociale', value: club.nom, type: 'text' },
                  { label: 'SIRET', value: club.siret, type: 'text' },
                  { label: 'Adresse', value: club.adresse.rue, type: 'text' },
                  { label: 'Code postal', value: club.adresse.codePostal, type: 'text' },
                  { label: 'Ville', value: club.adresse.ville, type: 'text' },
                  { label: 'Email', value: club.contact.email, type: 'email' },
                ].map(f => (
                  <div key={f.label} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{f.label}</label>
                    <input type={f.type} defaultValue={f.value} className="input-base text-sm" />
                  </div>
                ))}
              </div>
              <div className="bg-ffgym-blue/5 border border-ffgym-blue/15 rounded-xl p-4">
                <p className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Info className="w-3 h-3 text-ffgym-blue flex-shrink-0" aria-hidden="true" />
                  Les modifications seront soumises au CR pour validation. Les données SIRET sont vérifiées automatiquement via l'API INSEE.
                </p>
              </div>
            </div>
          )}

          {/* Étape 2 — Dirigeants */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-ffgym-blue" aria-hidden="true" />
                Composition du bureau directeur
              </h2>
              <p className="text-sm text-slate-500">Confirmez les dirigeants du club pour la saison 2027-2028.</p>
              <div className="space-y-3">
                {[
                  { titre: 'Président',           prenom: club.dirigeants.president.prenom,          nom: club.dirigeants.president.nom,          email: club.dirigeants.president.email },
                  { titre: 'Trésorier',           prenom: club.dirigeants.tresorier.prenom,          nom: club.dirigeants.tresorier.nom,          email: club.dirigeants.tresorier.email },
                  { titre: 'Secrétaire Général',  prenom: club.dirigeants.secretaireGeneral.prenom, nom: club.dirigeants.secretaireGeneral.nom, email: club.dirigeants.secretaireGeneral.email },
                ].map((d, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-ffgym-blue/10 text-ffgym-blue flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {d.prenom[0]}{d.nom[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-500">{d.titre}</p>
                      <p className="font-semibold text-slate-900 text-sm">{d.prenom} {d.nom.toUpperCase()}</p>
                      <p className="text-xs text-slate-400">{d.email}</p>
                    </div>
                    <span className="badge badge-success text-xs">Confirmé</span>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 text-sm font-semibold text-ffgym-blue border border-ffgym-blue/20 px-4 py-2.5 rounded-xl hover:bg-ffgym-blue/5 transition-colors">
                <Plus className="w-3 h-3" aria-hidden="true" />
                Ajouter un dirigeant
              </button>
            </div>
          )}

          {/* Étape 3 — Encadrants */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-ffgym-blue" aria-hidden="true" />
                Tableau des encadrants
              </h2>
              <p className="text-sm text-slate-500">Vérifiez les encadrants déclarés pour la saison 2027-2028.</p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Encadrant</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Fonction</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Licence</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Honorabilité</th>
                      <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {encadrants.map((e, i) => {
                      const hs = getHonorabiliteStyle(e.honorabilite);
                      return (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-4 py-3">
                            <p className="font-semibold text-slate-900 text-sm">{e.nom}</p>
                            <p className="text-xs text-slate-400">{e.diplome}</p>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-600">{e.fonction}</td>
                          <td className="px-4 py-3">
                            {e.licence
                              ? <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">{e.licence}</span>
                              : <span className="text-xs text-amber-600 font-medium">À attribuer</span>
                            }
                          </td>
                          <td className="px-4 py-3">
                            <span className={`badge ${hs.class} text-xs`}>{hs.label}</span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button className="text-xs text-red-500 hover:text-red-700 font-semibold transition-colors">
                              Retirer
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 text-sm font-semibold text-ffgym-blue border border-ffgym-blue/20 px-4 py-2.5 rounded-xl hover:bg-ffgym-blue/5 transition-colors">
                  <Plus className="w-3 h-3" aria-hidden="true" />
                  Ajouter un encadrant
                </button>
                <p className="text-xs text-slate-400">L'intégration se fait via saisie manuelle ou API outils clubs</p>
              </div>
            </div>
          )}

          {/* Étape 4 — Validation + Paiement */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-ffgym-blue" aria-hidden="true" />
                Récapitulatif & Paiement
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Club',            value: club.nom },
                  { label: 'N° affiliation',  value: club.numeroAffiliation },
                  { label: 'Saison',          value: '2027-2028' },
                  { label: 'Encadrants',      value: `${encadrants.length} déclarés` },
                  { label: 'Dirigeants',      value: '3 confirmés' },
                ].map(f => (
                  <div key={f.label} className="flex justify-between items-center py-2.5 border-b border-slate-100">
                    <span className="text-sm text-slate-500">{f.label}</span>
                    <span className="text-sm font-semibold text-slate-900">{f.value}</span>
                  </div>
                ))}
              </div>

              <div className="card bg-slate-50 border-slate-200 !p-5 space-y-3">
                <h3 className="font-bold text-slate-900">Cotisation de ré-affiliation</h3>
                {[
                  { label: 'Cotisation fédérale nationale',   montant: 45.00 },
                  { label: 'Cotisation régionale CR IDF',     montant: 15.00 },
                  { label: 'Cotisation départementale CD 75', montant: 8.00 },
                ].map(l => (
                  <div key={l.label} className="flex justify-between text-sm">
                    <span className="text-slate-600">{l.label}</span>
                    <span className="font-semibold text-slate-900">{l.montant.toFixed(2)} €</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
                  <span>Total</span>
                  <span className="text-lg">68,00 €</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/club/decomptes/paiement"
                  className="flex-1 py-3.5 bg-ffgym-blue text-white font-semibold rounded-xl hover:bg-ffgym-gradient-start transition-colors text-center text-sm flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" aria-hidden="true" />
                  Payer par CB (68,00 €)
                </Link>
                <button className="flex-1 py-3.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center justify-center gap-2">
                  <Landmark className="w-4 h-4" aria-hidden="true" />
                  Paiement par virement
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-5 py-3 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          >
            <ArrowLeft className="w-3 h-3" aria-hidden="true" />
            Précédent
          </button>

          <p className="text-sm text-slate-400">Étape {currentStep}/4</p>

          <button
            onClick={goNext}
            className="flex items-center gap-2 px-5 py-3 bg-ffgym-blue text-white font-semibold rounded-xl hover:bg-ffgym-gradient-start transition-colors text-sm"
          >
            {currentStep === 4 ? (
              <>Soumettre le dossier <Send className="w-3 h-3" aria-hidden="true" /></>
            ) : (
              <>Suivant <ArrowRight className="w-3 h-3" aria-hidden="true" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
