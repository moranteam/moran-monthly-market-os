import { compsBySet, isShareMode, visibleComps } from '@/data/load'
import type { CompSet } from '@/data/types'
import { usePresenter } from '@/state/presenter'

export function useVisibleComps(set?: CompSet) {
  const { mode } = usePresenter()
  const share = isShareMode(mode)
  return set ? compsBySet(set, share) : visibleComps(share)
}
