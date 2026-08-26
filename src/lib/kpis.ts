import type { IconName } from '@/components/icons'
import type { LensId } from '@/data/types'

export type KpiSpec = {
  factId: string
  icon: IconName
}

const shared: Record<string, Record<LensId, KpiSpec[]>> = {
  cover: {
    occupier: [
      { factId: 'sfOfficeVacancyPct', icon: 'building-2' },
      { factId: 'penOfficeVacancyPct', icon: 'building-2' },
      { factId: 'svVacancyPct', icon: 'factory' },
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
    ],
    owner: [
      { factId: 'sfOfficeVacancyPct', icon: 'building-2' },
      { factId: 'penOfficeVacancyPct', icon: 'building-2' },
      { factId: 'gsvOfficeVacancyPct', icon: 'factory' },
      { factId: 'oakOfficeVacancyPct', icon: 'building-2' },
    ],
    lender: [
      { factId: 'sfOfficeQ2AbsSf', icon: 'trending-up' },
      { factId: 'penOfficeAbsSf', icon: 'trending-up' },
      { factId: 'svQ2AbsSf', icon: 'trending-up' },
      { factId: 'usAiVcShareSince2020Pct', icon: 'banknote' },
    ],
  },
}

const byScene: Record<string, Record<LensId, KpiSpec[]>> = {
  cover: shared.cover,
  markets: shared.cover,
  rnd: {
    occupier: [
      { factId: 'svVacancyPct', icon: 'factory' },
      { factId: 'svAvgAskingNnn', icon: 'banknote' },
      { factId: 'svQ2AbsSf', icon: 'trending-up' },
      { factId: 'svUnderConstructionSf', icon: 'factory' },
    ],
    owner: [
      { factId: 'svVacancyPct', icon: 'factory' },
      { factId: 'svTotalNraSf', icon: 'factory' },
      { factId: 'svDeliveredSf', icon: 'trending-up' },
      { factId: 'svUnderConstructionSf', icon: 'factory' },
    ],
    lender: [
      { factId: 'svQ2AbsSf', icon: 'trending-up' },
      { factId: 'svYtdAbsSf', icon: 'trending-up' },
      { factId: 'svLeasingMsf', icon: 'briefcase' },
      { factId: 'svUnderConstructionSf', icon: 'factory' },
    ],
  },
  leasing: {
    occupier: [
      { factId: 'baLsAskingNnn', icon: 'banknote' },
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
      { factId: 'baLsInventoryMsf', icon: 'factory' },
    ],
    owner: [
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
      { factId: 'nPenLsVacancyPct', icon: 'map-pin' },
      { factId: 'cPenLsVacancyPct', icon: 'map-pin' },
      { factId: 'baLsAskingNnn', icon: 'banknote' },
    ],
    lender: [
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
      { factId: 'baLsAskingNnn', icon: 'banknote' },
      { factId: 'baLsInventoryMsf', icon: 'factory' },
    ],
  },
  office: {
    occupier: [
      { factId: 'penOfficeFsg', icon: 'banknote' },
      { factId: 'penOfficeVacancyPct', icon: 'building-2' },
      { factId: 'sfOfficeVacancyPct', icon: 'building-2' },
      { factId: 'penAiDemandMsf', icon: 'zap' },
    ],
    owner: [
      { factId: 'penOfficeVacancyPct', icon: 'building-2' },
      { factId: 'gsvOfficeVacancyPct', icon: 'factory' },
      { factId: 'penOfficeAbsSf', icon: 'trending-up' },
      { factId: 'sfOfficeVacancyPct', icon: 'building-2' },
    ],
    lender: [
      { factId: 'penOfficeAbsSf', icon: 'trending-up' },
      { factId: 'sfOfficeQ2AbsSf', icon: 'trending-up' },
      { factId: 'gsvOfficeAbsSf', icon: 'trending-up' },
      { factId: 'penOfficeTimsMsf', icon: 'briefcase' },
    ],
  },
  exploding: {
    occupier: [
      { factId: 'penAiDemandMsf', icon: 'zap' },
      { factId: 'penOfficeTimsMsf', icon: 'building-2' },
      { factId: 'baAiListingPct', icon: 'zap' },
      { factId: 'baRemoteListingPct', icon: 'users' },
    ],
    owner: [
      { factId: 'sfOfficeAiActivityPct', icon: 'building-2' },
      { factId: 'penAiDemandMsf', icon: 'zap' },
      { factId: 'baAiListingPct', icon: 'trending-up' },
      { factId: 'talentWorkforce', icon: 'users' },
    ],
    lender: [
      { factId: 'usAiVcShareSince2020Pct', icon: 'banknote' },
      { factId: 'penAiDemandMsf', icon: 'zap' },
      { factId: 'sfAiLeaseMsf', icon: 'briefcase' },
      { factId: 'ba500PersonCostUsd', icon: 'banknote' },
    ],
  },
  funding: {
    occupier: [
      { factId: 'baVcQ4Usd', icon: 'banknote' },
      { factId: 'usAiVcShareSince2020Pct', icon: 'zap' },
      { factId: 'baVcTechPct', icon: 'trending-up' },
    ],
    owner: [
      { factId: 'baOfficeInvestUsd', icon: 'briefcase' },
      { factId: 'usAiVcShareSince2020Pct', icon: 'zap' },
      { factId: 'baVcFyUsd', icon: 'banknote' },
      { factId: 'baLsVcQ4Usd', icon: 'flask-conical' },
    ],
    lender: [
      { factId: 'baVcQ4Usd', icon: 'banknote' },
      { factId: 'usAiVcShareSince2020Pct', icon: 'zap' },
      { factId: 'baOfficeInvestUsd', icon: 'briefcase' },
      { factId: 'baLsVcQ4Usd', icon: 'flask-conical' },
    ],
  },
  'mission-bay': {
    occupier: [
      { factId: 'mbOfficeFsg', icon: 'banknote' },
      { factId: 'mbOfficeVacancyPct', icon: 'building-2' },
      { factId: 'mbLsVacancyPct', icon: 'flask-conical' },
      { factId: 'owens1450Sf', icon: 'map-pin' },
    ],
    owner: [
      { factId: 'mbOfficeFsg', icon: 'banknote' },
      { factId: 'mbLsVacancyPct', icon: 'flask-conical' },
      { factId: 'mbOfficeVacancyPct', icon: 'building-2' },
      { factId: 'owens1450Asking', icon: 'factory' },
    ],
    lender: [
      { factId: 'mbChinaBasinQtrAbsSf', icon: 'trending-up' },
      { factId: 'mbOfficeNraSf', icon: 'building-2' },
      { factId: 'mbOfficeFsg', icon: 'banknote' },
      { factId: 'mbLsVacancyPct', icon: 'flask-conical' },
    ],
  },
  power: {
    occupier: [
      { factId: 'powerMinWsf', icon: 'zap' },
      { factId: 'backupPowerMinPct', icon: 'factory' },
      { factId: 'baker999LabWsf', icon: 'trending-up' },
    ],
    owner: [
      { factId: 'powerMinWsf', icon: 'zap' },
      { factId: 'powerBuildings', icon: 'factory' },
      { factId: 'baker999BuildingWsf', icon: 'trending-up' },
    ],
    lender: [
      { factId: 'backupPowerMinPct', icon: 'zap' },
      { factId: 'powerMinWsf', icon: 'factory' },
      { factId: 'powerBuildings', icon: 'trending-up' },
    ],
  },
  inventory: {
    occupier: [
      { factId: 'owens1450Sf', icon: 'map-pin' },
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
      { factId: 'owens1450Asking', icon: 'banknote' },
    ],
    owner: [
      { factId: 'owens1450Sf', icon: 'factory' },
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
      { factId: 'genesisMarinaVacancyPct', icon: 'building-2' },
    ],
    lender: [
      { factId: 'svQ2AbsSf', icon: 'trending-up' },
      { factId: 'penOfficeAbsSf', icon: 'trending-up' },
      { factId: 'mbChinaBasinQtrAbsSf', icon: 'trending-up' },
    ],
  },
}

export function kpisFor(sceneId: string, lens: LensId): KpiSpec[] {
  return byScene[sceneId]?.[lens] ?? []
}
