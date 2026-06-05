/**
 * PROTOTYPE variant A — "Airy Organic" (round 3, replaces Bento Grid)
 * Scandinavian-calm: Albert Sans, huge breathing room (py-32+), soft
 * rounded imagery, sage-green accent, pill buttons, centered composition.
 * daisyUI tokens + dark: sage variants → full light/dark support.
 */
import { Link } from 'react-router'
import { Picture } from '~/components/Picture'
import { extra, serviceHref } from './data'
import type { HomeVariantProps } from './index'

const font = { fontFamily: "'Albert Sans', sans-serif" } as const

// sage accent — light / dark pairs
const sageText = 'text-[#5f7c61] dark:text-[#a7c4a9]'
const sageBg =
  'bg-[#5f7c61] text-white hover:bg-[#4d664f] dark:bg-[#a7c4a9] dark:text-[#1c241d] dark:hover:bg-[#c0d6c1]'

export function VariantA({ d, lh, locale }: HomeVariantProps) {
  const x = extra[locale]
  return (
    <main className="bg-base-100 text-base-content" style={font}>
      {/* Hero — calm, centered, image floats below */}
      <section className="flex flex-col items-center px-6 pb-32 pt-40 text-center">
        <p className={`mb-8 text-xs font-semibold uppercase tracking-[0.4em] ${sageText}`}>
          Ropecess
        </p>
        <h1 className="max-w-4xl text-4xl font-light leading-[1.15] tracking-tight md:text-6xl">
          {d.hero.title}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed opacity-70">
          {d.intro.text}
        </p>
        <Link
          to={lh(d.hero.link.to)}
          prefetch="intent"
          className={`mt-12 rounded-full px-10 py-4 text-sm font-semibold transition-colors ${sageBg}`}
        >
          {d.hero.link.text}
        </Link>
        <div className="mt-24 w-full max-w-6xl">
          <Picture
            picture={d.hero.image}
            lqip={d.hero.lqip}
            alt={d.hero.imageAlt}
            className="aspect-[16/9] w-full rounded-[2.5rem] object-cover"
            loading="eager"
            fetchPriority="high"
            sizes="(max-width:1151px) 100vw, 1152px"
          />
        </div>
      </section>

      {/* How we work — three airy columns */}
      <section className="px-6 py-32" id={d.intro.id}>
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-24 text-center text-3xl font-light tracking-tight md:text-4xl">
            {d.howWeWork.title}
          </h2>
          <div className="grid gap-x-12 gap-y-20 md:grid-cols-3">
            {d.howWeWork.items.map((item, i) => (
              <div key={item.id} id={item.id} className="flex flex-col items-center text-center">
                <Picture
                  picture={item.image}
                  lqip={item.lqip}
                  alt={item.title}
                  className="mb-10 aspect-square w-full rounded-[2rem] object-cover"
                  loading="lazy"
                  sizes="(max-width:767px) 100vw, 30vw"
                />
                <span
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${sageText} border-current`}
                >
                  {i + 1}
                </span>
                <h3 className="mb-4 text-xl font-medium">{item.title}</h3>
                <p className="max-w-xs text-sm leading-loose opacity-70">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — generous list with round thumbs */}
      <section className="bg-base-200 px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-3xl font-light tracking-tight md:text-4xl">
            {x.services.title}
          </h2>
          <p className="mx-auto mb-20 max-w-xl text-center text-sm leading-loose opacity-70">
            {x.services.text}
          </p>
          <div className="flex flex-col">
            {x.services.items.map((item) => (
              <Link
                key={item.id}
                to={lh(serviceHref(item))}
                prefetch="intent"
                className="group flex items-center gap-8 border-t border-base-content/10 py-8 last:border-b"
              >
                <Picture
                  picture={item.image}
                  lqip={item.lqip}
                  alt={item.title}
                  className="h-20 w-20 shrink-0 rounded-full object-cover"
                  loading="lazy"
                  sizes="80px"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed opacity-60">
                    {item.text}
                  </p>
                </div>
                <span
                  className={`text-xl opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 ${sageText}`}
                >
                  →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-2">
            {x.services.more.map((s) => (
              <span
                key={s}
                className="rounded-full border border-base-content/15 px-4 py-1.5 text-xs opacity-70"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link
              to={lh(x.services.link.to)}
              prefetch="intent"
              className={`rounded-full px-10 py-4 text-sm font-semibold transition-colors ${sageBg}`}
            >
              {x.services.link.text}
            </Link>
          </div>
        </div>
      </section>

      {/* Height cleaning spotlight — text left, image right (mirrors spacenet) */}
      <section className="px-6 py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
          <div>
            <p className={`mb-6 text-xs font-semibold uppercase tracking-[0.4em] ${sageText}`}>
              {x.services.title}
            </p>
            <h2 className="mb-8 text-3xl font-light leading-snug tracking-tight md:text-4xl">
              {d.heightCleaning.title}
            </h2>
            <p className="mb-8 max-w-md text-sm leading-loose opacity-70">
              {d.heightCleaning.text}
            </p>
            <ul className="mb-10 flex flex-wrap gap-2">
              {d.heightCleaning.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-base-content/15 px-4 py-1.5 text-xs opacity-70"
                >
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to={lh(d.heightCleaning.link.to)}
              prefetch="intent"
              className={`inline-block border-b pb-1 text-sm font-semibold ${sageText} border-current transition-opacity hover:opacity-70`}
            >
              {d.heightCleaning.link.text} →
            </Link>
          </div>
          <Picture
            picture={d.heightCleaning.images[0].image}
            lqip={d.heightCleaning.images[0].lqip}
            alt={d.heightCleaning.images[0].alt}
            className="aspect-[4/3] w-full rounded-[2.5rem] object-cover md:order-2"
            loading="lazy"
            sizes="(max-width:767px) 100vw, 45vw"
          />
        </div>
      </section>

      {/* Spacenet — soft two-column moment */}
      <section className="px-6 py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">
          <Picture
            picture={x.spacenet.images[1].image}
            lqip={x.spacenet.images[1].lqip}
            alt={x.spacenet.images[1].alt}
            className="aspect-[4/3] w-full rounded-[2.5rem] object-cover"
            loading="lazy"
            sizes="(max-width:767px) 100vw, 45vw"
          />
          <div>
            <p className={`mb-6 text-xs font-semibold uppercase tracking-[0.4em] ${sageText}`}>
              {x.spacenet.title}
            </p>
            <h2 className="mb-8 text-3xl font-light leading-snug tracking-tight md:text-4xl">
              {x.spacenet.tagline}
            </h2>
            <p className="mb-10 max-w-md text-sm leading-loose opacity-70">
              {x.spacenet.text}
            </p>
            <Link
              to={lh(x.spacenet.link.to)}
              prefetch="intent"
              className={`inline-block border-b pb-1 text-sm font-semibold ${sageText} border-current transition-opacity hover:opacity-70`}
            >
              {x.spacenet.link.text} →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact — calm centered form at the bottom */}
      <section className="bg-base-200 px-6 py-32">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="mb-6 text-3xl font-light tracking-tight md:text-4xl">
            {x.contact.title}
          </h2>
          <p className="mb-16 text-sm leading-loose opacity-70">
            {x.contact.text}
          </p>
          {/* stub form — real one lives on /contact */}
          <div className="flex flex-col gap-4 text-left">
            <input
              type="text"
              placeholder={x.contact.form.name}
              className="rounded-full border border-base-content/15 bg-base-100 px-6 py-4 text-sm outline-none transition-colors focus:border-base-content/40"
            />
            <input
              type="email"
              placeholder={x.contact.form.email}
              className="rounded-full border border-base-content/15 bg-base-100 px-6 py-4 text-sm outline-none transition-colors focus:border-base-content/40"
            />
            <textarea
              placeholder={x.contact.form.message}
              rows={4}
              className="resize-none rounded-[2rem] border border-base-content/15 bg-base-100 px-6 py-4 text-sm outline-none transition-colors focus:border-base-content/40"
            />
            <Link
              to={lh(x.contact.link.to)}
              prefetch="intent"
              className={`rounded-full px-10 py-4 text-center text-sm font-semibold transition-colors ${sageBg}`}
            >
              {x.contact.form.button}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
