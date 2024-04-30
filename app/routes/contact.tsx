import { Form } from '@remix-run/react'
import { Button } from '~/components/Button'
import { Container } from '~/components/Container'
import { Field } from '~/components/Field'
import { Hero } from '~/components/Hero'

const errors = {
  name: undefined,
  email: undefined,
  comment: undefined,
}

export default function Contact() {
  return (
    <main>
      <Hero backgroundImage="/img/contact/banner.jpg">
        <Hero.Content>
          <Hero.Title>Contact Us</Hero.Title>
        </Hero.Content>
      </Hero>

      <Container as="section">
        <Form method="POST" className="flex flex-col gap-5 py-20">
          {/* name */}
          <Field label="Name" htmlFor="name" error={errors.name}>
            <input
              id="name"
              type="text"
              className="input input-bordered w-full"
            />
          </Field>
          {/* email */}
          <Field label="Email" htmlFor="email" error={errors.email}>
            <input
              id="email"
              type="text"
              className="input input-bordered w-full"
            />
          </Field>
          {/* comment */}
          <Field label="Comment" htmlFor="comment" error={errors.comment}>
            <textarea
              className="textarea textarea-bordered w-full"
              id="comment"
              name="comment"
              rows={5}
            />
          </Field>
          <div>
            <Button color="secondary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </main>
  )
}
