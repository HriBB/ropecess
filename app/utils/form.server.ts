import { unstable_data as data } from '@remix-run/node'
import { typeToFlattenedError, ZodError } from 'zod'
import { ContactEmail } from './email.server'

export type FormResponseData = {
  success: boolean
  message?: string | null
  error?: string | null
  errors?: typeToFlattenedError<ContactEmail> | null
}

export function formResponseData(
  { success, message = null, error = null, errors = null }: FormResponseData,
  init?: ResponseInit,
) {
  return data({ success, message, error, errors }, init)
}

export function handleFormError(error: unknown) {
  if (error instanceof ZodError) {
    return formResponseData(
      {
        success: false,
        error: 'Form contains errors',
        errors: error.flatten(),
      },
      { status: 400 },
    )
  }
  if (error instanceof Error) {
    return formResponseData(
      { success: false, error: error.message },
      {
        status: 500,
      },
    )
  }
  return formResponseData(
    {
      success: false,
      error: 'Unknown error',
    },
    { status: 500 },
  )
}
