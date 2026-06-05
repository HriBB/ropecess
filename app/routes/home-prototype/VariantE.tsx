/**
 * PROTOTYPE variant E — "Aurora Glass" (round 2)
 * Gradient-mesh atmosphere with glass panels: Outfit type, blurred color
 * blobs, frosted cards, glowing spacenet showcase, glass contact panel.
 * Light = soft pastel mesh; dark = deep night mesh (daisyUI tokens flip).
 */
import { Link } from 'react-router'
import { Picture } from '~/components/Picture'
import { extra, serviceHref } from './data'
import type { HomeVariantProps } from './index'

const outfit = { fontFamily: "'Outfit', sans-serif" } as const

const glass =
  'rounded-3xl border border-base-content/10 bg-base-100/60 shadow-xl backdrop-blur-xl'

function Blobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 left-[10%] h-96 w-96 rounded-full bg-cyan-400/30 blur-3xl dark:bg-cyan-500/15" />
      <div className="absolute top-[30%] right-[5%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-400/25 blur-3xl dark:bg-fuchsia-500/15" />
      <div className="absolute bottom-[10%] left-[20%] h-80 w-80 rounded-full bg-amber-300/30 blur-3xl dark:bg-indigo-500/15" />
    </div>
  )
}

export function VariantE({ d, lh, locale }: HomeVariantProps) {
  const x = extra[locale]
  return (
    <main
      className="relative bg-base-200 text-base-content"
      style={outfit}
    >
      <Blobs />

      {/* Hero — glass panel over photo */}
      <section className="relative px-4 pb-16 pt-24 md:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem]">
          <Picture
            picture={d.hero.image}
            lqip={d.hero.lqip}
            alt={d.hero.imageAlt}
            className="h-[78svh] w-full object-cover"
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-x-4 bottom-4 md:inset-x-10 md:bottom-10">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-2xl md:p-10">
              <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
                {d.hero.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  to={lh(d.hero.link.to)}
                  prefetch="intent"
                  className="rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-transform hover:scale-105"
                >
                  {d.hero.link.text}
                </Link>
                <p className="max-w-md text-sm leading-relaxed text-white/80">
                  {d.intro.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How we work — glass cards */}
      <section className="relative px-4 py-16 md:px-8" id={d.intro.id}>
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-3xl font-bold tracking-tight md:text-4xl">
            {d.howWeWork.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {d.howWeWork.items.map((item, i) => (
              <article
                key={item.id}
                id={item.id}
                className={`${glass} group overflow-hidden p-3 transition-transform hover:-translate-y-2`}
              >
                <Picture
                  picture={item.image}
                  lqip={item.lqip}
                  alt={item.title}
                  className="mb-5 aspect-[4/3] w-full rounded-2xl object-cover"
                  loading="lazy"
                  sizes="(max-width:767px) 100vw, 30vw"
                />
                <div className="px-4 pb-5">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-[0.25em] text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed opacity-75">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services — frosted rail */}
      <section className="relative py-16">
        <div className="mx-auto mb-10 flex max-w-7xl items-baseline justify-between px-4 md:px-8">
          <div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
              {x.services.title}
            </h2>
            <p className="max-w-xl text-sm opacity-70">{x.services.text}</p>
          </div>
          <Link
            to={lh(x.services.link.to)}
            prefetch="intent"
            className="hidden rounded-full border border-base-content/15 px-6 py-3 text-sm font-semibold transition-colors hover:bg-base-100 md:inline-block"
          >
            {x.services.link.text} →
          </Link>
        </div>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 md:px-8">
          {x.services.items.map((item) => (
            <Link
              key={item.id}
              to={lh(serviceHref(item))}
              prefetch="intent"
              className={`${glass} group min-w-[75%] snap-center overflow-hidden p-3 sm:min-w-[45%] lg:min-w-[23%]`}
            >
              <Picture
                picture={item.image}
                lqip={item.lqip}
                alt={item.title}
                className="mb-4 aspect-square w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
                sizes="(max-width:639px) 75vw, 25vw"
              />
              <div className="px-3 pb-4">
                <h3 className="mb-1.5 text-lg font-bold leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed opacity-70">{item.text}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-4 flex max-w-7xl flex-wrap gap-2 px-4 md:px-8">
          {x.services.more.map((s) => (
            <span
              key={s}
              className="rounded-full border border-base-content/15 bg-base-100/50 px-4 py-1.5 text-xs font-medium backdrop-blur-sm"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Height cleaning spotlight — glass panel */}
      <section className="relative px-4 py-16 md:px-8" id={d.heightCleaning.id}>
        <div className={`${glass} mx-auto grid max-w-7xl overflow-hidden md:grid-cols-2`}>
          <Picture
            picture={d.heightCleaning.images[0].image}
            lqip={d.heightCleaning.images[0].lqip}
            alt={d.heightCleaning.images[0].alt}
            className="h-full min-h-[320px] w-full object-cover"
            loading="lazy"
            sizes="(max-width:767px) 100vw, 50vw"
          />
          <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
            <span className="w-fit rounded-full border border-base-content/15 bg-base-100/50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary backdrop-blur-sm">
              {x.services.title}
            </span>
            <h2 className="text-2xl font-bold leading-snug tracking-tight md:text-3xl">
              {d.heightCleaning.title}
            </h2>
            <p className="text-sm leading-relaxed opacity-75">
              {d.heightCleaning.text}
            </p>
            <div className="flex flex-wrap gap-2">
              {d.heightCleaning.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-base-content/15 bg-base-100/50 px-4 py-1.5 text-xs font-medium backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              to={lh(d.heightCleaning.link.to)}
              prefetch="intent"
              className="mt-2 w-fit rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-content transition-transform hover:scale-105"
            >
              {d.heightCleaning.link.text}
            </Link>
          </div>
        </div>
      </section>

      {/* Spacenet — neon glow showcase */}
      <section className="relative px-4 py-16 md:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-black">
          <div
            aria-hidden
            className="absolute -inset-10 opacity-50 blur-3xl"
            style={{
              background:
                'radial-gradient(circle at 30% 50%, rgba(217,70,239,0.5), transparent 60%), radial-gradient(circle at 70% 50%, rgba(34,211,238,0.4), transparent 60%)',
            }}
          />
          <div className="relative grid md:grid-cols-2">
            <Picture
              picture={x.spacenet.images[0].image}
              lqip={x.spacenet.images[0].lqip}
              alt={x.spacenet.images[0].alt}
              className="h-full min-h-[320px] w-full object-cover"
              loading="lazy"
              sizes="(max-width:767px) 100vw, 50vw"
            />
            <div className="flex flex-col justify-center gap-5 p-8 md:p-12">
              <span className="w-fit rounded-full border border-fuchsia-400/40 bg-fuchsia-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-300 backdrop-blur-sm">
                {x.spacenet.title}
              </span>
              <p className="text-2xl font-bold leading-snug text-white md:text-3xl">
                {x.spacenet.tagline}
              </p>
              <p className="text-sm leading-relaxed text-white/70">
                {x.spacenet.text}
              </p>
              <Link
                to={lh(x.spacenet.link.to)}
                prefetch="intent"
                className="mt-2 w-fit rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/40 transition-transform hover:scale-105"
              >
                {x.spacenet.link.text}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact — glass panel at the bottom */}
      <section className="relative px-4 pb-32 pt-16 md:px-8">
        <div className={`${glass} mx-auto grid max-w-5xl gap-10 p-8 md:grid-cols-2 md:p-12`}>
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              {x.contact.title}
            </h2>
            <p className="text-sm leading-relaxed opacity-75">
              {x.contact.text}
            </p>
          </div>
          {/* stub form — real one lives on /contact */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder={x.contact.form.name}
              className="rounded-2xl border border-base-content/15 bg-base-100/70 px-5 py-3.5 text-sm outline-none backdrop-blur-sm transition-colors focus:border-primary"
            />
            <input
              type="email"
              placeholder={x.contact.form.email}
              className="rounded-2xl border border-base-content/15 bg-base-100/70 px-5 py-3.5 text-sm outline-none backdrop-blur-sm transition-colors focus:border-primary"
            />
            <textarea
              placeholder={x.contact.form.message}
              rows={3}
              className="resize-none rounded-2xl border border-base-content/15 bg-base-100/70 px-5 py-3.5 text-sm outline-none backdrop-blur-sm transition-colors focus:border-primary"
            />
            <Link
              to={lh(x.contact.link.to)}
              prefetch="intent"
              className="rounded-2xl bg-primary px-8 py-4 text-center text-sm font-bold text-primary-content transition-transform hover:scale-[1.02]"
            >
              {x.contact.form.button}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
