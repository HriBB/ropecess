import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Picture as PictureType } from 'vite-imagetools'
import { LQIP } from 'types/env'

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '~/components/ui/dialog'
import { Picture } from '~/components/Picture'

// --- Types ---

export type LightboxImage = {
  picture: PictureType
  lqip?: LQIP
  alt: string
}

type LightboxContextValue = {
  openAt: (index: number) => void
  isOpen: boolean
  currentIndex: number
  setOpen: (open: boolean) => void
  setIndex: (index: number) => void
}

// --- Context ---

const LightboxContext = createContext<LightboxContextValue | null>(null)

function useLightboxContext() {
  const ctx = useContext(LightboxContext)
  if (!ctx) {
    throw new Error('Lightbox components must be used within <Lightbox>')
  }
  return ctx
}

// --- Root ---

export function Lightbox({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [currentIndex, setIndex] = useState(0)

  const openAt = useCallback((index: number) => {
    setIndex(index)
    setOpen(true)
  }, [])

  return (
    <LightboxContext.Provider
      value={{ openAt, isOpen, currentIndex, setOpen, setIndex }}
    >
      {children}
    </LightboxContext.Provider>
  )
}

// --- Trigger ---

export function LightboxTrigger({
  index,
  children,
}: {
  index: number
  children: React.ReactNode
}) {
  const { openAt } = useLightboxContext()

  return (
    <button
      type="button"
      onClick={() => openAt(index)}
      className="cursor-pointer text-left"
    >
      {children}
    </button>
  )
}

// --- Content ---

export function LightboxContent({ images }: { images: LightboxImage[] }) {
  const { isOpen, currentIndex, setOpen, setIndex } = useLightboxContext()

  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < images.length - 1

  const goPrev = useCallback(() => {
    if (currentIndex > 0) setIndex(currentIndex - 1)
  }, [currentIndex, setIndex])

  const goNext = useCallback(() => {
    if (currentIndex < images.length - 1) setIndex(currentIndex + 1)
  }, [currentIndex, images.length, setIndex])

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, goPrev, goNext])

  const current = images[currentIndex]
  if (!current) return null

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-screen-lg border-none bg-transparent p-2 shadow-none [&>button]:text-white">
        <DialogTitle className="sr-only">{current.alt}</DialogTitle>

        <div className="relative flex items-center justify-center">
          {/* Previous button */}
          <button
            type="button"
            onClick={goPrev}
            disabled={!hasPrev}
            className="absolute left-2 z-10 rounded-full bg-black/40 p-2 text-white transition-opacity hover:bg-black/60 disabled:pointer-events-none disabled:opacity-0"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Full-size image */}
          <Picture
            picture={current.picture}
            lqip={current.lqip}
            alt={current.alt}
            className="max-h-[85vh] w-auto max-w-full rounded object-contain"
            sizes="100vw"
          />

          {/* Next button */}
          <button
            type="button"
            onClick={goNext}
            disabled={!hasNext}
            className="absolute right-2 z-10 rounded-full bg-black/40 p-2 text-white transition-opacity hover:bg-black/60 disabled:pointer-events-none disabled:opacity-0"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
