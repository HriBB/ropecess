import Mail from 'nodemailer/lib/mailer'
import nodemailer from 'nodemailer'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

const transportOptions = {
  service: process.env.EMAIL_SERVICE || '',
  host: process.env.EMAIL_HOST || '',
  port: parseInt(process.env.EMAIL_PORT || '') || 587,
  auth: {
    user: process.env.EMAIL_USERNAME || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
  debug: process.env.EMAIL_DEBUG === 'true' || false,
  logger: process.env.EMAIL_LOGGER === 'true' || false,
}

const transporter = nodemailer.createTransport(transportOptions)

export async function sendEmail(options: Mail.Options) {
  try {
    console.log('[INFO] sendEmail', options)
    const result = await transporter.sendMail(options)
    console.log('[INFO] sendEmail success', result)
    return { success: true, result }
  } catch (error) {
    console.error('[INFO] sendEmail error', error)
    throw new Error('Failed to send email')
  }
}

export const contactEmailSchema = zfd.formData({
  name: zfd.text(z.string()),
  email: zfd.text(z.string().email()),
  message: zfd.text(z.string().min(3)),
  token: zfd.text(z.string().min(1)),
})

export type ContactEmail = z.infer<typeof contactEmailSchema>

export async function sendContactEmail(data: {
  name: string
  email: string
  message: string
}) {
  console.log('[INFO] sendContactEmail', data)
  return sendEmail({
    from: data.email,
    to: process.env.CONTACT_EMAIL_TO,
    subject: `New message received from ${data.name}`,
    text: data.message,
  })
}
