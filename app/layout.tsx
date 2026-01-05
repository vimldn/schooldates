import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UK School Term Dates 2024/2025 | Find Your Council',
  description: 'Find official school term dates, half terms, and holidays for every UK council. Search by area or region. Free email reminders available.',
  keywords: 'school term dates, UK schools, half term dates, school holidays, council term dates, 2024 2025 academic year',
  openGraph: {
    title: 'UK School Term Dates 2024/2025',
    description: 'Find official school term dates for your council. Every UK area covered.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
