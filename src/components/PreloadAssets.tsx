import { isRealPhoto } from '@/components/PhotoPlate'
import { snapshot } from '@/data/load'
import { useEffect } from 'react'

export function PreloadAssets() {
  useEffect(() => {
    const urls = [...new Set(snapshot.properties.map((item) => item.photoUrl).filter(isRealPhoto))]
    const links: HTMLLinkElement[] = []
    for (const href of urls) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = href
      document.head.appendChild(link)
      links.push(link)
    }
    return () => {
      for (const link of links) link.remove()
    }
  }, [])
  return null
}
