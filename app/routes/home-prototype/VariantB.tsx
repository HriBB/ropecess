/**
 * PROTOTYPE variant B — "Exaggerated Minimal" (round 2)
 * Design-system pick: oversized EB Garamond display type, Lato body, massive
 * whitespace, industrial grey + safety orange (#EA580C) accent. Sections as
 * huge numbered statements; services as a definition list; giant
 * underline-input contact form at the bottom. No hero image, no spacenet.
 */
import { Link } from 'react-router'
import { Picture } from '~/components/Picture'
import { extra, serviceHref } from './data'
import type { HomeVariantProps } from './index'

const garamond = { fontFamily: "'EB Garamond', Georgia, serif" } as const
const lato = { fontFamily: "'Lato', sans-serif" } as const
const ORANGE = '#EA580C'

function SectionNumber({ n, label }: { n: string; label: string }) {
  return (
    <div className="mb-12 flex items-baseline gap-4" style={lato}>
      <span className="text-sm font-bold" style={{ color: ORANGE }}>
        {n}
      </span>
      <span className="text-xs uppercase tracking-[0.4em] opacity-50">
        {label}
      </span>
      <span className="h-px flex-1 bg-base-content/15" />
    </div>
  )
}

export function VariantB({ d, lh, locale }: HomeVariantProps) {
  const x = extra[locale]
  return (
    <main className="bg-base-100 text-base-content" style={lato}>
      {/* Hero — type IS the hero */}
      <section className="px-6 pb-20 pt-36 md:px-12">
        <h1
          style={garamond}
          className="max-w-6xl text-[clamp(3rem,9vw,8.5rem)] font-medium leading-[0.95] tracking-[-0.03em]"
        >
          {d.hero.title.split(' ').map((w, i, arr) => (
            <span
              key={i}
              style={i === arr.length - 1 ? { color: ORANGE, fontStyle: 'italic' } : undefined}
            >
              {w}{' '}
            </span>
          ))}
        </h1>
        <div className="mt-14 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-relaxed opacity-70">
            {d.intro.text}
          </p>
          <Link
            to={lh(d.hero.link.to)}
            prefetch="intent"
            className="inline-block w-fit px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: ORANGE }}
          >
            {d.hero.link.text}
          </Link>
        </div>
      </section>

      {/* 01 — How we work */}
      <section className="px-6 py-28 md:px-12" id={d.intro.id}>
        <SectionNumber n="01" label={d.howWeWork.title} />
        <div className="grid gap-16 md:grid-cols-3">
          {d.howWeWork.items.map((item) => (
            <div key={item.id} id={item.id}>
              <Picture
                picture={item.image}
                lqip={item.lqip}
                alt={item.title}
                className="mb-8 w-full"
                loading="lazy"
                sizes="(max-width:767px) 100vw, 30vw"
              />
              <h2 style={garamond} className="mb-4 text-3xl font-medium">
                {item.title}
              </h2>
              <p className="text-sm leading-relaxed opacity-70">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 02 — Services as definition list */}
      <section className="bg-base-200 px-6 py-28 md:px-12">
        <SectionNumber n="02" label={x.services.title} />
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <h2
            style={garamond}
            className="text-5xl font-medium leading-tight md:text-6xl"
          >
            {x.services.title}
          </h2>
          <div>
            {x.services.items.map((item) => (
              <Link
                key={item.id}
                to={lh(serviceHref(item))}
                prefetch="intent"
                className="group flex items-baseline justify-between gap-6 border-b border-base-content/15 py-6"
              >
                <span
                  style={garamond}
                  className="text-2xl font-medium transition-colors md:text-3xl"
                >
                  {item.title}
                </span>
                <span
                  className="shrink-0 text-sm opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: ORANGE }}
                >
                  →
                </span>
              </Link>
            ))}
            <p className="pt-6 text-xs uppercase tracking-[0.2em] opacity-50">
              {x.services.more.join(' · ')}
            </p>
          </div>
        </div>
      </section>

      {/* 03 — Height cleaning spotlight */}
      <section className="px-6 py-28 md:px-12">
        <SectionNumber n="03" label={d.heightCleaning.title} />
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <h2
            style={garamond}
            className="text-5xl font-medium leading-tight md:text-6xl"
          >
            {d.heightCleaning.title.split(' ').map((w, i, arr) => (
              <span
                key={i}
                style={
                  i === arr.length - 1
                    ? { color: ORANGE, fontStyle: 'italic' }
                    : undefined
                }
              >
                {w}{' '}
              </span>
            ))}
          </h2>
          <div>
            <p className="mb-8 text-sm leading-relaxed opacity-70">
              {d.heightCleaning.text}
            </p>
            {d.heightCleaning.items.map((item) => (
              <p
                key={item}
                style={garamond}
                className="border-b border-base-content/15 py-4 text-xl font-medium md:text-2xl"
              >
                {item}
              </p>
            ))}
            <Link
              to={lh(d.heightCleaning.link.to)}
              prefetch="intent"
              className="mt-8 inline-block text-xs font-bold uppercase tracking-[0.2em]"
              style={{ color: ORANGE }}
            >
              {d.heightCleaning.link.text} →
            </Link>
          </div>
        </div>
      </section>

      {/* 04 — Contact at the bottom */}
      <section className="px-6 py-28 md:px-12">
        <SectionNumber n="04" label={x.contact.title} />
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2
              style={garamond}
              className="mb-8 text-5xl font-medium leading-tight md:text-7xl"
            >
              {x.contact.title}
            </h2>
            <p className="max-w-md text-base leading-relaxed opacity-70">
              {x.contact.text}
            </p>
          </div>
          {/* stub form — real one lives on /contact */}
          <div className="flex flex-col gap-10">
            <input
              type="text"
              placeholder={x.contact.form.name}
              className="border-b border-base-content/30 bg-transparent pb-3 text-xl outline-none transition-colors focus:border-base-content"
              style={garamond}
            />
            <input
              type="email"
              placeholder={x.contact.form.email}
              className="border-b border-base-content/30 bg-transparent pb-3 text-xl outline-none transition-colors focus:border-base-content"
              style={garamond}
            />
            <textarea
              placeholder={x.contact.form.message}
              rows={3}
              className="resize-none border-b border-base-content/30 bg-transparent pb-3 text-xl outline-none transition-colors focus:border-base-content"
              style={garamond}
            />
            <Link
              to={lh(x.contact.link.to)}
              prefetch="intent"
              className="inline-block w-fit px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: ORANGE }}
            >
              {x.contact.form.button}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
