import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'src/data/snapshot')
const facts = JSON.parse(await readFile(join(dir, 'facts.json'), 'utf8'))

const Q2 = 'Q2 2026'
const src = 'cbre-q2-2026'

function put(id, patch) {
  facts[id] = {
    ...(facts[id] ?? { id }),
    id,
    vintage: 'market',
    source: src,
    asOf: Q2,
    ...patch,
  }
}

put('sfOfficeVacancyPct', {
  label: 'San Francisco office vacancy',
  value: 29.2,
  format: 'percent',
  delta: 'down',
  note: 'Was 36.9% Q3 2024 peak. −120 bps QoQ, −550 bps YoY. First time <30% since Q1 2023.',
})
put('sfOfficeNraSf', { label: 'San Francisco office NRA', value: 90105492, format: 'sf' })
put('sfOfficeInventoryMsf', { label: 'San Francisco office inventory', value: 90.1, format: 'msfRaw' })
put('sfOfficeQ2AbsSf', { label: 'SF office Q2 absorption', value: 963980, format: 'sf', delta: 'up' })
put('sfOfficeYtdAbsSf', { label: 'SF office YTD absorption', value: 3236926, format: 'sf', delta: 'up', note: '7 consecutive quarters. 6.0 msf since the trough.' })
put('sfOfficeAsking', {
  label: 'San Francisco office asking',
  value: 72.96,
  format: 'fsg',
  rentPeriod: 'annual',
  rentBasis: 'FSG',
  note: 'Source $72.96 FSG/YR = $6.08/sf FSG monthly. +2.5% QoQ, +6.2% YoY.',
})
put('sfClassAVacancyPct', { label: 'SF Class A vacancy', value: 28.4, format: 'percent' })
put('sfClassAFsg', { label: 'SF Class A asking', value: 80.28, format: 'fsg', rentPeriod: 'annual', rentBasis: 'FSG' })
put('sfClassBVacancyPct', { label: 'SF Class B vacancy', value: 33.0, format: 'percent' })
put('sfClassBFsg', { label: 'SF Class B asking', value: 54.53, format: 'fsg', rentPeriod: 'annual', rentBasis: 'FSG' })
put('sfClassCVacancyPct', { label: 'SF Class C vacancy', value: 25.6, format: 'percent' })
put('sfClassCFsg', { label: 'SF Class C asking', value: 38.93, format: 'fsg', rentPeriod: 'annual', rentBasis: 'FSG' })
put('sfTimsMsf', { label: 'SF TIMS / requirements', value: 8.9, format: 'msfRaw', note: 'Record. 40% expansion.' })
put('sfTimsExpansionPct', { label: 'SF TIMS expansion share', value: 40, format: 'percent' })
put('sfLeasingQ2Msf', { label: 'SF leasing Q2', value: 2.9, format: 'msfRaw' })
put('sfLeasingYtdMsf', { label: 'SF leasing YTD', value: 7.3, format: 'msfRaw' })
put('sfLeasing2025Msf', { label: 'SF leasing 2025', value: 10.9, format: 'msfRaw' })
put('sfUcSf', { label: 'SF under construction', value: 0, format: 'sf' })
put('sfDeliveriesSf', { label: 'SF deliveries', value: 0, format: 'sf' })

