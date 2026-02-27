'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ShieldHalf, ChevronDown, Check, ArrowRight, Landmark } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Space {
  id: string;
  href: string;
  typeLabel: string;
  entityName: string;
  detail: string;
  detailClass?: string;
  initials: string;
  avatarClass: string;
  avatarShape: string;
  Icon?: LucideIcon;
  badge?: { label: string; styleClass: string };
  rgpdScope: string;
  rgpdColor: string;
}

const USER_SPACES: Space[] = [
  {
    id: 'federal-idf',
    href: '/federal',
    typeLabel: 'Espace Fédéral',
    entityName: 'CR Île-de-France',
    detail: 'Niveau CR · 18 comités',
    initials: 'CR',
    avatarClass: 'bg-ffgym-blue/10 text-ffgym-blue',
    avatarShape: 'rounded-xl',
    Icon: Landmark,
    rgpdScope: 'IDF uniquement · 127 clubs',
    rgpdColor: 'text-cyan-700 bg-cyan-50 border-cyan-200',
  },
  {
    id: 'club',
    href: '/club',
    typeLabel: 'Espace Club',
    entityName: "Gym'Étoiles Paris 15",
    detail: 'IDF-75-042',
    initials: 'GE',
    avatarClass: 'bg-ffgym-red/10 text-ffgym-red',
    avatarShape: 'rounded-xl',
    badge: { label: 'Affilié', styleClass: 'badge-success' },
    rgpdScope: 'Club uniquement · Mes licenciés',
    rgpdColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  {
    id: 'licencie',
    href: '/licencie',
    typeLabel: 'Espace Licencié',
    entityName: 'Lucas Martin',
    detail: '2027-IDF-100001',
    detailClass: 'font-mono',
    initials: 'LM',
    avatarClass: 'bg-gradient-to-br from-ffgym-blue to-ffgym-gradient-start text-white',
    avatarShape: 'rounded-full',
    badge: { label: 'Valide', styleClass: 'badge-success' },
    rgpdScope: 'Mes données uniquement',
    rgpdColor: 'text-violet-700 bg-violet-50 border-violet-200',
  },
];

interface SpaceSwitcherProps {
  currentSpaceId: string;
}

export default function SpaceSwitcher({ currentSpaceId }: SpaceSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSpace = USER_SPACES.find(s => s.id === currentSpaceId) ?? USER_SPACES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="border-b border-slate-100">

      {/* RGPD Data Scope Banner */}
      <div className={`mx-3 mt-3 mb-1 px-3 py-2 rounded-xl border text-[10px] font-semibold flex items-center gap-1.5 ${currentSpace.rgpdColor}`}>
        <ShieldHalf className="w-3 h-3" aria-hidden="true" />
        <span>{currentSpace.rgpdScope}</span>
      </div>

      {/* Trigger */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full px-6 py-4 hover:bg-slate-50 transition-colors text-left"
        aria-expanded={isOpen}
        aria-label="Changer d'espace de travail"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${currentSpace.avatarShape} ${currentSpace.avatarClass} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
            {currentSpace.Icon
              ? <currentSpace.Icon className="w-5 h-5" aria-hidden="true" />
              : currentSpace.initials
            }
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 text-sm truncate">{currentSpace.entityName}</p>
            <p className={`text-xs text-slate-500 truncate ${currentSpace.detailClass ?? ''}`}>{currentSpace.detail}</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {currentSpace.badge && (
              <span className={`badge ${currentSpace.badge.styleClass} text-[10px] px-2 py-1`}>
                {currentSpace.badge.label}
              </span>
            )}
            <ChevronDown
              className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </div>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="bg-slate-50 border-t border-slate-100">
          <div className="px-3 pt-2 pb-3 space-y-0.5">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1.5">
              Mes espaces ({USER_SPACES.length})
            </p>
            {USER_SPACES.map(space => {
              const isCurrent = space.id === currentSpaceId;
              return (
                <Link
                  key={space.id}
                  href={space.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                    isCurrent
                      ? 'bg-white shadow-sm'
                      : 'hover:bg-white hover:shadow-sm'
                  }`}
                  aria-current={isCurrent ? 'true' : undefined}
                >
                  <div className={`w-8 h-8 ${space.avatarShape} ${space.avatarClass} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                    {space.Icon
                      ? <space.Icon className="w-4 h-4" aria-hidden="true" />
                      : space.initials
                    }
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 leading-tight truncate">{space.entityName}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{space.typeLabel}</p>
                  </div>

                  {isCurrent ? (
                    <Check className="w-3 h-3 text-ffgym-blue flex-shrink-0" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="w-3 h-3 text-slate-300 flex-shrink-0 group-hover:text-slate-500 transition-colors" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
