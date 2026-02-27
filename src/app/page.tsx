'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Handshake, LogIn, Menu, X } from 'lucide-react';
import type { StaticImageData } from 'next/image';

/* ── Images ────────────────────────────────────────────────────────── */
import imgHero     from '@/img/photo_4.jpg';
import imgActu1    from '@/img/photo_2.jpg';
import imgActu2    from '@/img/photo_3.jpg';
import imgActu3    from '@/img/photo_5.jpg';
import imgBoutique from '@/img/Boutique.png';

import pAns       from '@/img/partenaires/agence_national_du_sport.png';
import pArtiligne from '@/img/partenaires/artiligne.png';
import pColosse   from '@/img/partenaires/colosse.png';
import pComite    from '@/img/partenaires/comite_national.png';
import pCurves    from '@/img/partenaires/curves.png';
import pEEnfance  from '@/img/partenaires/e_enfance.png';
import pErrea     from '@/img/partenaires/errea.png';
import pGymnova   from '@/img/partenaires/gymnova.png';
import pRegionIdf from '@/img/partenaires/region_idf.png';

type EspaceType = 'club' | 'licencie' | 'federal';

/* ─── TYPES ──────────────────────────────────────────────────────────── */

interface Article {
  image: StaticImageData;
  categorie: string;
  titre: string;
  resume: string;
  date: string;
  lecture: string;
  badgeClass: string;
}

/* ─── DATA ──────────────────────────────────────────────────────────── */

const disciplines = [
  {
    code: 'GAM',
    label: 'Gym Artistique Masculine',
    description: 'Force, explosivité et maîtrise des agrès — barres parallèles, anneaux, cheval d\'arçons, barre fixe, saut et sol.',
    bg: 'bg-ffgym-blue/8', border: 'border-ffgym-blue/15', text: 'text-ffgym-blue',
  },
  {
    code: 'GAF',
    label: 'Gym Artistique Féminine',
    description: 'Grâce et puissance sur quatre agrès emblématiques : poutre, barres asymétriques, sol et saut de cheval.',
    bg: 'bg-ffgym-red/8', border: 'border-ffgym-red/15', text: 'text-ffgym-red',
  },
  {
    code: 'GR',
    label: 'Gym Rythmique',
    description: 'Alliance de chorégraphie et d\'agrès manuels — cerceau, ballon, corde, massues et ruban — au rythme de la musique.',
    bg: 'bg-ffgym-blue/8', border: 'border-ffgym-blue/15', text: 'text-ffgym-blue',
  },
  {
    code: 'TRA',
    label: 'Trampoline',
    description: 'Acrobaties aériennes et orientation spatiale sur trampoline individuel et double mini-trampoline.',
    bg: 'bg-ffgym-red/8', border: 'border-ffgym-red/15', text: 'text-ffgym-red',
  },
  {
    code: 'TUM',
    label: 'Tumbling',
    description: 'Enchaînements d\'éléments acrobatiques sur une piste inclinée, alliant vitesse, puissance et maîtrise du corps.',
    bg: 'bg-ffgym-blue/8', border: 'border-ffgym-blue/15', text: 'text-ffgym-blue',
  },
  {
    code: 'AER',
    label: 'Aérobic',
    description: 'Endurance, souplesse et coordination dans des enchaînements chorégraphiés à haute intensité, seul ou en groupe.',
    bg: 'bg-ffgym-red/8', border: 'border-ffgym-red/15', text: 'text-ffgym-red',
  },
  {
    code: 'TG',
    label: 'TeamGym',
    description: 'Discipline collective associant tumbling, trampoline et voltige : la performance par la synchronisation d\'équipe.',
    bg: 'bg-ffgym-blue/8', border: 'border-ffgym-blue/15', text: 'text-ffgym-blue',
  },
  {
    code: 'PKR',
    label: 'Parkour',
    description: 'Mobilité, créativité et maîtrise corporelle dans des parcours acrobatiques urbains et naturels.',
    bg: 'bg-ffgym-red/8', border: 'border-ffgym-red/15', text: 'text-ffgym-red',
  },
  {
    code: 'ACR',
    label: 'Acrobatie Sportive',
    description: 'Pyramides humaines et envols acrobatiques réalisés en équipes de 2 à 4 gymnastes, en parfaite harmonie.',
    bg: 'bg-ffgym-blue/8', border: 'border-ffgym-blue/15', text: 'text-ffgym-blue',
  },
];

