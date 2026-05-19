'use client'

import Link from 'next/link'
import { useTranslations } from '@/lib/useTranslations'
import { Logo } from './Logo'

export default function Footer() {
  const t = useTranslations()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <Logo className="footer-logo-mark" />
            </Link>
            <p className="footer-text">
              {t.footer.tagline}
            </p>
          </div>
          <div>
            <h4 className="footer-title">{t.footer.company}</h4>
            <div className="footer-links">
              <Link href="/about" className="footer-link">{t.footer.links.about}</Link>
              <Link href="/projects" className="footer-link">{t.footer.links.projects}</Link>
              <Link href="/contact" className="footer-link">{t.footer.links.contact}</Link>
            </div>
          </div>
          <div>
            <h4 className="footer-title">{t.footer.resources}</h4>
            <div className="footer-links">
              <a href="https://ui-catalog.mantaray.digital" target="_blank" rel="noopener noreferrer" className="footer-link">{t.footer.links.designSystem}</a>
            </div>
          </div>
          {/* <div>
            <h4 className="footer-title">{t.footer.social}</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">{t.footer.links.twitter}</a>
              <a href="#" className="footer-link">{t.footer.links.github}</a>
              <a href="#" className="footer-link">{t.footer.links.linkedin}</a>
            </div>
          </div> */}
        </div>
        <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
          <p className="footer-copyright">{t.footer.copyright}</p>
          <p className="footer-copyright" style={{ fontSize: '0.875rem', opacity: 0.7 }}>{t.footer.registration}</p>
        </div>
      </div>
    </footer>
  )
}
