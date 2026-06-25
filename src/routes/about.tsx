import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Shary & Co — Education Consultants" },
      { name: "description", content: "Meet Dr. Shaheer Bin Afzaal, founder of Shary & Co — a verified admissions consultancy founded by a doctor who graduated from Azerbaijan Medical University." },
    ],
  }),
  component: AboutPage,
});

const WHATSAPP_NUMBER = "923352982999";

function AboutPage() {
  return (
    <>
      <Hero />
      <FounderSection />
      <WhoWeAre />
      <WhatSetsUsApart />
      <OurMission />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="bg-navy py-[89px] md:py-[144px] text-white">
      <div className="mx-auto max-w-[1144px] px-[21px] text-center">
        <h1 className="text-[42px] font-extrabold tracking-tight md:text-[68px]">
          About Shary & Co
        </h1>
        <p className="mx-auto mt-[21px] max-w-2xl text-[16px] text-white/90 md:text-[26px]">
          A company for the students, of the students, and by the students.
        </p>
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="bg-surface py-[89px] md:py-[144px]">
      <div className="mx-auto max-w-3xl px-[21px]">
        <div>
          {/* Founder Bio */}
          <div>
            <span className="inline-block rounded-[6px] bg-[#C1121F] px-[13px] py-[8px] text-[10px] font-extrabold uppercase tracking-wider text-white">
              Founder
            </span>
            <h2 className="mt-[21px] text-[26px] font-extrabold tracking-tight text-navy md:text-[42px]">
              Dr. Shaheer Bin Afzaal
            </h2>
            <p className="mt-[21px] text-[16px] text-ink-muted leading-relaxed">
              A graduate of <strong className="text-navy">Azerbaijan Medical University (Class of 2023)</strong>, 
              Dr. Shaheer served as the Vice President of the International Students Association Azerbaijan. 
              He founded Shary & Co in 2019 with a simple mission: to help other aspiring students experience 
              the same world-class education and opportunities he received.
            </p>
            <p className="mt-[21px] text-[16px] text-ink-muted leading-relaxed">
              Since founding the company, Dr. Shaheer has personally helped over <strong className="text-navy">250+ students 
              from multiple countries</strong> secure admission to various medical universities across Europe — 
              making Shary & Co one of the most trusted names in international medical admissions.
            </p>
            <div className="mt-[34px] flex flex-wrap gap-[21px]">
              <div className="rounded-xl border border-border bg-white px-[21px] py-[13px] text-center shadow-sm">
                <div className="text-[26px] font-extrabold text-[#C1121F]">250+</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Students Helped</div>
              </div>
              <div className="rounded-xl border border-border bg-white px-[21px] py-[13px] text-center shadow-sm">
                <div className="text-[26px] font-extrabold text-[#C1121F]">7+</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Years Experience</div>
              </div>
              <div className="rounded-xl border border-border bg-white px-[21px] py-[13px] text-center shadow-sm">
                <div className="text-[26px] font-extrabold text-[#C1121F]">10+</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoWeAre() {
  return (
    <section className="bg-white py-[89px] md:py-[144px]">
      <div className="mx-auto max-w-3xl px-[21px]">
        <div>
          <h2 className="text-[26px] font-extrabold tracking-tight text-navy md:text-[42px]">
            Who We Are
          </h2>
          <p className="mt-[21px] text-[16px] text-ink-muted leading-relaxed">
            <strong className="text-navy">Shary & Co</strong> is a dedicated admission consultancy specializing
            in helping students secure admission to all universities in Azerbaijan. Founded by Dr. Shaheer,
            a graduate of Azerbaijan Medical University, the company was born from his desire to assist other
            aspiring students in experiencing the beauty and academic opportunities of this hidden gem of a country.
          </p>
          <p className="mt-[21px] text-[16px] text-ink-muted leading-relaxed">
            With over <strong className="text-navy">7 years</strong> of operational experience and more than
            <strong className="text-navy"> 100+ successful admissions abroad</strong>, Shary & Co has become a
            trusted guide for students seeking a bright future in Azerbaijan's esteemed educational institutions.
            In addition to admissions, the company arranges trips for parents, provides access to student grades,
            and offers career guidance post-graduation, ensuring comprehensive support throughout the entire academic journey.
          </p>
        </div>
      </div>
    </section>
  );
}

function WhatSetsUsApart() {
  const points = [
    {
      icon: "🩺",
      title: "Founded by a Doctor",
      body: "We are the only student recruitment agency set up by doctors who graduated after studying medicine abroad themselves.",
    },
    {
      icon: "🤝",
      title: "Ethical & Transparent",
      body: "No hidden fees, no surprises. We provide clear, written terms and honest guidance at every step of the process.",
    },
    {
      icon: "🌍",
      title: "Global Reach",
      body: "We've helped students from 10+ countries including Pakistan, India, UAE, Saudi Arabia, and beyond.",
    },
    {
      icon: "📞",
      title: "24/7 Support in Azerbaijan",
      body: "Our on-ground team in Baku provides round-the-clock support — from airport pickup to settling in.",
    },
  ];

  return (
    <section className="bg-surface py-[89px] md:py-[144px]">
      <div className="mx-auto max-w-[1144px] px-[21px]">
        <h2 className="text-center text-[26px] font-extrabold tracking-tight text-navy md:text-[42px]">
          What Sets Us Apart
        </h2>
        <p className="mx-auto mt-[21px] max-w-2xl text-center text-[16px] text-ink-muted">
          We don't just process applications — we support each student's entire journey to becoming a doctor.
        </p>
        <div className="mt-[55px] grid gap-[34px] md:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-white p-[34px] shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-[42px]">{p.icon}</div>
              <h3 className="mt-[21px] text-[26px] font-bold text-navy">{p.title}</h3>
              <p className="mt-[13px] text-[16px] text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurMission() {
  return (
    <section className="bg-navy py-[89px] md:py-[144px] text-white">
      <div className="mx-auto max-w-[1144px] px-[21px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[26px] font-extrabold tracking-tight md:text-[42px]">
            Our Mission
          </h2>
          <p className="mt-[34px] text-[16px] text-white/90 leading-relaxed md:text-[26px]">
            "To simplify the intricate process of pursuing medical education, offering transparent 
            and personalized guidance. We ensure that each student's journey to becoming a doctor 
            is supported by a reliable and ethical partner."
          </p>
          <p className="mt-[21px] text-[16px] text-white/70">
            Join Shary & Co, where trust meets success, and let us pave the way for your future 
            in the world of healthcare.
          </p>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="hero-pattern relative text-white py-[89px] md:py-[144px]">
      <div className="relative mx-auto max-w-[1144px] px-[21px] text-center">
        <h2 className="text-[26px] font-extrabold tracking-tight md:text-[42px]">
          Ready to start your journey?
        </h2>
        <p className="mx-auto mt-[21px] max-w-2xl text-[16px] text-white/90">
          Join hundreds of successful students who have trusted Shary & Co.
        </p>
        <div className="mt-[55px] flex flex-col sm:flex-row items-center justify-center gap-[21px]">
          <Link
            to="/"
            hash="apply"
            className="inline-flex items-center justify-center rounded-[6px] bg-[#C1121F] px-[55px] py-[21px] text-[16px] font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#9e0e19]"
          >
            Check Eligibility →
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Shary & Co, I'd like to learn more about your services.")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-[8px] rounded-[6px] bg-[#25D366] px-[34px] py-[21px] text-[16px] font-bold text-white transition hover:bg-[#20BA5E]"
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
