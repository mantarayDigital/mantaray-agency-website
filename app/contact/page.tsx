'use client'

import { useState } from 'react'
import { useTranslations } from '@/lib/useTranslations'

export default function ContactPage() {
  const t = useTranslations()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const services = t.services.items.map(item => item.title)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', company: '', service: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      {/* Hero */}
      <section className="hero" style={{ minHeight: 'auto', paddingTop: 'var(--space-32)', paddingBottom: 'var(--space-16)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="hero-badge" style={{ margin: '0 auto var(--space-8)' }}>
            <span>{t.contactPage.badge}</span>
          </div>
          <h1 className="hero-title" style={{ fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-6)' }}>
            {t.contactPage.title1}<br />
            <span className="gradient-text">{t.contactPage.title2}</span>
          </h1>
          <p className="hero-description" style={{ margin: '0 auto', textAlign: 'center' }}>
            {t.contactPage.description}
          </p>
        </div>
      </section>

      {/* Contact Layout */}
      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-12)',
          }}>
            <style jsx>{`
              @media (min-width: 1024px) {
                .contact-grid {
                  grid-template-columns: 1fr 1fr !important;
                }
              }
            `}</style>
            <div className="contact-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 'var(--space-12)',
              alignItems: 'start',
            }}>
              {/* Services */}
              <div>
                <h2 className="section-title" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-8)' }}>
                  {t.contactPage.whatWeHelp}
                </h2>

                <div className="card" style={{ padding: 'var(--space-8)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    {t.services.items.map((service, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 'var(--space-4)',
                          paddingBottom: i < t.services.items.length - 1 ? 'var(--space-6)' : 0,
                          borderBottom: i < t.services.items.length - 1 ? '1px solid var(--border-default)' : 'none',
                        }}
                      >
                        <div style={{
                          flexShrink: 0,
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'var(--primary)',
                          borderRadius: 'var(--radius-lg)',
                          color: 'var(--bg-base)',
                          fontFamily: 'var(--font-display)',
                          fontWeight: 700,
                          fontSize: 'var(--text-sm)',
                        }}>
                          {i + 1}
                        </div>
                        <div>
                          <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            color: 'var(--fg-default)',
                            marginBottom: 'var(--space-1)',
                          }}>
                            {service.title}
                          </h3>
                          <p style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--fg-muted)',
                          }}>
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div style={{ marginTop: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  {[
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <path d="M22 6l-10 7L2 6" />
                        </svg>
                      ),
                      label: t.contactPage.contactInfo.email.label,
                      value: t.contactPage.contactInfo.email.value,
                      href: 'mailto:letstalk@mantaray.digital',
                    },
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      ),
                      label: t.contactPage.contactInfo.location.label,
                      value: t.contactPage.contactInfo.location.value,
                      href: '#',
                    },
                    {
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12,6 12,12 16,14" />
                        </svg>
                      ),
                      label: t.contactPage.contactInfo.response.label,
                      value: t.contactPage.contactInfo.response.value,
                      href: '#',
                    },
                  ].map((info, i) => (
                    <a
                      key={i}
                      href={info.href}
                      className="card"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-4)',
                        padding: 'var(--space-4)',
                        textDecoration: 'none',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      <div style={{
                        flexShrink: 0,
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--primary)',
                        borderRadius: 'var(--radius-lg)',
                        color: 'var(--bg-base)',
                      }}>
                        {info.icon}
                      </div>
                      <div>
                        <div style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'var(--fg-subtle)',
                          marginBottom: 'var(--space-1)',
                        }}>
                          {info.label}
                        </div>
                        <div style={{
                          fontWeight: 600,
                          color: 'var(--fg-default)',
                        }}>
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div>
                <div className="card card-elevated" style={{ padding: 'var(--space-12)' }}>
                  {submitStatus === 'success' ? (
                    <div style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto var(--space-6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(34, 197, 94, 0.1)',
                        borderRadius: 'var(--radius-full)',
                      }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <h3 className="section-title" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
                        {t.contactPage.success.title}
                      </h3>
                      <p style={{ color: 'var(--fg-muted)', marginBottom: 'var(--space-8)' }}>
                        {t.contactPage.success.description}
                      </p>
                      <button
                        onClick={() => setSubmitStatus('idle')}
                        style={{
                          color: 'var(--primary)',
                          fontWeight: 600,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                      >
                        {t.contactPage.success.sendAnother}
                      </button>
                    </div>
                  ) : submitStatus === 'error' ? (
                    <div style={{ textAlign: 'center', padding: 'var(--space-12) 0' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto var(--space-6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(239, 68, 68, 0.1)',
                        borderRadius: 'var(--radius-full)',
                      }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                      </div>
                      <h3 className="section-title" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
                        Something went wrong
                      </h3>
                      <p style={{ color: 'var(--fg-muted)', marginBottom: 'var(--space-8)' }}>
                        Failed to send your message. Please try again or email us directly at{' '}
                        <a href="mailto:contact@mantaray.digital" style={{ color: 'var(--primary)' }}>
                          contact@mantaray.digital
                        </a>
                      </p>
                      <button
                        onClick={() => setSubmitStatus('idle')}
                        style={{
                          color: 'var(--primary)',
                          fontWeight: 600,
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                      <div>
                        <label htmlFor="name" style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'var(--fg-subtle)',
                          marginBottom: 'var(--space-2)',
                        }}>
                          {t.contactPage.form.name} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="input"
                          placeholder={t.contactPage.form.namePlaceholder}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'var(--fg-subtle)',
                          marginBottom: 'var(--space-2)',
                        }}>
                          {t.contactPage.form.email} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="input"
                          placeholder={t.contactPage.form.emailPlaceholder}
                        />
                      </div>

                      <div>
                        <label htmlFor="company" style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'var(--fg-subtle)',
                          marginBottom: 'var(--space-2)',
                        }}>
                          {t.contactPage.form.company}
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="input"
                          placeholder={t.contactPage.form.companyPlaceholder}
                        />
                      </div>

                      <div>
                        <label htmlFor="service" style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'var(--fg-subtle)',
                          marginBottom: 'var(--space-2)',
                        }}>
                          {t.contactPage.form.service}
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="input"
                        >
                          <option value="">{t.contactPage.form.selectService}</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'var(--fg-subtle)',
                          marginBottom: 'var(--space-2)',
                        }}>
                          {t.contactPage.form.message} *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="input textarea"
                          placeholder={t.contactPage.form.messagePlaceholder}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%' }}
                      >
                        {isSubmitting ? t.contactPage.form.submitting : t.contactPage.form.submit}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
