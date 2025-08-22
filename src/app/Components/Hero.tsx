import React from 'react';
import Image from 'next/image';
import heroImg from '@/Asset/Hero_Img.jpg';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 md:pt-16 lg:pt-20">
      {/* Background decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-15%] left-[10%] h-[38vw] w-[38vw] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[5%] h-[30vw] w-[30vw] rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="mx-auto w-11/12 max-w-7xl grid gap-10 lg:gap-16 items-center lg:grid-cols-12">
        {/* Copy side (golden ratio ~ 61.8%) */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-base-300/60 dark:border-base-700/60 bg-base-100/60 dark:bg-base-300/40 px-4 py-1.5 backdrop-blur-md shadow-sm text-xs md:text-sm font-medium">
            <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
            Trusted comfort for every companion
          </div>
          <h1 className="font-semibold tracking-tight text-4xl sm:text-5xl xl:text-[3.4rem] leading-[1.08]">
            Create a <span className="text-primary">Cozy</span> Life<br className="hidden sm:block" /> For Your Pets
          </h1>
            <p className="max-w-xl text-base md:text-lg leading-relaxed text-base-content/70">
              Premium nutrition, enriching toys, smart accessories and soft spaces—curated with love and guided by what pets truly need. Discover products that nurture wellbeing and strengthen the bond you share.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/products" className="btn btn-primary btn-lg shadow-primary/30 shadow-md">
                Shop Now
              </Link>
              <Link href="/about" className="btn btn-outline btn-lg backdrop-blur">
                Our Story
              </Link>
            </div>
            {/* Glass stats card */}
            <div className="mt-10 grid w-full max-w-lg grid-cols-3 gap-4 text-center">
              {[
                { label: 'Happy Pets', value: '12k+' },
                { label: 'Curated Items', value: '850+' },
                { label: 'Avg. Rating', value: '4.9' },
              ].map(item => (
                <div
                  key={item.label}
                  tabIndex={0}
                  className="group relative overflow-hidden rounded-2xl border border-base-300/50 dark:border-base-600/40 bg-base-100/50 dark:bg-base-300/30 backdrop-blur-md px-2 py-4 shadow-sm transition-all duration-300 ease-out will-change-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 focus-visible:-translate-y-1 focus-visible:shadow-lg focus-visible:shadow-primary/25"
                  aria-label={`${item.value} ${item.label}`}
                >
                  {/* animated gradient sheen */}
                  <span className="pointer-events-none absolute inset-0 opacity-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.primary/35),transparent_60%)] transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <span className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/30 via-transparent to-secondary/40 opacity-0 mix-blend-overlay group-hover:opacity-70 group-focus-visible:opacity-70 transition-opacity duration-300" />
                  <div className="relative text-lg md:text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:from-secondary group-hover:to-primary">
                    {item.value}
                  </div>
                  <div className="relative mt-0.5 text-[0.65rem] md:text-xs uppercase tracking-wide text-base-content/60 group-hover:text-base-content/80">
                    {item.label}
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5 group-hover:ring-primary/40 group-focus-visible:ring-primary/50" />
                </div>
              ))}
            </div>
        </div>
        {/* Visual side (golden ratio ~ 38.2%) */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm sm:max-w-md lg:max-w-full">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/25 via-primary/5 to-secondary/30 rounded-[2.2rem] blur-2xl" aria-hidden />
            <div className="relative h-full w-full rounded-[2rem] p-[2px] bg-gradient-to-br from-primary/50 via-base-200/40 to-secondary/50 shadow-lg shadow-primary/10">
              <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-base-100/60 dark:bg-base-300/40 backdrop-blur-xl border border-base-300/40 dark:border-base-600/40">
                <Image
                  src={heroImg}
                  alt="Happy pets enjoying cozy products"
                  fill
                  className="object-cover object-center scale-[1.02]" />
                {/* subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-base-100/40 via-transparent to-base-100/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
