export interface Candidate {
  id: string;
  name: string;
  party: 'Democrat' | 'Republican' | 'Independent';
  image: string;
  currentPosition: string;
  website: string;
  twitter: string;
  fundraising: {
    total: number;
    lastQuarter: number;
    averageDonation: number;
    donorCount: number;
  };
  endorsements: string[];
  keyIssues: string[];
}

export interface Poll {
  date: string;
  pollster: string;
  sampleSize: number;
  marginOfError: number;
  results: Record<string, number>;
}

export interface Race {
  id: string;
  state: string;
  district?: string;
  type: 'Senate' | 'House';
  date: string;
  status: 'Toss-up' | 'Lean D' | 'Lean R' | 'Likely D' | 'Likely R';
  candidates: Candidate[];
  polls: Poll[];
  turnoutProjection: number;
  keyIssues: string[];
  sentiment: {
    candidate: string;
    score: number;
    trend: 'up' | 'down' | 'stable';
    sources: number;
  }[];
}

export const races: Race[] = [
  {
    id: 'az-sen-2026',
    state: 'Arizona',
    type: 'Senate',
    date: '2026-11-03',
    status: 'Toss-up',
    turnoutProjection: 68,
    keyIssues: ['Immigration', 'Water Rights', 'Economy'],
    candidates: [
      {
        id: 'ruben-gallego',
        name: 'Ruben Gallego',
        party: 'Democrat',
        image: '/candidates/gallego.jpg',
        currentPosition: 'U.S. Representative',
        website: 'https://gallegoforarizona.com',
        twitter: '@RubenGallego',
        fundraising: {
          total: 12400000,
          lastQuarter: 3200000,
          averageDonation: 47,
          donorCount: 68000
        },
        endorsements: ['SEIU', 'Sierra Club', 'Phoenix Mayor'],
        keyIssues: ['Healthcare Access', 'Border Security', 'Climate Action']
      },
      {
        id: 'kari-lake',
        name: 'Kari Lake',
        party: 'Republican',
        image: '/candidates/lake.jpg',
        currentPosition: 'Former News Anchor',
        website: 'https://karilake.com',
        twitter: '@KariLake',
        fundraising: {
          total: 15800000,
          lastQuarter: 4100000,
          averageDonation: 52,
          donorCount: 72000
        },
        endorsements: ['AZ GOP', 'National Rifle Association', 'Border Patrol Union'],
        keyIssues: ['Border Security', 'Election Integrity', 'Economy']
      }
    ],
    polls: [
      {
        date: '2026-02-10',
        pollster: 'Emerson College',
        sampleSize: 1200,
        marginOfError: 2.8,
        results: { 'ruben-gallego': 47, 'kari-lake': 49, 'undecided': 4 }
      },
      {
        date: '2026-02-05',
        pollster: 'Marist Poll',
        sampleSize: 1050,
        marginOfError: 3.1,
        results: { 'ruben-gallego': 48, 'kari-lake': 48, 'undecided': 4 }
      },
      {
        date: '2026-01-28',
        pollster: 'Data for Progress',
        sampleSize: 890,
        marginOfError: 3.3,
        results: { 'ruben-gallego': 46, 'kari-lake': 50, 'undecided': 4 }
      },
      {
        date: '2026-01-15',
        pollster: 'Suffolk University',
        sampleSize: 1100,
        marginOfError: 2.9,
        results: { 'ruben-gallego': 47, 'kari-lake': 49, 'undecided': 4 }
      }
    ],
    sentiment: [
      { candidate: 'ruben-gallego', score: 62, trend: 'up', sources: 847 },
      { candidate: 'kari-lake', score: 58, trend: 'stable', sources: 1243 }
    ]
  },
  {
    id: 'pa-sen-2026',
    state: 'Pennsylvania',
    type: 'Senate',
    date: '2026-11-03',
    status: 'Lean D',
    turnoutProjection: 71,
    keyIssues: ['Manufacturing Jobs', 'Fracking', 'Education'],
    candidates: [
      {
        id: 'john-fetterman',
        name: 'John Fetterman',
        party: 'Democrat',
        image: '/candidates/fetterman.jpg',
        currentPosition: 'U.S. Senator (Incumbent)',
        website: 'https://johnfetterman.com',
        twitter: '@JohnFetterman',
        fundraising: {
          total: 18200000,
          lastQuarter: 4500000,
          averageDonation: 38,
          donorCount: 95000
        },
        endorsements: ['AFL-CIO', 'Pennsylvania Democratic Party', 'Gov. Josh Shapiro'],
        keyIssues: ['Union Jobs', 'Healthcare', 'Criminal Justice Reform']
      },
      {
        id: 'dave-mccormick',
        name: 'Dave McCormick',
        party: 'Republican',
        image: '/candidates/mccormick.jpg',
        currentPosition: 'Former CEO',
        website: 'https://davemccormick.com',
        twitter: '@DaveMcCormickPA',
        fundraising: {
          total: 21500000,
          lastQuarter: 5800000,
          averageDonation: 124,
          donorCount: 48000
        },
        endorsements: ['PA GOP', 'U.S. Chamber of Commerce', 'Veterans Coalition'],
        keyIssues: ['Energy Independence', 'Tax Cuts', 'National Security']
      }
    ],
    polls: [
      {
        date: '2026-02-12',
        pollster: 'Franklin & Marshall',
        sampleSize: 1300,
        marginOfError: 2.7,
        results: { 'john-fetterman': 51, 'dave-mccormick': 45, 'undecided': 4 }
      },
      {
        date: '2026-02-03',
        pollster: 'Quinnipiac',
        sampleSize: 1150,
        marginOfError: 2.9,
        results: { 'john-fetterman': 50, 'dave-mccormick': 46, 'undecided': 4 }
      },
      {
        date: '2026-01-20',
        pollster: 'Muhlenberg College',
        sampleSize: 980,
        marginOfError: 3.1,
        results: { 'john-fetterman': 49, 'dave-mccormick': 47, 'undecided': 4 }
      }
    ],
    sentiment: [
      { candidate: 'john-fetterman', score: 71, trend: 'up', sources: 1432 },
      { candidate: 'dave-mccormick', score: 54, trend: 'down', sources: 892 }
    ]
  },
  {
    id: 'tx-21-2026',
    state: 'Texas',
    district: '21',
    type: 'House',
    date: '2026-11-03',
    status: 'Lean R',
    turnoutProjection: 58,
    keyIssues: ['Healthcare', 'Border Security', 'Education Funding'],
    candidates: [
      {
        id: 'chip-roy',
        name: 'Chip Roy',
        party: 'Republican',
        image: '/candidates/roy.jpg',
        currentPosition: 'U.S. Representative (Incumbent)',
        website: 'https://chiproy.com',
        twitter: '@chiproytx',
        fundraising: {
          total: 4200000,
          lastQuarter: 980000,
          averageDonation: 86,
          donorCount: 28000
        },
        endorsements: ['House Freedom Caucus', 'Texas Right to Life', 'Club for Growth'],
        keyIssues: ['Fiscal Responsibility', 'Border Security', 'Second Amendment']
      },
      {
        id: 'kristin-hook',
        name: 'Kristin Hook',
        party: 'Democrat',
        image: '/candidates/hook.jpg',
        currentPosition: 'Nonprofit Director',
        website: 'https://kristinhook.com',
        twitter: '@KristinHookTX',
        fundraising: {
          total: 3800000,
          lastQuarter: 1100000,
          averageDonation: 42,
          donorCount: 35000
        },
        endorsements: ['Planned Parenthood', 'Texas Democratic Party', 'Austin City Council'],
        keyIssues: ['Public Education', 'Healthcare Access', 'Reproductive Rights']
      }
    ],
    polls: [
      {
        date: '2026-02-08',
        pollster: 'University of Texas',
        sampleSize: 850,
        marginOfError: 3.4,
        results: { 'chip-roy': 51, 'kristin-hook': 46, 'undecided': 3 }
      },
      {
        date: '2026-01-25',
        pollster: 'Texas Politics Project',
        sampleSize: 780,
        marginOfError: 3.5,
        results: { 'chip-roy': 52, 'kristin-hook': 45, 'undecided': 3 }
      }
    ],
    sentiment: [
      { candidate: 'chip-roy', score: 64, trend: 'stable', sources: 621 },
      { candidate: 'kristin-hook', score: 68, trend: 'up', sources: 548 }
    ]
  },
  {
    id: 'ga-06-2026',
    state: 'Georgia',
    district: '06',
    type: 'House',
    date: '2026-11-03',
    status: 'Toss-up',
    turnoutProjection: 64,
    keyIssues: ['Transportation', 'Healthcare', 'Economy'],
    candidates: [
      {
        id: 'lucy-mcbath',
        name: 'Lucy McBath',
        party: 'Democrat',
        image: '/candidates/mcbath.jpg',
        currentPosition: 'U.S. Representative (Incumbent)',
        website: 'https://lucymcbath.com',
        twitter: '@lucymcbath',
        fundraising: {
          total: 5600000,
          lastQuarter: 1400000,
          averageDonation: 51,
          donorCount: 42000
        },
        endorsements: ['Everytown for Gun Safety', 'Emily\'s List', 'Atlanta Mayor'],
        keyIssues: ['Gun Safety', 'Healthcare', 'Infrastructure']
      },
      {
        id: 'rich-mccormick',
        name: 'Rich McCormick',
        party: 'Republican',
        image: '/candidates/mccormick-ga.jpg',
        currentPosition: 'Former Emergency Room Physician',
        website: 'https://richmccormick.com',
        twitter: '@RichforGA',
        fundraising: {
          total: 5200000,
          lastQuarter: 1300000,
          averageDonation: 78,
          donorCount: 34000
        },
        endorsements: ['GA GOP', 'Medical Association of Georgia', 'Veterans Groups'],
        keyIssues: ['Healthcare Reform', 'Lower Taxes', 'Small Business']
      }
    ],
    polls: [
      {
        date: '2026-02-11',
        pollster: 'Atlanta Journal-Constitution',
        sampleSize: 920,
        marginOfError: 3.2,
        results: { 'lucy-mcbath': 49, 'rich-mccormick': 48, 'undecided': 3 }
      },
      {
        date: '2026-01-30',
        pollster: 'InsiderAdvantage',
        sampleSize: 800,
        marginOfError: 3.5,
        results: { 'lucy-mcbath': 48, 'rich-mccormick': 49, 'undecided': 3 }
      }
    ],
    sentiment: [
      { candidate: 'lucy-mcbath', score: 69, trend: 'up', sources: 734 },
      { candidate: 'rich-mccormick', score: 61, trend: 'stable', sources: 612 }
    ]
  },
  {
    id: 'nc-sen-2026',
    state: 'North Carolina',
    type: 'Senate',
    date: '2026-11-03',
    status: 'Toss-up',
    turnoutProjection: 66,
    keyIssues: ['Healthcare', 'Education', 'Economy'],
    candidates: [
      {
        id: 'jeff-jackson',
        name: 'Jeff Jackson',
        party: 'Democrat',
        image: '/candidates/jackson.jpg',
        currentPosition: 'U.S. Representative',
        website: 'https://jeffjacksonnc.com',
        twitter: '@JeffJacksonNC',
        fundraising: {
          total: 14800000,
          lastQuarter: 3800000,
          averageDonation: 44,
          donorCount: 82000
        },
        endorsements: ['NC Democratic Party', 'Veterans Coalition', 'Charlotte Mayor'],
        keyIssues: ['Teacher Pay', 'Healthcare Access', 'Infrastructure']
      },
      {
        id: 'mark-robinson',
        name: 'Mark Robinson',
        party: 'Republican',
        image: '/candidates/robinson.jpg',
        currentPosition: 'Lt. Governor',
        website: 'https://markrobinson.com',
        twitter: '@markrobinson',
        fundraising: {
          total: 16200000,
          lastQuarter: 4200000,
          averageDonation: 67,
          donorCount: 71000
        },
        endorsements: ['NC GOP', 'NRA', 'Faith Leaders Coalition'],
        keyIssues: ['Second Amendment', 'School Choice', 'Economic Growth']
      }
    ],
    polls: [
      {
        date: '2026-02-13',
        pollster: 'Elon University',
        sampleSize: 1150,
        marginOfError: 2.9,
        results: { 'jeff-jackson': 49, 'mark-robinson': 48, 'undecided': 3 }
      },
      {
        date: '2026-02-06',
        pollster: 'Civitas',
        sampleSize: 1050,
        marginOfError: 3.0,
        results: { 'jeff-jackson': 47, 'mark-robinson': 49, 'undecided': 4 }
      },
      {
        date: '2026-01-22',
        pollster: 'High Point University',
        sampleSize: 980,
        marginOfError: 3.1,
        results: { 'jeff-jackson': 48, 'mark-robinson': 48, 'undecided': 4 }
      }
    ],
    sentiment: [
      { candidate: 'jeff-jackson', score: 73, trend: 'up', sources: 1124 },
      { candidate: 'mark-robinson', score: 56, trend: 'down', sources: 983 }
    ]
  }
];
