import { cls } from '~/utils/cls'

export function Footer() {
  return (
    <footer
      className={cls(
        'navbar justify-center',
        'bg-base-300 text-base-content dark:bg-black dark:text-base-100',
      )}
    >
      <p>&copy; Tilen Pogačnik {new Date().getFullYear()}</p>
    </footer>
  )
}
