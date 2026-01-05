'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

// UK Council term dates data - same as homepage
const councilData = [
  {
    slug: 'birmingham',
    name: 'Birmingham',
    region: 'West Midlands',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'manchester',
    name: 'Manchester',
    region: 'Greater Manchester',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-21', end: '2024-10-25' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'leeds',
    name: 'Leeds',
    region: 'West Yorkshire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-25' }
    }
  },
  {
    slug: 'liverpool',
    name: 'Liverpool',
    region: 'Merseyside',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'bristol',
    name: 'Bristol',
    region: 'South West',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'sheffield',
    name: 'Sheffield',
    region: 'South Yorkshire',
    terms: {
      autumn: { start: '2024-09-04', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'newcastle',
    name: 'Newcastle upon Tyne',
    region: 'Tyne and Wear',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'nottingham',
    name: 'Nottingham',
    region: 'East Midlands',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-23' }
    }
  },
  {
    slug: 'edinburgh',
    name: 'Edinburgh',
    region: 'Scotland',
    terms: {
      autumn: { start: '2024-08-14', halfTerm: { start: '2024-10-14', end: '2024-10-18' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-10', end: '2025-02-14' }, end: '2025-04-04' },
      summer: { start: '2025-04-21', halfTerm: { start: '2025-05-05', end: '2025-05-05' }, end: '2025-06-27' }
    }
  },
  {
    slug: 'glasgow',
    name: 'Glasgow',
    region: 'Scotland',
    terms: {
      autumn: { start: '2024-08-14', halfTerm: { start: '2024-10-14', end: '2024-10-18' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-10', end: '2025-02-14' }, end: '2025-04-04' },
      summer: { start: '2025-04-21', halfTerm: { start: '2025-05-26', end: '2025-05-26' }, end: '2025-06-25' }
    }
  },
  {
    slug: 'cardiff',
    name: 'Cardiff',
    region: 'Wales',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-24', end: '2025-02-28' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'belfast',
    name: 'Belfast',
    region: 'Northern Ireland',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-06-30' }
    }
  },
  {
    slug: 'oxford',
    name: 'Oxford',
    region: 'Oxfordshire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'cambridge',
    name: 'Cambridge',
    region: 'Cambridgeshire',
    terms: {
      autumn: { start: '2024-09-04', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-21' }
    }
  },
  {
    slug: 'brighton-hove',
    name: 'Brighton & Hove',
    region: 'East Sussex',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-westminster',
    name: 'Westminster',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-camden',
    name: 'Camden',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-islington',
    name: 'Islington',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-hackney',
    name: 'Hackney',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-tower-hamlets',
    name: 'Tower Hamlets',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  // Add more councils here matching the homepage data...
];

// Helper functions
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};

const formatShortDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const getDaysDiff = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
};

const getUpcomingEvent = (terms: any) => {
  const today = new Date();
  const events = [
    { name: 'Autumn Half Term', date: terms.autumn.halfTerm.start, type: 'holiday' },
    { name: 'Christmas Holiday', date: terms.autumn.end, type: 'holiday' },
    { name: 'Spring Term Starts', date: terms.spring.start, type: 'school' },
    { name: 'February Half Term', date: terms.spring.halfTerm.start, type: 'holiday' },
    { name: 'Easter Holiday', date: terms.spring.end, type: 'holiday' },
    { name: 'Summer Term Starts', date: terms.summer.start, type: 'school' },
    { name: 'May Half Term', date: terms.summer.halfTerm.start, type: 'holiday' },
    { name: 'Summer Holiday', date: terms.summer.end, type: 'holiday' },
  ];
  
  for (const event of events) {
    if (new Date(event.date) > today) {
      const diff = Math.ceil((new Date(event.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return { ...event, daysUntil: diff };
    }
  }
  return null;
};

export default function CouncilPage() {
  const params = useParams();
  const slug = params.slug as string;
  const council = councilData.find(c => c.slug === slug);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!council) {
    return (
      <main className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-stone-900 mb-4">Council Not Found</h1>
          <Link href="/" className="text-amber-600 hover:text-amber-700">
            ← Back to all councils
          </Link>
        </div>
      </main>
    );
  }

  const upcomingEvent = getUpcomingEvent(council.terms);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const termColors = {
    autumn: { bg: 'bg-orange-50', border: 'border-orange-200', accent: 'text-orange-700', icon: '🍂' },
    spring: { bg: 'bg-green-50', border: 'border-green-200', accent: 'text-green-700', icon: '🌱' },
    summer: { bg: 'bg-blue-50', border: 'border-blue-200', accent: 'text-blue-700', icon: '☀️' },
  };

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Councils
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-50 to-stone-50 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
            {council.region}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-3">
            {council.name} School Term Dates
          </h1>
          <p className="text-lg text-stone-600">
            2024/2025 academic year term dates, half terms, and school holidays
          </p>

          {/* Upcoming Event Banner */}
          {upcomingEvent && (
            <div className={`mt-8 p-5 rounded-2xl ${upcomingEvent.type === 'holiday' ? 'bg-amber-100 border border-amber-200' : 'bg-stone-100 border border-stone-200'}`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-stone-500 mb-1">Coming up next</p>
                  <p className="text-xl font-semibold text-stone-900">{upcomingEvent.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-amber-600">{upcomingEvent.daysUntil}</p>
                  <p className="text-sm text-stone-500">days away</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Term Dates */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="font-semibold text-xl text-stone-900 mb-6">Term Dates</h2>
        
        <div className="space-y-6">
          {/* Autumn Term */}
          <div className={`rounded-2xl ${termColors.autumn.bg} border ${termColors.autumn.border} overflow-hidden`}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{termColors.autumn.icon}</span>
                <h3 className={`text-xl font-semibold ${termColors.autumn.accent}`}>Autumn Term</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-stone-500 mb-1">Term starts</p>
                  <p className="font-medium text-stone-900">{formatDate(council.terms.autumn.start)}</p>
                </div>
                <div>
                  <p className="text-sm text-stone-500 mb-1">Term ends</p>
                  <p className="font-medium text-stone-900">{formatDate(council.terms.autumn.end)}</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/60 rounded-xl">
                <p className="text-sm font-medium text-stone-700 mb-2">🎃 October Half Term</p>
                <p className="text-stone-600">
                  {formatDate(council.terms.autumn.halfTerm.start)} – {formatDate(council.terms.autumn.halfTerm.end)}
                </p>
                <p className="text-sm text-stone-500 mt-1">
                  ({getDaysDiff(council.terms.autumn.halfTerm.start, council.terms.autumn.halfTerm.end)} days)
                </p>
              </div>
            </div>
          </div>

          {/* Christmas Holiday */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🎄</span>
              <h3 className="text-xl font-semibold text-red-700">Christmas Holiday</h3>
            </div>
            <p className="text-stone-600">
              {formatDate(council.terms.autumn.end)} – {formatDate(council.terms.spring.start)}
            </p>
          </div>

          {/* Spring Term */}
          <div className={`rounded-2xl ${termColors.spring.bg} border ${termColors.spring.border} overflow-hidden`}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{termColors.spring.icon}</span>
                <h3 className={`text-xl font-semibold ${termColors.spring.accent}`}>Spring Term</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-stone-500 mb-1">Term starts</p>
                  <p className="font-medium text-stone-900">{formatDate(council.terms.spring.start)}</p>
                </div>
                <div>
                  <p className="text-sm text-stone-500 mb-1">Term ends</p>
                  <p className="font-medium text-stone-900">{formatDate(council.terms.spring.end)}</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/60 rounded-xl">
                <p className="text-sm font-medium text-stone-700 mb-2">❄️ February Half Term</p>
                <p className="text-stone-600">
                  {formatDate(council.terms.spring.halfTerm.start)} – {formatDate(council.terms.spring.halfTerm.end)}
                </p>
                <p className="text-sm text-stone-500 mt-1">
                  ({getDaysDiff(council.terms.spring.halfTerm.start, council.terms.spring.halfTerm.end)} days)
                </p>
              </div>
            </div>
          </div>

          {/* Easter Holiday */}
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🐰</span>
              <h3 className="text-xl font-semibold text-purple-700">Easter Holiday</h3>
            </div>
            <p className="text-stone-600">
              {formatDate(council.terms.spring.end)} – {formatDate(council.terms.summer.start)}
            </p>
          </div>

          {/* Summer Term */}
          <div className={`rounded-2xl ${termColors.summer.bg} border ${termColors.summer.border} overflow-hidden`}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{termColors.summer.icon}</span>
                <h3 className={`text-xl font-semibold ${termColors.summer.accent}`}>Summer Term</h3>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-stone-500 mb-1">Term starts</p>
                  <p className="font-medium text-stone-900">{formatDate(council.terms.summer.start)}</p>
                </div>
                <div>
                  <p className="text-sm text-stone-500 mb-1">Term ends</p>
                  <p className="font-medium text-stone-900">{formatDate(council.terms.summer.end)}</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white/60 rounded-xl">
                <p className="text-sm font-medium text-stone-700 mb-2">🌸 May Half Term</p>
                <p className="text-stone-600">
                  {formatDate(council.terms.summer.halfTerm.start)} – {formatDate(council.terms.summer.halfTerm.end)}
                </p>
                <p className="text-sm text-stone-500 mt-1">
                  ({getDaysDiff(council.terms.summer.halfTerm.start, council.terms.summer.halfTerm.end)} days)
                </p>
              </div>
            </div>
          </div>

          {/* Summer Holiday */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏖️</span>
              <h3 className="text-xl font-semibold text-yellow-700">Summer Holiday</h3>
            </div>
            <p className="text-stone-600">
              From {formatDate(council.terms.summer.end)}
            </p>
            <p className="text-sm text-stone-500 mt-1">
              (Approximately 6 weeks until new academic year)
            </p>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="grid sm:grid-cols-2 gap-4">
          <button 
            onClick={() => window.print()}
            className="flex items-center justify-center gap-3 p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-300 hover:shadow-sm transition-all"
          >
            <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span className="font-medium text-stone-700">Print this page</span>
          </button>
          
          <button className="flex items-center justify-center gap-3 p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-300 hover:shadow-sm transition-all">
            <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium text-stone-700">Add to calendar</span>
          </button>
        </div>
      </section>

      {/* Email Signup */}
      <section className="bg-stone-900 text-white py-12">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl mb-3">Get Term Date Reminders</h2>
          <p className="text-stone-400 mb-6">
            We'll email you before each half term and holiday for {council.name}.
          </p>
          
          {submitted ? (
            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-5">
              <p className="text-green-400 font-medium">All set! You'll receive reminders for {council.name}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-xl transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* SEO Content */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-stone max-w-none">
          <h2 className="font-serif text-2xl text-stone-900 mb-4">
            About {council.name} School Term Dates
          </h2>
          <p className="text-stone-600 mb-4">
            {council.name} Council sets the official term dates for community schools and voluntary-controlled 
            schools in the {council.name} area. These dates apply to the 2024/2025 academic year. Academy 
            schools, free schools, and independent schools may set their own term dates, so parents should 
            always check with their individual school for confirmation.
          </p>
          <p className="text-stone-600 mb-4">
            The school year in {council.name} typically runs from early September to late July, with three 
            terms (Autumn, Spring, and Summer) separated by Christmas and Easter holidays. Each term includes 
            a one-week half-term break.
          </p>
          <p className="text-stone-600">
            For the most up-to-date information, please visit the official {council.name} Council website or 
            contact your child's school directly. Term dates can occasionally change, and some schools may have 
            additional INSET days or teacher training days.
          </p>
        </div>
      </section>

      {/* Related Councils */}
      <section className="bg-stone-100 border-t border-stone-200 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-semibold text-lg text-stone-900 mb-6">
            Other councils in {council.region}
          </h2>
          <div className="flex flex-wrap gap-3">
            {councilData
              .filter(c => c.region === council.region && c.slug !== council.slug)
              .slice(0, 6)
              .map(c => (
                <Link
                  key={c.slug}
                  href={`/council/${c.slug}`}
                  className="px-4 py-2 bg-white border border-stone-200 rounded-full text-sm font-medium text-stone-700 hover:border-amber-300 hover:shadow-sm transition-all"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-stone-500">
          <p>© {new Date().getFullYear()} UK School Term Dates. Data sourced from official council websites.</p>
          <p className="mt-2">
            <Link href="/" className="text-amber-600 hover:text-amber-700">View all councils</Link>
          </p>
        </div>
      </footer>
    </main>
  );
}
