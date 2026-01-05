'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// UK Council term dates data - 2024/2025 academic year
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
    slug: 'southampton',
    name: 'Southampton',
    region: 'Hampshire',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-23' }
    }
  },
  {
    slug: 'leicester',
    name: 'Leicester',
    region: 'East Midlands',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-14', end: '2024-10-25' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-11' }
    }
  },
  {
    slug: 'coventry',
    name: 'Coventry',
    region: 'West Midlands',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-24', end: '2025-02-28' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'bradford',
    name: 'Bradford',
    region: 'West Yorkshire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
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
    slug: 'reading',
    name: 'Reading',
    region: 'Berkshire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'derby',
    name: 'Derby',
    region: 'East Midlands',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-23' }
    }
  },
  {
    slug: 'plymouth',
    name: 'Plymouth',
    region: 'Devon',
    terms: {
      autumn: { start: '2024-09-04', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-23' }
    }
  },
  {
    slug: 'stoke-on-trent',
    name: 'Stoke-on-Trent',
    region: 'Staffordshire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'wolverhampton',
    name: 'Wolverhampton',
    region: 'West Midlands',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-21' }
    }
  },
  {
    slug: 'hull',
    name: 'Kingston upon Hull',
    region: 'East Yorkshire',
    terms: {
      autumn: { start: '2024-09-04', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'sunderland',
    name: 'Sunderland',
    region: 'Tyne and Wear',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'swansea',
    name: 'Swansea',
    region: 'Wales',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-24', end: '2025-02-28' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'southend-on-sea',
    name: 'Southend-on-Sea',
    region: 'Essex',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'portsmouth',
    name: 'Portsmouth',
    region: 'Hampshire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-23' }
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
    slug: 'peterborough',
    name: 'Peterborough',
    region: 'Cambridgeshire',
    terms: {
      autumn: { start: '2024-09-04', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-21' }
    }
  },
  {
    slug: 'luton',
    name: 'Luton',
    region: 'Bedfordshire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-23' }
    }
  },
  {
    slug: 'warrington',
    name: 'Warrington',
    region: 'Cheshire',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'york',
    name: 'York',
    region: 'North Yorkshire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'bournemouth',
    name: 'Bournemouth',
    region: 'Dorset',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-23' }
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
    slug: 'milton-keynes',
    name: 'Milton Keynes',
    region: 'Buckinghamshire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'norwich',
    name: 'Norwich',
    region: 'Norfolk',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-21' }
    }
  },
  {
    slug: 'exeter',
    name: 'Exeter',
    region: 'Devon',
    terms: {
      autumn: { start: '2024-09-04', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-23' }
    }
  },
  {
    slug: 'chelmsford',
    name: 'Chelmsford',
    region: 'Essex',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'ipswich',
    name: 'Ipswich',
    region: 'Suffolk',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'colchester',
    name: 'Colchester',
    region: 'Essex',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'blackpool',
    name: 'Blackpool',
    region: 'Lancashire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'slough',
    name: 'Slough',
    region: 'Berkshire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'watford',
    name: 'Watford',
    region: 'Hertfordshire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'eastbourne',
    name: 'Eastbourne',
    region: 'East Sussex',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'maidstone',
    name: 'Maidstone',
    region: 'Kent',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'basingstoke',
    name: 'Basingstoke',
    region: 'Hampshire',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-23' }
    }
  },
  {
    slug: 'woking',
    name: 'Woking',
    region: 'Surrey',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'worthing',
    name: 'Worthing',
    region: 'West Sussex',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'bath',
    name: 'Bath',
    region: 'Somerset',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'gloucester',
    name: 'Gloucester',
    region: 'Gloucestershire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'chester',
    name: 'Chester',
    region: 'Cheshire',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'barnsley',
    name: 'Barnsley',
    region: 'South Yorkshire',
    terms: {
      autumn: { start: '2024-09-04', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'rotherham',
    name: 'Rotherham',
    region: 'South Yorkshire',
    terms: {
      autumn: { start: '2024-09-04', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'doncaster',
    name: 'Doncaster',
    region: 'South Yorkshire',
    terms: {
      autumn: { start: '2024-09-04', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'wakefield',
    name: 'Wakefield',
    region: 'West Yorkshire',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-11' },
      summer: { start: '2025-04-28', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'stockport',
    name: 'Stockport',
    region: 'Greater Manchester',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'oldham',
    name: 'Oldham',
    region: 'Greater Manchester',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-21', end: '2024-10-25' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'wigan',
    name: 'Wigan',
    region: 'Greater Manchester',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-21', end: '2024-10-25' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'bolton',
    name: 'Bolton',
    region: 'Greater Manchester',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-21', end: '2024-10-25' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'rochdale',
    name: 'Rochdale',
    region: 'Greater Manchester',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-21', end: '2024-10-25' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'bury',
    name: 'Bury',
    region: 'Greater Manchester',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-21', end: '2024-10-25' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'salford',
    name: 'Salford',
    region: 'Greater Manchester',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-21', end: '2024-10-25' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'trafford',
    name: 'Trafford',
    region: 'Greater Manchester',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-21', end: '2024-10-25' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
    }
  },
  {
    slug: 'tameside',
    name: 'Tameside',
    region: 'Greater Manchester',
    terms: {
      autumn: { start: '2024-09-03', halfTerm: { start: '2024-10-21', end: '2024-10-25' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-18' }
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
  {
    slug: 'london-greenwich',
    name: 'Greenwich',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-lewisham',
    name: 'Lewisham',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-southwark',
    name: 'Southwark',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-lambeth',
    name: 'Lambeth',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-wandsworth',
    name: 'Wandsworth',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-hammersmith',
    name: 'Hammersmith & Fulham',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-kensington',
    name: 'Kensington & Chelsea',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-brent',
    name: 'Brent',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-ealing',
    name: 'Ealing',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-hounslow',
    name: 'Hounslow',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-richmond',
    name: 'Richmond upon Thames',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-kingston',
    name: 'Kingston upon Thames',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-merton',
    name: 'Merton',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-sutton',
    name: 'Sutton',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-croydon',
    name: 'Croydon',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-bromley',
    name: 'Bromley',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-bexley',
    name: 'Bexley',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-havering',
    name: 'Havering',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-barking',
    name: 'Barking & Dagenham',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-redbridge',
    name: 'Redbridge',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-newham',
    name: 'Newham',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-waltham-forest',
    name: 'Waltham Forest',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-haringey',
    name: 'Haringey',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-enfield',
    name: 'Enfield',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-barnet',
    name: 'Barnet',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-harrow',
    name: 'Harrow',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
  {
    slug: 'london-hillingdon',
    name: 'Hillingdon',
    region: 'London',
    terms: {
      autumn: { start: '2024-09-02', halfTerm: { start: '2024-10-28', end: '2024-11-01' }, end: '2024-12-20' },
      spring: { start: '2025-01-06', halfTerm: { start: '2025-02-17', end: '2025-02-21' }, end: '2025-04-04' },
      summer: { start: '2025-04-22', halfTerm: { start: '2025-05-26', end: '2025-05-30' }, end: '2025-07-22' }
    }
  },
];

// Get unique regions
const regions = [...new Set(councilData.map(c => c.region))].sort();

// Helper functions
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatShortDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filteredCouncils = useMemo(() => {
    return councilData.filter(council => {
      const matchesSearch = council.name.toLowerCase().includes(search.toLowerCase()) ||
        council.region.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || council.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [search, selectedRegion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-stone-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              2024/2025 Academic Year
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-900 mb-4 tracking-tight">
              UK School Term Dates
            </h1>
            <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto mb-10">
              Find official term dates, half terms, and school holidays for your local council. 
              Every area in one place.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search your council or area..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-stone-200 focus:border-amber-400 focus:outline-none shadow-sm bg-white text-stone-900 placeholder-stone-400"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Region Filter */}
        <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
          <span className="text-sm text-stone-500 whitespace-nowrap">Filter by region:</span>
          <button
            onClick={() => setSelectedRegion('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedRegion === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Regions
          </button>
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedRegion === region
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-stone-500 mb-6">
          Showing {filteredCouncils.length} council{filteredCouncils.length !== 1 ? 's' : ''}
        </p>

        {/* Council Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCouncils.map(council => (
            <Link
              key={council.slug}
              href={`/council/${council.slug}`}
              className="group bg-white rounded-2xl border border-stone-200 p-6 hover:shadow-lg hover:border-amber-300 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-stone-900 group-hover:text-amber-700 transition-colors">
                    {council.name}
                  </h3>
                  <p className="text-sm text-stone-500">{council.region}</p>
                </div>
                <svg className="w-5 h-5 text-stone-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              {/* Quick Preview */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span>Next half term:</span>
                  <span className="font-medium text-stone-900">
                    {formatShortDate(council.terms.spring.halfTerm.start)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Summer break:</span>
                  <span className="font-medium text-stone-900">
                    {formatShortDate(council.terms.summer.end)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCouncils.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 mb-4">
              <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-stone-900 mb-2">No councils found</h3>
            <p className="text-stone-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>

      {/* Email Signup Section */}
      <section className="bg-stone-900 text-white py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl mb-4">Never Miss a School Holiday</h2>
          <p className="text-stone-400 mb-8">
            Get term date reminders straight to your inbox. We'll notify you before each half term 
            and holiday starts.
          </p>
          
          {submitted ? (
            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-6">
              <svg className="w-12 h-12 text-green-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-green-400 font-medium">You're all set! We'll send you reminders before each break.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-4 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-stone-900 font-semibold rounded-xl transition-colors"
              >
                Get Reminders
              </button>
            </form>
          )}
          
          <p className="text-xs text-stone-500 mt-4">
            Free forever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-100 border-t border-stone-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-stone-900 mb-3">About</h4>
              <p className="text-sm text-stone-600">
                UK School Term Dates helps parents find official school term dates for any 
                council in England, Scotland, Wales, and Northern Ireland.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-stone-900 mb-3">Popular Areas</h4>
              <ul className="space-y-2 text-sm text-stone-600">
                <li><Link href="/council/london-westminster" className="hover:text-amber-700">London (Westminster)</Link></li>
                <li><Link href="/council/birmingham" className="hover:text-amber-700">Birmingham</Link></li>
                <li><Link href="/council/manchester" className="hover:text-amber-700">Manchester</Link></li>
                <li><Link href="/council/edinburgh" className="hover:text-amber-700">Edinburgh</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-stone-900 mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-stone-600">
                <li><a href="#" className="hover:text-amber-700">Term Date Calculator</a></li>
                <li><a href="#" className="hover:text-amber-700">Holiday Planning Guide</a></li>
                <li><a href="#" className="hover:text-amber-700">Add to Calendar</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-200 mt-8 pt-8 text-center text-sm text-stone-500">
            © {new Date().getFullYear()} UK School Term Dates. Data sourced from official council websites.
          </div>
        </div>
      </footer>
    </main>
  );
}
