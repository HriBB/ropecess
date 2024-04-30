import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

const transportOptions = {
  service: 'gmail',
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

export async function sendEmail(data: any) {
  console.log('[INFO] sendEmail', data)
  try {
    const options: Mail.Options = {
      from: process.env.CLIENT_EMAIL_FROM,
      to: process.env.CLIENT_EMAIL_TO,
      subject: 'Subject',
      text: 'Text',
    }
    console.log('[INFO] sendEmail options', options)
    const result = await transporter.sendMail(options)
    console.log('[INFO] sendEmail success', result)
    return { success: true, result }
  } catch (error) {
    console.error('[INFO] sendEmail error', error)
    return { success: false, error: 'Failed to send email' }
  }
}
