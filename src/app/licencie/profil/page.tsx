'use client';

import { useState } from 'react';
import licencieData from '@/data/licencie.json';
import {
  CheckCircle2, Save, Pen, Camera, Check, CreditCard, Dumbbell,
  Building2, User, BookUser, Stethoscope, AlertTriangle, Download,
  CloudUpload, ShieldHalf, Info
} from 'lucide-react';

const { licencie } = licencieData;

export default function ProfilPage() {
  const [editMode, setEditMode] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [certUploaded, setCertUploaded] = useState(false);
  const [certUploadDone, setCertUploadDone] = useState(false);
  const [editValues, setEditValues] = useState({
    email: licencie.email,
    telephone: licencie.telephone,
    rue: licencie.adresse.rue,
    codePostal: licencie.adresse.codePostal,
    ville: licencie.adresse.ville,
    nomUsage: '',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setEditMode(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCertUpload = () => {
    setCertUploaded(true);
    setTimeout(() => {
      setCertUploadDone(true);
      setCertUploaded(false);
    }, 1500);
  };

  const certDaysLeft = Math.ceil(
    (new Date(licencie.certificatMedical.dateValidite).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen">
      {/* Header compact */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Mon profil</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {licencie.prenom} {licencie.nom.toUpperCase()} · {licencie.numeroLicence}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {saveSuccess && (
              <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-semibold">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Modifications enregistrées
              </span>
            )}
            <button
              onClick={editMode ? handleSave : () => setEditMode(true)}
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
            {editMode && (
              <button
                onClick={() => setEditMode(false)}
                className="text-sm font-semibold text-slate-500 px-4 py-2.5 rounded-xl border-2 border-slate-200 hover:bg-slate-50 transition-all"
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-6">

        {/* Card identité */}
        <div className="card relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-ffgym-blue/5 via-transparent to-ffgym-red/5 pointer-events-none" />
          <div className="relative flex items-center gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-ffgym-blue/10 text-ffgym-blue flex items-center justify-center font-bold text-3xl shadow-sm">
                {licencie.prenom[0]}{licencie.nom[0]}
              </div>
              {editMode && (
                <button
                  onClick={() => setPhotoUploaded(true)}
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-ffgym-blue text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  title="Changer la photo"
                >
                  <Camera className="w-3 h-3" aria-hidden="true" />
                </button>
              )}
              {photoUploaded && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                  <Check className="w-3 h-3" aria-hidden="true" />
                </div>
              )}
            </div>

            {/* Infos */}
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-slate-900">
                  {licencie.prenom} {licencie.nom.toUpperCase()}
                </h2>
                <span className="badge badge-success">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  Licencié actif
                </span>
              </div>
              {editValues.nomUsage && (
                <p className="text-sm text-slate-500 italic mt-0.5">Nom d'usage : {editValues.nomUsage}</p>
              )}
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <CreditCard className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  <span className="font-mono font-semibold text-slate-700">{licencie.numeroLicence}</span>
                </span>
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Dumbbell className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  <span className="badge badge-discipline text-[10px]">{licencie.licence.disciplinePrincipale}</span>
                </span>
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Building2 className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  {licencie.club.nom}
                </span>
              </div>
            </div>

            {/* Licence status */}
            <div className="flex-shrink-0 text-right">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Saison</p>
              <p className="text-xl font-bold text-slate-900 mt-0.5">{licencie.licence.saison}</p>
              <p className="text-xs text-slate-500 mt-1">
                Valide jusqu'au {new Date(licencie.licence.dateValidite).toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Données personnelles */}
          <div className="card space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
              Données personnelles
            </h3>

            {[
              { label: 'Nom de famille', value: licencie.nom.toUpperCase(), editable: false },
              { label: 'Prénom', value: licencie.prenom, editable: false },
              { label: 'Date de naissance', value: `${new Date(licencie.dateNaissance).toLocaleDateString('fr-FR')} (${licencie.age} ans)`, editable: false },
            ].map(f => (
              <div key={f.label} className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{f.label}</label>
                <p className="font-semibold text-slate-900">{f.value}</p>
              </div>
            ))}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Nom d'usage
                <span className="ml-1.5 text-[10px] font-normal text-slate-400 normal-case">(facultatif)</span>
              </label>
              {editMode ? (
                <input
                  type="text"
                  placeholder="Ex : nom de jeune fille, pseudonyme..."
                  value={editValues.nomUsage}
                  onChange={e => setEditValues(v => ({ ...v, nomUsage: e.target.value }))}
                  className="input-base text-sm"
                />
              ) : (
                <p className="font-semibold text-slate-900">{editValues.nomUsage || '—'}</p>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 bg-amber-50 rounded-xl p-3">
              <p className="text-xs text-amber-700">
                <Info className="w-3 h-3 inline mr-1.5" aria-hidden="true" />
                Les données d'état civil (nom, prénom, date de naissance) ne sont modifiables que sur demande auprès du CR.
              </p>
            </div>
          </div>

          {/* Coordonnées */}
          <div className="card space-y-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <BookUser className="w-4 h-4 text-ffgym-red" aria-hidden="true" />
              Coordonnées
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</label>
              {editMode ? (
                <input type="email" value={editValues.email} onChange={e => setEditValues(v => ({ ...v, email: e.target.value }))} className="input-base text-sm" />
              ) : (
                <p className="font-semibold text-slate-900">{editValues.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Téléphone</label>
              {editMode ? (
                <input type="tel" value={editValues.telephone} onChange={e => setEditValues(v => ({ ...v, telephone: e.target.value }))} className="input-base text-sm" />
              ) : (
                <p className="font-semibold text-slate-900">{editValues.telephone}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Adresse</label>
              {editMode ? (
                <div className="space-y-2">
                  <input type="text" placeholder="Rue" value={editValues.rue} onChange={e => setEditValues(v => ({ ...v, rue: e.target.value }))} className="input-base text-sm" />
                  <div className="flex gap-2">
                    <input type="text" placeholder="Code postal" value={editValues.codePostal} onChange={e => setEditValues(v => ({ ...v, codePostal: e.target.value }))} className="input-base text-sm w-32" />
                    <input type="text" placeholder="Ville" value={editValues.ville} onChange={e => setEditValues(v => ({ ...v, ville: e.target.value }))} className="input-base text-sm flex-1" />
                  </div>
                </div>
              ) : (
                <p className="font-semibold text-slate-900">
                  {editValues.rue}<br />
                  {editValues.codePostal} {editValues.ville}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Certificat médical */}
        <div className="card !p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/80 to-white">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              Certificat médical
            </h3>
            <span className={`badge ${licencie.certificatMedical.statut === 'valide' ? 'badge-success' : 'badge-danger'}`}>
              {licencie.certificatMedical.statut === 'valide'
                ? <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                : <AlertTriangle className="w-3 h-3" aria-hidden="true" />
              }
              {licencie.certificatMedical.statut === 'valide' ? 'Valide' : 'Expiré'}
            </span>
          </div>
          <div className="p-5">
            <div className={`flex items-center gap-4 p-4 rounded-xl border ${
              certDaysLeft > 90 ? 'bg-emerald-50 border-emerald-200' :
              certDaysLeft > 30 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                certDaysLeft > 90 ? 'bg-emerald-500' : certDaysLeft > 30 ? 'bg-amber-500' : 'bg-red-500'
              } text-white`}>
                <Stethoscope className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">
                  {certUploadDone ? 'Nouveau certificat transmis' : 'Certificat valide'}
                </p>
                <p className="text-sm text-slate-600 mt-0.5">
                  Validité jusqu'au <strong>{new Date(licencie.certificatMedical.dateValidite).toLocaleDateString('fr-FR')}</strong>
                </p>
                <p className={`text-xs font-semibold mt-1 ${
                  certDaysLeft > 90 ? 'text-emerald-600' : certDaysLeft > 30 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {certDaysLeft > 0 ? `Expire dans ${certDaysLeft} jours` : 'Expiré'}
                </p>
              </div>
              <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 border border-slate-200 bg-white px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                <Download className="w-3 h-3" aria-hidden="true" />
                Télécharger
              </button>
            </div>

            <div className="mt-4">
              {certUploaded ? (
                <div className="w-full py-3 bg-ffgym-blue/10 text-ffgym-blue font-semibold rounded-xl flex items-center justify-center gap-2 text-sm">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Envoi en cours...
                </div>
              ) : certUploadDone ? (
                <div className="w-full py-3 bg-emerald-50 text-emerald-600 font-semibold rounded-xl flex items-center justify-center gap-2 text-sm border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  Certificat transmis — En attente de validation club
                </div>
              ) : (
                <button
                  onClick={handleCertUpload}
                  className="w-full py-3 border-2 border-dashed border-slate-200 text-slate-500 hover:border-ffgym-blue/50 hover:text-ffgym-blue hover:bg-ffgym-blue/5 font-semibold rounded-xl flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <CloudUpload className="w-4 h-4" aria-hidden="true" />
                  Téléverser un nouveau certificat (PDF · Max 5 Mo)
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Club actuel */}
        <div className="card !p-0 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
              Club actuel
            </h3>
          </div>
          <div className="p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-ffgym-blue/10 flex items-center justify-center text-ffgym-blue font-bold text-xl flex-shrink-0">
                GE
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900 text-lg">{licencie.club.nom}</p>
                <p className="text-sm text-slate-500">{licencie.club.ville}</p>
              </div>
              <span className="badge badge-success flex-shrink-0">
                <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                Affilié 2026-2027
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Fonction</p>
                <p className="text-slate-800 font-semibold capitalize mt-1">{licencie.licence.fonction}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Discipline</p>
                <span className="badge badge-discipline text-[10px] mt-1 inline-flex">{licencie.licence.disciplinePrincipale}</span>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wide">Valide jusqu'au</p>
                <p className="text-slate-800 font-semibold mt-1">{new Date(licencie.licence.dateValidite).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RGPD */}
        <div className="card bg-slate-50 border-slate-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-ffgym-blue/10 text-ffgym-blue flex items-center justify-center flex-shrink-0">
              <ShieldHalf className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-slate-800 mb-1">Protection de vos données (RGPD)</p>
              <p className="text-slate-600">Vos données personnelles sont traitées par la FFGym conformément au RGPD. Vous disposez d'un droit d'accès, de rectification et d'effacement. Contact DPO : dpo@ffgym.fr</p>
              <div className="flex items-center gap-4 mt-3">
                <button className="text-xs font-semibold text-ffgym-blue hover:underline">Politique de confidentialité</button>
                <button className="text-xs font-semibold text-ffgym-blue hover:underline">Gérer mes consentements</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
