import { json } from '@remix-run/node'
import { ZodError } from 'zod'

export function handleFormError(error: unknown) {
  if (error instanceof ZodError) {
    return json(
      {
        success: false,
        error: 'Form contains errors',
        formErrors: error.formErrors,
        flatten: error.flatten(),
        message: null,
      },
      { status: 400 },
    )
  } else if (error instanceof Error) {
    return json(
      { success: false, error: error.message, formErrors: null, message: null },
      { status: 500 },
    )
  } else {
    return json(
      {
        success: false,
        error: 'Unknown error',
        formErrors: null,
        message: null,
      },
      { status: 500 },
    )
  }
}
