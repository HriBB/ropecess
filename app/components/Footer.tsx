import { cn } from '~/utils/cn'

export function Footer() {
  return (
    <footer
      className={cn(
        'navbar justify-center',
        'bg-base-300 text-base-content dark:bg-black dark:text-white/60',
      )}
    >
      <p>&copy; Tilen Pogačnik {new Date().getFullYear()}</p>
    </footer>
  )
}
