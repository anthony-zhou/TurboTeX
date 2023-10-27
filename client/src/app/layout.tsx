import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NextAuthSessionProvider from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Verdant',
  description: 'Fast collaborative LaTeX editor.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <body className={inter.className}>{children}</body>
      </NextAuthSessionProvider>
    </html>
  );
}
