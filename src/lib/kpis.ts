import type { IconName } from '@/components/icons'
import type { LensId } from '@/data/types'

export type KpiSpec = {
  factId: string
  icon: IconName
}

const byScene: Record<string, Record<LensId, KpiSpec[]>> = {
  cover: {
    occupier: [
      { factId: 'baAiListingPct', icon: 'zap' },
      { factId: 'baRemoteListingPct', icon: 'users' },
      { factId: 'usAiVcShareSince2020Pct', icon: 'banknote' },
      { factId: 'sfOfficeAiActivityPct', icon: 'building-2' },
    ],
    owner: [
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
      { factId: 'penOfficeVacancyPct', icon: 'building-2' },
      { factId: 'usAiVcShareSince2020Pct', icon: 'banknote' },
      { factId: 'baAiListingPct', icon: 'zap' },
    ],
    lender: [
      { factId: 'usAiVcShareSince2020Pct', icon: 'banknote' },
      { factId: 'q4NetAbsorptionSf', icon: 'trending-up' },
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
      { factId: 'sfOfficeAiActivityPct', icon: 'briefcase' },
    ],
  },
  thesis: {
    occupier: [
      { factId: 'roboticsSf', icon: 'factory' },
      { factId: 'thesisGroupsInProcess', icon: 'users' },
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
    ],
    owner: [
      { factId: 'roboticsSf', icon: 'factory' },
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
      { factId: 'thesisGroupsInProcess', icon: 'users' },
    ],
    lender: [
      { factId: 'thesisGroupsInProcess', icon: 'briefcase' },
      { factId: 'roboticsSf', icon: 'factory' },
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
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
      { factId: 'baRemoteListingPct', icon: 'users' },
      { factId: 'penOfficeSoftwarePct', icon: 'briefcase' },
    ],
    owner: [
      { factId: 'penOfficeVacancyPct', icon: 'building-2' },
      { factId: 'svVacancyPct', icon: 'factory' },
      { factId: 'penOfficeAbsSf', icon: 'trending-up' },
      { factId: 'sfOfficeAiActivityPct', icon: 'zap' },
    ],
    lender: [
      { factId: 'penOfficeAbsSf', icon: 'trending-up' },
      { factId: 'penOfficeVacancyPct', icon: 'building-2' },
      { factId: 'sfOfficeVacancyPct', icon: 'building-2' },
      { factId: 'penOfficeLeasesQ4', icon: 'briefcase' },
    ],
  },
  product: {
    occupier: [
      { factId: 'powerMinWsf', icon: 'zap' },
      { factId: 'roboticsSf', icon: 'factory' },
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
    ],
    owner: [
      { factId: 'powerMinWsf', icon: 'zap' },
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
      { factId: 'roboticsSf', icon: 'factory' },
    ],
    lender: [
      { factId: 'backupPowerMinPct', icon: 'zap' },
      { factId: 'baLsVacancyPct', icon: 'flask-conical' },
      { factId: 'roboticsSf', icon: 'factory' },
    ],
  },
  talent: {
    occupier: [
      { factId: 'sfAiLeaseMsf', icon: 'building-2' },
      { factId: 'baAiListingPct', icon: 'zap' },
      { factId: 'baRemoteListingPct', icon: 'users' },
      { factId: 'aiSpecialtyTalent', icon: 'users' },
    ],
    owner: [
      { factId: 'sfOfficeAiActivityPct', icon: 'building-2' },
      { factId: 'sfAiLeaseMsf', icon: 'zap' },
      { factId: 'baAiListingPct', icon: 'trending-up' },
      { factId: 'talentWorkforce', icon: 'users' },
    ],
    lender: [
      { factId: 'usAiVcShareSince2020Pct', icon: 'banknote' },
      { factId: 'talentWorkforce', icon: 'users' },
      { factId: 'sfAiLeaseCompanies', icon: 'briefcase' },
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
      { factId: 'mbChinaBasinAsking', icon: 'banknote' },
      { factId: 'sfOfficeAsking', icon: 'building-2' },
      { factId: 'mbLsVacancyPct', icon: 'flask-conical' },
      { factId: 'owens1450Sf', icon: 'map-pin' },
    ],
    owner: [
      { factId: 'mbChinaBasinAsking', icon: 'banknote' },
      { factId: 'mbLsVacancyPct', icon: 'flask-conical' },
      { factId: 'mbOfficeVacancyPct', icon: 'building-2' },
      { factId: 'owens1450Asking', icon: 'factory' },
    ],
    lender: [
      { factId: 'mbChinaBasinQtrAbsSf', icon: 'trending-up' },
      { factId: 'mbChinaBasinYtdAbsSf', icon: 'trending-up' },
      { factId: 'mbChinaBasinAsking', icon: 'banknote' },
      { factId: 'mbLsVacancyPct', icon: 'flask-conical' },
    ],
  },
  compression: {
    occupier: [
      { factId: 'sfOfficeDemandMsf', icon: 'building-2' },
      { factId: 'sfOfficeAiPct', icon: 'zap' },
      { factId: 'mbChinaBasinAsking', icon: 'banknote' },
    ],
    owner: [
      { factId: 'mbChinaBasinAsking', icon: 'banknote' },
      { factId: 'mbLsVacancyPct', icon: 'flask-conical' },
      { factId: 'sfOfficeDemandMsf', icon: 'building-2' },
    ],
    lender: [
      { factId: 'sfProjectedAbsMsf', icon: 'trending-up' },
      { factId: 'mbChinaBasinAsking', icon: 'banknote' },
      { factId: 'sfOfficeAiPct', icon: 'zap' },
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
      { factId: 'q4NetAbsorptionSf', icon: 'trending-up' },
      { factId: 'penOfficeAbsSf', icon: 'trending-up' },
      { factId: 'mbChinaBasinQtrAbsSf', icon: 'trending-up' },
    ],
  },
}

export function kpisFor(sceneId: string, lens: LensId): KpiSpec[] {
  return byScene[sceneId]?.[lens] ?? []
}
