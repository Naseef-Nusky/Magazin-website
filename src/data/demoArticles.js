const img = (id, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const categories = [
  { _id: 'cat-news', title: 'News', slug: 'news' },
  { _id: 'cat-politics', title: 'Politics', slug: 'politics' },
  { _id: 'cat-opinion', title: 'Opinion', slug: 'opinion' },
  { _id: 'cat-culture', title: 'Culture', slug: 'culture' },
  { _id: 'cat-money', title: 'Money', slug: 'money' },
  { _id: 'cat-sport', title: 'Sport', slug: 'sport' },
  { _id: 'cat-world', title: 'World', slug: 'world' },
  { _id: 'cat-life', title: 'Life', slug: 'life' },
]

export const authors = [
  { _id: 'auth-1', name: 'Vicky Spratt', slug: 'vicky-spratt' },
  { _id: 'auth-2', name: 'Gerard Gilbert', slug: 'gerard-gilbert' },
  { _id: 'auth-3', name: 'Maya Chen', slug: 'maya-chen' },
  { _id: 'auth-4', name: 'James Okonkwo', slug: 'james-okonkwo' },
  { _id: 'auth-5', name: 'Sara Patel', slug: 'sara-patel' },
]

export const articles = [
  {
    _id: 'a1',
    title: 'Leaked memo suggests WASPI women will miss out on compensation entirely',
    slug: 'waspi-women-compensation-memo',
    excerpt:
      'Documents seen by Magazin raise fresh doubts over whether women born in the 1950s will receive any redress for state pension age changes.',
    mainImage: {
      url: img('photo-1529107386315-e1a2ed48a620', 1200),
      alt: 'Protesters gathering outside government buildings',
    },
    category: categories[1],
    author: authors[3],
    publishedAt: '2024-11-23T08:00:00Z',
    featured: false,
    isLead: true,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'A confidential briefing circulated inside Whitehall suggests ministers are preparing to abandon a long-promised compensation scheme for women affected by the raising of the state pension age.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Campaigners said the revelation would be a “bitter betrayal” after years of lobbying. The government has not commented formally.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a2',
    title: 'Jeremy Hunt not helping first-time buyers is a blessing in disguise',
    slug: 'first-time-buyers-blessing',
    excerpt: 'Why cooling the housing market may help more than another stamp-duty tweak.',
    mainImage: {
      url: img('photo-1560518883-ce09059eeffa', 600),
      alt: 'Hand holding a miniature house model',
    },
    category: categories[2],
    author: authors[0],
    publishedAt: '2024-11-23T07:30:00Z',
    featured: true,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Another Budget without a silver bullet for first-time buyers feels disappointing — until you look at what those schemes actually buy.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a3',
    title: 'I pay more attention to my phone than my family – can I be cured?',
    slug: 'phone-attention-family',
    excerpt: 'A writer tries a digital detox after realising screens had taken over dinner.',
    mainImage: {
      url: img('photo-1512941937669-90a1b58e7e9c', 600),
      alt: 'Woman looking at a smartphone',
    },
    category: categories[7],
    author: authors[2],
    publishedAt: '2024-11-22T18:00:00Z',
    featured: true,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The experiment started with a simple rule: no phones at the table. It lasted eleven minutes.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a4',
    title: 'The BBC should have scrapped Top Gear eight years ago',
    slug: 'bbc-top-gear-scrapped',
    excerpt: 'Nostalgia cannot paper over a format that has run out of road.',
    mainImage: {
      url: img('photo-1492144534655-ae79c964c9d7', 600),
      alt: 'Classic sports car on a road',
    },
    category: categories[3],
    author: authors[1],
    publishedAt: '2024-11-22T16:00:00Z',
    featured: true,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Formats have a half-life. Top Gear’s expired long before the latest reboot arrived.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a5',
    title: 'Cabinet split grows over winter fuel payment cuts',
    slug: 'cabinet-winter-fuel',
    excerpt: 'Senior figures urge a rethink ahead of the coldest months.',
    mainImage: {
      url: img('photo-1486312338219-ce68d2c6f44d', 400),
      alt: 'Person working on a laptop',
    },
    category: categories[1],
    author: authors[4],
    publishedAt: '2024-11-23T06:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Pressure is mounting on Downing Street after two cabinet ministers privately questioned the scale of the winter fuel cutbacks.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a6',
    title: 'Met Office issues amber warning as storms approach the South East',
    slug: 'amber-warning-storms',
    excerpt: 'Travel disruption expected across rail and road networks.',
    mainImage: {
      url: img('photo-1527482797697-8795b05a13fe', 600),
      alt: 'Storm clouds over the landscape',
    },
    category: categories[0],
    author: authors[3],
    publishedAt: '2024-11-23T05:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Forecasters say winds of up to 70mph could hit coastal areas overnight.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a7',
    title: 'Ceasefire talks resume as aid convoys wait at the border',
    slug: 'ceasefire-talks-aid',
    excerpt: 'Diplomats gather for a third round of negotiations.',
    mainImage: {
      url: img('photo-1532375810709-75b1da00537c', 1200),
      alt: 'Aid trucks near a border checkpoint',
    },
    category: categories[6],
    author: authors[2],
    publishedAt: '2024-11-22T22:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Humanitarian agencies say supplies are ready to move the moment a corridor is agreed.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a8',
    title: 'MPs clash over new planning reforms for green-belt towns',
    slug: 'planning-reforms-green-belt',
    excerpt: 'Local councils warn of overcrowded services if targets rise.',
    mainImage: {
      url: img('photo-1486406146926-c627a92ad1ab', 600),
      alt: 'Town houses and suburban streets',
    },
    category: categories[1],
    author: authors[4],
    publishedAt: '2024-11-22T14:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The bill would give ministers new powers to override local objections on major housing schemes.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a9',
    title: 'Hospital waiting lists edge lower for a third month',
    slug: 'hospital-waiting-lists',
    excerpt: 'Health chiefs caution that winter pressures could reverse gains.',
    mainImage: {
      url: img('photo-1516549655169-df83a0774514', 600),
      alt: 'Hospital corridor',
    },
    category: categories[0],
    author: authors[3],
    publishedAt: '2024-11-22T12:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Official figures show a modest fall in the number of patients waiting longer than 18 weeks.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a10',
    title: 'Live: Markets react as inflation figures land',
    slug: 'live-markets-inflation',
    excerpt: 'Pound and gilt yields move as traders digest the latest CPI print.',
    mainImage: {
      url: img('photo-1611974789855-9c2a0a7236a3', 600),
      alt: 'Stock market charts on a screen',
    },
    category: categories[4],
    author: authors[4],
    publishedAt: '2024-11-23T09:15:00Z',
    featured: false,
    isLead: false,
    isLive: true,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Follow live updates as the City digests inflation data and signals from the Bank of England.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a11',
    title: 'Channel crossings fall but small-boat arrivals still high for November',
    slug: 'channel-crossings-november',
    excerpt: 'Home Office data shows a seasonal drop that remains above the five-year average.',
    mainImage: {
      url: img('photo-1507525428034-b723cf961d3e', 600),
      alt: 'Sea and coastline',
    },
    category: categories[0],
    author: authors[3],
    publishedAt: '2024-11-21T10:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Officials attributed the fall partly to weather, while charities urged more safe routes.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a12',
    title: 'Virgin Atlantic flight diverted after mid-air medical emergency',
    slug: 'virgin-atlantic-diverted',
    excerpt: 'Passengers praised crew after an unscheduled landing in Shannon.',
    mainImage: {
      url: img('photo-1436491865332-7a61a109cc05', 600),
      alt: 'Airplane wing above clouds',
    },
    category: categories[0],
    author: authors[2],
    publishedAt: '2024-11-21T08:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The airline confirmed a passenger received medical attention on the ground and the flight later continued.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a13',
    title: 'Weekend weather: sharp frost then a milder Atlantic front',
    slug: 'weekend-weather-frost',
    excerpt: 'Gardeners warned to protect tender plants overnight.',
    mainImage: {
      url: img('photo-1491002052546-bf38f186af56', 600),
      alt: 'Frosty landscape at dawn',
    },
    category: categories[0],
    author: authors[4],
    publishedAt: '2024-11-20T17:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Temperatures could dip to −4C in rural areas before rain arrives from the west on Sunday.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a14',
    title: 'Farage under pressure as Reform faces local candidate row',
    slug: 'farage-reform-candidate-row',
    excerpt: 'Party sources insist the selection process remains unchanged.',
    mainImage: {
      url: img('photo-1529107386315-e1a2ed48a620', 600),
      alt: 'Political rally crowd',
    },
    category: categories[1],
    author: authors[0],
    publishedAt: '2024-11-20T11:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The dispute centres on whether headquarters overrode a local shortlist in a key target seat.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a15',
    title: 'Premier League clubs agree new broadcast window for midweek fixtures',
    slug: 'premier-league-broadcast-window',
    excerpt: 'Fans’ groups welcome clearer kick-off times for away supporters.',
    mainImage: {
      url: img('photo-1574629810360-7efbbe195018', 600),
      alt: 'Football stadium lights',
    },
    category: categories[5],
    author: authors[1],
    publishedAt: '2024-11-19T20:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The deal locks midweek starts into a narrower band to ease travel for supporters.',
          },
        ],
      },
    ],
  },
  {
    _id: 'a16',
    title: 'Why the next Budget should tax wealth, not just work',
    slug: 'budget-tax-wealth',
    excerpt: 'A fairer tax base starts with assets that have sailed through the last decade untroubled.',
    mainImage: {
      url: img('photo-1554224155-6726b3ff858f', 600),
      alt: 'Coins and calculator',
    },
    category: categories[2],
    author: authors[4],
    publishedAt: '2024-11-18T09:00:00Z',
    featured: true,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Income tax has done the heavy lifting for too long.' }],
      },
    ],
  },
  {
    _id: 'a17',
    title: 'The quiet brilliance of regional theatre seasons nobody streams',
    slug: 'regional-theatre-seasons',
    excerpt: 'Away from the West End, repertory houses are taking bigger risks — and filling seats.',
    mainImage: {
      url: img('photo-1503095396549-807759245b35', 600),
      alt: 'Theatre stage lights',
    },
    category: categories[3],
    author: authors[1],
    publishedAt: '2024-11-17T15:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'If you only follow London openings, you are missing half the story.' }],
      },
    ],
  },
  {
    _id: 'a18',
    title: 'A debut novel that turns the commute into a thriller',
    slug: 'debut-novel-commute-thriller',
    excerpt: 'Critics are already talking Booker — readers just want the next chapter.',
    mainImage: {
      url: img('photo-1512820790803-83ca734da794', 600),
      alt: 'Open book',
    },
    category: categories[3],
    author: authors[2],
    publishedAt: '2024-11-16T12:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Set mostly between Zone 2 and Zone 6, the plot never leaves the carriage.' }],
      },
    ],
  },
  {
    _id: 'a19',
    title: 'Sterling steadies after jobs data beats forecasts',
    slug: 'sterling-jobs-data',
    excerpt: 'Traders pared bets on an early rate cut as wage growth cooled less than expected.',
    mainImage: {
      url: img('photo-1611974789855-9c2a0a7236a3', 600),
      alt: 'Stock market charts',
    },
    category: categories[4],
    author: authors[4],
    publishedAt: '2024-11-22T10:30:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'The pound rose against both the dollar and the euro in morning trade.' }],
      },
    ],
  },
  {
    _id: 'a20',
    title: 'Startup valuations cool as venture funds demand real revenue',
    slug: 'startup-valuations-cool',
    excerpt: 'Founders are rewriting pitch decks around cash flow, not headcount.',
    mainImage: {
      url: img('photo-1556761175-5973dc0f32e7', 600),
      alt: 'Office meeting',
    },
    category: categories[4],
    author: authors[3],
    publishedAt: '2024-11-15T08:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'The party for growth-at-all-costs is over, investors say.' }],
      },
    ],
  },
  {
    _id: 'a21',
    title: 'England women open Nations League campaign with hard-fought win',
    slug: 'england-women-nations-league',
    excerpt: 'A late header settles a tense night in front of a sold-out crowd.',
    mainImage: {
      url: img('photo-1522778119026-d647f0596c20', 600),
      alt: 'Football match action',
    },
    category: categories[5],
    author: authors[3],
    publishedAt: '2024-11-18T21:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'The Lionesses stay top of their group after three matches.' }],
      },
    ],
  },
  {
    _id: 'a22',
    title: 'Hamilton hints at one more season as retirement talk grows',
    slug: 'hamilton-one-more-season',
    excerpt: 'The seven-time champion says he still “feels the fire” after a difficult year.',
    mainImage: {
      url: img('photo-1568605117036-5fe5e7bab0b7', 600),
      alt: 'Formula One car',
    },
    category: categories[5],
    author: authors[0],
    publishedAt: '2024-11-14T16:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Team bosses insist no decision has been made on contracts beyond next year.' }],
      },
    ],
  },
  {
    _id: 'a23',
    title: 'Tokyo voters push back against high-rise waterfront plans',
    slug: 'tokyo-waterfront-plans',
    excerpt: 'Local groups say new towers would erase communities rebuilt after the war.',
    mainImage: {
      url: img('photo-1540959733332-eab4deabeeaf', 600),
      alt: 'Tokyo skyline',
    },
    category: categories[6],
    author: authors[2],
    publishedAt: '2024-11-19T07:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'City hall has opened a short consultation period after protests grew.' }],
      },
    ],
  },
  {
    _id: 'a24',
    title: 'Drought in the Horn of Africa deepens food emergency',
    slug: 'horn-of-africa-drought',
    excerpt: 'Aid agencies warn that delayed rains have left millions without reliable harvests.',
    mainImage: {
      url: img('photo-1489392191049-fc10c97e64b6', 600),
      alt: 'Dry landscape',
    },
    category: categories[6],
    author: authors[3],
    publishedAt: '2024-11-13T11:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Funding gaps mean some feeding programmes have already been cut.' }],
      },
    ],
  },
  {
    _id: 'a25',
    title: 'The four-day week experiment that staff refuse to give back',
    slug: 'four-day-week-experiment',
    excerpt: 'A year on, productivity held — and burnout scores fell.',
    mainImage: {
      url: img('photo-1499750310107-5fef28a66643', 600),
      alt: 'Person working outdoors with laptop',
    },
    category: categories[7],
    author: authors[2],
    publishedAt: '2024-11-12T09:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Managers who feared lost output say meetings simply got shorter.' }],
      },
    ],
  },
  {
    _id: 'a26',
    title: 'How to cook one-pan dinners without eating the same thing twice',
    slug: 'one-pan-dinners',
    excerpt: 'A simple rotation of sauces keeps weeknights interesting.',
    mainImage: {
      url: img('photo-1546069901-ba9599a7e63c', 600),
      alt: 'Colourful meal bowl',
    },
    category: categories[7],
    author: authors[4],
    publishedAt: '2024-11-11T18:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Start with a base, change the finishing flavour, and you get seven dinners from three trays.' }],
      },
    ],
  },
  {
    _id: 'a27',
    title: 'Sleep scientists say your “second wind” at midnight is a trap',
    slug: 'second-wind-midnight-trap',
    excerpt: 'That burst of alertness after 11pm is your body clock misfiring — not productivity.',
    mainImage: {
      url: img('photo-1541781774459-bb2af2f05b55', 600),
      alt: 'Bedroom at night',
    },
    category: categories[7],
    author: authors[0],
    publishedAt: '2024-11-10T20:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Dim the lights earlier, they advise, and protect the morning instead.' }],
      },
    ],
  },
  {
    _id: 'a28',
    title: 'Council by-election results signal trouble for the governing party',
    slug: 'council-by-election-trouble',
    excerpt: 'Opposition gains in three northern seats tighten the parliamentary arithmetic.',
    mainImage: {
      url: img('photo-1541872703-74c5e44368f9', 600),
      alt: 'Ballot box',
    },
    category: categories[1],
    author: authors[4],
    publishedAt: '2024-11-09T22:00:00Z',
    featured: false,
    isLead: false,
    isLive: false,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: 'Turnout was higher than usual for mid-term contests.' }],
      },
    ],
  },
]

export const navCategories = [
  'News',
  'Politics',
  'Opinion',
  'Culture',
  'Money',
  'Sport',
  'World',
  'Life',
]
