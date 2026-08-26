import { sceneTransition, sceneVariants } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type SceneFrameProps = {
  sceneId: string
  children: ReactNode
}

export function SceneFrame({ sceneId, children }: SceneFrameProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      key={sceneId}
      className="absolute inset-0 z-20 h-full"
      variants={sceneVariants(reduced)}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={sceneTransition(reduced)}
    >
      {children}
    </motion.div>
  )
}

export function SceneHeader({
  kicker,
  title,
  dek,
}: {
  kicker: string
  title: string
  dek?: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-[11px] uppercase tracking-[0.22em] text-gold">{kicker}</p>
      <h1 className="mt-2 font-display text-[34px] leading-[1.05] text-paper md:text-[44px]">
        {title}
      </h1>
      {dek ? <p className="scene-copy mt-3 max-w-2xl text-paper/70">{dek}</p> : null}
    </div>
  )
}
