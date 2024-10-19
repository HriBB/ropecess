import { typeToFlattenedError, ZodError } from 'zod'
import { ContactEmail } from '~/utils/email.server'

export type FormResponseData = {
  success: boolean
  message?: string | null
  error?: string | null
  errors?: typeToFlattenedError<ContactEmail> | null
}

export function handleFormError(
  error: unknown,
  formError?: string,
): FormResponseData {
  if (error instanceof ZodError) {
    return {
      success: false,
      error: formError || 'Form contains errors',
      errors: error.flatten(),
    }
  }
  if (error instanceof Error) {
    return { success: false, error: error.message }
  }
  return {
    success: false,
    error: 'Unknown error',
  }
}
