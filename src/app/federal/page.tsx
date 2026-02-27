'use client';

import Link from 'next/link';
import {
  Building2, CreditCard, ReceiptText, Handshake,
  Info, TrendingUp, CalendarDays, ArrowRight, Bell, Activity,
} from 'lucide-react';

/* ─── Données mock ─── */

const kpis = [
  {
    label: 'Clubs affiliés',
    value: '127',
    subtext: 'IDF · 2026-2027',
    Icon: Building2,
    iconColor: 'text-ffgym-blue',
    iconBg: 'bg-ffgym-blue/10',
    alert: false,
  },
  {
    label: 'Licences en cours',
    value: '8 432',
    subtext: '+3,2% vs S-1',
    Icon: CreditCard,
    iconColor: 'text-ffgym-red',
    iconBg: 'bg-ffgym-red/10',
    trend: true,
    alert: false,
  },
  {
    label: 'Décomptes en attente',
    value: '14',
    subtext: 'À traiter',
    Icon: ReceiptText,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
    alert: true,
  },
  {
    label: 'Demandes affiliation',
    value: '3',
    subtext: 'En attente',
    Icon: Handshake,
    iconColor: 'text-ffgym-red',
    iconBg: 'bg-ffgym-red/10',
    alert: true,
  },
];

const priorites = [
  {
    id: 1,
    urgence: 'warning' as const,
    titre: '3 demandes d\'affiliation',
    detail: 'Gym Club Vincennes, AS Créteil, Entente Gym 91',
    href: '/federal/affiliation',
    actionLabel: 'Traiter',
  },
  {
    id: 2,
    urgence: 'warning' as const,
    titre: '14 décomptes en attente',
    detail: 'Dont 5 à régulariser avant le 31 mars',
    href: '/federal/admin',
    actionLabel: 'Traiter',
  },
  {
    id: 3,
    urgence: 'danger' as const,
    titre: '1 contrôle honorabilité',
    detail: 'Dossier en attente de vérification ministère',
    href: '/federal/ethique',
    actionLabel: 'Voir',
  },
  {
    id: 4,
    urgence: 'info' as const,
    titre: 'Prise de licence ouverte',
    detail: 'Jusqu\'au 31 mars 2027 · 8 432 validées à ce jour',
    href: '/federal/prise-licence',
    actionLabel: 'Voir',
  },
];

const activites = [
  {
    id: 1,
    club: 'Gym Club Vincennes',
    action: 'a soumis sa demande d\'affiliation',
    heure: 'il y a 2h',
    status: 'warning' as const,
  },
  {
    id: 2,
    club: 'AS Créteil Gym',
    action: 'a mis à jour son dossier de décompte',
    heure: 'il y a 4h',
    status: 'info' as const,
  },
  {
    id: 3,
    club: "Gym'Étoiles Paris 15",
    action: 'ré-affiliation validée',
    heure: 'Hier, 14h30',
    status: 'success' as const,
  },
  {
    id: 4,
    club: 'Gym Club Levallois',
    action: 'décompte traité et accepté',
    heure: 'Hier, 11h00',
    status: 'success' as const,
  },
];

const echeances = [
  { label: 'Clôture prises de licence',  date: '31 mars 2027',   joursRestants: 33  },
  { label: 'Envoi décomptes CR → CN',    date: '15 avril 2027',  joursRestants: 48  },
  { label: 'Bilan annuel CR',            date: '30 juin 2027',   joursRestants: 124 },
];

/* ─── Helpers styles ─── */

const urgenceStyles = {
  warning: { dot: 'bg-amber-400', text: 'text-amber-600', hover: 'hover:bg-amber-50/50' },
  danger:  { dot: 'bg-ffgym-red',  text: 'text-ffgym-red',  hover: 'hover:bg-ffgym-red/5'  },
  info:    { dot: 'bg-cyan-400',   text: 'text-cyan-600',   hover: 'hover:bg-cyan-50/50'   },
};

const activityDot = {
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  info:    'bg-cyan-400',
};

