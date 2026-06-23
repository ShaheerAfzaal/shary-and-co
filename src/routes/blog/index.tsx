import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog & Insights | Shary & Co" },
      { name: "description", content: "Guides, stories, and updates for medical students studying abroad." },
    ],
  }),
  component: BlogIndex,
});

const POSTS = [
  {
    slug: "is-azerbaijan-medical-university-right-for-you",
    title: "Is Azerbaijan Medical University Right for You? A Honest Guide",
    category: "Admissions",
    date: "June 2026",
    excerpt: "Everything you need to know about the Dual Degree MBBS + MPH program in Baku, from living costs to teaching quality.",
    image: "/proof/campus-life.jpeg"
  },
  {
    slug: "pmdc-recognition-for-pakistani-medical-students",
    title: "What Pakistani Medical Students Need to Know About PMDC Recognition",
    category: "Recognition",
    date: "May 2026",
    excerpt: "A deep dive into PMDC pathways, NEB exams, and why choosing a WDOMS-listed university is non-negotiable.",
    image: "/proof/whitecoat-group-1.jpeg"
  }
];

function BlogIndex() {
  return (
    <>
      <Hero />
      <BlogGrid />
    </>
  );
}

function Hero() {
  return (
    <section className="bg-navy py-[89px] md:py-[144px] text-white text-center px-[21px]">
      <div className="mx-auto max-w-[1144px]">
        <h1 className="text-[42px] font-extrabold tracking-tight md:text-[68px]">
          Insights & Advice for Medical Students Abroad
        </h1>
        <p className="mx-auto mt-[21px] max-w-2xl text-[16px] text-white/90 md:text-[26px]">
          Guides, stories, and updates from Shary & Co
        </p>
      </div>
    </section>
  );
}

function BlogGrid() {
  return (
    <section className="bg-surface py-[89px] md:py-[144px]">
      <div className="mx-auto max-w-[1144px] px-[21px]">
        <div className="grid gap-[34px] sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post) => (
            <article key={post.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="aspect-[4/3] overflow-hidden bg-navy/5">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center text-ink-muted">📷 Placeholder</div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-[34px]">
                <div className="flex items-center gap-[13px] text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-red">{post.category}</span>
                  <span className="text-ink-muted">{post.date}</span>
                </div>
                <h3 className="mt-[13px] text-[26px] font-bold leading-tight text-navy">
                  {post.title}
                </h3>
                <p className="mt-[21px] flex-1 text-[16px] text-ink-muted">
                  {post.excerpt}
                </p>
                <div className="mt-[34px]">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="inline-flex items-center font-bold text-red hover:text-red-dark"
                  >
                    Read More <span className="ml-[8px]" aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-[89px] rounded-2xl border border-dashed border-border bg-navy/5 py-[55px] text-center">
          <p className="text-[16px] font-bold text-navy">
            🚀 Coming Soon — More Articles Being Added
          </p>
          <p className="mt-[8px] text-[13px] text-ink-muted">
            Check back soon for more guides on studying medicine abroad.
          </p>
        </div>
      </div>
    </section>
  );
}
