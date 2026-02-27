'use client';

import Link from 'next/link';
import clubData from '@/data/club.json';
import alertesData from '@/data/alertes.json';
import {
  Users, Clock, CheckCircle2, ReceiptText,
  TrendingUp, CalendarDays, ArrowRight, Bell, UserPlus,
} from 'lucide-react';

const { club } = clubData;
const { alertes } = alertesData;

/* ─── KPIs ─── */

const evolution = Math.round(
  ((club.statistiques.nombreLicencies - club.statistiques.nombreLicenciesSaisonPrecedente)
    / club.statistiques.nombreLicenciesSaisonPrecedente) * 100
);

const kpis = [
  {
    label: 'Licenciés actifs',
    value: club.statistiques.nombreLicencies.toString(),
    subtext: `+${evolution}% vs S-1`,
    Icon: Users,
    iconColor: 'text-ffgym-red',
    iconBg: 'bg-ffgym-red/10',
    trend: true,
    alert: false,
    href: '/club/licencies',
  },
  {
    label: 'Pré-licences en attente',
    value: club.statistiques.preLicencesEnAttente.toString(),
    subtext: 'À valider',
    Icon: Clock,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
    trend: false,
    alert: true,
    href: '/club/licencies?statut=pre_licence',
  },
  {
    label: 'Statut affiliation',
    value: 'Affilié',
    subtext: `Saison ${club.saison}`,
    Icon: CheckCircle2,
    iconColor: 'text-ffgym-blue',
    iconBg: 'bg-ffgym-blue/10',
    trend: false,
    alert: false,
  },
  {
    label: 'Décompte en cours',
    value: `${club.statistiques.decompteEnCours.montant.toLocaleString('fr-FR')} €`,
    subtext: `${club.statistiques.decompteEnCours.nombreLicences} licences`,
    Icon: ReceiptText,
    iconColor: 'text-ffgym-blue',
    iconBg: 'bg-ffgym-blue/10',
    trend: false,
    alert: false,
    href: '/club/decomptes',
  },
];

/* ─── Actions prioritaires ─── */

type Urgence = 'warning' | 'info' | 'success';

const priorites: { id: string; urgence: Urgence; titre: string; detail: string; href: string; actionLabel: string }[] = [
  {
    id: 'pre-licence',
    urgence: 'warning',
    titre: `${club.statistiques.preLicencesEnAttente} pré-licences en attente`,
    detail: 'Validation requise avant transformation en licence',
    href: '/club/licencies?statut=pre_licence',
    actionLabel: 'Valider',
  },
  ...alertes.map(a => ({
    id: a.id,
    urgence: (a.type === 'warning' ? 'warning' : a.type === 'success' ? 'success' : 'info') as Urgence,
    titre: a.titre,
    detail: a.message,
    href: a.action.route,
    actionLabel: a.action.label.split(' ')[0],
  })),
];

/* ─── Disciplines ─── */

const disciplineConfig: Record<string, { bar: string; text: string }> = {
  'GAM':       { bar: 'bg-ffgym-blue',  text: 'text-ffgym-blue'  },
  'GAF':       { bar: 'bg-ffgym-red',   text: 'text-ffgym-red'   },
  'GR':        { bar: 'bg-ffgym-blue/60', text: 'text-ffgym-blue'  },
  'Éveil Gym': { bar: 'bg-ffgym-red/60', text: 'text-ffgym-red'   },
};

const disciplines = Object.entries(club.statistiques.repartitionDisciplines).map(([nom, count]) => ({
  nom,
  count,
  pct: Math.round((count / club.statistiques.nombreLicencies) * 100),
}));

/* ─── Échéances ─── */

const echeances = [
  { label: 'Clôture prise de licence',  date: '31 mars 2027',    joursRestants: 33  },
  { label: 'AG annuelle du club',        date: '15 juin 2027',    joursRestants: 109 },
  { label: 'Ré-affiliation 2027-2028',   date: '1 juillet 2027',  joursRestants: 125 },
];

/* ─── Helpers ─── */

const urgenceStyles: Record<Urgence, { dot: string; text: string; hover: string }> = {
  warning: { dot: 'bg-amber-400',   text: 'text-amber-600',   hover: 'hover:bg-amber-50/50'      },
  info:    { dot: 'bg-ffgym-blue',  text: 'text-ffgym-blue',  hover: 'hover:bg-ffgym-blue/5'     },
  success: { dot: 'bg-emerald-400', text: 'text-emerald-600', hover: 'hover:bg-emerald-50/50'    },
};

