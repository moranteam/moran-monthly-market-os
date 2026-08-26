const domains: Record<string, string> = {
  natera: 'natera.com',
  ucsf: 'ucsf.edu',
  neuralink: 'neuralink.com',
  'mbc biolabs': 'mbcbiolabs.com',
  color: 'color.com',
  applovin: 'applovin.com',
  upstart: 'upstart.com',
  confluent: 'confluent.io',
  'x.ai': 'x.ai',
  xai: 'x.ai',
  grail: 'grail.com',
  coinbase: 'coinbase.com',
  openai: 'openai.com',
  uber: 'uber.com',
  nvidia: 'nvidia.com',
  google: 'google.com',
  dropbox: 'dropbox.com',
  kkr: 'kkr.com',
  novartis: 'novartis.com',
  'tishman speyer': 'tishmanspeyer.com',
  tishman: 'tishmanspeyer.com',
  divcowest: 'divcowest.com',
  'kilroy realty corp.': 'kilroyrealty.com',
  kilroy: 'kilroyrealty.com',
  jpm: 'jpmorganchase.com',
  jpmorgan: 'jpmorganchase.com',
  cbre: 'cbre.com',
  cbreim: 'cbre.com',
  cbrei: 'cbre.com',
  alexandria: 'are.com',
  are: 'are.com',
  gladstone: 'gladstone.org',
  'y combinator': 'ycombinator.com',
  'andreessen horowitz': 'a16z.com',
  a16z: 'a16z.com',
  lightspeed: 'lsvp.com',
  sequoia: 'sequoiacap.com',
  clickhouse: 'clickhouse.com',
  pitchbook: 'pitchbook.com',
  crunchbase: 'crunchbase.com',
  visa: 'visa.com',
  lyft: 'lyft.com',
  lumen: 'lumen.com',
  warriors: 'nba.com',
  'golden state warriors': 'nba.com',
  'sf giants': 'mlb.com',
  giants: 'mlb.com',
  'generation lab': 'generationlab.com',
}

const aliases: Record<string, string> = {
  'ucsf (acquired from are / cbreim)': 'ucsf',
  'sf giants / tishman speyer jv': 'tishman speyer',
  'kilroy realty corp.': 'kilroy',
  'mbc biolabs': 'mbc biolabs',
  'color genomics': 'color',
  'x.ai': 'x.ai',
  'tishman studios': 'tishman',
  'tishman speyer': 'tishman speyer',
  'alexandria real estate': 'are',
  'golden state warriors': 'warriors',
}

export const coverMarks = [
  'CBRE',
  'Novartis',
  'OpenAI',
  'Coinbase',
  'Uber',
  'NVIDIA',
  'UCSF',
  'Tishman Speyer',
  'Kilroy',
  'Google',
  'Natera',
  'AppLovin',
]

export function markKey(name: string) {
  const trimmed = name.trim().toLowerCase()
  return aliases[trimmed] ?? trimmed
}

export function markDomain(name: string) {
  return domains[markKey(name)] ?? null
}

export function markLetter(name: string) {
  const cleaned = name.replace(/[^A-Za-z0-9&]/g, '')
  return (cleaned[0] ?? '?').toUpperCase()
}

export function markNames(name: string) {
  return name
    .split(/\s+(?:\/|\+|and|&)\s+|,\s+/)
    .map((part) => part.trim())
    .filter((part) => part.length > 1 && !/^\d/.test(part))
}

export function logoSources(domain: string) {
  return [
    `https://logo.clearbit.com/${domain}`,
    `https://cdn.brandfetch.io/${domain}/w/64/h/64/fallback/lettermark`,
  ]
}
