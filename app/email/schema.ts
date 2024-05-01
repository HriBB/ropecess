import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const emailSchema = zfd.formData({
  name: zfd.text(z.string()),
  email: zfd.text(z.string().email()),
  comment: zfd.text(z.string().min(3)),
  token: zfd.text(z.string().min(1)),
})
