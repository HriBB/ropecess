import { Link } from 'react-router'

import { Button } from '~/components/Button'
import { Container } from '~/components/Container'

type CallToActionProps = {
  text: string
  link: {
    to: string
    text: string
  }
}

export function CallToAction({ text, link }: CallToActionProps) {
  return (
    <section className="py-24">
      <Container className="flex flex-col items-center gap-10">
        <p className="text-xl">{text}</p>
        <Button
          as={Link}
          to={link.to}
          className="w-full md:w-auto"
          size="lg"
          color="primary"
          prefetch="intent"
        >
          {link.text}
        </Button>
      </Container>
    </section>
  )
}
