import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { submitLead } from "@/lib/lead.functions";

/* ============================================================================
   SHARY & CO — Azerbaijan Medical University landing page
   Goal: Meta-ad / organic traffic -> watch video + see proof -> "Check
   Eligibility" form -> fires Meta Pixel "Lead" + writes to CRM -> redirects
   straight into WhatsApp so there is zero follow-up delay.

   👉 THINGS YOU WILL EDIT LATER (all marked with "EDIT:")
   - VIDEO_EMBED_URL   : paste your explainer-video embed link
   - VITE_META_PIXEL_ID: set in your .env to switch the Meta Pixel on
   - LEAD_WEBHOOK_URL   : set in your env to push leads into Google Sheets
   - Credibility images : drop files into /public and fill the arrays below
   ============================================================================ */

// --- Campaign config -------------------------------------------------------
const WHATSAPP_NUMBER = "923352982999"; // +92 335 2982999 (digits only, intl)
const DEADLINE = "25 August 2025";
const CLASS_START = "15 September 2025";
const TUITION_PER_YEAR = "$7,950";

// EDIT: paste your explainer video embed URL here (YouTube/Vimeo "embed" link,
// e.g. "https://www.youtube.com/embed/XXXXXXXX"). Leave "" to show a placeholder.
const VIDEO_EMBED_URL = "https://www.youtube.com/embed/8rhreSJXnko";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Study MBBS in Azerbaijan — Dual Degree MBBS + MPH | Shary & Co" },
      {
        name: "description",
        content:
          "Globally recognised Dual Degree MBBS/MD + MPH at Azerbaijan Medical University for $7,950/year. No entry test, no foundation year. September intake — check your eligibility in 60 seconds.",
      },
      { property: "og:title", content: "Study MBBS in Azerbaijan — Dual Degree | Shary & Co" },
      {
        property: "og:description",
        content:
          "Globally recognised Dual Degree MBBS + MPH for $7,950/year. September intake. Check your eligibility now."
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SharyLanding,
});

/* -------------------------------------------------------------------------- */
/* Meta Pixel helpers                                                          */
/* -------------------------------------------------------------------------- */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/** Injects the Meta Pixel base code once, if VITE_META_PIXEL_ID is set. */
function useMetaPixel() {
  useEffect(() => {
    const id = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
    const w = window as any;
    if (!id || w.fbq) return;
    // Standard Meta Pixel base snippet (typed via `any` on purpose).
    const fbq: any = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    w.fbq = fbq;
    if (!w._fbq) w._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    const t = document.createElement("script");
    t.async = true;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    const s = document.getElementsByTagName("script")[0];
    s.parentNode?.insertBefore(t, s);
    w.fbq("init", id);
    w.fbq("track", "PageView");
  }, []);
}

/** Fire the all-important "Lead" conversion event. */
function fireLeadEvent() {
  window.fbq?.("track", "Lead", { content_name: "Azerbaijan MBBS Eligibility" });
}

/** Countdown Timer Component */
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // August 25, 2025 23:59 PKT (UTC+5)
      // Create date in PKT timezone
      const targetDate = new Date("2025-08-25T23:59:00+05:00").getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 rounded-lg bg-white/10 p-6 text-center">
      <p className="text-sm text-white/80">⚠️ Limited seats — September intake closes in:</p>
      <div className="mt-4 flex justify-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-red md:text-4xl">{String(timeLeft.days).padStart(2, "0")}</span>
          <span className="text-xs text-white/70 md:text-sm">Days</span>
        </div>
        <span className="text-2xl font-bold text-red md:text-3xl">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-red md:text-4xl">{String(timeLeft.hours).padStart(2, "0")}</span>
          <span className="text-xs text-white/70 md:text-sm">Hours</span>
        </div>
        <span className="text-2xl font-bold text-red md:text-3xl">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-red md:text-4xl">{String(timeLeft.minutes).padStart(2, "0")}</span>
          <span className="text-xs text-white/70 md:text-sm">Minutes</span>
        </div>
        <span className="text-2xl font-bold text-red md:text-3xl">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-red md:text-4xl">{String(timeLeft.seconds).padStart(2, "0")}</span>
          <span className="text-xs text-white/70 md:text-sm">Seconds</span>
        </div>
      </div>
    </div>
  );
}

