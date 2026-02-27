'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SpaceSwitcher from '@/components/ui/SpaceSwitcher';
import {
  Gauge, Handshake, CreditCard, Users2, Scale, Network, ReceiptText,
  LogOut, Menu, X, Newspaper, CalendarDays, Mail,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const navItems: { href: string; label: string; Icon: LucideIcon; alert?: number }[] = [
  { href: '/federal',                label: 'Tableau de bord',        Icon: Gauge },
  { href: '/federal/affiliation',    label: 'Affiliation',             Icon: Handshake,  alert: 3 },
  { href: '/federal/prise-licence',  label: 'Prise de licence',        Icon: CreditCard },
  { href: '/federal/accompagnement', label: 'Accompagnement clubs',    Icon: Users2 },
  { href: '/federal/ethique',        label: 'Éthique & Honorabilité',  Icon: Scale,      alert: 1 },
  { href: '/federal/sd',             label: 'Structures déconc.',      Icon: Network },
  { href: '/federal/admin',          label: 'Admin & Financier',       Icon: ReceiptText, alert: 14 },
];

function SidebarContent({ pathname, onNavigate, showLogo = true }: { pathname: string; onNavigate?: () => void; showLogo?: boolean }) {
  return (
    <>
      {/* Logo */}
      {showLogo && (
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 hover:opacity-80 transition-opacity flex-shrink-0"
          aria-label="Retour à l'accueil FFGym Licence"
        >
          <img src="/LogoGymGlobalBleu.png" alt="FFGym" className="h-8" />
          <div>
            <span className="text-base font-bold text-slate-900 leading-tight block">FFGym</span>
            <span className="text-[10px] font-medium text-slate-500 leading-tight block">Licence · 2026-2027</span>
          </div>
        </Link>
      )}

      {/* Sélecteur d'espace */}
      <SpaceSwitcher currentSpaceId="federal-idf" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto" aria-label="Navigation espace fédéral">
        {navItems.map((item) => {
          const isActive = item.href === '/federal'
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-ffgym-red/8 text-ffgym-red'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.Icon
                className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-ffgym-red' : 'text-slate-400'}`}
                aria-hidden="true"
              />
              <span className="flex-1">{item.label}</span>
              {item.alert !== undefined && (
                <span className={`text-[10px] font-bold min-w-[1.25rem] h-5 px-1.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isActive ? 'bg-ffgym-red/20 text-ffgym-red' : 'bg-ffgym-red text-white'
                }`}>
                  {item.alert}
                </span>
              )}
            </Link>
          );
        })}

          <Link href="/actualites" onClick={onNavigate} className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all">
            <Newspaper className="w-4 h-4 text-slate-400" aria-hidden="true" />
            <span>Actualités</span>
          </Link>
          <Link href="/agenda" onClick={onNavigate} className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all">
            <CalendarDays className="w-4 h-4 text-slate-400" aria-hidden="true" />
            <span>Agenda</span>
          </Link>
          <a href="/#contact" onClick={onNavigate} className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all">
            <Mail className="w-4 h-4 text-slate-400" aria-hidden="true" />
            <span>Contact</span>
          </a>
          <Link href="/" onClick={onNavigate} className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all" aria-label="Déconnexion">
            <LogOut className="w-4 h-4 text-slate-400" aria-hidden="true" />
            <span>Déconnexion</span>
          </Link>
      </nav>

    </>
  );
}

export default function FederalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Sidebar desktop */}
      <aside className="hidden lg:flex w-60 bg-white border-r border-slate-100 h-screen sticky top-0 flex-col flex-shrink-0">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Overlay mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer mobile */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Menu de navigation"
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 flex-shrink-0">
          <span className="text-sm font-semibold text-slate-500">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <SidebarContent pathname={pathname} onNavigate={() => setMenuOpen(false)} showLogo={false} />
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Barre mobile */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center gap-3 px-4 py-3 bg-white/90 backdrop-blur-lg border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/LogoGymGlobalBleu.png" alt="FFGym" className="h-7" />
            <span className="text-sm font-bold text-slate-900">FFGym Licence</span>
          </Link>
          <span className="flex-1 text-sm font-semibold text-slate-500 truncate">
            {navItems.find(i =>
              i.href === '/federal' ? pathname === i.href : pathname === i.href || pathname.startsWith(i.href + '/')
            )?.label ?? 'Espace Fédéral'}
          </span>
          <button
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-600 transition-colors flex-shrink-0"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        <main id="main-content" className="flex-1 overflow-auto" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
