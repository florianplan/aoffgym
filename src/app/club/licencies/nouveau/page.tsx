'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import disciplinesData from '@/data/disciplines.json';
import doublonData from '@/data/doublon.json';

const { disciplines } = disciplinesData;

interface FormData {
  nom: string;
  prenom: string;
  dateNaissance: string;
  email: string;
  disciplinePrincipale: string;
  fonction: string;
}

export default function NouvelleLicencePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showDoublonModal, setShowDoublonModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    dateNaissance: '',
    email: '',
    disciplinePrincipale: '',
    fonction: 'pratiquant',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est obligatoire';
    if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est obligatoire';
    if (!formData.dateNaissance) newErrors.dateNaissance = 'La date de naissance est obligatoire';
    if (!formData.email.trim()) newErrors.email = 'L\'email est obligatoire';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Format d\'email invalide';
    if (!formData.disciplinePrincipale) newErrors.disciplinePrincipale = 'La discipline est obligatoire';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const isDoublonScenario = 
      formData.nom.toLowerCase() === 'martin' &&
      formData.prenom.toLowerCase().startsWith('luc') &&
      formData.dateNaissance === '2012-03-15';

    if (isDoublonScenario) {
      setShowDoublonModal(true);
    } else {
      handleSuccess();
    }
  };

  const handleSuccess = () => {
    setShowDoublonModal(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      router.push('/club/licencies');
    }, 2000);
  };

  const handleDoublonOption = (option: string) => {
    console.log('Option choisie:', option);
    handleSuccess();
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-8 py-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link href="/club/licencies" className="text-slate-400 hover:text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="title-page">Nouvelle pré-licence</h1>
            </div>
            <p className="text-slate-500 font-medium ml-8">Créer une pré-licence pour la saison 2026-2027</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-3xl mx-auto">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= 1 ? 'bg-ffgym-red text-white shadow-ffgym-red' : 'bg-slate-100 text-slate-400 border-2 border-slate-200'
            }`}>
              {step > 1 ? '✓' : '1'}
            </div>
            <span className={`text-sm font-semibold ${step >= 1 ? 'text-ffgym-red' : 'text-slate-400'}`}>Identité</span>
          </div>

          <div className={`w-16 h-1 rounded-full transition-all ${step >= 2 ? 'bg-ffgym-red' : 'bg-slate-200'}`} />

          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= 2 ? 'bg-ffgym-red text-white shadow-ffgym-red' : 'bg-slate-100 text-slate-400 border-2 border-slate-200'
            }`}>
              {step > 2 ? '✓' : '2'}
            </div>
            <span className={`text-sm font-semibold ${step >= 2 ? 'text-ffgym-red' : 'text-slate-400'}`}>Discipline</span>
          </div>

          <div className={`w-16 h-1 rounded-full transition-all ${step >= 3 ? 'bg-ffgym-red' : 'bg-slate-200'}`} />

          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= 3 ? 'bg-ffgym-red text-white shadow-ffgym-red' : 'bg-slate-100 text-slate-400 border-2 border-slate-200'
            }`}>
              3
            </div>
            <span className={`text-sm font-semibold ${step >= 3 ? 'text-ffgym-red' : 'text-slate-400'}`}>Validation</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="card">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Identité */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Informations personnelles</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Nom *</label>
                    <input
                      type="text"
                      placeholder="Ex: Martin"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      className={`input-base ${errors.nom ? 'input-error' : ''}`}
                    />
                    {errors.nom && <p className="text-sm text-rose-500 font-medium flex items-center gap-2"><span>⚠</span>{errors.nom}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Prénom *</label>
                    <input
                      type="text"
                      placeholder="Ex: Lucas"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      className={`input-base ${errors.prenom ? 'input-error' : ''}`}
                    />
                    {errors.prenom && <p className="text-sm text-rose-500 font-medium flex items-center gap-2"><span>⚠</span>{errors.prenom}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Date de naissance *</label>
                    <input
                      type="date"
                      value={formData.dateNaissance}
                      onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
                      className={`input-base ${errors.dateNaissance ? 'input-error' : ''}`}
                    />
                    {errors.dateNaissance && <p className="text-sm text-rose-500 font-medium flex items-center gap-2"><span>⚠</span>{errors.dateNaissance}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email *</label>
                    <input
                      type="email"
                      placeholder="email@exemple.fr"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`input-base ${errors.email ? 'input-error' : ''}`}
                    />
                    {errors.email && <p className="text-sm text-rose-500 font-medium flex items-center gap-2"><span>⚠</span>{errors.email}</p>}
                  </div>
                </div>

                <div className="bg-ffgym-blue/5 rounded-xl p-4 border border-ffgym-blue/20">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold text-ffgym-blue">Astuce démo</span> — Pour tester le contrôle de doublons, saisissez : Nom "Martin", Prénom "Luca", Date "15/03/2012"
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <button type="button" onClick={() => setStep(2)} className="btn-primary">
                    Suivant →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Discipline */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Discipline et fonction</h3>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Discipline principale *</label>
                  <select
                    value={formData.disciplinePrincipale}
                    onChange={(e) => setFormData({ ...formData, disciplinePrincipale: e.target.value })}
                    className={`select-base ${errors.disciplinePrincipale ? 'input-error' : ''}`}
                  >
                    <option value="">Sélectionnez une discipline</option>
                    {disciplines.map((d) => (
                      <option key={d.code} value={d.abreviation}>{d.libelle}</option>
                    ))}
                  </select>
                  {errors.disciplinePrincipale && <p className="text-sm text-rose-500 font-medium flex items-center gap-2"><span>⚠</span>{errors.disciplinePrincipale}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Fonction</label>
                  <select
                    value={formData.fonction}
                    onChange={(e) => setFormData({ ...formData, fonction: e.target.value })}
                    className="select-base"
                  >
                    <option value="pratiquant">Pratiquant</option>
                    <option value="encadrant">Encadrant</option>
                    <option value="dirigeant">Dirigeant</option>
                  </select>
                </div>

                <div className="flex justify-between pt-4">
                  <button type="button" onClick={() => setStep(1)} className="btn-outline">
                    ← Retour
                  </button>
                  <button type="button" onClick={() => setStep(3)} className="btn-primary">
                    Suivant →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Validation */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Récapitulatif</h3>

                <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="avatar avatar-xl">
                      {formData.prenom.charAt(0)}{formData.nom.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900">{formData.prenom} {formData.nom.toUpperCase()}</p>
                      <p className="text-slate-500">{formData.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Date de naissance</p>
                      <p className="font-medium text-slate-900">{formData.dateNaissance ? new Date(formData.dateNaissance).toLocaleDateString('fr-FR') : '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Discipline</p>
                      <span className="badge badge-discipline">{formData.disciplinePrincipale || '-'}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Fonction</p>
                      <p className="font-medium text-slate-900 capitalize">{formData.fonction}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Saison</p>
                      <p className="font-medium text-slate-900">2026-2027</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button type="button" onClick={() => setStep(2)} className="btn-outline">
                    ← Retour
                  </button>
                  <button type="submit" className="btn-primary">
                    Valider la pré-licence
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Modale Doublon */}
      {showDoublonModal && (
        <div className="modal-overlay" onClick={() => setShowDoublonModal(false)}>
          <div 
            className="relative bg-white rounded-2xl shadow-modal w-full max-w-xl mx-4 overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-rose-500" />

            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-3xl">
                  ⚠️
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Doublon potentiel détecté</h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">{doublonData.doublonDetecte.raison}</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-6">
              {/* Carte doublon */}
              <div className="bg-slate-50 rounded-xl p-5 mb-6 border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="avatar avatar-lg">
                    {doublonData.doublonDetecte.licencieExistant.prenom.charAt(0)}{doublonData.doublonDetecte.licencieExistant.nom.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-900 text-lg">
                      {doublonData.doublonDetecte.licencieExistant.prenom} {doublonData.doublonDetecte.licencieExistant.nom.toUpperCase()}
                    </p>
                    <p className="text-sm text-slate-500">
                      N° {doublonData.doublonDetecte.licencieExistant.numeroLicence} · {doublonData.doublonDetecte.licencieExistant.disciplinePrincipale} · {doublonData.doublonDetecte.licencieExistant.clubActuel}
                    </p>
                    <span className="inline-block mt-2 badge badge-success">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                      Licence valide
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-500">{Math.round(doublonData.doublonDetecte.score * 100)}%</p>
                    <p className="text-xs text-slate-400">similarité</p>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {doublonData.optionsProposees.filter(o => o.disponible).map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleDoublonOption(option.id)}
                    className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-xl text-left hover:border-ffgym-red/40 hover:bg-ffgym-red/5 transition-all group"
                  >
                    <p className="font-semibold text-slate-900 group-hover:text-ffgym-red">{option.label}</p>
                    <p className="text-sm text-slate-500 mt-1">{option.description}</p>
                  </button>
                ))}

                <button
                  onClick={() => setShowDoublonModal(false)}
                  className="w-full px-5 py-3 text-slate-500 font-medium hover:text-slate-700 transition-colors"
                >
                  ← Annuler et revenir au formulaire
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Success */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 bg-white rounded-xl shadow-glow-emerald border border-emerald-100 p-5 flex items-start gap-4 max-w-sm animate-slide-up">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-lg shadow-[0_4px_15px_-3px_rgba(16,185,129,0.5)]">
            ✓
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900">Pré-licence créée avec succès</p>
            <p className="text-sm text-slate-500 mt-1">{formData.prenom} {formData.nom.toUpperCase()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