const evenements = [
  { jour: '15', mois: 'Fév', annee: '2026', titre: 'Championnats Régionaux IDF — GAM / GAF',    type: 'Compétition',    dot: 'bg-ffgym-red'   },
  { jour: '08', mois: 'Mar', annee: '2026', titre: 'Coupe de France Trampoline — Paris',         type: 'Compétition',    dot: 'bg-ffgym-blue'  },
  { jour: '22', mois: 'Mar', annee: '2026', titre: 'Stage Formation Juges Fédéraux — Lyon',      type: 'Formation',      dot: 'bg-emerald-500' },
  { jour: '18', mois: 'Avr', annee: '2026', titre: 'Championnats de France GAF — Paris',         type: 'Compétition',    dot: 'bg-ffgym-red'   },
  { jour: '24', mois: 'Mai', annee: '2026', titre: 'Assemblée Générale de la FFGym',             type: 'Institutionnel', dot: 'bg-slate-400'   },
];

const articles: Article[] = [
  {
    image:      imgActu1,
    categorie:  'Équipe de France',
    titre:      'La délégation française aux Championnats du Monde — #GoFranceGym',
    resume:     'Retrouvez les athlètes qui portent les couleurs de la France cette saison, dans toutes les disciplines fédérales.',
    date:       '12 Jan 2026',
    lecture:    '4 min',
    badgeClass: 'bg-ffgym-red/10 text-ffgym-red',
  },
  {
    image:      imgActu2,
    categorie:  'Palmarès',
    titre:      'Médaille mondiale : une victoire historique pour la gym française',
    resume:     'Un sacre inédit qui récompense des années de formation et l\'investissement exemplaire des clubs affiliés.',
    date:       '5 Jan 2026',
    lecture:    '3 min',
    badgeClass: 'bg-amber-100 text-amber-700',
  },
  {
    image:      imgActu3,
    categorie:  'Championnats de France',
    titre:      'Championnats de France 2025 : podiums, résultats et temps forts',
    resume:     'Les finales nationales ont livré leur verdict. Classements complets et moments marquants de la saison gymnique.',
    date:       '28 Déc 2025',
    lecture:    '5 min',
    badgeClass: 'bg-ffgym-blue/10 text-ffgym-blue',
  },
];

const partenaires: { img: StaticImageData; nom: string; noFilter?: boolean }[] = [
  { img: pAns,       nom: 'Agence nationale du sport', noFilter: true },
  { img: pComite,    nom: 'Comité national olympique'  },
  { img: pGymnova,   nom: 'Gymnova',                   noFilter: true },
  { img: pErrea,     nom: 'Errea'                      },
  { img: pArtiligne, nom: 'Artiligne'                  },
  { img: pColosse,   nom: 'Colosse'                    },
  { img: pCurves,    nom: 'Curves'                     },
  { img: pEEnfance,  nom: 'e-enfance'                  },
  { img: pRegionIdf, nom: 'Région Île-de-France'       },
];

const navLinks = [
  { label: 'Site fédéral', href: 'https://www.ffgym.fr'            },
  { label: 'Boutique',     href: 'https://boutique.ffgym.fr'       },
  { label: 'Actualités',   href: 'https://www.ffgym.fr/actualites' },
  { label: 'Agenda',       href: 'https://www.ffgym.fr/agenda'     },
];

/* ─── HELPER ─────────────────────────────────────────────────────────── */