const echeanceBadge = (j: number) =>
  j <= 30  ? 'bg-amber-50 text-amber-600 border-amber-200' :
  j <= 60  ? 'bg-cyan-50 text-cyan-600 border-cyan-200' :
             'bg-slate-50 text-slate-500 border-slate-200';

/* ─── Page ─── */

export default function FederalDashboardPage() {
  const nbUrgents = priorites.filter(p => p.urgence !== 'info').length;

  return (
    <div className="min-h-screen">

      {/* Header — profil intégré */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-ffgym-blue text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              SM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">Sophie Marchand</span>
                <span className="badge badge-success text-[10px]">Connectée</span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Responsable administrative · CR Île-de-France</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-slate-400 hidden md:block">Saison 2026-2027</span>
            <span className="badge badge-success text-[10px]">En cours</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-6">

        {/* KPIs compacts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <div key={i} className={`card relative ${kpi.alert ? 'border-amber-200' : ''}`}>
              {kpi.alert && (
                <span className="absolute top-3 right-3 w-2 h-2 bg-ffgym-red rounded-full" aria-hidden="true" />
              )}
              <div className={`w-9 h-9 ${kpi.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                <kpi.Icon className={`w-4 h-4 ${kpi.iconColor}`} aria-hidden="true" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{kpi.label}</p>
              {kpi.trend ? (
                <p className="text-[10px] text-emerald-500 font-semibold mt-1.5 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" aria-hidden="true" />
                  {kpi.subtext}
                </p>
              ) : (
                <p className={`text-[10px] font-semibold mt-1.5 ${kpi.alert ? 'text-amber-500' : 'text-slate-400'}`}>
                  {kpi.subtext}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Deux colonnes */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Gauche — Priorités */}
          <div className="lg:col-span-3 card !p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
              <Bell className="w-4 h-4 text-ffgym-red" aria-hidden="true" />
              <h2 className="font-bold text-slate-900 text-sm">À traiter en priorité</h2>
              <span className="ml-auto text-xs font-bold bg-ffgym-red text-white px-2 py-0.5 rounded-full">
                {nbUrgents}
              </span>
            </div>
            <div className="divide-y divide-slate-50">
              {priorites.map(p => {
                const s = urgenceStyles[p.urgence] ?? urgenceStyles.info;
                return (
                  <Link
                    key={p.id}
                    href={p.href}
                    className={`flex items-center gap-4 px-5 py-3.5 transition-colors ${s.hover} group`}
                  >
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{p.titre}</p>
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{p.detail}</p>
                    </div>
                    <span className={`text-xs font-semibold ${s.text} opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 flex-shrink-0`}>
                      {p.actionLabel}
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Droite — Activité + Échéances */}
          <div className="lg:col-span-2 space-y-4">

            {/* Activité récente */}
            <div className="card !p-0 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                <Activity className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <h2 className="font-bold text-slate-900 text-sm">Activité récente</h2>
              </div>
              <div className="divide-y divide-slate-50">
                {activites.map(a => (
                  <div key={a.id} className="px-5 py-3 flex items-start gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${activityDot[a.status]}`} aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{a.club}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{a.action}</p>
                    </div>
                    <p className="text-[10px] text-slate-300 flex-shrink-0 whitespace-nowrap">{a.heure}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Échéances */}
            <div className="card !p-0 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-slate-400" aria-hidden="true" />
                <h2 className="font-bold text-slate-900 text-sm">Prochaines échéances</h2>
              </div>
              <div className="divide-y divide-slate-50">
                {echeances.map((e, i) => (
                  <div key={i} className="px-5 py-3 flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900">{e.label}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{e.date}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${echeanceBadge(e.joursRestants)}`}>
                      J-{e.joursRestants}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* POC Info */}
        <div className="card bg-slate-50 border-slate-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-ffgym-blue mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div className="text-sm text-slate-700">
              <p className="font-semibold text-slate-900 mb-1">Fonctionnalité POC</p>
              <p>L'espace fédéral est hors périmètre détaillé du POC. Les écrans sont visibles et accessibles pour démontrer la cohérence des 4 espaces ; les actions métier ne sont pas implémentées.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