/** WhatsApp SVG Icon Component */
function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

function scrollToForm() {
  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SharyLanding() {
  useMetaPixel();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Accreditations />
      <Offer />
      <FeeBreakdown />
      <Credibility />
      <HowItWorks />
      <EligibilitySection />
      <Faq />
      <FinalCTA />
      <Footer />
      <MobileStickyBar />
    </div>
  );
}

/* ---------------- NAV ---------------- */

function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <img src="/brand/logo-new.png" alt="Shary & Co" className="h-10 w-auto" />
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-teal text-navy shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Logo light />
        <nav className="hidden gap-8 text-base font-bold text-navy md:flex">
          <a href="#offer" className="rounded-lg px-3 py-2 transition hover:bg-navy/10 hover:outline hover:outline-2 hover:outline-navy focus:bg-navy/10 focus:outline focus:outline-2 focus:outline-navy">
            The Program
          </a>
          <a href="#fees" className="rounded-lg px-3 py-2 transition hover:bg-navy/10 hover:outline hover:outline-2 hover:outline-navy focus:bg-navy/10 focus:outline focus:outline-2 focus:outline-navy">
            Fees
          </a>
          <a href="#proof" className="rounded-lg px-3 py-2 transition hover:bg-navy/10 hover:outline hover:outline-2 hover:outline-navy focus:bg-navy/10 focus:outline focus:outline-2 focus:outline-navy">
            Success Stories
          </a>
          <a href="#faq" className="rounded-lg px-3 py-2 transition hover:bg-navy/10 hover:outline hover:outline-2 hover:outline-navy focus:bg-navy/10 focus:outline focus:outline-2 focus:outline-navy">
            FAQ
          </a>
        </nav>
        <button
          onClick={scrollToForm}
          className="rounded-full bg-red px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-dark"
        >
          Check Eligibility
        </button>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="hero-pattern relative">
      <div className="plus-pattern absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-12 md:grid-cols-2 md:gap-14 md:pb-24 md:pt-16">
        <div className="fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" /> September Intake · Admissions close {DEADLINE}
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-[1.08] tracking-tight text-white md:text-5xl">
            Become a Doctor with a Globally Recognised{" "}
            <span className="text-amber-300">Dual Degree MBBS + MPH</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg font-medium text-white/90 md:text-xl">
            Study medicine at Azerbaijan Medical University for just {TUITION_PER_YEAR}/year.
            No entry test. No foundation year. Recognised by PMDC, WHO &amp; WFME.
          </p>
          <ul className="mt-5 grid max-w-md gap-2 text-sm text-white/90 sm:grid-cols-2">
            {[
              "Globally recognised degree",
              "USMLE / ECFMG eligible",
              "Direct entry to Year 1",
              "Affordable living (~$250/mo)",
            ].map((b) => (
              <li key={b} className="flex items-center gap-2">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-xs">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-base font-bold text-navy shadow-lg transition hover:-translate-y-0.5"
            >
              Check Your Eligibility — Free <span aria-hidden>→</span>
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                "Hi Shary & Co, I want to know about the Azerbaijan Dual Degree MBBS program.",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#20BA5E]"
            >
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
          </div>
          <CountdownTimer />
          <p className="mt-4 text-xs text-white/70">
            🔒 Your details are private. Classes begin {CLASS_START}.
          </p>
        </div>

        {/* VIDEO */}
        <div className="fade-in-up">
          <VideoEmbed />
        </div>
      </div>
    </section>
  );
}

function VideoEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-black/30 shadow-2xl">
      <div className="relative aspect-video w-full bg-navy-dark">
        {VIDEO_EMBED_URL ? (
          <iframe
            src={VIDEO_EMBED_URL}
            title="Azerbaijan Medical University — Program Overview"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-white/80">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <p className="px-6 text-sm font-medium">
              ▶ Your explainer video goes here
              <br />
              <span className="text-xs text-white/55">Paste the embed URL into VIDEO_EMBED_URL</span>
            </p>
          </div>
        )}
      </div>
      <div className="bg-white/95 px-4 py-3 text-center text-sm font-semibold text-navy">
        Watch: How the Dual Degree program works (2 min)
      </div>
    </div>
  );
}

