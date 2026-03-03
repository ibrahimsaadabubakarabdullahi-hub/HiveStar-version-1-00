import type { Metadata } from 'next';
import './globals.css';
import { Bot } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HiveStar | Kantana AI Industries Ltd',
  description: 'The Cosmic Hive Intelligence – Built by Kantana AI Industries Ltd',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-white min-h-screen hive-bg">
        {children}
      </body>
    </html>
  );
}
