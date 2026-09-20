import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
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
  themeColor: '#fcfcfa',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