function SectionLabel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full ${className}`}>
      {children}
    </span>
  );
}

/* ─── COMPONENT ──────────────────────────────────────────────────────── */

export default function HomePage() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogin = (espace: EspaceType) => {
    setIsModalOpen(false);
    if (espace === 'federal') router.push('/federal');
    else router.push(espace === 'club' ? '/club' : '/licencie');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-[0_1px_20px_0_rgba(0,0,0,0.07)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo — même structure que les sidebars des espaces connectés */}
          <div className="flex items-center gap-3">
            <img
              src="/LogoGymGlobalBleu.png"
              alt="FFGym"
              className={`h-10 transition-all ${scrolled ? '' : 'brightness-0 invert'}`}
            />
            <div>
              <span className={`text-lg font-bold leading-tight block transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                FFGym
              </span>
              <span className={`text-xs font-medium leading-tight block transition-colors ${scrolled ? 'text-slate-500' : 'text-white/60'}`}>
                Licence · Saison 2026-2027
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Navigation principale">
            {navLinks.map(item => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-sm font-medium transition-colors ${
                  scrolled ? 'text-slate-600 hover:text-ffgym-red' : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <span className={`w-px h-4 flex-shrink-0 ${scrolled ? 'bg-slate-200' : 'bg-white/20'}`} aria-hidden="true" />
            <a
              href="#contact"
              className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
                scrolled ? 'text-slate-600 hover:text-ffgym-red' : 'text-white/80 hover:text-white'
              }`}
            >
              <Mail className="w-3 h-3" aria-hidden="true" />
              Contact
            </a>
            <a
              href="#affiliation"
              className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                scrolled ? 'text-ffgym-red hover:text-[#A00D26]' : 'text-white hover:text-white/80'
              }`}
            >
              <Handshake className="w-3 h-3" aria-hidden="true" />
              Affiliation
            </a>
          </nav>

          {/* CTA droite */}
          <div className="flex items-center gap-2">
            {/* Se connecter — visible sur md+ */}
            <button
              onClick={() => setIsModalOpen(true)}
              aria-label="Ouvrir la connexion"
              className={`hidden md:flex text-sm font-semibold px-5 py-2 rounded-xl transition-all items-center gap-2 ${
                scrolled
                  ? 'bg-ffgym-red text-white hover:bg-[#A00D26] shadow-ffgym-red'
                  : 'bg-white/15 border border-white/30 text-white hover:bg-white/25 backdrop-blur-sm'
              }`}
            >
              <LogIn className="w-4 h-4" aria-hidden="true" />
              Se connecter
            </button>

            {/* Burger — visible sur mobile */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              className={`md:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${
                scrolled
                  ? 'hover:bg-slate-100 text-slate-700'
                  : 'hover:bg-white/15 text-white'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── MENU MOBILE ─────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Menu principal"
        aria-hidden={!menuOpen}
      >
        {/* Header du drawer */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <img src="/LogoGymGlobalBleu.png" alt="FFGym" className="h-8" />
            <div>
              <span className="text-sm font-bold text-slate-900 leading-tight block">FFGym</span>
              <span className="text-[10px] font-medium text-slate-500 leading-tight block">Licence · 2026-2027</span>
            </div>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation du drawer */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto" aria-label="Navigation principale mobile">
          {navLinks.map(item => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              {item.label}
            </a>
          ))}
          <div className="h-px bg-slate-100 my-2" />
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-xl font-medium text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all"
          >
            <Mail className="w-4 h-4 text-slate-400" aria-hidden="true" />
            Contact
          </a>
          <a
            href="#affiliation"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-sm text-ffgym-red hover:bg-ffgym-red/5 transition-all"
          >
            <Handshake className="w-4 h-4" aria-hidden="true" />
            Affiliation
          </a>
        </nav>

        {/* CTA Se connecter en bas du drawer */}
        <div className="px-4 py-4 border-t border-slate-100 flex-shrink-0">
          <button
            onClick={() => { setMenuOpen(false); setIsModalOpen(true); }}
            className="w-full flex items-center justify-center gap-2 bg-ffgym-red text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-[#A00D26] transition-colors"
          >
            <LogIn className="w-4 h-4" aria-hidden="true" />
            Se connecter
          </button>
        </div>
      </aside>

      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundImage: `url(${imgHero.src})`, backgroundSize: 'cover', backgroundPosition: 'center 20%' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ffgym-blue/92 via-ffgym-blue/70 to-ffgym-blue/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ffgym-blue/50 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-12 md:pb-16 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 md:mb-8">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
              <span className="text-white/90 text-xs font-semibold tracking-wide">Saison 2026-2027 · Licences ouvertes</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-4 md:mb-6 tracking-tight">
              Portail officiel<br />
              <span className="text-white/80">FFGym Licence</span>
            </h1>

            <p className="text-base sm:text-lg text-white/70 mb-7 md:mb-10 leading-relaxed max-w-lg">
              La plateforme de référence pour la gestion des licences, des clubs et du suivi des pratiquants de la Fédération Française de Gymnastique.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-ffgym-red font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] text-sm"
              >
                Accéder à mon espace
              </button>
              <a
                href="#contact"
                className="text-sm font-semibold px-6 py-3.5 rounded-xl bg-white/10 border border-white/25 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </a>
              <a
                href="#contact"
                className="text-sm font-semibold px-6 py-3.5 rounded-xl bg-white/10 border border-white/25 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Affiliation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCIPLINES ─────────────────────────────────────────────── */}
      <section id="disciplines" className="py-14 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-14">
            <SectionLabel className="bg-ffgym-blue/8 text-ffgym-blue mb-4">Disciplines</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-4 tracking-tight">
              9 disciplines, une seule plateforme
            </h2>
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
              De la gym artistique au parkour, FFGym Licence couvre l'ensemble des pratiques fédérales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {disciplines.map(d => (
              <div
                key={d.code}
                className={`flex items-start gap-4 rounded-2xl px-5 py-4 ${d.bg} border ${d.border} hover:shadow-sm transition-all duration-200`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl border ${d.border} bg-white/60 flex items-center justify-center mt-0.5`}>
                  <span className={`text-xs font-bold font-mono ${d.text} text-center leading-tight`}>{d.code}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 text-sm leading-snug mb-1">{d.label}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{d.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTUALITÉS & AGENDA ─────────────────────────────────────── */}
      <section id="actualites" className="py-14 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-14">
            <div>
              <SectionLabel className="bg-ffgym-red/8 text-ffgym-red mb-4">Actualités & Agenda</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 tracking-tight">
                La vie de la fédération
              </h2>
            </div>
            <a
              href="https://www.ffgym.fr/actualites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-ffgym-red hover:underline self-start md:self-auto whitespace-nowrap"
            >
              Toutes les actualités →
            </a>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Articles */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-5">
              {articles.map((art, i) => (
                <article
                  key={i}
                  className="group flex gap-0 bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <div
                    className="w-24 sm:w-36 md:w-44 flex-shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${art.image.src})` }}
                  />
                  <div className="flex-1 py-5 px-5 min-w-0">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-2 ${art.badgeClass}`}>
                      {art.categorie}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug mb-1.5 group-hover:text-ffgym-red transition-colors line-clamp-2">
                      {art.titre}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">
                      {art.resume}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{art.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200" />
                      <span>{art.lecture} de lecture</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Agenda */}
            <div className="lg:col-span-1">
              <div className="card !p-0 overflow-hidden sticky top-20">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Agenda</h3>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                    2025-2026
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {evenements.map((ev, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <div className="flex-shrink-0 w-10 text-center">
                        <p className="text-base font-bold text-slate-900 leading-none">{ev.jour}</p>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase mt-0.5">{ev.mois}</p>
                      </div>
                      <div className={`w-0.5 h-8 rounded-full ${ev.dot} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 group-hover:text-ffgym-red transition-colors leading-snug line-clamp-2">
                          {ev.titre}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{ev.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 border-t border-slate-100">
                  <a
                    href="https://www.ffgym.fr/agenda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-ffgym-red hover:underline"
                  >
                    Voir le calendrier complet →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOUTIQUE ────────────────────────────────────────────────── */}
      <section id="boutique" className="py-14 md:py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-ffgym-blue flex flex-col lg:flex-row">
            <div
              className="lg:w-3/5 flex-shrink-0 min-h-[220px] sm:min-h-[280px] lg:min-h-[400px] bg-cover bg-center"
              style={{ backgroundImage: `url(${imgBoutique.src})` }}
            />
            <div className="flex-1 flex flex-col justify-center p-6 sm:p-10 lg:p-14">
              <SectionLabel className="bg-white/15 text-white/80 mb-6 self-start">
                Boutique officielle
              </SectionLabel>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4 sm:mb-5">
                La gamme officielle<br />FFGym
              </h2>
              <p className="text-white/70 leading-relaxed mb-6 sm:mb-8 text-sm max-w-sm">
                Tenues de compétition, équipements techniques et accessoires officiels pour les clubs et licenciés. Collection 2026 disponible en édition limitée.
              </p>
              <a
                href="https://boutique.ffgym.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start bg-white text-ffgym-blue font-bold px-7 py-3.5 rounded-xl text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Visiter la boutique
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT & AFFILIATION ───────────────────────────────────── */}
      <section id="contact" className="py-14 md:py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
            <SectionLabel className="bg-slate-100 text-slate-600 mb-4">Affiliation & Contact</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-4 tracking-tight">
              Rejoindre la FFGym
            </h2>
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
              Affiliez votre club à la Fédération Française de Gymnastique ou contactez votre comité régional pour toute question sur les licences et démarches.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {/* Demande de contact */}
            <div className="group flex flex-col gap-4 sm:gap-5 rounded-2xl p-5 sm:p-7 border-2 border-slate-100 hover:border-ffgym-blue/30 hover:shadow-lg transition-all duration-300 bg-white">
              <div className="w-14 h-14 rounded-xl bg-ffgym-blue/8 flex items-center justify-center text-ffgym-blue group-hover:bg-ffgym-blue group-hover:text-white transition-all duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Demande de contact</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Posez votre question à votre comité régional. Licences, affiliations, démarches — nos équipes vous répondent.
                </p>
              </div>
              <a
                href="#contact-form"
                className="self-start text-sm font-semibold text-ffgym-blue border-2 border-ffgym-blue/20 px-5 py-2.5 rounded-xl hover:bg-ffgym-blue hover:text-white hover:border-ffgym-blue transition-all duration-200"
              >
                Envoyer un message →
              </a>
              <p className="text-xs text-slate-400 -mt-2">
                POC — formulaire non implémenté. Transmis au comité régional correspondant.
              </p>
            </div>

            {/* Demande d'affiliation */}
            <div id="affiliation" className="group flex flex-col gap-4 sm:gap-5 rounded-2xl p-5 sm:p-7 border-2 border-slate-100 hover:border-ffgym-red/30 hover:shadow-lg transition-all duration-300 bg-white">
              <div className="w-14 h-14 rounded-xl bg-ffgym-red/8 flex items-center justify-center text-ffgym-red group-hover:bg-ffgym-red group-hover:text-white transition-all duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Demande d'affiliation</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Votre club n'est pas encore affilié à la FFGym ? Déposez votre dossier en ligne et rejoignez les 1 398 clubs fédéraux.
                </p>
              </div>
              <a
                href="#affiliation-form"
                className="self-start text-sm font-semibold text-ffgym-red border-2 border-ffgym-red/20 px-5 py-2.5 rounded-xl hover:bg-ffgym-red hover:text-white hover:border-ffgym-red transition-all duration-200"
              >
                Déposer un dossier →
              </a>
              <p className="text-xs text-slate-400 -mt-2">
                POC — formulaire non implémenté. Réservé aux clubs jamais affiliés à la FFGym.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTENAIRES ─────────────────────────────────────────────── */}
      <section className="py-10 md:py-16 bg-ffgym-blue border-t border-ffgym-blue/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-white/40 mb-10">
            Nos partenaires officiels
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-6 items-center justify-items-center">
            {partenaires.map((p) => (
              <div key={p.nom} className="flex items-center justify-center h-10 w-full">
                <img
                  src={p.img.src}
                  alt={p.nom}
                  className="h-8 w-auto object-contain max-w-[96px]"
                  style={p.noFilter ? { opacity: 0.85 } : { filter: 'brightness(0) invert(1)', opacity: 0.75 }}
                  title={p.nom}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="bg-[#001C38] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">

            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/LogoGymGlobalBleu.png" alt="FFGym" className="h-8 brightness-0 invert" />
                <span className="font-bold">FFGym</span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">
                Fédération Française de Gymnastique<br />
                7 ter, Cour des Petites Écuries<br />
                75010 Paris
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Plateforme</p>
              <ul className="space-y-2.5">
                {['Espace Club', 'Espace Licencié', 'Espace Fédéral', 'API Partenaires'].map(l => (
                  <li key={l}><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">FFGym</p>
              <ul className="space-y-2.5">
                {[
                  { label: 'Site fédéral',  href: 'https://www.ffgym.fr'      },
                  { label: 'Boutique',      href: 'https://boutique.ffgym.fr' },
                  { label: 'Actualités',    href: 'https://www.ffgym.fr/actualites' },
                  { label: 'Contact',       href: 'https://www.ffgym.fr/contact'    },
                ].map(l => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer"
                       className="text-sm text-white/60 hover:text-white transition-colors">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Légal</p>
              <ul className="space-y-2.5">
                {['Mentions légales', 'RGPD', 'CGU', 'Accessibilité RGAA'].map(l => (
                  <li key={l}><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/35 text-xs">
              © 2026 Fédération Française de Gymnastique — Tous droits réservés
            </p>
            <p className="text-white/25 text-xs">
              POC Interactif — Consultation 2026_01 — Soutenance du 20 mars 2026
            </p>
          </div>
        </div>
      </footer>

      {/* ── MODAL CONNEXION ─────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="relative bg-white rounded-2xl shadow-modal w-full max-w-md mx-4 overflow-hidden animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ffgym-blue via-ffgym-gradient-start to-ffgym-red" />

            <div className="pt-10 pb-6 px-8 text-center">
              <img src="/LogoGymGlobalBleu.png" alt="FFGym" className="h-12 mx-auto mb-5" />
              <h2 className="text-xl font-bold text-slate-900">Connexion</h2>
              <p className="text-slate-500 text-sm mt-1">Accédez à votre espace FFGym</p>
            </div>

            <div className="px-8 pb-8 flex flex-col gap-4">
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Email ou n° de licence</label>
                  <input
                    type="text"
                    placeholder="exemple@email.fr"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="input-base"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Mot de passe</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
                <p className="text-xs text-amber-800 leading-relaxed">
                  <span className="font-bold">Site de démonstration</span> — aucun identifiant requis. Cliquez simplement sur le bouton ci-dessous pour explorer la plateforme.
                </p>
              </div>

              <button
                onClick={() => handleLogin('federal')}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-ffgym-red text-white text-sm font-bold rounded-xl hover:bg-[#A00D26] transition-all shadow-md hover:shadow-lg"
              >
                <LogIn className="w-4 h-4" aria-hidden="true" />
                Se connecter
              </button>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-500 text-center mb-3">Vous n'avez pas de compte ?</p>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="#contact"
                    onClick={() => setIsModalOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-ffgym-red/20 text-ffgym-red text-xs font-semibold hover:bg-ffgym-red/5 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Affilier mon club
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setIsModalOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Nous contacter
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
