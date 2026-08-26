import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePresenter } from '@/state/presenter'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type BriefingLayout = {
  cinematic: boolean
  settled: boolean
}

const BriefingLayoutContext = createContext<BriefingLayout>({
  cinematic: false,
  settled: true,
})

function isAerialScene(sceneId: string) {
  return sceneId === 'compression'
}

export function BriefingLayoutProvider({ children }: { children: ReactNode }) {
  const { sceneId } = usePresenter()
  const reduced = useReducedMotion()
  const [settled, setSettled] = useState(sceneId !== 'cover' || reduced)

  useEffect(() => {
    if (sceneId !== 'cover' || reduced) {
      setSettled(true)
      return
    }
    setSettled(false)
    const timer = window.setTimeout(() => setSettled(true), 3000)
    return () => window.clearTimeout(timer)
  }, [reduced, sceneId])

  const cinematic = isAerialScene(sceneId) || (sceneId === 'cover' && !settled)

  return <BriefingLayoutContext.Provider value={{ cinematic, settled }}>{children}</BriefingLayoutContext.Provider>
}

export function useBriefingLayout() {
  return useContext(BriefingLayoutContext)
}
