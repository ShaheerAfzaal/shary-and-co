import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { submitLead } from "@/lib/lead.functions";

/* ============================================================================
   SHARY & CO — Azerbaijan Medical University landing page
   ============================================================================ */

const WHATSAPP_NUMBER = "923352982999"; 
const DEADLINE = "25 August 2026";
const CLASS_START = "15 September 2026";
const TUITION_PER_YEAR = "$7,950";
const VIDEO_EMBED_URL = "https://www.youtube.com/embed/8rhreSJXnko";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Study MBBS in Azerbaijan — Dual Degree MBBS + MPH | Shary & Co" },
    ],
  }),
  component: SharyLanding,
});

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fireLeadEvent() {
  window.fbq?.("track", "Lead", { content_name: "Azerbaijan MBBS Eligibility", content_category: "CTA" });
}

function fireCompleteRegistrationEvent() {
  window.fbq?.("track", "CompleteRegistration", { content_name: "eligibility_form_submitted", content_category: "Lead Form" });
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
      const targetDate = new Date("2026-08-25T23:59:00+05:00").getTime();
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
    <div className="mt-[34px] rounded-lg bg-[#222222] p-[21px] text-center">
      <p className="text-sm font-semibold text-[#FAF7F2]">Limited seats — September intake closes in:</p>
      <div className="mt-[21px] flex justify-center gap-[21px]">
        <div className="flex flex-col items-center">
          <span className="text-[26px] font-bold text-[#D4A017] md:text-[42px]">{String(timeLeft.days).padStart(2, "0")}</span>
          <span className="text-xs font-semibold text-[#FAF7F2] md:text-sm">Days</span>
        </div>
        <span className="text-[26px] font-bold text-[#D4A017] md:text-[42px]">:</span>
        <div className="flex flex-col items-center">
          <span className="text-[26px] font-bold text-[#D4A017] md:text-[42px]">{String(timeLeft.hours).padStart(2, "0")}</span>
          <span className="text-xs font-semibold text-[#FAF7F2] md:text-sm">Hours</span>
        </div>
        <span className="text-[26px] font-bold text-[#D4A017] md:text-[42px]">:</span>
        <div className="flex flex-col items-center">
          <span className="text-[26px] font-bold text-[#D4A017] md:text-[42px]">{String(timeLeft.minutes).padStart(2, "0")}</span>
          <span className="text-xs font-semibold text-[#FAF7F2] md:text-sm">Minutes</span>
        </div>
        <span className="text-[26px] font-bold text-[#D4A017] md:text-[42px]">:</span>
        <div className="flex flex-col items-center">
          <span className="text-[26px] font-bold text-[#D4A017] md:text-[42px]">{String(timeLeft.seconds).padStart(2, "0")}</span>
          <span className="text-xs font-semibold text-[#FAF7F2] md:text-sm">Seconds</span>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}

