export type FactFormat =
  | 'percent'
  | 'percentImproved'
  | 'percentYoY'
  | 'sf'
  | 'ksf'
  | 'msf1'
  | 'msfRaw'
  | 'usd'
  | 'usdM'
  | 'usdB'
  | 'nnn'
  | 'fsg'
  | 'count'
  | 'text'
  | 'wsf'

export type Occupancy = 'leased' | 'vacant' | 'partial'

export type VacantShellRole = 'overbuild' | 'contrast'

export type FactDelta = 'up' | 'down' | 'flat'

export type Accent = 'cryo' | 'copper' | 'gold' | 'paper'

export type PropertyKind = 'life-science' | 'office' | 'institutional'

export type RentBasis = 'NNN' | 'FSG'

export type RentPeriod = 'monthly' | 'annual'

export type MapLayer =
  | 'bay'
  | 'corridor'
  | 'silicon-valley'
  | 'peninsula'
  | 'leasing'
  | 'funding'
  | 'mission-bay'
  | 'inventory'
  | 'power'
  | 'thesis'
  | 'office'
  | 'product'
  | 'talent'
  | 'compression'
  | 'markets'
  | 'rnd'
  | 'exploding'

export type ModeId = 'present' | 'twin' | 'share'

export type LensId = 'occupier' | 'owner' | 'lender'

export type Vintage = 'market' | 'power' | 'talent'

export type SpineId = 'bay' | 'mission-bay' | 'south-sf' | 'peninsula' | 'silicon-valley'

export type Fact = {
  id: string
  label: string
  value: number | string | null
  format: FactFormat
  delta?: FactDelta
  source?: string
  placeholder?: boolean
  approximate?: boolean
  digits?: number
  note?: string
  vintage?: Vintage
  asOf?: string
  rentPeriod?: RentPeriod
  rentBasis?: RentBasis
}

export type Source = {
  id: string
  name: string
  note: string
}

export type Corridor = {
  id: string
  index: number
  name: string
  city: string
  lng: number
  lat: number
  zoom: number
  pitch: number
  bearing: number
  accent: Accent
  thesis: string
  signal: string
}

export type Submarket = {
  id: string
  name: string
  lng: number
  lat: number
  nraSf: number
  vacancyPct: number
  availabilityPct: number
  askingNnn: number
  q4AbsorptionSf: number
  ytdAbsorptionSf: number
  callout: string
}

export type Property = {
  id: string
  name: string
  address: string
  city: string
  corridor: string
  lng: number
  lat: number
  propertySf: number | null
  owner: string | null
  kind: PropertyKind
  photoUrl: string
  photoAlt: string
  thesis: string
  occupancy?: Occupancy
  occupancyPct?: number | null
  askingRent?: number | null
  askingBasis?: RentBasis | null
  askingPeriod?: RentPeriod
  floorLoadLbs?: number | null
  allElectric?: boolean
}

export type CompSet =
  | 'ls-new'
  | 'pen-office'
  | 'mb-office'
  | 'sv-office'
  | 'sf-office'
  | 'oak-office'
  | 'oak-rnd'
  | 'sv-rnd'

export type Comp = {
  id: string
  propertyId: string | null
  tenant: string
  index: number
  set: CompSet
  leaseType: string
  areaLeasedSf: number
  areaLeasedNote?: string
  address?: string | null
  city?: string | null
  propertySf: number | null
  rent: number | null
  rentBasis: RentBasis | null
  rentPeriod?: RentPeriod
  approximateSf?: boolean
  approximateRent?: boolean
  escalationsPct: number | null
  tia: string | null
  term: string | null
  freeRent: string | null
  owner: string | null
  signDate: string | null
  signDateLabel: string | null
  confidential: boolean
  presentationOnly?: boolean
  notes: string | null
  source: string
  cbreDeal?: boolean
}

export type NamedRound = {
  id: string
  company: string
  amountUsd: number
  round: string
  city: string
  corridor: string
  lng: number
  lat: number
  note: string
}

export type Investor = {
  id: string
  name: string
}

export type FundingChartItem = {
  label: string
  factId: string
  supportFactId?: string
  supportSuffix?: string
}

export type FundingChart = {
  id: string
  title: string
  subtitle: string
  kind: 'named' | 'placeholder' | 'measured'
  placeholder: boolean
  placeholderLabel?: string
  source: string
  items?: FundingChartItem[]
}

export type DemandStack = {
  id: string
  market: string
  product: string
  msfFact: string
  reqsFact: string | null
  mixFact: string
  mixLabel: string
  note?: string
}

export type LifeScienceMarket = {
  id: string
  name: string
  inventoryFact: string
  vacancyFact: string
  rentFact: string
}

export type CaseStudy = {
  id: string
  propertyId: string
  hed: string
  dek: string
  factId: string
}

export type MissionBayCopy = {
  thesis: string
  dek: string
  overflow: string
  walkShed: { popLabel: string; medHh: string; whiteCollarPct: number }
  annotations: { id: string; label: string; line: string }[]
  buildings: { office: number; lifeScience: number; hybrid: number; hybridName: string }
  timeline: { id: string; year: string; line: string }[]
  named: string[]
  pinPropertyIds: string[]
}

export type PowerBenchmark = {
  id: string
  label: string
  wsf: number
  unit: string
  note: string
}

