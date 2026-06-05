/**
 * PROTOTYPE variant C — "Editorial Calm" (round 3, replaces Blueprint)
 * Quiet magazine chapters: Manrope, monochrome with a single amber accent,
 * sticky chapter labels on the left (lg+), thin rules, light-weight
 * headlines, photography framed in whitespace. py-36 sections — breathable.
 * daisyUI tokens → light/dark for free.
 */
import { Link } from 'react-router'
import { Picture } from '~/components/Picture'
import { extra, serviceHref } from './data'
import type { HomeVariantProps } from './index'

const font = { fontFamily: "'Manrope', sans-serif" } as const

function Chapter({
  label,
  id,
  children,
  muted,
}: {
  label: string
  id?: string
  children: React.ReactNode
  muted?: boolean
}) {
  return (
    <section
      id={id}
      className={`border-t border-base-content/10 px-6 py-36 md:px-12 ${
        muted ? 'bg-base-200' : ''
      }`}
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[220px_1fr]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] opacity-50 lg:sticky lg:top-28">
            <span className="mr-3 inline-block h-2 w-2 rounded-full bg-amber-500" />
            {label}
          </p>
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

export function VariantC({ d, lh, locale }: HomeVariantProps) {
  const x = extra[locale]
  return (
    <main className="bg-base-100 text-base-content" style={font}>
      {/* Hero — light type, framed photo, lots of air */}
      <section className="px-6 pb-36 pt-44 md:px-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-3xl text-5xl font-extralight leading-[1.08] tracking-tight md:text-7xl">
            {d.hero.title}
          </h1>
          <div className="mt-16 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <Link
              to={lh(d.hero.link.to)}
              prefetch="intent"
              className="group inline-flex w-fit items-center gap-4 text-sm font-bold uppercase tracking-[0.2em]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-black transition-transform group-hover:scale-110">
                →
              </span>
              {d.hero.link.text}
            </Link>
            <p className="max-w-md text-sm leading-loose opacity-60">
              {d.intro.text}
            </p>
          </div>
          <Picture
            picture={d.hero.image}
            lqip={d.hero.lqip}
            alt={d.hero.imageAlt}
            className="mt-20 aspect-[21/9] w-full object-cover"
            loading="eager"
            fetchPriority="high"
            sizes="(max-width:1151px) 100vw, 1152px"
          />
          <p className="mt-4 text-xs uppercase tracking-[0.25em] opacity-40">
            {d.hero.imageAlt}
          </p>
        </div>
      </section>

      {/* Chapter — how we work */}
      <Chapter label={d.howWeWork.title} id={d.intro.id}>
        <div className="flex flex-col gap-28">
          {d.howWeWork.items.map((item, i) => (
            <article
              key={item.id}
              id={item.id}
              className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr]"
            >
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <Picture
                  picture={item.image}
                  lqip={item.lqip}
                  alt={item.title}
                  className="w-full object-cover"
                  loading="lazy"
                  sizes="(max-width:767px) 100vw, 35vw"
                />
              </div>
              <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                <span className="text-xs font-bold tracking-[0.25em] text-amber-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mb-6 mt-3 text-3xl font-extralight tracking-tight md:text-4xl">
                  {item.title}
                </h2>
                <p className="max-w-md text-sm leading-loose opacity-70">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Chapter>

      {/* Chapter — services */}
      <Chapter label={x.services.title} muted>
        <p className="mb-20 max-w-lg text-2xl font-extralight leading-relaxed tracking-tight md:text-3xl">
          {x.services.text}
        </p>
        <div className="flex flex-col">
          {x.services.items.map((item, i) => (
            <Link
              key={item.id}
              to={lh(serviceHref(item))}
              prefetch="intent"
              className="group flex items-baseline gap-8 border-t border-base-content/10 py-7 transition-colors hover:bg-base-100/50"
            >
              <span className="w-8 shrink-0 text-xs font-bold text-amber-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 text-xl font-light tracking-tight md:text-2xl">
                {item.title}
              </span>
              <span className="hidden max-w-xs text-xs leading-relaxed opacity-50 md:block">
                {item.text}
              </span>
            </Link>
          ))}
          {x.services.more.map((title, i) => (
            <div
              key={title}
              className="flex items-baseline gap-8 border-t border-base-content/10 py-7 opacity-60"
            >
              <span className="w-8 shrink-0 text-xs font-bold text-amber-500">
                {String(x.services.items.length + i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 text-xl font-light tracking-tight md:text-2xl">
                {title}
              </span>
            </div>
          ))}
        </div>
        <Link
          to={lh(x.services.link.to)}
          prefetch="intent"
          className="mt-16 inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em]"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-black transition-transform hover:scale-110">
            →
          </span>
          {x.services.link.text}
        </Link>
      </Chapter>

      {/* Chapter — height cleaning spotlight */}
      <Chapter label={d.heightCleaning.title} id={d.heightCleaning.id}>
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="mb-8 text-3xl font-extralight leading-snug tracking-tight md:text-4xl">
              {d.heightCleaning.title}
            </h2>
            <p className="mb-10 max-w-md text-sm leading-loose opacity-70">
              {d.heightCleaning.text}
            </p>
            <div className="mb-10 flex flex-col">
              {d.heightCleaning.items.map((item, i) => (
                <div
                  key={item}
                  className="flex items-baseline gap-8 border-t border-base-content/10 py-5 last:border-b"
                >
                  <span className="w-8 shrink-0 text-xs font-bold text-amber-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-light tracking-tight md:text-xl">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <Link
              to={lh(d.heightCleaning.link.to)}
              prefetch="intent"
              className="border-b border-amber-500 pb-1 text-sm font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
            >
              {d.heightCleaning.link.text}
            </Link>
          </div>
          <Picture
            picture={d.heightCleaning.images[0].image}
            lqip={d.heightCleaning.images[0].lqip}
            alt={d.heightCleaning.images[0].alt}
            className="w-full object-cover"
            loading="lazy"
            sizes="(max-width:767px) 100vw, 50vw"
          />
        </div>
      </Chapter>

      {/* Chapter — spacenet */}
      <Chapter label={x.spacenet.title}>
        <div className="grid items-end gap-12 md:grid-cols-[1.2fr_1fr]">
          <Picture
            picture={x.spacenet.images[0].image}
            lqip={x.spacenet.images[0].lqip}
            alt={x.spacenet.images[0].alt}
            className="w-full object-cover"
            loading="lazy"
            sizes="(max-width:767px) 100vw, 50vw"
          />
          <div className="pb-2">
            <h2 className="mb-8 text-3xl font-extralight leading-snug tracking-tight md:text-4xl">
              {x.spacenet.tagline}
            </h2>
            <p className="mb-10 max-w-md text-sm leading-loose opacity-70">
              {x.spacenet.text}
            </p>
            <Link
              to={lh(x.spacenet.link.to)}
              prefetch="intent"
              className="border-b border-amber-500 pb-1 text-sm font-bold uppercase tracking-[0.2em] transition-opacity hover:opacity-60"
            >
              {x.spacenet.link.text}
            </Link>
          </div>
        </div>
      </Chapter>

      {/* Chapter — contact at the bottom */}
      <Chapter label={x.contact.title} muted>
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="mb-8 max-w-sm text-4xl font-extralight leading-tight tracking-tight md:text-5xl">
              {x.contact.text}
            </h2>
          </div>
          {/* stub form — real one lives on /contact */}
          <div className="flex flex-col gap-8">
            <input
              type="text"
              placeholder={x.contact.form.name}
              className="border-b border-base-content/20 bg-transparent pb-4 text-base font-light outline-none transition-colors focus:border-amber-500"
            />
            <input
              type="email"
              placeholder={x.contact.form.email}
              className="border-b border-base-content/20 bg-transparent pb-4 text-base font-light outline-none transition-colors focus:border-amber-500"
            />
            <textarea
              placeholder={x.contact.form.message}
              rows={3}
              className="resize-none border-b border-base-content/20 bg-transparent pb-4 text-base font-light outline-none transition-colors focus:border-amber-500"
            />
            <Link
              to={lh(x.contact.link.to)}
              prefetch="intent"
              className="group mt-4 inline-flex w-fit items-center gap-4 text-sm font-bold uppercase tracking-[0.2em]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-black transition-transform group-hover:scale-110">
                →
              </span>
              {x.contact.form.button}
            </Link>
          </div>
        </div>
      </Chapter>
    </main>
  )
}