function scrollToForm() {
  document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SharyLanding() {
  return (
    <>
      <Hero />
      <Offer />
      <FeeBreakdown />
      <CredibilityCarousel />
      <HowItWorks />
      <EligibilitySection />
      <Faq />
      <FinalCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="bg-[#FAF7F2]">
      <div className="mx-auto grid max-w-[1144px] items-center gap-[55px] px-[21px] pb-[89px] pt-[55px] md:grid-cols-[38fr_62fr] md:gap-[55px] md:pb-[144px] md:pt-[89px]">
        <div className="fade-in-up">
          <h1 className="font-serif text-[40px] font-semibold leading-[1.06] tracking-tight text-[#222222] sm:text-[52px] md:text-[60px] lg:text-[68px]">
            Become a Doctor with a Globally Recognised{" "}
            <span className="text-[#C1121F]">Dual Degree</span>{" "}
            <span className="text-[#D4A017]">MBBS + MPH</span>
          </h1>
          <p className="mt-[21px] max-w-xl font-montserrat text-[16px] leading-relaxed text-[#222222]/80 md:text-[18px]">
            Study medicine at Azerbaijan Medical University from just {TUITION_PER_YEAR}/year.
            No entry test. No foundation year. Recognised by PMDC, WHO &amp; WFME.
            {/* TODO: accreditation — verify "PMDC, WHO & WFME" recognition wording before ad launch */}
          </p>
          <ul className="mt-[21px] grid max-w-md gap-[13px] font-montserrat text-[15px] text-[#222222] sm:grid-cols-2">
            {[
              "Globally recognised degree",
              "USMLE / ECFMG eligible",
              "Direct entry to Year 1",
              "Affordable living (~$250/mo)",
            ].map((b) => (
              <li key={b} className="flex items-center gap-[8px]">
                <span className="flex h-[20px] w-[20px] flex-shrink-0 items-center justify-center rounded-full bg-[#D4A017]/15 text-[11px] font-bold text-[#D4A017]">✓</span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-[34px] flex flex-col gap-[13px] sm:flex-row">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-[8px] rounded-[12px] bg-[#C1121F] px-[28px] py-[15px] font-montserrat text-[16px] font-semibold text-white shadow-md transition hover:bg-[#9e0e19]"
            >
              Check Your Eligibility <span aria-hidden>→</span>
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Shary & Co, I want to know about the Azerbaijan Dual Degree MBBS program.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-[8px] rounded-[12px] bg-[#25D366] px-[28px] py-[15px] font-montserrat text-[16px] font-semibold text-white shadow-md transition hover:bg-[#20BA5E]"
            >
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
          </div>
          <CountdownTimer />
        </div>
        <div className="fade-in-up">
          <div className="relative">
            <div className="group overflow-hidden rounded-2xl shadow-xl ring-1 ring-[#222222]/5">
              <img
                src="/amu/amu-hero.jpg"
                alt="Azerbaijan Medical University campus"
                className="h-[320px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[440px] md:h-[580px]"
              />
            </div>
            <div className="absolute left-1/2 top-[18px] -translate-x-1/2 rounded-xl bg-white/95 px-[18px] py-[10px] shadow-lg ring-1 ring-black/5 backdrop-blur">
              <img
                src="/amu/amu-university-logo.png"
                alt="Azerbaijan Medical University"
                className="h-[34px] w-auto md:h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoEmbed() {
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = JSON.parse(e.data);
        if (data.event === "infoDelivery" && data.info) {
           const w = window as any;
           if (!w.__shary_pixel_fired) w.__shary_pixel_fired = {};
           
           if (data.info.playerState === 1 && !w.__shary_pixel_fired['VideoPlay']) {
               w.fbq?.('trackCustom', 'VideoPlay', { content_name: 'dual_degree_explainer_video', video_id: '8rhreSJXnko' });
               w.__shary_pixel_fired['VideoPlay'] = true;
           }
           if (data.info.currentTime && data.info.duration) {
               const percent = data.info.currentTime / data.info.duration;
               if (percent >= 0.5 && !w.__shary_pixel_fired['VideoProgress_50']) {
                   w.fbq?.('trackCustom', 'VideoProgress', { content_name: 'dual_degree_explainer_video', progress: '50_percent' });
                   w.__shary_pixel_fired['VideoProgress_50'] = true;
               }
           }
        }
      } catch (err) {}
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const srcUrl = VIDEO_EMBED_URL ? `${VIDEO_EMBED_URL}?enablejsapi=1` : "";

  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-black/30 shadow-2xl">
      <div className="relative aspect-video w-full bg-navy-dark">
        {srcUrl ? (
          <iframe
            src={srcUrl}
            title="Azerbaijan Medical University — Program Overview"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-white/80">
            <p className="px-6 text-sm font-medium">▶ Your explainer video goes here</p>
          </div>
        )}
      </div>
      <div className="bg-white/95 px-4 py-3 text-center text-sm font-semibold text-navy">
        Watch: How the Dual Degree program works (2 min)
      </div>
    </div>
  );
}

const iconSvg = "h-[26px] w-[26px]";
function GradCapIcon() {
  return (
    <svg className={iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" /><path d="M22 10v5" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg className={iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.8 2.4 4.2 5.6 4.2 9s-1.4 6.6-4.2 9c-2.8-2.4-4.2-5.6-4.2-9S9.2 5.4 12 3Z" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg className={iconSvg} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 2 4 13.2h6.2L9.5 22 20 10.3h-6.4L13.5 2Z" />
    </svg>
  );
}
function FinanceIcon() {
  return (
    <svg className={iconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v10" /><path d="M14.7 9.3c0-1.2-1.2-1.9-2.7-1.9s-2.7.7-2.7 1.9 1.2 1.7 2.7 1.9 2.7.7 2.7 1.9-1.2 1.9-2.7 1.9-2.7-.7-2.7-1.9" />
    </svg>
  );
}

function Offer() {
  const cards = [
    { img: "/program/card1.jpg", alt: "Medical students at Azerbaijan Medical University", title: "Two Degrees, One Program", body: "Graduate with both an MBBS and Master of Public Health (MPH), giving you a competitive advantage for international careers and postgraduate opportunities.", icon: <GradCapIcon /> },
    // TODO: accreditation — verify "PMDC, WHO and WFME" recognition claim before ad launch
    { img: "/program/card2.jpg", alt: "Global recognition and international career pathways", title: "Globally Recognised Education", body: "Recognised by PMDC, WHO and WFME, with pathways toward international licensing examinations and global career opportunities.", icon: <GlobeIcon /> },
    { img: "/program/card3.jpg", alt: "International students on campus", title: "Direct Entry, No Foundation Year", body: "Begin your medical education immediately with a streamlined admission process designed for international students.", icon: <BoltIcon /> },
    { img: "/program/card4.jpg", alt: "Modern Baku — student life and city living", title: "Affordable, Transparent Investment", body: "Study at a respected medical university while benefiting from significantly lower tuition and living costs than many international alternatives.", icon: <FinanceIcon /> },
  ];
  const trust = ["Globally Recognised", "International Exposure", "Modern Curriculum", "Clinical Training", "Safe Environment", "Student Support"];
  return (
    <section id="offer" className="bg-[#FAF7F2]">
      {/* Upper area */}
      <div className="mx-auto max-w-[1144px] px-[21px] pt-[89px] md:pt-[144px]">
        <div className="grid items-center gap-[34px] md:grid-cols-[42fr_58fr] md:gap-[34px]">
          <div className="relative z-10">
            <span className="font-montserrat text-[13px] font-semibold uppercase tracking-[0.22em] text-[#D4A017]">
              The Program
            </span>
            <h2 className="mt-[16px] font-serif text-[38px] font-semibold leading-[1.05] tracking-tight text-[#222222] md:text-[56px]">
              Why students choose the Azerbaijani{" "}
              <span className="text-[#C1121F]">Dual</span>{" "}
              <span className="text-[#D4A017]">Degree</span>
            </h2>
            <div className="mt-[21px] h-[3px] w-[64px] rounded-full bg-[#D4A017]" />
            <p className="mt-[21px] max-w-md font-montserrat text-[16px] leading-relaxed text-[#222222]/75 md:text-[18px]">
              A globally respected medical education — without the crippling cost of private colleges.
            </p>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img src="/program/bg-skyline.jpg" alt="Baku, Azerbaijan skyline at sunset" className="h-[280px] w-full object-cover md:h-[420px]" />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/30 to-transparent md:from-[#FAF7F2] md:via-[#FAF7F2]/25" />
          </div>
        </div>
      </div>

      {/* Four cards */}
      <div className="mx-auto max-w-[1144px] px-[21px] pt-[55px] md:pt-[72px]">
        <div className="grid gap-[28px] md:grid-cols-4 md:gap-[21px]">
          {cards.map((c) => (
            <div key={c.title} className="group flex flex-col overflow-hidden rounded-2xl border border-[#E7E1D8] bg-[#FAF7F2] shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="overflow-hidden">
                <img src={c.img} alt={c.alt} className="h-[170px] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="-mt-[28px] flex justify-center">
                <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#C1121F] text-white shadow-md ring-4 ring-[#FAF7F2]">
                  {c.icon}
                </span>
              </div>
              <div className="flex flex-1 flex-col px-[21px] pb-[28px] pt-[13px] text-center">
                <h3 className="font-serif text-[22px] font-semibold leading-tight text-[#222222]">{c.title}</h3>
                <div className="mx-auto mt-[10px] h-[2px] w-[34px] rounded-full bg-[#D4A017]" />
                <p className="mt-[13px] font-montserrat text-[13px] leading-relaxed text-[#222222]/70">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust bar */}
      <div className="mx-auto max-w-[1144px] px-[21px] pb-[89px] pt-[34px] md:pb-[144px]">
        <div className="grid grid-cols-2 gap-x-[16px] gap-y-[16px] rounded-2xl border border-[#E7E1D8] bg-white/50 px-[28px] py-[24px] sm:grid-cols-3 md:grid-cols-6">
          {trust.map((t) => (
            <div key={t} className="flex items-center gap-[8px] font-montserrat text-[13px] font-medium text-[#222222]">
              <svg className="h-[18px] w-[18px] flex-shrink-0 text-[#D4A017]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m20 6-11 11-5-5" />
              </svg>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
      <div className="mx-auto max-w-[1144px] px-[21px] py-[89px] md:py-[144px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[26px] font-extrabold tracking-tight text-navy md:text-[42px]">
            Transparent fee breakdown
          </h2>
          <p className="mt-[21px] text-[16px] text-ink-muted">
            No hidden charges. Student-friendly pricing — here's exactly what it costs.
          </p>
        </div>
        <div className="mt-[55px] overflow-hidden rounded-2xl border border-border shadow-sm">
          <table className="w-full text-left text-[16px]">
            <thead className="bg-navy text-white">
              <tr>
                <th className="px-[21px] py-[13px] font-semibold">Expense</th>
                <th className="px-[21px] py-[13px] font-semibold">Cost (USD)</th>
                <th className="hidden px-[21px] py-[13px] font-semibold sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.item} className={i % 2 ? "bg-surface" : "bg-white"}>
                  <td className="px-[21px] py-[13px] font-medium text-navy">{r.item}</td>
                  <td className="px-[21px] py-[13px] font-bold text-[#15803D]">{r.cost}</td>
                  <td className="hidden px-[21px] py-[13px] text-ink-muted sm:table-cell">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-[34px] text-center text-[16px] font-semibold text-navy">
          ✅ No hidden charges &nbsp;·&nbsp; Average living cost ~$250/month
        </p>
      </div>
    </section>
  );
}

function CredibilityCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    
    let interval: any;
    if (!isHovered) {
      interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 3000);
    }
    
    const onSelect = () => {
      const w = window as any;
      if (!w.__shary_pixel_fired) w.__shary_pixel_fired = {};
      if (!w.__shary_pixel_fired['CarouselAutoPlay'] && !isHovered && w.fbq) {
         w.fbq('trackCustom', 'CarouselAutoPlay', { content_name: 'success_stories_carousel', action: 'auto_scroll_started' });
         w.__shary_pixel_fired['CarouselAutoPlay'] = true;
      }
    };
    emblaApi.on("select", onSelect);
    
    return () => clearInterval(interval);
  }, [emblaApi, isHovered]);

  const fireEngagement = (action: string) => {
      const w = window as any;
      if (!w.__shary_pixel_fired) w.__shary_pixel_fired = {};
      if (!w.__shary_pixel_fired['CarouselEngagement'] && w.fbq) {
         w.fbq('trackCustom', 'CarouselEngagement', { content_name: 'success_stories_carousel', action });
         w.__shary_pixel_fired['CarouselEngagement'] = true;
      }
  };

  const scrollPrev = () => { emblaApi?.scrollPrev(); fireEngagement('arrow_click'); };
  const scrollNext = () => { emblaApi?.scrollNext(); fireEngagement('arrow_click'); };

  // Add new carousel images here — drop into /public/proof/ and add to carouselImages array
  const stories = [
    { name: "Ambassador Bilal Hayee & Dr. Shaheer", detail: "Our students at Azerbaijan Medical University", image: "/proof/amu-with-ambassador.jpeg" },
    { name: "Whitecoat Ceremony", detail: "Students at Azerbaijan Medical University", image: "/proof/whitecoat-group-1.jpeg" },
    { name: "Whitecoat Ceremony", detail: "Students at Azerbaijan Medical University", image: "/proof/whitecoat-group-2.jpeg" },
    { name: "Campus Life", detail: "Student groups on campus", image: "/proof/campus-life.jpeg" },
    { name: "Baku Excursions", detail: "Students on a lake excursion", image: "/proof/lake-trip.jpeg" },
    { name: "Pakistan Independence Day", detail: "Students with Pakistan flag on Baku streets", image: "/proof/pakistan-independence-day.jpeg" },
  ];

  return (
    <section id="proof" className="bg-surface">
      <div className="mx-auto max-w-[1144px] px-[21px] py-[89px] md:py-[144px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[26px] font-extrabold tracking-tight text-navy md:text-[42px]">
            100+ successful admissions &amp; counting
          </h2>
          <p className="mt-[21px] text-[16px] text-ink-muted">
            7+ Years Experience · 550+ Students Guided · 10+ Countries Served.
          </p>
        </div>

        <div className="relative mt-[55px]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <div className="overflow-hidden" ref={emblaRef} onPointerDown={() => fireEngagement('swipe')}>
            <div className="flex gap-[21px]">
              {stories.map((s, i) => (
                <div key={i} className="flex-[0_0_260px] min-w-[260px]">
                  <figure className="overflow-hidden rounded-[12px] border border-border bg-white shadow-sm transition-transform duration-300 hover:scale-[1.03] flex flex-col h-[340px]">
                    <div className="flex-1 overflow-hidden bg-gradient-to-br from-navy/10 to-red/10 text-center text-xs font-medium text-ink-muted">
                      {s.image ? (
                        <img src={s.image} alt={s.name} className="h-full w-full object-cover" />
                      ) : (
                        <span className="flex h-full items-center justify-center px-4">📷 Photo slot</span>
                      )}
                    </div>
                    <figcaption className="p-[21px] flex-none">
                      <div className="font-bold text-navy text-[16px] leading-tight">{s.name}</div>
                      <div className="mt-[8px] text-[13px] text-ink-muted">{s.detail}</div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
          
          {/* Controls */}
          <button onClick={scrollPrev} className="absolute -left-[21px] top-1/2 -translate-y-1/2 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white shadow-md text-navy hover:bg-surface border border-border z-10 hidden md:flex">
            ←
          </button>
          <button onClick={scrollNext} className="absolute -right-[21px] top-1/2 -translate-y-1/2 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white shadow-md text-navy hover:bg-surface border border-border z-10 hidden md:flex">
            →
          </button>
        </div>

        <p className="mt-[55px] text-center text-[16px] text-ink-muted">
          Want more proof? Ask on WhatsApp and we'll connect you with current students.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { title: "Document Submission", body: "Send your application form, certificates, passport and photo." },
    { title: "Acceptance Letter", body: "Receive your official admission letter from the university." },
    { title: "Tuition Payment", body: "Secure your seat with the first payment — clear, written terms." },
    { title: "Visa & Tickets", body: "We guide you through the visa and travel arrangements." },
    { title: "Start Classes", body: `Fly to Baku and begin your medical journey on ${CLASS_START}.` },
  ];
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-[1144px] px-[21px] py-[89px] md:py-[144px]">
        <h2 className="text-center text-[26px] font-extrabold tracking-tight md:text-[42px]">
          5 simple steps from applying to your first class
        </h2>
        <div className="mt-[89px] grid gap-[34px] md:grid-cols-5">
          {steps.map((s, i) => (
            <div key={s.title} className="relative rounded-2xl border border-white/15 bg-white/5 p-[34px]">
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-red text-sm font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mt-[21px] text-[26px] font-bold text-white">{s.title}</h3>
              <p className="mt-[13px] text-[16px] text-white/75">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const QUALIFICATIONS = [
  "FSc Pre-Medical (Pakistan)",
  "A-Levels (British curriculum)",
  "Class 12 Science (India)",
  "American High School Diploma",
  "Other",
];
const INTAKES = ["September 2026 (this intake)", "A future intake"];

const inputCls = "w-full rounded-[6px] border border-border bg-white px-[21px] py-[13px] text-[16px] text-navy placeholder:text-ink-muted/60 transition focus:border-red focus:outline-none focus:ring-4 focus:ring-red/15";

function FieldShell({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-[8px] block text-[16px] font-semibold text-navy">
        {label}
        {required && <span className="ml-1 text-red">*</span>}
      </span>
      {children}
      {hint && <span className="mt-[8px] block text-[10px] text-ink-muted">{hint}</span>}
    </label>
  );
}

function EligibilitySection() {
  return (
    <section id="apply" className="bg-surface">
      <div className="mx-auto max-w-3xl px-[21px] py-[89px] md:py-[144px]">
        <div className="text-center">
          <h2 className="text-[26px] font-extrabold tracking-tight text-navy md:text-[42px]">
            Check your eligibility — free, 60 seconds
          </h2>
          <p className="mt-[21px] text-[16px] text-ink-muted">
            Tell us about yourself and we'll confirm your eligibility on WhatsApp right away.
          </p>
        </div>
        <div className="mt-[55px]">
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
    const msg = `Hi Shary & Co! I just checked my eligibility on your website.\n\nName: ${name}\nQualification: ${qualification}\nIntake: ${intake}\n\nI'd like to know if I qualify for the Azerbaijan Dual Degree MBBS program.`;
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
    if (data.student_whatsapp.replace(/\D/g, "").length < 8) return setError("Please enter a valid WhatsApp number with country code.");

    setSubmitting(true);
    fireLeadEvent();
    
    try {
      await submit({ data });
    } catch {}
    
    fireCompleteRegistrationEvent();

    const url = buildWhatsAppUrl(data.student_name, data.qualification, data.intake);
    setDone(true);
    setSubmitting(false);
    window.open(url, "_blank");
  }

  if (done) return <SuccessCard name="" />;

  return (
    <div className="card-shadow overflow-hidden rounded-2xl border border-border bg-white">
      <div className="border-t-[5px] border-red p-[34px] md:p-[55px]">
        <form onSubmit={handleSubmit} className="space-y-[34px]">
          <div className="grid gap-[34px] sm:grid-cols-2">
            <FieldShell label="Student's Full Name" required>
              <input name="student_name" required className={inputCls} placeholder="e.g. Ahmed Khan" />
            </FieldShell>
            <FieldShell label="Your Country" hint="Where you currently live">
              <input name="country" className={inputCls} placeholder="e.g. UAE, Saudi Arabia, Pakistan" />
            </FieldShell>
          </div>
          <div className="grid gap-[34px] sm:grid-cols-2">
            <FieldShell label="Student's WhatsApp" required hint="Include country code">
              <input type="tel" name="student_whatsapp" required className={inputCls} placeholder="+971 5X XXX XXXX" inputMode="tel" />
            </FieldShell>
            <FieldShell label="Parent's WhatsApp" hint="Optional — helps us keep family informed">
              <input type="tel" name="parent_whatsapp" className={inputCls} placeholder="+92 3XX XXXXXXX" inputMode="tel" />
            </FieldShell>
          </div>
          <FieldShell label="Email Address">
            <input type="email" name="email" className={inputCls} placeholder="you@example.com" />
          </FieldShell>
          <div className="grid gap-[34px] sm:grid-cols-2">
            <FieldShell label="Your Qualification" required>
              <select name="qualification" required defaultValue="" className={inputCls}>
                <option value="" disabled>Select qualification</option>
                {QUALIFICATIONS.map((q) => <option key={q}>{q}</option>)}
              </select>
            </FieldShell>
            <FieldShell label="Grades / Percentage" required hint="Your latest result">
              <input name="grades" required className={inputCls} placeholder="e.g. 75% / 3.5 GPA / A,B,B" />
            </FieldShell>
          </div>
          <FieldShell label="Desired Intake" required>
            <select name="intake" required defaultValue="" className={inputCls}>
              <option value="" disabled>Select intake</option>
              {INTAKES.map((i) => <option key={i}>{i}</option>)}
            </select>
          </FieldShell>
          <FieldShell label="Budget" required>
            <select name="budget" required defaultValue="" className={inputCls}>
              <option value="" disabled>Select budget range</option>
              <option>Less than $5,000</option>
              <option>$5,000–$10,000</option>
              <option>More than $10,000</option>
            </select>
          </FieldShell>

          {error && <p className="text-[16px] font-medium text-red-600">{error}</p>}

          <button type="submit" disabled={submitting} className="w-full rounded-[6px] bg-[#C1121F] px-[34px] py-[21px] text-[16px] font-bold text-white shadow-lg shadow-red/20 transition hover:-translate-y-0.5 hover:bg-[#9e0e19] disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "Checking..." : "Check My Eligibility →"}
          </button>
          <p className="text-center text-[10px] text-ink-muted">
            ✓ Free &nbsp; ✓ No obligation &nbsp; ✓ You'll be connected on WhatsApp instantly
          </p>
        </form>
      </div>
    </div>
  );
}

function SuccessCard({ name }: { name: string }) {
  const fallbackUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Shary & Co, I just submitted the eligibility form on your website.")}`;
  return (
    <div className="overflow-hidden rounded-2xl border border-red/30 bg-white p-[55px] text-center shadow-xl shadow-red/10">
      <div className="text-[68px]">✅</div>
      <h3 className="mt-[21px] text-[26px] font-bold text-navy">
        {name ? `Thanks, ${name}!` : "You're almost there!"}
      </h3>
      <p className="mt-[13px] text-ink-muted text-[16px]">
        We're opening WhatsApp so our team can confirm your eligibility and send you the full
        program details. If it didn't open automatically, tap below.
      </p>
      <a href={fallbackUrl} target="_blank" rel="noreferrer" className="mt-[34px] inline-flex items-center justify-center gap-[8px] rounded-[6px] bg-[#C1121F] px-[34px] py-[21px] text-[16px] font-bold text-white transition hover:bg-[#9e0e19]">
        Continue on WhatsApp →
      </a>
    </div>
  );
}

function Faq() {
  const items = [
    // TODO: accreditation — verify PMDC recognition / "international medical registers" claim before ad launch
    { q: "Is this degree recognised in Pakistan (PMDC)?", a: "Azerbaijan Medical University is listed on international medical registers, and we'll send you the official recognition listings so you can verify it yourself before you commit." },
    // TODO: accreditation — verify "WDOMS-listed and ECFMG/USMLE eligible" claim before ad launch
    { q: "Can I do USMLE or practise in the US / UK?", a: "Yes — the degree is WDOMS-listed and ECFMG/USMLE eligible, which is the pathway to practise in the US, and recognised across the UK, Gulf and beyond." },
    { q: "Is there an entry test or interview?", a: "No entry test and no foundation year for eligible applicants. An interview is not required for the Dual Degree program, subject to profile evaluation." },
    { q: "Is Azerbaijan safe for Pakistani students?", a: "Azerbaijan is a Muslim-majority country with halal food, mosques and a large, welcoming international student community. We'll connect you with current students." },
    { q: "What does it really cost in total?", a: `Tuition is around ${TUITION_PER_YEAR}/year with living costs of roughly $250/month and no hidden charges. See the full fee breakdown above.` },
    { q: "How do I know this isn't a scam?", a: "We're a licensed, verified admissions partner with 7+ years of experience and 100+ successful admissions. You can verify the university on official registers, talk to current students, and we provide 24/7 local support in Azerbaijan." },
  ];

  const onToggle = (q: string, isOpen: boolean) => {
    if (isOpen) {
       window.fbq?.('trackCustom', 'FAQExpanded', { content_name: 'faq_interaction', faq_question: q });
    }
  };

  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl px-[21px] py-[89px] md:py-[144px]">
        <h2 className="text-center text-[26px] font-extrabold tracking-tight text-navy md:text-[42px]">
          Questions parents &amp; students ask
        </h2>
        <div className="mt-[55px] space-y-[21px]">
          {items.map((it) => (
            <details key={it.q} onToggle={(e) => onToggle(it.q, (e.target as HTMLDetailsElement).open)} className="group rounded-xl border border-border bg-surface p-[34px] [&_summary]:cursor-pointer">
              <summary className="flex items-center justify-between font-semibold text-navy text-[16px]">
                {it.q}
                <span className="ml-[21px] text-red transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-[13px] text-ink-muted text-[16px]">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="hero-pattern relative">
      <div className="relative mx-auto max-w-[1144px] px-[21px] py-[89px] text-center md:py-[144px]">
        <h2 className="text-[26px] font-extrabold tracking-tight text-white md:text-[42px]">
          Admissions close {DEADLINE}
        </h2>
        <p className="mx-auto mt-[21px] max-w-2xl text-[16px] text-white/90">
          Seats for the September intake are limited and visa processing takes time. Check your
          eligibility today — it's free and takes 60 seconds.
        </p>
        <div className="mt-[55px]">
          <button onClick={scrollToForm} className="rounded-[6px] bg-[#C1121F] px-[55px] py-[21px] text-[16px] font-bold text-white shadow-lg transition hover:bg-[#9e0e19] hover:-translate-y-0.5">
            Check My Eligibility — Free →
          </button>
        </div>
      </div>
    </section>
  );
}
