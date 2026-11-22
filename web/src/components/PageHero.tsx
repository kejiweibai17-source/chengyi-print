type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <p className="text-xs tracking-[0.28em] text-brand uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display-tc)] text-3xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