/* ---------------- ACCREDITATIONS ---------------- */

function Accreditations() {
  // EDIT: replace these with verified accreditation logos in /public when ready.
  const badges = ["WDOMS", "PMDC", "WHO", "WFME", "ECFMG / USMLE", "IARR"];
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-ink-muted">
          Globally recognised &amp; internationally respected
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:gap-5">
          {badges.map((b) => (
            <span
              key={b}
              className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-bold text-navy"
            >
              {b}
            </span>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-ink-muted">
          {/* COMPLIANCE: only display badges you can verify on the official register. */}
          Verify recognition status yourself — we'll send you the official listings.
        </p>
      </div>
    </section>
  );
}

/* ---------------- OFFER ---------------- */

function Offer() {
  const points = [
    {
      icon: "🎓",
      title: "Two degrees, one program",
      body: "Graduate with both an MBBS/MD and a Master of Public Health (MPH) — a combination that sets you apart globally.",
    },
    {
      icon: "🌍",
      title: "Practise anywhere",
      body: "Recognised by PMDC, WHO, WFME and eligible for USMLE/ECFMG — work in Pakistan, the Gulf, the US, UK and beyond.",
    },
    {
      icon: "⚡",
      title: "Direct entry, no entry test",
      body: "No foundation year and no interview for eligible applicants. Apply with FSc, A-Levels, Class 12 or an American diploma.",
    },
    {
      icon: "💰",
      title: "Affordable, transparent",
      body: `Tuition around ${TUITION_PER_YEAR}/year with living costs from just ~$250/month. No hidden charges.`,
    },
  ];
  return (
    <section id="offer" className="bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Why students choose the Azerbaijan Dual Degree
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            A globally respected medical education — without the crippling cost of private colleges.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {points.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-3xl">{p.icon}</div>
              <h3 className="mt-3 text-xl font-bold text-navy">{p.title}</h3>
              <p className="mt-2 text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FEES ---------------- */

function FeeBreakdown() {
  const rows = [
    { item: "Tuition — Year 1", cost: "$9,750", note: "First year only" },
    { item: "Tuition — Years 2–6", cost: "$7,950 / year", note: "For years 2 to 6" },
    { item: "Hostel / Accommodation", cost: "$700 / year", note: "Per year" },
    { item: "Service Charges", cost: "$1,000", note: "One-time payment" },
    { item: "Living Expenses", cost: "$180–250 / month", note: "Food, transport, utilities (excluding housing)" },
  ];
  return (
    <section id="fees" className="bg-white">
      <div className="mx-auto max-w-5xl px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Transparent fee breakdown
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            No hidden charges. Student-friendly pricing — here's exactly what it costs.
          </p>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-sm">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-navy text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Expense</th>
                <th className="px-5 py-4 font-semibold">Cost (USD)</th>
                <th className="hidden px-5 py-4 font-semibold sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.item} className={i % 2 ? "bg-surface" : "bg-white"}>
                  <td className="px-5 py-4 font-medium text-navy">{r.item}</td>
                  <td className="px-5 py-4 font-bold text-red">{r.cost}</td>
                  <td className="hidden px-5 py-4 text-ink-muted sm:table-cell">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-center text-sm font-semibold text-navy">
          ✅ No hidden charges &nbsp;·&nbsp; Average living cost ~$250/month
        </p>
      </div>
    </section>
  );
}

/* ---------------- CREDIBILITY ---------------- */

function Credibility() {
  // EDIT: drop real images into /public (e.g. /public/proof/) and reference
  // them here as `image: "/proof/student1.jpg"`. Leave image undefined to show
  // a labelled placeholder slot you can fill later.
  const stories: { name: string; detail: string; image?: string }[] = [
    {
      name: "Ambassador Bilal Hayee & Dr. Shaheer",
      detail: "Our students at Azerbaijan Medical University",
      image: "/proof/amu-with-ambassador.jpeg",
    },
    {
      name: "Whitecoat Ceremony",
      detail: "Students at Azerbaijan Medical University",
      image: "/proof/whitecoat-group-1.jpeg",
    },
    {
      name: "Whitecoat Ceremony",
      detail: "Students at Azerbaijan Medical University",
      image: "/proof/whitecoat-group-2.jpeg",
    },
    { name: "Campus Life", detail: "Student groups on campus", image: "/proof/campus-life.jpeg" },
    {
      name: "Baku Excursions",
      detail: "Students on a lake excursion",
      image: "/proof/lake-trip.jpeg",
    },
    {
      name: "Pakistan Independence Day",
      detail: "Students with Pakistan flag on Baku streets",
      image: "/proof/pakistan-independence-day.jpeg",
    },
  ];
  return (
    <section id="proof" className="bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            100+ successful admissions &amp; counting
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            7+ Years Experience · 550+ Students Guided · 10+ Countries Served. From our previous
            batches to postgraduate success in the USA.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s, i) => (
            <figure
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
            >
              {/* IMAGE SLOT — fill with a real photo later */}
              <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-navy/10 to-red/10 text-center text-xs font-medium text-ink-muted">
                {s.image ? (
                  <img src={s.image} alt={s.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="px-4">📷 Photo / screenshot slot</span>
                )}
              </div>
              <figcaption className="p-5">
                <div className="font-bold text-navy">{s.name}</div>
                <div className="mt-1 text-sm text-ink-muted">{s.detail}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-muted">
          {/* You can also embed video testimonials or Instagram reels here later. */}
          Want more proof? Ask on WhatsApp and we'll connect you with current students.
        </p>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */

function HowItWorks() {
  const steps = [
    {
      title: "Document Submission",
      body: "Send your application form, certificates, passport and photo.",
    },
    {
      title: "Acceptance Letter",
      body: "Receive your official admission letter from the university.",
    },
    {
      title: "Tuition Payment",
      body: "Secure your seat with the first payment — clear, written terms.",
    },
    { title: "Visa & Tickets", body: "We guide you through the visa and travel arrangements." },
    {
      title: "Start Classes",
      body: `Fly to Baku and begin your medical journey on ${CLASS_START}.`,
    },
  ];
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-4xl">
          5 simple steps from applying to your first class
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-2xl border border-white/15 bg-white/5 p-6"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red text-sm font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-white/75">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ELIGIBILITY FORM ---------------- */

const QUALIFICATIONS = [
  "FSc Pre-Medical (Pakistan)",
  "A-Levels (British curriculum)",
  "Class 12 Science (India)",
  "American High School Diploma",
  "Other",
];
const INTAKES = ["September 2026 (this intake)", "A future intake"];

const inputCls =
  "w-full rounded-lg border border-border bg-white px-4 py-3 text-base text-navy placeholder:text-ink-muted/60 transition focus:border-red focus:outline-none focus:ring-4 focus:ring-red/15";

function FieldShell({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
        {required && <span className="ml-1 text-red">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-muted">{hint}</span>}
    </label>
  );
}

function EligibilitySection() {
  return (
    <section id="apply" className="bg-surface">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Check your eligibility — free, 60 seconds
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Tell us about yourself and we'll confirm your eligibility on WhatsApp right away.
          </p>
        </div>
        <div className="mt-10">
          <EligibilityForm />
        </div>
      </div>
    </section>
  );
}

function EligibilityForm() {
  const submit = useServerFn(submitLead);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function buildWhatsAppUrl(name: string, qualification: string, intake: string) {
    const msg =
      `Hi Shary & Co! I just checked my eligibility on your website.\n\n` +
      `Name: ${name}\n` +
      `Qualification: ${qualification}\n` +
      `Intake: ${intake}\n\n` +
      `I'd like to know if I qualify for the Azerbaijan Dual Degree MBBS program.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const data = {
      student_name: String(fd.get("student_name") ?? "").trim(),
      student_whatsapp: String(fd.get("student_whatsapp") ?? "").trim(),
      parent_whatsapp: String(fd.get("parent_whatsapp") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      country: String(fd.get("country") ?? "").trim(),
      qualification: String(fd.get("qualification") ?? "").trim(),
      grades: String(fd.get("grades") ?? "").trim(),
      intake: String(fd.get("intake") ?? "").trim(),
      budget: String(fd.get("budget") ?? "").trim(),
    };

    if (!data.student_name) return setError("Please enter your full name.");
    if (data.student_whatsapp.replace(/\D/g, "").length < 8)
      return setError("Please enter a valid WhatsApp number with country code.");

    setSubmitting(true);
    // 1. Fire the Meta Pixel conversion event (the whole point of the page).
    fireLeadEvent();
    // 2. Push the lead to the CRM (never block the user on this).
    try {
      await submit({ data });
    } catch {
      /* lead is still logged server-side; continue to WhatsApp regardless */
    }
    // 3. Send them straight into WhatsApp — zero follow-up delay.
    const url = buildWhatsAppUrl(data.student_name, data.qualification, data.intake);
    setDone(true);
    setSubmitting(false);
    window.open(url, "_blank");
  }

  if (done) return <SuccessCard name="" />;

  return (
    <div className="card-shadow overflow-hidden rounded-2xl border border-border bg-white">
      <div className="border-t-[5px] border-red p-7 md:p-9">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <FieldShell label="Student's Full Name" required>
              <input
                name="student_name"
                required
                className={inputCls}
                placeholder="e.g. Ahmed Khan"
              />
            </FieldShell>
            <FieldShell label="Your Country" hint="Where you currently live">
              <input
                name="country"
                className={inputCls}
                placeholder="e.g. UAE, Saudi Arabia, Pakistan"
              />
            </FieldShell>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <FieldShell label="Student's WhatsApp" required hint="Include country code">
              <input
                type="tel"
                name="student_whatsapp"
                required
                className={inputCls}
                placeholder="+971 5X XXX XXXX"
                inputMode="tel"
              />
            </FieldShell>
            <FieldShell label="Parent's WhatsApp" hint="Optional — helps us keep family informed">
              <input
                type="tel"
                name="parent_whatsapp"
                className={inputCls}
                placeholder="+92 3XX XXXXXXX"
                inputMode="tel"
              />
            </FieldShell>
          </div>

          <FieldShell label="Email Address">
            <input type="email" name="email" className={inputCls} placeholder="you@example.com" />
          </FieldShell>

          <div className="grid gap-5 sm:grid-cols-2">
            <FieldShell label="Your Qualification" required>
              <select name="qualification" required defaultValue="" className={inputCls}>
                <option value="" disabled>
                  Select qualification
                </option>
                {QUALIFICATIONS.map((q) => (
                  <option key={q}>{q}</option>
                ))}
              </select>
            </FieldShell>
            <FieldShell label="Grades / Percentage" required hint="Your latest result">
              <input
                name="grades"
                required
                className={inputCls}
                placeholder="e.g. 75% / 3.5 GPA / A,B,B"
              />
            </FieldShell>
          </div>

          <FieldShell label="Desired Intake" required>
            <select name="intake" required defaultValue="" className={inputCls}>
              <option value="" disabled>
                Select intake
              </option>
              {INTAKES.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </FieldShell>

          <FieldShell label="Budget" required>
            <select name="budget" required defaultValue="" className={inputCls}>
              <option value="" disabled>
                Select budget range
              </option>
              <option>Less than $5,000</option>
              <option>$5,000–$10,000</option>
              <option>More than $10,000</option>
            </select>
          </FieldShell>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-red px-6 py-4 text-base font-bold text-white shadow-lg shadow-red/20 transition hover:-translate-y-0.5 hover:bg-red-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Checking..." : "Check My Eligibility →"}
          </button>
          <p className="text-center text-xs text-ink-muted">
            ✓ Free &nbsp; ✓ No obligation &nbsp; ✓ You'll be connected on WhatsApp instantly
          </p>
        </form>
      </div>
    </div>
  );
}

function SuccessCard({ name }: { name: string }) {
  const fallbackUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Shary & Co, I just submitted the eligibility form on your website.",
  )}`;
  return (
    <div className="overflow-hidden rounded-2xl border border-red/30 bg-white p-10 text-center shadow-xl shadow-red/10">
      <div className="text-5xl">✅</div>
      <h3 className="mt-4 text-2xl font-bold text-navy">
        {name ? `Thanks, ${name}!` : "You're almost there!"}
      </h3>
      <p className="mt-3 text-ink-muted">
        We're opening WhatsApp so our team can confirm your eligibility and send you the full
        program details. If it didn't open automatically, tap below.
      </p>
      <a
        href={fallbackUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-red px-6 py-4 text-base font-bold text-white transition hover:bg-red-dark"
      >
        Continue on WhatsApp →
      </a>
    </div>
  );
}

/* ---------------- FAQ ---------------- */

function Faq() {
  const items = [
    {
      q: "Is this degree recognised in Pakistan (PMDC)?",
      a: "Azerbaijan Medical University is listed on international medical registers, and we'll send you the official recognition listings so you can verify it yourself before you commit.",
    },
    {
      q: "Can I do USMLE or practise in the US / UK?",
      a: "Yes — the degree is WDOMS-listed and ECFMG/USMLE eligible, which is the pathway to practise in the US, and recognised across the UK, Gulf and beyond.",
    },
    {
      q: "Is there an entry test or interview?",
      a: "No entry test and no foundation year for eligible applicants. An interview is not required for the Dual Degree program, subject to profile evaluation.",
    },
    {
      q: "Is Azerbaijan safe for Pakistani students?",
      a: "Azerbaijan is a Muslim-majority country with halal food, mosques and a large, welcoming international student community. We'll connect you with current students.",
    },
    {
      q: "What does it really cost in total?",
      a: `Tuition is around ${TUITION_PER_YEAR}/year with living costs of roughly $250/month and no hidden charges. See the full fee breakdown above.`,
    },
    {
      q: "How do I know this isn't a scam?",
      a: "We're a licensed, verified admissions partner with 7+ years of experience and 100+ successful admissions. You can verify the university on official registers, talk to current students, and we provide 24/7 local support in Azerbaijan.",
    },
  ];
  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          Questions parents &amp; students ask
        </h2>
        <div className="mt-10 space-y-4">
          {items.map((it) => (
            <details
              key={it.q}
              className="group rounded-xl border border-border bg-surface p-5 [&_summary]:cursor-pointer"
            >
              <summary className="flex items-center justify-between font-semibold text-navy">
                {it.q}
                <span className="ml-4 text-red transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-ink-muted">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */

function FinalCTA() {
  return (
    <section className="hero-pattern relative">
      <div className="relative mx-auto max-w-4xl px-5 py-16 text-center md:py-24">
        <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Admissions close {DEADLINE}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
          Seats for the September intake are limited and visa processing takes time. Check your
          eligibility today — it's free and takes 60 seconds.
        </p>
        <div className="mt-9">
          <button
            onClick={scrollToForm}
            className="rounded-xl bg-white px-8 py-4 text-base font-bold text-navy shadow-lg transition hover:-translate-y-0.5"
          >
            Check My Eligibility — Free →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-8 md:grid-cols-3 md:items-center">
          <div>
            <Logo light />
            <p className="mt-2 text-sm text-white/60">
              Verified &amp; transparent process — helping students study medicine abroad with 24/7
              local support.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-white">
              WhatsApp
            </a>
            <a href="https://instagram.com/shary_and_co" className="hover:text-white">
              Instagram
            </a>
            {/* EDIT: add a real privacy policy page (required for Meta ads). */}
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
          </nav>
          <div className="text-sm md:text-right">
            📞 +92 335 2982999
            <br />
            sharyandco.apply@gmail.com
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © 2026 Shary &amp; Co. — Azerbaijan Medical University admissions.
        </div>
      </div>
      <div className="h-20 md:hidden" />
    </footer>
  );
}

/* ---------------- MOBILE STICKY ---------------- */

function MobileStickyBar() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 p-3 backdrop-blur transition md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <button
        onClick={scrollToForm}
        className="w-full rounded-lg bg-red px-4 py-3 text-sm font-bold text-white"
      >
        Check My Eligibility — Free →
      </button>
    </div>
  );
}