export type HighPoweredSpec = {
  hed: string
  asOf: string
  source: string
  minWsf: number
  prefer: string
  backupMinPct: number
  parking: string
  lines: string[]
  benchmarks: PowerBenchmark[]
}

export type ProductSpec = {
  thesis: string
  asOf: string
  shared: string[]
  lsOnly: string[]
  aiOffice: { hed: string; lines: string[] }
  aiRnd: { hed: string; lines: string[] }
  blueprint: string
  highPowered: HighPoweredSpec
  deepTech: string
}

export type VacantShell = {
  id: string
  name: string
  sf: number | null
  occupancyPct: number
  asking: number | null
  role: VacantShellRole
  city?: string
  address?: string
  note?: string
}

export type AiLeaseNode = {
  id: string
  name: string
  companies: number
  sf: number
}

export type ThesisCopy = {
  thesis: string
  dek: string
  proofHed: string
  proofLines: string[]
}

export type DemandBand = {
  id: string
  label: string
  sharePct: number | null
  placeholder: boolean
  note: string
}

export type ProductConstraint = {
  id: string
  name: string
  line: string
}

export type ChatterItem = {
  id: string
  propertyId?: string
  hed: string
  dek: string
  date: string
  dateLabel: string
  corridor: string
  marks?: string[]
}

export type DecisionFrame = {
  id: string
  role: string
  question: string
  line: string
}

export type SceneDef = {
  id: string
  number: string
  title: string
  kicker: string
  map: MapLayer
  veil: number
  spine: SpineId
  navTitle?: string
  navThesis?: string
}

export type LensDef = {
  id: LensId
  label: string
  lead: string
  present: string[]
  takeaways: Record<string, string>
}

export type Snapshot = {
  meta: {
    title: string
    kicker: string
    asOfLabel: string
    researchNote: string
    marketAsOf: string
    marketAsOfLabel: string
    powerAsOf: string
    powerAsOfLabel: string
    powerFreshness: string
    brand: {
      team: string
      firm: string
      practice: string
    }
    sources: Source[]
    disclaimer: string
  }
  facts: Record<string, Fact>
  corridors: Corridor[]
  submarkets: Submarket[]
  properties: Property[]
  comps: Comp[]
  funding: {
    thesis: string
    namedRounds: NamedRound[]
    investors: Investor[]
    charts: FundingChart[]
  }
  demand: {
    thesis: string
    asOf: string
    stacks: DemandStack[]
    products: ProductConstraint[]
    seeking100kFact: string
    annualLeasingFact: string
  }
  lifeScienceMarkets: LifeScienceMarket[]
  missionBay: MissionBayCopy
  productSpec: ProductSpec
  vacantShells: VacantShell[]
  thesis: ThesisCopy
  talent: {
    thesis: string
    asOf: string
    aiLeaseNodes: AiLeaseNode[]
  }
  cases: CaseStudy[]
  chatter: ChatterItem[]
  power: {
    thesis: string
    namedPropertyIds: string[]
    constellation: { id: string; tier: string; label: string }[]
  }
  decisions: DecisionFrame[]
  scenes: SceneDef[]
  previous: Record<string, number>
  lenses: Record<LensId, LensDef>
  modes: {
    present: string[]
    share: string[]
    leaveBehind?: string[]
  }
  markets: MarketGeo[]
  sfSubmarkets: SfSubmarket[]
  svRndSubmarkets: SvRndSubmarket[]
  peninsulaOfficeSubmarkets: Q2Submarket[]
  svOfficeSubmarkets: Q2Submarket[]
  oaklandOfficeSubmarkets: Q2Submarket[]
  oaklandRndSubmarkets: Q2Submarket[]
  svRndPipeline: NamedPipeline[]
}

export type MarketGeo = {
  id: string
  name: string
  short: string
  role: 'core' | 'growth'
  color: string
  lng: number
  lat: number
  calloutDx: number
  calloutDy: number
  officeVacFact: string
  officeAskFact: string
  officeAbsFact: string
  rndVacFact: string | null
  rndAskFact: string | null
  rndAbsFact: string | null
  lsVacFact: string | null
  line: string
}

export type NamedPipeline = {
  id: string
  name: string
  sf: number
  place: string
}

export type SfSubmarket = {
  id: string
  name: string
  vacancyPct: number
  askingAnnual: number
  absSf: number
  note?: string
}

export type SvRndSubmarket = {
  id: string
  name: string
  nraSf: number
  vacancyPct: number
  askingNnn: number
  q2AbsSf: number
  ytdAbsSf: number
  ucSf: number
  deliveredSf: number
  note?: string
}

export type Q2Submarket = {
  id: string
  name: string
  nraSf: number
  vacancyPct: number
  asking: number
  askingBasis: RentBasis
  q2AbsSf: number | null
  ucSf?: number
  note?: string
  total?: boolean
}

export type CameraIntent = {
  longitude: number
  latitude: number
  zoom: number
  bearing: number
  pitch: number
}

export type PinKind = 'corridor' | 'submarket' | 'comp' | 'property' | 'round' | 'chatter' | 'power' | 'market'

export type MapPin = {
  id: string
  kind: PinKind
  lng: number
  lat: number
  index?: number
  accent: Accent
  label: string
  sublabel?: string
  fact?: string
  calloutDx?: number
  calloutDy?: number
}
