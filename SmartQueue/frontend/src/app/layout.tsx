import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SmartQueue — Job Processing Dashboard',
  description: 'Real-time job queue monitoring and management built with NestJS, Bull, PostgreSQL & Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
