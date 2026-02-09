import { forwardRef, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigation } from 'react-router'
import { cn } from '~/utils/cn'

import './details.css'

export type DetailsProps = React.ComponentPropsWithRef<'details'>

export const Details = forwardRef<HTMLDetailsElement, DetailsProps>(
  function Details(
    {
      children,
      className,
      open,
      onToggle,
      onMouseDown,
      onTouchStart,
      onFocus,
      ...rest
    },
    forwardedRef,
  ) {
    const [isOpen, setOpen] = useState(false)
    const location = useLocation()
    const navigation = useNavigation()
    const clickRef = useRef<boolean>(false)
    const focusRef = useRef<boolean>(false)

    useEffect(() => {
      if (navigation.formData) {
        setOpen(false)
      }
    }, [navigation])

    useEffect(() => {
      setOpen(false)
    }, [location.key])

    useEffect(() => {
      if (isOpen) {
        const clickHandler = () => {
          if (!clickRef.current) setOpen(false)
          clickRef.current = false
        }
        const focusHandler = () => {
          if (!focusRef.current) setOpen(false)
          focusRef.current = false
        }
        document.addEventListener('mousedown', clickHandler)
        document.addEventListener('touchstart', clickHandler)
        document.addEventListener('focusin', focusHandler)
        return () => {
          document.removeEventListener('mousedown', clickHandler)
          document.removeEventListener('touchstart', clickHandler)
          document.removeEventListener('focusin', focusHandler)
        }
      }
    }, [isOpen])

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <details
        className={cn('group relative', className)}
        ref={forwardedRef}
        open={open ?? isOpen}
        onToggle={(event) => {
          onToggle && onToggle(event)
          if (event.defaultPrevented) return
          setOpen(event.currentTarget.open)
        }}
        onMouseDown={(event) => {
          onMouseDown && onMouseDown(event)
          if (event.defaultPrevented) return
          if (isOpen) clickRef.current = true
        }}
        onTouchStart={(event) => {
          onTouchStart && onTouchStart(event)
          if (event.defaultPrevented) return
          if (isOpen) clickRef.current = true
        }}
        onFocus={(event) => {
          onFocus && onFocus(event)
          if (event.defaultPrevented) return
          if (isOpen) focusRef.current = true
        }}
        {...rest}
      >
        {children}
      </details>
    )
  },
)
