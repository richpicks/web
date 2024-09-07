'use client'

import { useEffect, useState } from 'react'
import styles from './CookieChoice.module.scss'

export const getLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue
  const stickyValue = localStorage.getItem(key)
  const isNotNull = stickyValue !== null && typeof stickyValue !== 'undefined'
  return isNotNull ? JSON.parse(stickyValue) : defaultValue
}

export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const CookieChoice = () => {
  const cookieConsentKey = 'cookie-consent'
  const storedCookieConsent = getLocalStorage(cookieConsentKey, null)
  // states
  const [mounted, setMounted] = useState(false)
  const [cookieConsent, setCookieConsent] = useState<null | boolean>(
    storedCookieConsent
  )
  // effects
  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    window.gtag('consent', 'update', {
      analytics_storage: cookieConsent ? 'granted' : 'denied',
    })
    setLocalStorage(cookieConsentKey, cookieConsent)
  }, [cookieConsent])
  // JSX
  return mounted === true ? (
    <label className={styles.label}>
      <input
        type="checkbox"
        checked={cookieConsent === null ? false : cookieConsent}
        onChange={(event) => {
          setCookieConsent(event.target.checked)
        }}
      />
      <span className="visually-hidden">the cookie policy consent</span>
    </label>
  ) : null
}
