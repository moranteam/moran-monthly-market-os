import type { Comp, Fact, FactFormat, Property, RentBasis, RentPeriod } from '@/data/types'

export function formatSf(value: number, compact = false) {
  const abs = Math.abs(value)
  const sign = value < 0 ? '−' : ''
  if (compact && abs >= 1_000_000) {
    const msf = abs / 1_000_000
    const digits = msf >= 10 ? 0 : 1
    return `${sign}${msf.toFixed(digits)} msf`
  }
  if (compact && abs >= 1000) {
    return `${sign}${Math.round(abs / 1000)}k SF`
  }
  return `${sign}${Math.round(abs).toLocaleString('en-US')} SF`
}

export function formatUsd(value: number) {
  if (value >= 1_000_000_000) {
    return formatUsdB(value, 2)
  }
  if (value >= 1_000_000) {
    return `$${Math.round(value / 1_000_000)}M`
  }
  return `$${value.toLocaleString('en-US')}`
}

export function formatUsdB(value: number, digits = 2) {
  return `$${(value / 1_000_000_000).toFixed(digits)}B`
}

export function monthlyPsf(value: number, period?: RentPeriod) {
  return period === 'annual' ? value / 12 : value
}

export function formatPsf(
  value: number,
  opts?: {
    basis?: RentBasis | null
    period?: RentPeriod
    approximate?: boolean
  },
) {
  const monthly = monthlyPsf(value, opts?.period)
  const amount = `$${monthly.toFixed(2)}/sf`
  const basis = opts?.basis ? ` ${opts.basis}` : ''
  return `${opts?.approximate ? '~' : ''}${amount}${basis}`
}

export function formatNnn(value: number, period?: RentPeriod) {
  return formatPsf(value, { basis: 'NNN', period })
}

export function formatFsg(value: number, period?: RentPeriod) {
  return formatPsf(value, { basis: 'FSG', period })
}

export function formatRent(
  rent: number,
  basis: RentBasis,
  approximate = false,
  period: RentPeriod = 'monthly',
) {
  return formatPsf(rent, { basis, period, approximate })
}

export function formatCompRent(comp: Pick<Comp, 'rent' | 'rentBasis' | 'rentPeriod' | 'approximateRent' | 'confidential'>) {
  if (comp.rent === null || !comp.rentBasis) {
    return comp.confidential ? 'Confidential' : null
  }
  return formatPsf(comp.rent, {
    basis: comp.rentBasis,
    period: comp.rentPeriod ?? 'monthly',
    approximate: Boolean(comp.approximateRent),
  })
}

export function formatPropertyAsking(property: Property) {
  if (property.askingRent === null || property.askingRent === undefined || !property.askingBasis) {
    return null
  }
  return formatPsf(property.askingRent, {
    basis: property.askingBasis,
    period: property.askingPeriod ?? 'monthly',
  })
}

export function formatFactRent(item: Fact) {
  if (typeof item.value !== 'number') return formatFact(item)
  const basis = item.rentBasis ?? (item.format === 'nnn' ? 'NNN' : item.format === 'fsg' ? 'FSG' : null)
  return formatPsf(item.value, {
    basis,
    period: item.rentPeriod ?? 'monthly',
    approximate: item.approximate,
  })
}

export function monthlyFromFact(item: Fact) {
  return typeof item.value === 'number' ? monthlyPsf(item.value, item.rentPeriod) : 0
}

export function formatPercent(value: number) {
  return `${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)}%`
}

export function formatBy(format: FactFormat, value: number | string | null, digits?: number, period?: RentPeriod) {
  if (value === null) return '—'
  if (typeof value === 'string') return value
  switch (format) {
    case 'percent':
      return formatPercent(value)
    case 'percentImproved':
      return `improved ${formatPercent(value)}`
    case 'percentYoY':
      return `+${formatPercent(value)} YoY`
    case 'sf':
      return formatSf(value)
    case 'ksf':
      return formatSf(value, true)
    case 'msf1':
      return `${(value / 1_000_000).toFixed(1)} msf`
    case 'msfRaw':
      return `${value} msf`
    case 'usd':
      return formatUsd(value)
    case 'usdM':
      return `$${value}M`
    case 'usdB':
      return formatUsdB(value, digits ?? 2)
    case 'nnn':
      return formatNnn(value, period)
    case 'fsg':
      return formatFsg(value, period)
    case 'count':
      return Math.round(value).toLocaleString('en-US')
    case 'text':
      return String(value)
    case 'wsf':
      return `${value} W/SF`
    default: {
      const _exhaustive: never = format
      return _exhaustive
    }
  }
}

export function formatFact(item: Fact) {
  const prefix = item.approximate && item.format !== 'nnn' && item.format !== 'fsg' ? '±' : ''
  return `${prefix}${formatBy(item.format, item.value, item.digits, item.rentPeriod)}`
}

export function formatVsLast(current: number, previous: number) {
  const delta = current - previous
  if (delta === 0) return 'vs last · unchanged'
  const sign = delta > 0 ? '+' : '−'
  return `vs last ${sign}${Math.abs(delta).toLocaleString('en-US')}`
}

export function signedSf(value: number) {
  const body = formatSf(Math.abs(value), true)
  if (value > 0) return `+${body}`
  if (value < 0) return `−${body.replace('−', '')}`
  return body
}
