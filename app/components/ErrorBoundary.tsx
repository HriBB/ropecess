import { isRouteErrorResponse, useRouteError } from 'react-router'

import { Main } from './Main'

export function ErrorBoundary() {
  const error = useRouteError()
  return (
    <Main className="min-h-[calc(100vh-4rem)] pt-28 md:pt-32">
      <Main.Container>
        {isRouteErrorResponse(error) ? (
          <>
            <Main.H2>{`Error ${error.status}`}</Main.H2>
            <div>{error.data}</div>
          </>
        ) : (
          <>
            <Main.H2>Error</Main.H2>
            <div>{error instanceof Error ? error.message : 'Bad request'}</div>
          </>
        )}
      </Main.Container>
    </Main>
  )
}
