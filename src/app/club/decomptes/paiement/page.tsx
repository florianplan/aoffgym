'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  CheckCircle2, ArrowLeft, Lock, ShieldHalf, XCircle, Landmark,
  RefreshCw, Check, AlertTriangle, ChevronDown, ChevronUp,
  FileText, FlaskConical, HelpCircle, CreditCard
} from 'lucide-react';
import clubData from '@/data/club.json';

const { club } = clubData;

type PaymentMethod = 'cb' | 'virement' | 'sepa';
type PaymentState = 'idle' | 'processing' | '3ds' | 'success' | 'error';

const errorScenarios = [
  { label: 'Paiement réussi (nominal)', state: 'success' as const },
  { label: 'Carte refusée (fonds insuffisants)', state: 'error' as const, message: 'Votre carte bancaire a été refusée. Motif : fonds insuffisants (code LemonWay: LW-4032).' },
  { label: 'Carte expirée', state: 'error' as const, message: 'La date d\'expiration de la carte est dépassée. Veuillez utiliser une autre carte (code LemonWay: LW-4054).' },
  { label: 'Authentification 3DS échouée', state: 'error' as const, message: 'L\'authentification 3D Secure a échoué. La transaction a été annulée (code LemonWay: LW-4151).' },
];

const paymentMethods = [
  { id: 'cb' as const, label: 'Carte bancaire', Icon: CreditCard },
  { id: 'virement' as const, label: 'Virement', Icon: Landmark },
  { id: 'sepa' as const, label: 'Prélèvement SEPA', Icon: RefreshCw },
];

function PaiementContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const decompteId = searchParams.get('id') ?? 'DC-2027-042';
  const montantRaw = parseFloat(searchParams.get('montant') ?? '1850');

  const [activeMethod, setActiveMethod] = useState<PaymentMethod>('cb');
  const [paymentState, setPaymentState] = useState<PaymentState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [show3DS, setShow3DS] = useState(false);
  const [otp, setOtp] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [sepaAccepted, setSepaAccepted] = useState(false);
  const [showDispatch, setShowDispatch] = useState(false);

  const [cbForm, setCbForm] = useState({
    numero: '',
    titulaire: '',
    expiration: '',
    cvv: '',
  });

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const handleCBSubmit = () => {
    const scenario = errorScenarios[selectedScenario];
    if (scenario.state === 'error') {
      setPaymentState('processing');
      setTimeout(() => {
        setPaymentState('error');
        setErrorMessage(scenario.message ?? 'Erreur de paiement.');
      }, 2000);
    } else {
      setPaymentState('processing');
      setTimeout(() => {
        setShow3DS(true);
        setPaymentState('3ds');
      }, 1500);
    }
  };

  const handle3DSConfirm = () => {
    if (otp !== '123456') {
      setPaymentState('error');
      setErrorMessage('Code OTP incorrect. Veuillez réessayer ou contacter votre banque (code LemonWay: LW-4151).');
      setShow3DS(false);
      return;
    }
    setPaymentState('processing');
    setShow3DS(false);
    setTimeout(() => {
      setTransactionId(`TXN-LW-${Date.now()}`);
      setPaymentState('success');
    }, 1500);
  };

  const handleVirementSubmit = () => {
    setPaymentState('processing');
    setTimeout(() => {
      setTransactionId(`VIR-${Date.now()}`);
      setPaymentState('success');
    }, 2000);
  };

  const handleSEPASubmit = () => {
    setPaymentState('processing');
    setTimeout(() => {
      setTransactionId(`SEPA-${Date.now()}`);
      setPaymentState('success');
    }, 2500);
  };

  const dispatchLines = [
    { label: 'Cotisation nationale FFGym', pct: 45, montant: montantRaw * 0.45 },
    { label: 'Quote-part CR Île-de-France', pct: 35, montant: montantRaw * 0.35 },
    { label: 'Quote-part CD Paris (75)', pct: 15, montant: montantRaw * 0.15 },
    { label: 'Frais de traitement LemonWay', pct: 5, montant: montantRaw * 0.05 },
  ];

  if (paymentState === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="card text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Paiement confirmé</h2>
            <p className="text-slate-500 mb-1">Décompte {decompteId}</p>
            <p className="text-3xl font-bold text-emerald-600 mb-4">{montantRaw.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</p>

            <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Référence transaction</span>
                <span className="font-mono font-semibold text-slate-900 text-xs">{transactionId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Méthode</span>
                <span className="font-semibold text-slate-900">
                  {activeMethod === 'cb' ? 'Carte bancaire' : activeMethod === 'virement' ? 'Virement' : 'Prélèvement SEPA'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Date</span>
                <span className="font-semibold text-slate-900">{new Date().toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Prestataire</span>
                <span className="font-semibold text-slate-900">LemonWay (solution PSP)</span>
              </div>
            </div>

            {/* Dispatch */}
            <button
              onClick={() => setShowDispatch(!showDispatch)}
              className="w-full text-sm text-ffgym-blue font-semibold flex items-center justify-center gap-2 py-2 hover:bg-ffgym-blue/5 rounded-xl transition-colors mb-4"
            >
              {showDispatch
                ? <ChevronUp className="w-3 h-3" aria-hidden="true" />
                : <ChevronDown className="w-3 h-3" aria-hidden="true" />
              }
              {showDispatch ? 'Masquer' : 'Voir'} le schéma de dispatch des fonds
            </button>

            {showDispatch && (
              <div className="bg-slate-50 rounded-xl p-4 text-left mb-5 space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Répartition des {montantRaw.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</p>
                {dispatchLines.map(line => (
                  <div key={line.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700">{line.label}</span>
                      <span className="font-bold text-slate-900">{line.montant.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-ffgym-blue rounded-full" style={{ width: `${line.pct}%` }} />
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{line.pct}%</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => router.push('/club/decomptes')}
                className="flex-1 btn-outline"
              >
                Retour aux décomptes
              </button>
              <button className="flex-1 btn-primary">
                <FileText className="w-4 h-4" aria-hidden="true" />
                Télécharger reçu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-8 py-5">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="w-9 h-9 rounded-xl border-2 border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Paiement du décompte</h1>
            <p className="text-slate-500 font-medium mt-0.5">{decompteId} · {club.nom}</p>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-5 gap-6">

          {/* Formulaire paiement — colonne gauche */}
          <div className="md:col-span-3 space-y-4">

            {/* Bandeau sécurité */}
            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" aria-hidden="true" />
              <div className="text-xs text-emerald-700">
                <strong>Connexion sécurisée SSL/TLS</strong> · Paiement traité par <strong>LemonWay</strong>, établissement de paiement agréé ACPR
              </div>
              <div className="ml-auto flex-shrink-0">
                <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-white px-2 py-1 rounded-lg border border-slate-200">
                  <ShieldHalf className="w-3 h-3 text-emerald-500" aria-hidden="true" />
                  3D Secure
                </div>
              </div>
            </div>

            {/* Sélection méthode */}
            <div className="card !p-0 overflow-hidden">
              <div className="flex divide-x divide-slate-100">
                {paymentMethods.map(m => (
                  <button
                    key={m.id}
                    onClick={() => { setActiveMethod(m.id); setPaymentState('idle'); setErrorMessage(''); }}
                    className={`flex-1 flex flex-col items-center gap-2 py-4 text-xs font-semibold transition-all ${
                      activeMethod === m.id
                        ? 'bg-ffgym-blue/5 text-ffgym-blue border-b-2 border-ffgym-blue'
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <m.Icon className="w-5 h-5" aria-hidden="true" />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Erreur */}
            {paymentState === 'error' && (
              <div className="card bg-red-50 border-red-200 !p-4 flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-red-800 text-sm">Paiement refusé</p>
                  <p className="text-xs text-red-700 mt-0.5">{errorMessage}</p>
                  <button onClick={() => { setPaymentState('idle'); setErrorMessage(''); }} className="mt-2 text-xs font-semibold text-red-700 underline">
                    Réessayer
                  </button>
                </div>
              </div>
            )}

            {/* Formulaire CB */}
            {activeMethod === 'cb' && paymentState !== 'error' && (
              <div className="card space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Numéro de carte</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cbForm.numero}
                      onChange={e => setCbForm(v => ({ ...v, numero: formatCardNumber(e.target.value) }))}
                      className="input-base font-mono tracking-wider pr-12"
                      maxLength={19}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <img src="/visa-logo.svg" alt="Visa" className="h-5 opacity-40" onError={e => (e.currentTarget.style.display = 'none')} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Titulaire</label>
                  <input
                    type="text"
                    placeholder="NOM PRÉNOM"
                    value={cbForm.titulaire}
                    onChange={e => setCbForm(v => ({ ...v, titulaire: e.target.value.toUpperCase() }))}
                    className="input-base uppercase tracking-wide"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Expiration</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={cbForm.expiration}
                      onChange={e => setCbForm(v => ({ ...v, expiration: formatExpiry(e.target.value) }))}
                      className="input-base font-mono"
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                      CVV
                      <span className="group relative">
                        <HelpCircle className="w-3 h-3 text-slate-300 cursor-help" aria-hidden="true" />
                      </span>
                    </label>
                    <input
                      type="password"
                      placeholder="•••"
                      value={cbForm.cvv}
                      onChange={e => setCbForm(v => ({ ...v, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                      className="input-base font-mono"
                      maxLength={4}
                    />
                  </div>
                </div>

                {/* Scénario de test */}
                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <FlaskConical className="w-3 h-3 text-amber-400" aria-hidden="true" />
                    Scénario de test (POC)
                  </p>
                  <div className="space-y-1">
                    {errorScenarios.map((s, i) => (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="scenario"
                          checked={selectedScenario === i}
                          onChange={() => setSelectedScenario(i)}
                          className="text-amber-400"
                        />
                        <span className={`text-xs ${i === 0 ? 'text-emerald-400' : 'text-red-400'}`}>{s.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCBSubmit}
                  disabled={paymentState === 'processing'}
                  className="w-full py-3.5 bg-ffgym-blue text-white font-bold rounded-xl hover:bg-ffgym-gradient-start transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {paymentState === 'processing' ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" aria-hidden="true" />
                      Payer {montantRaw.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Virement bancaire */}
            {activeMethod === 'virement' && (
              <div className="card space-y-4">
                <div className="bg-ffgym-blue/5 border border-ffgym-blue/20 rounded-xl p-4">
                  <p className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-ffgym-blue" aria-hidden="true" />
                    Coordonnées bancaires FFGym
                  </p>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: 'Bénéficiaire', value: 'Fédération Française de Gymnastique' },
                      { label: 'IBAN', value: 'FR76 3000 6000 0112 3456 7890 189', mono: true },
                      { label: 'BIC', value: 'BNPAFRPPXXX', mono: true },
                      { label: 'Référence', value: `${decompteId}-${club.numeroAffiliation}`, mono: true },
                      { label: 'Montant', value: `${montantRaw.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €` },
                    ].map(f => (
                      <div key={f.label} className="flex items-center justify-between py-1.5 border-b border-ffgym-blue/10 last:border-0">
                        <span className="text-slate-500 font-medium">{f.label}</span>
                        <span className={`font-bold text-slate-900 ${f.mono ? 'font-mono text-xs' : ''}`}>{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <p className="text-xs text-amber-700">
                    <AlertTriangle className="w-3 h-3 mr-1.5 inline" aria-hidden="true" />
                    <strong>Obligatoire :</strong> mentionnez impérativement la référence de virement pour permettre l'imputation automatique dans notre système LemonWay.
                  </p>
                </div>
                <button
                  onClick={handleVirementSubmit}
                  disabled={paymentState === 'processing'}
                  className="w-full py-3.5 bg-ffgym-blue text-white font-bold rounded-xl hover:bg-ffgym-gradient-start transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {paymentState === 'processing' ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      Confirmer le virement effectué
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Prélèvement SEPA */}
            {activeMethod === 'sepa' && (
              <div className="card space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">IBAN du compte à débiter</label>
                  <input
                    type="text"
                    placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX"
                    className="input-base font-mono tracking-wider"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">BIC</label>
                  <input type="text" placeholder="BNPAFRPPXXX" className="input-base font-mono" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Titulaire du compte</label>
                  <input type="text" placeholder="NOM PRÉNOM ou Raison sociale" className="input-base" />
                </div>

                {/* Mandat SEPA */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 leading-relaxed">
                  <p className="font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 text-ffgym-blue" aria-hidden="true" />
                    Mandat de prélèvement SEPA — ICS FR12ZZZ123456
                  </p>
                  <p>En signant ce mandat, vous autorisez la Fédération Française de Gymnastique à envoyer des instructions à votre banque pour débiter votre compte et votre banque à débiter votre compte conformément aux instructions de la FFGym. Vous bénéficiez du droit d'être remboursé par votre banque selon les conditions décrites dans la convention que vous avez passée avec elle.</p>
                  <p className="mt-2">Prélèvement ponctuel — montant : <strong>{montantRaw.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</strong></p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sepaAccepted}
                    onChange={e => setSepaAccepted(e.target.checked)}
                    className="w-4 h-4 text-ffgym-blue mt-0.5 rounded"
                  />
                  <span className="text-sm text-slate-700">
                    J'accepte le mandat de prélèvement SEPA et autorise la FFGym à prélever le montant indiqué sur mon compte.
                  </span>
                </label>

                <button
                  onClick={handleSEPASubmit}
                  disabled={paymentState === 'processing' || !sepaAccepted}
                  className="w-full py-3.5 bg-ffgym-blue text-white font-bold rounded-xl hover:bg-ffgym-gradient-start transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {paymentState === 'processing' ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Envoi du mandat...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" aria-hidden="true" />
                      Signer le mandat et prélever
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Récapitulatif — colonne droite */}
          <div className="md:col-span-2 space-y-4">
            <div className="card !p-0 overflow-hidden sticky top-32">
              {/* En-tête */}
              <div className="p-5 bg-gradient-to-br from-ffgym-blue to-ffgym-gradient-mid text-white">
                <p className="text-sm font-semibold opacity-80 mb-1">Décompte FFGym</p>
                <p className="font-mono text-xs opacity-60 mb-3">{decompteId}</p>
                <p className="text-3xl font-bold">{montantRaw.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</p>
                <p className="text-xs opacity-70 mt-1">TTC · Paiement unique</p>
              </div>

              <div className="p-5 space-y-3 border-b border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Club</span>
                  <span className="font-semibold text-slate-900 text-right max-w-[60%]">{club.nom}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">N° affiliation</span>
                  <span className="font-mono font-semibold text-slate-900">{club.numeroAffiliation}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Saison</span>
                  <span className="font-semibold text-slate-900">{club.saison}</span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <button
                  onClick={() => setShowDispatch(!showDispatch)}
                  className="w-full text-xs font-semibold text-slate-500 flex items-center justify-between hover:text-ffgym-blue transition-colors"
                >
                  <span>Schéma de dispatch des fonds</span>
                  {showDispatch
                    ? <ChevronUp className="w-3 h-3" aria-hidden="true" />
                    : <ChevronDown className="w-3 h-3" aria-hidden="true" />
                  }
                </button>

                {showDispatch && (
                  <div className="space-y-2 pt-2">
                    {dispatchLines.map(line => (
                      <div key={line.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">{line.label}</span>
                          <span className="font-semibold text-slate-800">{line.montant.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-ffgym-blue rounded-full" style={{ width: `${line.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                  Powered by <strong>LemonWay</strong> · IBAN poolé · Dispatch automatique · ACPR n°CIB 17038
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 3DS */}
      {show3DS && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-scale-in">
            <div className="text-center mb-5">
              <div className="w-16 h-16 rounded-2xl bg-ffgym-blue/10 text-ffgym-blue flex items-center justify-center mx-auto mb-3">
                <ShieldHalf className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Vérification 3D Secure</h3>
              <p className="text-sm text-slate-500 mt-1">Votre banque requiert une authentification forte</p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <p className="text-xs text-slate-500 mb-1">Transaction</p>
              <p className="font-semibold text-slate-900">{montantRaw.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</p>
              <p className="text-xs text-slate-400 mt-0.5">FFGym — {decompteId}</p>
            </div>

            <div className="space-y-2 mb-4">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Code OTP reçu par SMS</label>
              <input
                type="text"
                placeholder="6 chiffres"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="input-base font-mono tracking-[0.3em] text-center text-xl"
                maxLength={6}
              />
              <p className="text-[10px] text-slate-400 text-center">
                Pour le POC, saisir <strong className="text-ffgym-blue">123456</strong> pour valider
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setShow3DS(false); setPaymentState('idle'); }}
                className="flex-1 btn-outline text-sm"
              >
                Annuler
              </button>
              <button
                onClick={handle3DSConfirm}
                disabled={otp.length < 6}
                className="flex-1 py-2.5 bg-ffgym-blue text-white font-bold rounded-xl hover:bg-ffgym-gradient-start transition-colors disabled:opacity-50 text-sm"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaiementPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-slate-400">Chargement...</div></div>}>
      <PaiementContent />
    </Suspense>
  );
}
