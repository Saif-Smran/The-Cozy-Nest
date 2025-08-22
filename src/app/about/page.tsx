import Image from 'next/image';
import heroImg from '@/Asset/Hero_Img.jpg';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="mx-auto w-11/12 max-w-7xl py-12 md:py-16 space-y-28">
      {/* Intro Section */}
      <section className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-base-300/60 dark:border-base-600/50 bg-base-100/60 dark:bg-base-300/30 backdrop-blur px-4 py-1.5 text-xs font-medium tracking-wide">
            Our Story
          </div>
          <h1 className="text-3xl sm:text-4xl xl:text-[3rem] font-semibold leading-tight tracking-tight">
            Creating Comfortable, Enriching Spaces For Every Pet
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-base-content/70 max-w-2xl">
            The Cozy Nest began with a simple belief: pets aren’t just animals—they’re family. We curate products that nurture wellbeing, inspire play, and build deeper bonds between people and their companions. Every item we feature is evaluated for comfort, safety, sustainability, and real pet joy.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-md pt-4">
            {[
              { label: 'Happy Customers', value: '8.5k+' },
              { label: 'Curated Products', value: '850+' },
              { label: 'Avg. Rating', value: '4.9' },
            ].map(s => (
              <div key={s.label} className="group relative rounded-2xl border border-base-300/50 dark:border-base-600/40 bg-base-100/50 dark:bg-base-300/30 backdrop-blur px-3 py-4 text-center transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20">
                <div className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:from-secondary group-hover:to-primary">{s.value}</div>
                <div className="mt-1 text-[0.65rem] uppercase tracking-wide text-base-content/60">{s.label}</div>
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5 group-hover:ring-primary/40" />
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm sm:max-w-md lg:max-w-full">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/25 via-primary/5 to-secondary/30 rounded-[2.2rem] blur-2xl" aria-hidden />
            <div className="relative h-full w-full rounded-[2rem] p-[2px] bg-gradient-to-br from-primary/50 via-base-200/40 to-secondary/50 shadow-lg shadow-primary/10">
              <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-base-100/60 dark:bg-base-300/40 backdrop-blur-xl border border-base-300/40 dark:border-base-600/40">
                <Image src={heroImg} alt="Our mission for pets" fill className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-base-100/40 via-transparent to-base-100/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Values */}
      <section className="space-y-14">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">What Drives Us</h2>
          <p className="text-base-content/70 leading-relaxed">
            We blend modern design with functional pet care. Our team collaborates with veterinarians, behavior specialists and responsible manufacturers to ensure every product supports physical comfort, mental stimulation, and emotional security.
          </p>
        </div>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            { title: 'Wellbeing First', text: 'Nutrition, textures, enrichment patterns and ergonomic shapes chosen to promote lifelong health.' },
            { title: 'Sustainable Choices', text: 'We prioritize durable, low-impact materials and partners reducing waste & emissions.' },
            { title: 'Thoughtful Curation', text: 'Every listing passes a multi-step review: safety, durability, comfort, enrichment value.' },
            { title: 'Community Focus', text: 'We reinvest a portion of proceeds into local shelters & rescue initiatives.' },
            { title: 'Transparent Standards', text: 'No greenwashing: clear sourcing, clear materials, honest performance claims.' },
            { title: 'Continuous Learning', text: 'We iterate offerings based on emerging veterinary insights & real customer feedback.' },
          ].map(card => (
            <div key={card.title} className="group relative overflow-hidden rounded-2xl border border-base-300/50 dark:border-base-600/40 bg-base-100/50 dark:bg-base-300/30 backdrop-blur p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20">
              <h3 className="font-medium tracking-tight text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:from-secondary group-hover:to-primary">{card.title}</h3>
              <p className="text-sm leading-relaxed text-base-content/70">{card.text}</p>
              <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5 group-hover:ring-primary/40" />
              <span className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/40 blur-3xl opacity-0 group-hover:opacity-60 transition" />
            </div>
          ))}
        </div>
      </section>

      {/* How We Curate */}
      <section className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 order-last lg:order-first">
          <div className="relative aspect-[4/5] w-full max-w-sm sm:max-w-md lg:max-w-full mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/25 via-primary/5 to-primary/30 rounded-[2.2rem] blur-2xl" aria-hidden />
            <div className="relative h-full w-full rounded-[2rem] p-[2px] bg-gradient-to-br from-secondary/50 via-base-200/30 to-primary/50 shadow-lg shadow-secondary/10">
              <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-base-100/60 dark:bg-base-300/40 backdrop-blur-xl border border-base-300/40 dark:border-base-600/40 flex items-center justify-center p-8">
                <div className="space-y-6 text-center">
                  <h3 className="text-xl font-semibold tracking-tight">Our Curation Flow</h3>
                  <ol className="text-left text-sm space-y-2 list-decimal list-inside text-base-content/70">
                    <li>Research & requirement mapping</li>
                    <li>Supplier + material verification</li>
                    <li>Safety & durability screening</li>
                    <li>Trial with real pet households</li>
                    <li>Continuous review cycle</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">How We Choose Products</h2>
          <p className="text-base-content/70 leading-relaxed">
            We don’t list everything. We shortlist what meets meaningful standards and fills real daily needs: proper joint support, slow-feeding to reduce bloat risk, enrichment toys that stimulate natural instincts, calm spaces that reduce anxiety, nutrient profiles tuned to life stage and species.
          </p>
          <p className="text-base-content/70 leading-relaxed">
            Data-informed evaluation is paired with human observation—watching how pets interact, chew patterns, wear tendencies, and multi-pet household dynamics. What fails, we iterate or reject.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            {['Lifecycle Fit','Safety First','Real Feedback'].map(label => (
              <div key={label} className="group relative rounded-xl border border-base-300/50 dark:border-base-600/40 bg-base-100/60 dark:bg-base-300/30 backdrop-blur p-4 text-center text-xs font-medium tracking-wide transition-all hover:-translate-y-1 hover:shadow-md hover:shadow-primary/20">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:from-secondary group-hover:to-primary">{label}</span>
                <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/5 group-hover:ring-primary/40" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden rounded-3xl border border-base-300/60 dark:border-base-600/50 bg-base-100/60 dark:bg-base-300/30 backdrop-blur-xl p-10 md:p-14">
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-secondary/25 blur-3xl" />
        <div className="relative max-w-3xl space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">Join Our Cozy Community</h2>
          <p className="text-base-content/70 leading-relaxed">Get early access to new drops, care guides, enrichment tips and exclusive offers that help you create a more comfortable, stimulating world for your pets.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg">
            <input type="email" required placeholder="Your email" className="input input-bordered flex-1 h-12 rounded-xl bg-base-100/70" />
            <button className="btn btn-primary h-12 rounded-xl flex-shrink-0">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
