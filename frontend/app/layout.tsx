import type { Metadata } from 'next';
import './globals.css';
import { CircularProvider } from '@/lib/CircularContext';

export const metadata: Metadata = {
  title: 'ReWeave AI - Industrial Circular Intelligence Platform',
  description: 'AI-powered industrial recovery infrastructure for waste intelligence, recovery optimization, and circular supply chains.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container min-h-screen relative font-body-main antialiased overflow-x-hidden">
        <CircularProvider>
          {children}
        </CircularProvider>
      </body>
    </html>
  );
}

