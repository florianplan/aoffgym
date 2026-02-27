import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FFGym Licence - POC Interactif',
  description: 'Plateforme de gestion des licences de la Fédération Française de Gymnastique',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen text-slate-900 antialiased">
{children}
      </body>
    </html>
  );
}