const echeanceBadge = (j: number) =>
  j <= 30 ? 'bg-amber-50 text-amber-600 border-amber-200' :
  j <= 60 ? 'bg-ffgym-blue/10 text-ffgym-blue border-ffgym-blue/30' :
            'bg-slate-50 text-slate-500 border-slate-200';

/* ─── Page ─── */

export default function ClubDashboardPage() {
  const nbUrgents = priorites.filter(p => p.urgence === 'warning').length;

  return (
    <div className="min-h-screen">

      {/* Header — profil intégré */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-slate-100 px-4 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-ffgym-red text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              MD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">Marie Dupont</span>
                <span className="badge badge-success text-[10px]">Connectée</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
                <span>Présidente · {club.nom}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                <span className="font-mono">{club.numeroAffiliation}</span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                <span className="text-emerald-600 font-semibold">Affilié</span>
              </div>
            </div>
          </div>
          <Link
            href="/club/licencies/nouveau"
            className="btn-primary flex items-center gap-2 text-sm flex-shrink-0"
          >
            <UserPlus className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Nouvelle licence</span>
            <span className="sm:hidden">+ Licence</span>
          </Link>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-6">

        {/* KPIs compacts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => {
            const inner = (
              <div className={`card relative h-full ${kpi.alert ? 'border-amber-200' : ''}`}>
                {kpi.alert && (
                  <span className="absolute top-3 right-3 w-2 h-2 bg-ffgym-red rounded-full" aria-hidden="true" />
                )}
                <div className={`w-9 h-9 ${kpi.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                  <kpi.Icon className={`w-4 h-4 ${kpi.iconColor}`} aria-hidden="true" />
                </div>
                <p className={`text-2xl font-bold ${kpi.label === 'Statut affiliation' ? 'text-ffgym-blue' : 'text-slate-900'}`}>
                  {kpi.value}
                </p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{kpi.label}</p>
                {kpi.trend ? (
                  <p className="text-[10px] text-ffgym-blue font-semibold mt-1.5 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" aria-hidden="true" />
                    {kpi.subtext}
                  </p>
                ) : (
                  <p className={`text-[10px] font-semibold mt-1.5 ${kpi.alert ? 'text-amber-500' : 'text-slate-400'}`}>
                    {kpi.subtext}
                  </p>
                )}
              </div>
            );
            return kpi.href ? (
              <Link key={i} href={kpi.href} className="block hover:scale-[1.02] transition-transform">
                {inner}
              </Link>
            ) : (
              <div key={i}>{inner}</div>
            );
          })}
        </div>

        {/* Deux colonnes */}
        <div className="grid lg:grid-cols-5 gap-6">

          {/* Gauche — À faire */}
          <div className="lg:col-span-3 card !p-0 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
              <Bell className="w-4 h-4 text-ffgym-red" aria-hidden="true" />
              <h2 className="font-bold text-slate-900 text-sm">À faire</h2>
              {nbUrgents > 0 && (
                <span className="ml-auto text-xs font-bold bg-ffgym-red text-white px-2 py-0.5 rounded-full">
                  {nbUrgents}
                </span>
              )}
            </div>
            <div className="divide-y divide-slate-50">
              {priorites.map(p => {
                const s = urgenceStyles[p.urgence];
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

          {/* Droite — Disciplines + Échéances */}
          <div className="lg:col-span-2 space-y-4">

            {/* Répartition disciplines */}
            <div className="card !p-0 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-900 text-sm">Répartition disciplines</h2>
                <span className="text-xs text-slate-400">{club.statistiques.nombreLicencies} lic.</span>
              </div>
              <div className="px-5 py-4 space-y-3">
                {disciplines.map(d => {
                  const cfg = disciplineConfig[d.nom] ?? { bar: 'bg-slate-400', text: 'text-slate-500' };
                  return (
                    <div key={d.nom}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-semibold ${cfg.text}`}>{d.nom}</span>
                        <span className="text-xs text-slate-500">{d.count} · {d.pct}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${cfg.bar} rounded-full transition-all duration-500`}
                          style={{ width: `${d.pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prochaines échéances */}
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

      </div>
    </div>
  );
}
