import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateLong(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function calculateAge(dateNaissance: string): number {
  const today = new Date();
  const birthDate = new Date(dateNaissance);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function getInitials(nom: string, prenom: string): string {
  return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function getStatutBadgeClass(statut: string): string {
  switch (statut) {
    case 'valide':
    case 'validé':
      return 'badge-success';
    case 'en_attente':
      return 'badge-warning';
    case 'expire':
    case 'expiré':
      return 'badge-error';
    case 'pre_licence':
      return 'badge-info';
    default:
      return 'badge-neutral';
  }
}

export function getStatutLabel(statut: string): string {
  switch (statut) {
    case 'valide':
    case 'validé':
      return 'Valide';
    case 'en_attente':
      return 'En attente';
    case 'expire':
    case 'expiré':
      return 'Expiré';
    case 'pre_licence':
      return 'Pré-licence';
    default:
      return statut;
  }
}

export function getAlerteBadgeClass(type: string): string {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'warning':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'error':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'info':
    default:
      return 'bg-sky-100 text-sky-700 border-sky-200';
  }
}

export function getAlerteIcon(type: string): string {
  switch (type) {
    case 'success':
      return '✓';
    case 'warning':
      return '⚠';
    case 'error':
      return '✕';
    case 'info':
    default:
      return 'ℹ';
  }
}
