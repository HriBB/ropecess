import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

//
// nodemailer
//

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
    const result = await transporter.sendMail(options)
    return { success: true, result }
  } catch (error) {
    console.error('[ERROR] sendEmail', error)
    throw new Error('Failed to send email')
  }
}

//
// contact
//

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
  return sendEmail({
    from: data.email,
    to: process.env.CONTACT_EMAIL_TO,
    subject: `New Contact message received from ${data.name}`,
    text: data.message,
  })
}

//
// spacenet
//

export const spacenetEmailSchema = zfd.formData({
  name: zfd.text(z.string()),
  email: zfd.text(z.string().email()),
  message: zfd.text(z.string().min(3)),
  token: zfd.text(z.string().min(1)),
})

export type SpacenetEmail = z.infer<typeof spacenetEmailSchema>

export async function sendSpacenetEmail(data: {
  name: string
  email: string
  message: string
}) {
  return sendEmail({
    from: data.email,
    to: process.env.SPACENET_EMAIL_TO,
    subject: `New Space Net message received from ${data.name}`,
    text: data.message,
  })
}
