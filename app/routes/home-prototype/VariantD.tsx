/**
 * PROTOTYPE variant D — "Neo-Brutalist" (round 2)
 * Poster energy: Archivo Black + Space Mono, 4px borders, hard offset
 * shadows, yellow accent blocks, rotated stickers, services marquee.
 * Light = paper + black ink; dark = charcoal + yellow ink.
 */
import { Link } from 'react-router'
import { Picture } from '~/components/Picture'
import { extra, serviceHref } from './data'
import type { HomeVariantProps } from './index'

const black = { fontFamily: "'Archivo Black', sans-serif" } as const
const mono = { fontFamily: "'Space Mono', monospace" } as const

const box =
  'border-4 border-base-content shadow-[8px_8px_0_0] shadow-base-content'

export function VariantD({ d, lh, locale }: HomeVariantProps) {
  const x = extra[locale]
  return (
    <main className="overflow-x-clip bg-base-100 text-base-content" style={mono}>
      <style>{`
        @keyframes proto-marquee-d { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      `}</style>

      {/* Hero */}
      <section className="px-5 pb-16 pt-28 md:px-10">
        <div className="relative">
          <h1
            style={black}
            className="mb-10 max-w-5xl text-5xl uppercase leading-[0.95] md:text-7xl"
          >
            {d.hero.title}
          </h1>
          <span
            className="absolute -top-6 right-0 hidden rotate-6 border-4 border-base-content bg-yellow-300 px-4 py-2 text-xs font-bold uppercase text-black md:inline-block"
            style={mono}
          >
            ★ {d.intro.title} ★
          </span>
        </div>
        <div className={`relative ${box}`}>
          <Picture
            picture={d.hero.image}
            lqip={d.hero.lqip}
            alt={d.hero.imageAlt}
            className="h-[55svh] w-full object-cover"
            loading="eager"
            sizes="100vw"
          />
          <Link
            to={lh(d.hero.link.to)}
            prefetch="intent"
            style={black}
            className="absolute -bottom-7 left-6 border-4 border-base-content bg-yellow-300 px-8 py-4 text-lg uppercase text-black transition-transform hover:-translate-y-1"
          >
            {d.hero.link.text} →
          </Link>
        </div>
        <p className="mt-16 max-w-xl text-sm leading-relaxed">{d.intro.text}</p>
      </section>

      {/* How we work — stacked offset cards */}
      <section className="px-5 py-16 md:px-10" id={d.intro.id}>
        <h2
          style={black}
          className="mb-12 inline-block -rotate-1 border-4 border-base-content bg-base-content px-6 py-3 text-3xl uppercase text-base-100 md:text-4xl"
        >
          {d.howWeWork.title}
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {d.howWeWork.items.map((item, i) => (
            <article
              key={item.id}
              id={item.id}
              className={`${box} bg-base-100 p-5 transition-transform hover:-translate-y-2 ${
                i === 1 ? 'md:translate-y-6' : ''
              }`}
            >
              <Picture
                picture={item.image}
                lqip={item.lqip}
                alt={item.title}
                className="mb-5 w-full border-4 border-base-content object-cover"
                loading="lazy"
                sizes="(max-width:767px) 100vw, 30vw"
              />
              <h3 style={black} className="mb-3 text-xl uppercase">
                {String(i + 1).padStart(2, '0')}. {item.title}
              </h3>
              <p className="text-xs leading-relaxed">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Services marquee + grid */}
      <section className="py-16">
        <div className="overflow-hidden border-y-4 border-base-content bg-yellow-300 py-3 text-black">
          <div
            className="flex w-max whitespace-nowrap text-xl uppercase"
            style={{ ...black, animation: 'proto-marquee-d 20s linear infinite' }}
          >
            {[0, 1].map((half) => (
              <span key={half} className="flex">
                {[...x.services.items.map((s) => s.title), ...x.services.more].map(
                  (t, i) => (
                    <span key={i} className="px-6">
                      {t} ●
                    </span>
                  ),
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="px-5 pt-16 md:px-10">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <h2 style={black} className="text-3xl uppercase md:text-4xl">
              {x.services.title}
            </h2>
            <Link
              to={lh(x.services.link.to)}
              prefetch="intent"
              className="border-4 border-base-content bg-base-100 px-6 py-3 text-sm font-bold uppercase transition-colors hover:bg-yellow-300 hover:text-black"
            >
              {x.services.link.text} →
            </Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {x.services.items.map((item) => (
              <Link
                key={item.id}
                to={lh(serviceHref(item))}
                prefetch="intent"
                className={`${box} group bg-base-100 p-3 transition-transform hover:-translate-y-2`}
              >
                <Picture
                  picture={item.image}
                  lqip={item.lqip}
                  alt={item.title}
                  className="mb-3 aspect-square w-full border-4 border-base-content object-cover"
                  loading="lazy"
                  sizes="(max-width:639px) 100vw, 20vw"
                />
                <span style={black} className="text-sm uppercase leading-tight">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Height cleaning spotlight — boxed two-column poster */}
      <section className="px-5 py-16 md:px-10" id={d.heightCleaning.id}>
        <div className={`${box} grid gap-0 bg-base-100 md:grid-cols-2`}>
          <Picture
            picture={d.heightCleaning.images[0].image}
            lqip={d.heightCleaning.images[0].lqip}
            alt={d.heightCleaning.images[0].alt}
            className="h-full min-h-[320px] w-full border-b-4 border-base-content object-cover md:border-b-0 md:border-r-4"
            loading="lazy"
            sizes="(max-width:767px) 100vw, 50vw"
          />
          <div className="flex flex-col items-start gap-6 p-8 md:p-10">
            <span
              className="-rotate-2 border-4 border-base-content bg-yellow-300 px-4 py-1.5 text-xs font-bold uppercase text-black"
              style={mono}
            >
              ★ {x.services.title} ★
            </span>
            <h2 style={black} className="text-3xl uppercase leading-tight md:text-4xl">
              {d.heightCleaning.title}
            </h2>
            <p className="text-xs leading-relaxed">{d.heightCleaning.text}</p>
            <div className="flex flex-wrap gap-2">
              {d.heightCleaning.items.map((item) => (
                <span
                  key={item}
                  className="border-4 border-base-content px-3 py-1 text-xs font-bold uppercase"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              to={lh(d.heightCleaning.link.to)}
              prefetch="intent"
              style={black}
              className="mt-2 border-4 border-base-content bg-yellow-300 px-8 py-4 text-lg uppercase text-black transition-transform hover:-translate-y-1"
            >
              {d.heightCleaning.link.text} →
            </Link>
          </div>
        </div>
      </section>

      {/* Spacenet — loud poster block */}
      <section className="px-5 py-16 md:px-10">
        <div className={`${box} relative overflow-hidden bg-black`}>
          <Picture
            picture={x.spacenet.images[0].image}
            lqip={x.spacenet.images[0].lqip}
            alt={x.spacenet.images[0].alt}
            className="h-[60svh] w-full object-cover opacity-80"
            loading="lazy"
            sizes="100vw"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-end gap-5 p-8">
            <span
              className="-rotate-2 border-4 border-black bg-fuchsia-400 px-4 py-1.5 text-xs font-bold uppercase text-black"
              style={mono}
            >
              NEW ★ {x.spacenet.title}
            </span>
            <p
              style={black}
              className="max-w-2xl text-3xl uppercase leading-tight text-white md:text-5xl"
            >
              {x.spacenet.tagline}
            </p>
            <Link
              to={lh(x.spacenet.link.to)}
              prefetch="intent"
              style={black}
              className="border-4 border-black bg-yellow-300 px-8 py-4 text-lg uppercase text-black transition-transform hover:-translate-y-1"
            >
              {x.spacenet.link.text} →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact — bottom */}
      <section className="px-5 pb-28 pt-8 md:px-10">
        <div className={`${box} grid gap-10 bg-yellow-300 p-8 text-black md:grid-cols-2 md:p-12`}>
          <div>
            <h2 style={black} className="mb-6 text-4xl uppercase md:text-5xl">
              {x.contact.title}
            </h2>
            <p className="max-w-md text-sm leading-relaxed">{x.contact.text}</p>
          </div>
          {/* stub form — real one lives on /contact */}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder={x.contact.form.name.toUpperCase()}
              className="border-4 border-black bg-white px-4 py-3 text-sm text-black placeholder-black/50 outline-none"
            />
            <input
              type="email"
              placeholder={x.contact.form.email.toUpperCase()}
              className="border-4 border-black bg-white px-4 py-3 text-sm text-black placeholder-black/50 outline-none"
            />
            <textarea
              placeholder={x.contact.form.message.toUpperCase()}
              rows={3}
              className="resize-none border-4 border-black bg-white px-4 py-3 text-sm text-black placeholder-black/50 outline-none"
            />
            <Link
              to={lh(x.contact.link.to)}
              prefetch="intent"
              style={black}
              className="border-4 border-black bg-black px-8 py-4 text-center text-lg uppercase text-yellow-300 transition-transform hover:-translate-y-1"
            >
              {x.contact.form.button} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