put('penOfficeVacancyPct', { label: 'Peninsula office vacancy', value: 24.9, format: 'percent', delta: 'up' })
put('penOfficeAbsSf', { label: 'Peninsula Q2 absorption', value: -138189, format: 'sf', delta: 'down' })
put('penOfficeFsg', { label: 'Peninsula asking', value: 7.21, format: 'fsg', rentBasis: 'FSG', note: '+0.1% QoQ, +7.1% YoY. Monthly FSG as printed.' })
put('penOfficeUcSf', { label: 'Peninsula under construction', value: 39285, format: 'sf' })
put('penOfficeTimsMsf', { label: 'Peninsula TIMS', value: 4.0, format: 'msfRaw', note: '61 tenants. Was 4.2 msf.' })
put('penOfficeTimsTenants', { label: 'Peninsula TIMS tenants', value: 61, format: 'count' })
put('penOfficeTenants100k', { label: 'Peninsula tenants ≥100k', value: 11, format: 'count' })
put('penAiDemandMsf', { label: 'AI of Peninsula TIMS', value: 1.1, format: 'msfRaw' })
put('penOfficeClassAVac', { label: 'Peninsula Class A vacancy', value: 28.9, format: 'percent' })
put('penOfficeClassBVac', { label: 'Peninsula Class B vacancy', value: 21.0, format: 'percent' })
put('penOfficeClassCVac', { label: 'Peninsula Class C vacancy', value: 14.7, format: 'percent' })
put('penTightestVac', { label: 'San Bruno / Millbrae vacancy', value: 5.9, format: 'percent' })
put('penPaloAltoVac', { label: 'Palo Alto / EPA vacancy', value: 16.5, format: 'percent' })
put('penWorstVac', { label: 'Redwood City / Shores vacancy', value: 42.2, format: 'percent' })

put('gsvOfficeVacancyPct', { label: 'Greater SV office vacancy', value: 15.2, format: 'percent', delta: 'down', note: 'From 15.4%.' })
put('gsvOfficeAbsSf', { label: 'Greater SV office Q2 absorption', value: 14880, format: 'sf', delta: 'up', note: '7th consecutive positive quarter.' })
put('gsvOfficeFsg', { label: 'Greater SV office asking', value: 5.27, format: 'fsg', rentBasis: 'FSG', note: 'Down $0.04 QoQ. Monthly FSG as printed.' })
put('gsvOfficeUcSf', { label: 'Greater SV office UC', value: 324000, format: 'sf', note: 'Santa Clara. 0 deliveries.' })
put('gsvOfficeLeasingMsf', { label: 'Greater SV office leasing', value: 2.7, format: 'msfRaw', note: 'Highest since Q4 2024.' })
put('gsvOfficeRenewalsMsf', { label: 'Greater SV office renewals', value: 1.7, format: 'msfRaw' })
put('gsvDemandMsf', { label: 'Office + R&D demand', value: 9.3, format: 'msfRaw', note: 'From 8.6 msf.' })
put('gsvDemandTechPct', { label: 'Tech / hardware / software / AI of demand', value: 50.5, format: 'percent' })
put('gsvClassAVac', { label: 'Greater SV Class A vacancy', value: 14.1, format: 'percent' })
put('gsvClassBVac', { label: 'Greater SV Class B vacancy', value: 19.7, format: 'percent' })
put('gsvClassCVac', { label: 'Greater SV Class C vacancy', value: 7.1, format: 'percent' })
put('gsvTightestVac', { label: 'Cupertino vacancy', value: 2.4, format: 'percent' })
put('gsvIbpVac', { label: 'SJ IBP / Milpitas vacancy', value: 6.0, format: 'percent' })
put('gsvCbdVac', { label: 'Greater SV CBD vacancy', value: 32.9, format: 'percent' })

put('svVacancyPct', { label: 'SV R&D vacancy', value: 13.3, format: 'percent', delta: 'down', note: '−30 bps QoQ, +100 bps YoY.' })
put('svQ2AbsSf', { label: 'SV R&D Q2 absorption', value: 519000, format: 'sf', delta: 'up', note: 'Was −1.7 msf in Q1.' })
put('svYtdAbsSf', { label: 'SV R&D YTD absorption', value: -1140000, format: 'sf' })
put('svAvgAskingNnn', { label: 'SV R&D asking', value: 2.84, format: 'nnn', rentBasis: 'NNN' })
put('svDeliveredSf', { label: 'SV R&D delivered', value: 136600, format: 'sf', note: 'Table also shows 137k.' })
put('svUnderConstructionSf', { label: 'SV R&D under construction', value: 940000, format: 'sf', note: 'Header 940,214. Body also says 1.26 msf all preleased in Sunnyvale / SJ-North / Santa Clara — show 940k from the table.' })
put('svTotalNraSf', { label: 'Silicon Valley R&D inventory', value: 135200000, format: 'msf1' })
put('svLeasingMsf', { label: 'SV R&D leasing', value: 2.7, format: 'msfRaw', note: '+28.3% QoQ.' })
put('svLeasingQoqPct', { label: 'SV R&D leasing QoQ', value: 28.3, format: 'percent' })

