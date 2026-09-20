import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const space = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
});

const plex = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Canoe — The new internet.',
  description:
    'Canoe is the new internet: private by construction, AI native by default. Less surface, more imagination.',
  openGraph: {
    title: 'Canoe — The new internet.',
    description: 'Private by construction. AI native by default.',
    siteName: 'Canoe',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canoe — The new internet.',
    description: 'Private by construction. AI native by default.',
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${space.variable} ${plex.variable}`}>
      <body>{children}</body>
    </html>
  );
}
