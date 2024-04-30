import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combine multiple class names into a single string
 *
 * Uses `clsx` for constructing `className` conditionally.
 * Uses `tailwind-merge` to merge tailwind classes without style conflicts.
 *
 * ```tsx
 * const isActive = true
 * cls('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]', isActive && 'text-red-500')
 * // → 'hover:bg-dark-red p-3 bg-[#B91C1C] text-red-500'
 * ```
 *
 * @see https://www.npmjs.com/package/clsx
 * @see https://www.npmjs.com/package/tailwind-merge
 */
export function cls(...args: ClassValue[]) {
  return twMerge(clsx(args))
}
