import { snapshot } from '@/data/load'
import type { CameraIntent, LensId, MapLayer, ModeId } from '@/data/types'
import { resolveSceneId } from '@/lib/aliases'
import { BAY_CAMERA } from '@/lib/mapStyle'
import { cameraForSpine, spineForScene } from '@/lib/spine'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type PresenterValue = {
  mode: ModeId
  setMode: (mode: ModeId) => void
  lens: LensId
  setLens: (lens: LensId) => void
  sceneIds: string[]
  sceneIndex: number
  sceneId: string
  takeaway: string | null
  goTo: (index: number) => void
  jumpTo: (sceneId: string) => void
  next: () => void
  prev: () => void
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  camera: CameraIntent
  setCamera: (camera: CameraIntent) => void
  mapLayer: MapLayer
  veil: number
  chromeVisible: boolean
  revealChrome: () => void
  fullscreen: boolean
  toggleFullscreen: () => void
  printing: boolean
  requestPrint: () => void
}

const PresenterContext = createContext<PresenterValue | null>(null)

function idsFor(mode: ModeId, lens: LensId) {
  if (mode === 'share') return snapshot.modes.share
  if (mode === 'twin') return snapshot.modes.present
  return snapshot.lenses[lens].present
}

function parseHash(): { mode: ModeId; scene: string | null } {
  const hash = window.location.hash.replace(/^#/, '')
  const [modeRaw, scene] = hash.split('/')
  if (modeRaw === 'twin' || modeRaw === 'share' || modeRaw === 'present') {
    return { mode: modeRaw, scene: resolveSceneId(scene || null) }
  }
  if (modeRaw === 'leave') return { mode: 'share', scene: resolveSceneId(scene || null) }
  return { mode: 'present', scene: resolveSceneId(modeRaw || null) }
}

function writeHash(mode: ModeId, sceneId: string) {
  const next = mode === 'present' ? `#${sceneId}` : `#${mode}/${sceneId}`
  if (window.location.hash !== next) {
    window.history.replaceState(null, '', next)
  }
}

export function PresenterProvider({ children }: { children: ReactNode }) {
  const initial = parseHash()
  const [mode, setModeState] = useState<ModeId>(initial.mode)
  const [lens, setLensState] = useState<LensId>('occupier')
  const [sceneIndex, setSceneIndex] = useState(() => {
    const ids = idsFor(initial.mode, 'occupier')
    const fromHash = initial.scene ? ids.indexOf(initial.scene) : 0
    return fromHash >= 0 ? fromHash : 0
  })
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [camera, setCamera] = useState<CameraIntent>(BAY_CAMERA)
  const [chromeVisible, setChromeVisible] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)
  const [printing, setPrinting] = useState(false)

  const sceneIds = useMemo(() => idsFor(mode, lens), [lens, mode])
  const sceneId = sceneIds[Math.min(sceneIndex, sceneIds.length - 1)] ?? 'cover'
  const scene = snapshot.scenes.find((entry) => entry.id === sceneId)
  const takeaway = snapshot.lenses[lens].takeaways[sceneId] ?? null

  useEffect(() => {
    writeHash(mode, sceneId)
  }, [mode, sceneId])

  useEffect(() => {
    if (selectedId) return
    setCamera(cameraForSpine(spineForScene(sceneId)))
  }, [sceneId, selectedId])

  useEffect(() => {
    const onHash = () => {
      const parsed = parseHash()
      setModeState(parsed.mode)
      const ids = idsFor(parsed.mode, lens)
      const index = parsed.scene ? ids.indexOf(parsed.scene) : 0
      setSceneIndex(index >= 0 ? index : 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [lens])

  const setMode = useCallback((next: ModeId) => {
    setModeState(next)
    setSceneIndex(0)
    setSelectedId(null)
    setPrinting(false)
  }, [])

  const setLens = useCallback(
    (next: LensId) => {
      setLensState(next)
      const ids = idsFor(mode, next)
      const keep = ids.indexOf(sceneId)
      setSceneIndex(keep >= 0 ? keep : 0)
      setSelectedId(null)
    },
    [mode, sceneId],
  )

  const goTo = useCallback(
    (index: number) => {
      setSceneIndex(Math.max(0, Math.min(sceneIds.length - 1, index)))
      setSelectedId(null)
    },
    [sceneIds.length],
  )

  const jumpTo = useCallback(
    (id: string) => {
      const index = sceneIds.indexOf(id)
      if (index >= 0) goTo(index)
    },
    [goTo, sceneIds],
  )

  const next = useCallback(() => {
    setSceneIndex((current) => Math.min(sceneIds.length - 1, current + 1))
    setSelectedId(null)
  }, [sceneIds.length])

  const prev = useCallback(() => {
    setSceneIndex((current) => Math.max(0, current - 1))
    setSelectedId(null)
  }, [])

  const revealChrome = useCallback(() => {
    setChromeVisible(true)
  }, [])

  useEffect(() => {
    if (!chromeVisible || printing) return
    const timer = window.setTimeout(() => setChromeVisible(false), 2800)
    return () => window.clearTimeout(timer)
  }, [chromeVisible, printing, sceneIndex, mode, lens])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen()
    } else {
      void document.exitFullscreen()
    }
  }, [])

  const requestPrint = useCallback(() => {
    setModeState('share')
    setPrinting(true)
    window.setTimeout(() => {
      window.print()
      setPrinting(false)
    }, 400)
  }, [])

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
      if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') {
        event.preventDefault()
        if (mode !== 'twin' && !printing) next()
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault()
        if (mode !== 'twin' && !printing) prev()
      } else if (event.key === 'f' || event.key === 'F') {
        event.preventDefault()
        toggleFullscreen()
      } else if (event.key === 'Escape') {
        setSelectedId(null)
        setPrinting(false)
      } else if (event.key === 'p' || event.key === 'P') {
        if (event.shiftKey) {
          event.preventDefault()
          requestPrint()
          return
        }
        setMode('present')
      } else if (event.key === 't' || event.key === 'T') {
        setMode('twin')
      } else if (event.key === 'l' || event.key === 'L' || event.key === 's' || event.key === 'S') {
        setMode('share')
      } else if (event.key === '1') {
        setLens('occupier')
      } else if (event.key === '2') {
        setLens('owner')
      } else if (event.key === '3') {
        setLens('lender')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mode, next, prev, requestPrint, setLens, setMode, toggleFullscreen, printing])

  const value = useMemo<PresenterValue>(
    () => ({
      mode,
      setMode,
      lens,
      setLens,
      sceneIds,
      sceneIndex,
      sceneId,
      takeaway,
      goTo,
      jumpTo,
      next,
      prev,
      selectedId,
      setSelectedId,
      camera,
      setCamera,
      mapLayer: scene?.map ?? 'bay',
      veil: scene?.veil ?? 0.2,
      chromeVisible,
      revealChrome,
      fullscreen,
      toggleFullscreen,
      printing,
      requestPrint,
    }),
    [
      camera,
      chromeVisible,
      fullscreen,
      goTo,
      jumpTo,
      lens,
      mode,
      next,
      prev,
      printing,
      requestPrint,
      revealChrome,
      scene?.map,
      scene?.veil,
      sceneId,
      sceneIds,
      sceneIndex,
      selectedId,
      setLens,
      setMode,
      takeaway,
      toggleFullscreen,
    ],
  )

  return <PresenterContext.Provider value={value}>{children}</PresenterContext.Provider>
}

export function usePresenter() {
  const value = useContext(PresenterContext)
  if (!value) throw new Error('usePresenter must be used inside PresenterProvider')
  return value
}