put('oakOfficeVacancyPct', { label: 'Oakland office vacancy', value: 25.7, format: 'percent' })
put('oakOfficeAbsSf', { label: 'Oakland office Q2 absorption', value: -55141, format: 'sf', delta: 'down' })
put('oakOfficeFsg', { label: 'Oakland office asking', value: 3.69, format: 'fsg', rentBasis: 'FSG' })
put('oakClassAVac', { label: 'Oakland Class A vacancy', value: 32.3, format: 'percent' })
put('oakClassBVac', { label: 'Oakland Class B vacancy', value: 23.6, format: 'percent' })
put('oakClassCVac', { label: 'Oakland Class C vacancy', value: 12.3, format: 'percent' })
put('oakCbdVac', { label: 'Oakland CBD vacancy', value: 37.9, format: 'percent' })

put('oakRndVacancyPct', { label: 'Oakland R&D vacancy', value: 18.5, format: 'percent', delta: 'down', note: '−30 bps QoQ. Pipeline cleared.' })
put('oakRndAbsSf', { label: 'Oakland R&D Q2 absorption', value: 63174, format: 'sf', delta: 'up', note: 'Was −113k in Q1.' })
put('oakRndNnn', { label: 'Oakland R&D asking', value: 3.79, format: 'nnn', rentBasis: 'NNN' })
put('oakEmeryvilleVac', { label: 'Emeryville R&D vacancy', value: 44.8, format: 'percent' })
put('oakSanLeandroVac', { label: 'San Leandro R&D vacancy', value: 7.2, format: 'percent' })
put('oakRndCumulativeAbsSf', { label: 'Oakland R&D cumulative absorption', value: -1600000, format: 'sf', note: 'Since Q2 2023.' })

put('mbChinaBasinVacancyPct', { label: 'Mission Bay / China Basin vacancy', value: 17.0, format: 'percent', delta: 'down', note: 'Q2 SF office pack. Vacancy halved from 41.2% Q1 2024 on OpenAI + tech. Do not show the old 22.7% as current.' })
put('mbChinaBasinAsking', {
  label: 'Mission Bay / China Basin asking',
  value: 111.93,
  format: 'fsg',
  rentPeriod: 'annual',
  rentBasis: 'FSG',
  note: '$111.93 FSG/YR = $9.33/sf FSG monthly.',
})
put('mbChinaBasinNraSf', { label: 'Mission Bay / China Basin NRA', value: 4801531, format: 'sf' })
put('mbChinaBasinQtrAbsSf', { label: 'Mission Bay / China Basin Q2 absorption', value: -150979, format: 'sf', delta: 'down', note: 'Large tech sublease.' })
put('mbOfficeVacancyPct', { label: 'Mission Bay office vacancy', value: 17.0, format: 'percent', source: src, asOf: Q2, note: 'Q2 SF pack Mission Bay / China Basin. Supersedes the Q4 2025 22.7% print.' })
put('mbOfficeFsg', { label: 'Mission Bay office asking', value: 9.33, format: 'fsg', rentBasis: 'FSG', source: src, asOf: Q2, note: 'Monthly from $111.93 FSG/YR.' })
put('mbOfficeNraSf', { label: 'Mission Bay / China Basin NRA', value: 4801531, format: 'sf', source: src, asOf: Q2 })

await writeFile(join(dir, 'facts.json'), JSON.stringify(facts))
console.log('facts', Object.keys(facts).length)
