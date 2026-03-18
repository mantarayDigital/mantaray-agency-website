import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = () => new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = 'contact@email.mantaray.digital'
const TO_EMAIL = 'contact@mantaray.digital'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, service, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send notification to you
    await resend().emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `[Mantaray] New inquiry from ${name}`,
      html: `
        <div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0a1214;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #87DFE0 0%, #00FF94 50%, #CFE5E6 100%); padding: 32px; text-align: center;">
            <h1 style="font-family: 'Space Grotesk', sans-serif; color: #0a1214; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.02em;">
              MANTARAY
            </h1>
            <p style="color: #226566; margin: 8px 0 0; font-size: 14px; font-weight: 500;">New Contact Form Submission</p>
          </div>

          <!-- Content -->
          <div style="background: #0f1a1c; padding: 32px; border-left: 4px solid #87DFE0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 16px 8px; color: #68ACAD; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 100px; font-family: 'JetBrains Mono', monospace;">Name</td>
                <td style="padding: 16px 8px; font-weight: 500; color: #f0f7f7; font-size: 15px;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 16px 8px; color: #68ACAD; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-family: 'JetBrains Mono', monospace;">Email</td>
                <td style="padding: 16px 8px;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #87DFE0; text-decoration: none; font-size: 15px;">${escapeHtml(email)}</a>
                </td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 16px 8px; color: #68ACAD; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-family: 'JetBrains Mono', monospace;">Company</td>
                <td style="padding: 16px 8px; color: #f0f7f7; font-size: 15px;">${escapeHtml(company)}</td>
              </tr>
              ` : ''}
              ${service ? `
              <tr>
                <td style="padding: 16px 8px; color: #68ACAD; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-family: 'JetBrains Mono', monospace;">Service</td>
                <td style="padding: 16px 8px; color: #f0f7f7; font-size: 15px;">${escapeHtml(service)}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 16px 8px; color: #68ACAD; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top; font-family: 'JetBrains Mono', monospace;">Message</td>
                <td style="padding: 16px 8px; color: #f0f7f7; font-size: 15px; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</td>
              </tr>
            </table>
          </div>

          <!-- Footer -->
          <div style="background: #050a0b; padding: 20px 32px; text-align: center; border-top: 1px solid rgba(135, 223, 224, 0.08);">
            <p style="color: #6b9495; font-size: 12px; margin: 0;">
              Sent from <a href="https://mantaray.digital" style="color: #87DFE0; text-decoration: none;">mantaray.digital</a> contact form
            </p>
          </div>
        </div>
      `,
    })

    // Send confirmation to the submitter
    await resend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Thank you for reaching out | Mantaray',
      html: `
        <div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #0a1214;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #87DFE0 0%, #00FF94 50%, #CFE5E6 100%); padding: 48px 32px; text-align: center;">
            <!-- Logo -->
            <h1 style="font-family: 'Space Grotesk', sans-serif; color: #0a1214; margin: 0 0 24px; font-size: 32px; font-weight: 700; letter-spacing: -0.02em;">
              MANTARAY
            </h1>

            <!-- Success Icon -->
            <div style="width: 72px; height: 72px; background: #0a1214; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00FF94" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>

            <h2 style="font-family: 'Space Grotesk', sans-serif; color: #0a1214; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.02em;">
              Message Received!
            </h2>
            <p style="color: #226566; margin: 12px 0 0; font-size: 16px; font-weight: 500;">
              We'll be in touch within 24-48 hours
            </p>
          </div>

          <!-- Content -->
          <div style="background: #0f1a1c; padding: 40px 32px;">
            <p style="color: #a3bfc0; line-height: 1.7; margin: 0 0 24px; font-size: 15px;">
              Hey <span style="color: #87DFE0; font-weight: 600;">${escapeHtml(name)}</span>,
            </p>
            <p style="color: #a3bfc0; line-height: 1.7; margin: 0 0 32px; font-size: 15px;">
              Thanks for reaching out! We've received your message and our team is reviewing it. We typically respond within 24-48 hours.
            </p>

            <!-- Summary Card -->
            <div style="background: #162022; border: 1px solid rgba(135, 223, 224, 0.08); border-radius: 8px; padding: 24px; margin-bottom: 32px;">
              <p style="font-family: 'JetBrains Mono', monospace; color: #68ACAD; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px;">
                Your Inquiry
              </p>
              <div style="padding: 16px 0; border-bottom: 1px solid rgba(135, 223, 224, 0.08);">
                <p style="color: #6b9495; font-size: 12px; margin: 0 0 6px;">Service</p>
                <p style="color: #f0f7f7; font-weight: 500; margin: 0; font-size: 15px;">${service ? escapeHtml(service) : 'General inquiry'}</p>
              </div>
              <div style="padding: 16px 0;">
                <p style="color: #6b9495; font-size: 12px; margin: 0 0 6px;">Message</p>
                <p style="color: #f0f7f7; margin: 0; font-size: 15px; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
              </div>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center;">
              <a href="https://mantaray.digital" style="display: inline-block; background: #87DFE0; color: #0a1214; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; box-shadow: 0 4px 0 #3A6061; transition: all 150ms;">
                Visit Our Website
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #050a0b; padding: 32px; text-align: center; border-top: 1px solid rgba(135, 223, 224, 0.08);">
            <p style="font-family: 'Space Grotesk', sans-serif; color: #87DFE0; font-size: 14px; font-weight: 600; margin: 0 0 8px;">
              MANTARAY
            </p>
            <p style="color: #6b9495; font-size: 12px; margin: 0;">
              <a href="https://mantaray.digital" style="color: #68ACAD; text-decoration: none;">mantaray.digital</a> • Building digital products that matter
            </p>
            <p style="color: #3d5c5d; font-size: 11px; margin: 16px 0 0;">
              This email was sent because you submitted our contact form.
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
