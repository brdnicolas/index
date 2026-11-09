'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Toast.module.scss'

const EVENT = 'brd:toast'

export const toast = (message: string) => {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: message }))
}

export const Toaster = () => {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const onToast = (event: Event) => {
      setMessage((event as CustomEvent<string>).detail)
      setVisible(true)
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => setVisible(false), 2600)
    }
    window.addEventListener(EVENT, onToast)
    return () => window.removeEventListener(EVENT, onToast)
  }, [])

  return (
    <div className={`${styles.toast} ${visible ? styles.visible : ''}`} role="status" aria-live="polite">
      {message}
    </div>
  )
}
