export const easeOut = [0.22, 1, 0.36, 1] as const

export function sceneTransition(reduced: boolean) {
  return {
    duration: reduced ? 0.01 : 0.55,
    ease: easeOut,
  }
}

export function sceneVariants(reduced: boolean) {
  return {
    initial: {
      opacity: 0,
      y: reduced ? 0 : 14,
      filter: reduced ? 'none' : 'blur(6px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'none',
    },
    exit: {
      opacity: 0,
      y: reduced ? 0 : -10,
      filter: reduced ? 'none' : 'blur(4px)',
    },
  }
}
