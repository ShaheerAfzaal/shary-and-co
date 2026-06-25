import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} | Shary & Co` },
    ],
  }),
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-3xl px-[21px] py-[89px] md:py-[144px]">
        <Link to="/blog" className="inline-flex items-center text-[16px] font-bold text-red hover:underline mb-[34px]">
          ← Back to Blog
        </Link>
        <div className="flex items-center gap-[13px] text-[10px] font-bold uppercase tracking-wider mb-[21px]">
          <span className="text-red">Insight</span>
          <span className="text-ink-muted">2026</span>
        </div>
        <h1 className="text-[42px] font-extrabold tracking-tight text-navy md:text-[68px] leading-tight mb-[34px] capitalize">
          {slug.replace(/-/g, " ")}
        </h1>
        
        <div className="aspect-video w-full rounded-2xl bg-surface mb-[55px] overflow-hidden flex items-center justify-center border border-border">
          <span className="text-ink-muted">📷 Featured Image Placeholder</span>
        </div>

        <div className="prose prose-lg prose-headings:text-navy prose-a:text-red max-w-none text-ink-muted text-[16px] leading-relaxed">
          <p className="mb-[21px]">
            This is a placeholder article for the slug: <strong>{slug}</strong>. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <h2 className="text-[26px] font-bold text-navy mt-[55px] mb-[21px]">What You Need to Know</h2>
          <p className="mb-[21px]">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
            mollit anim id est laborum.
          </p>
          <ul className="list-disc pl-[21px] space-y-[13px] mb-[34px]">
            <li>First important point about studying abroad.</li>
            <li>Why PMDC recognition matters.</li>
            <li>How to budget for your living expenses.</li>
          </ul>
          <p className="mb-[21px]">
            For more details, contact our admissions team on WhatsApp. We offer free profile evaluation 
            and guidance for students and parents.
          </p>
        </div>
        
        <div className="mt-[89px] pt-[55px] border-t border-border flex flex-col sm:flex-row items-center justify-between gap-[34px]">
          <div>
            <h3 className="font-bold text-navy text-[26px]">Ready to apply?</h3>
            <p className="text-ink-muted text-[16px] mt-[8px]">Let us help you secure your seat today.</p>
          </div>
          <Link
            to="/"
            hash="apply"
            className="rounded-[6px] bg-[#C1121F] px-[34px] py-[13px] text-[16px] font-bold text-white transition hover:bg-[#9e0e19]"
          >
            Check Eligibility
          </Link>
        </div>
      </div>
    </article>
  );
}
