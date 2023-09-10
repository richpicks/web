'use client'

import { useEffect, useState } from 'react'
import styles from './CookieBanner.module.scss'

export const getLocalStorage = (key: string, defaultValue: any) => {
  const stickyValue = localStorage.getItem(key)
  const isNotNull = (stickyValue !== null && typeof stickyValue !== 'undefined')
  return isNotNull ? JSON.parse(stickyValue) : defaultValue
}

export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const CookieBanner = () => {
  const cookieConsentKey = 'cookie-consent'
  // states
  const [mounted, setMounted] = useState(false)
  const [cookieConsent, setCookieConsent] = useState<null | boolean>(null)
  // effects
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect (() => {
    const storedCookieConsent = getLocalStorage(cookieConsentKey, null)
    setCookieConsent(storedCookieConsent)
  }, [setCookieConsent])

  useEffect(() => {
    window.gtag('consent', 'update', {
      'analytics_storage': cookieConsent ? 'granted' : 'denied'
    })
    setLocalStorage(cookieConsentKey, cookieConsent)
  }, [cookieConsent])
  // JSX
  return mounted === true && cookieConsent === null ? (
    <div className={styles.banner} aria-labelledby="cookie-consent-message">
      <div className={[styles.grid, 'container'].join(' ')}>
        <p className={styles.graph} id="cookie-consent-message">
          We use <strong>cookies</strong>.
        </p>
        <ul className={styles.list}>
          <li>
            <button
              className={[styles.button, styles.modDecline].join(' ')}
              type="button"
              onClick={() => setCookieConsent(false)}
            >
              Decline
              <span className="visually-hidden"> Cookies</span>
            </button>
          </li>
          <li>
            <button
              className={[styles.button, styles.modAllow].join(' ')}
              type="button"
              onClick={() => setCookieConsent(true)}
            >
              Allow
              <span className="visually-hidden"> Cookies</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  ) : null
}

export { CookieBanner }
