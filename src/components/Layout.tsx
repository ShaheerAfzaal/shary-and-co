import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

const WHATSAPP_NUMBER = "923352982999";

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img src="/brand/logo.svg" alt="Shary & Co" style={{ height: "56px", width: "auto" }} />
    </Link>
  );
}

function handleCheckEligibilityClick(e: React.MouseEvent) {
  if (window.location.pathname === "/") {
    e.preventDefault();
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function TopBar() {
  return (
    <div className="bg-[#e9be00] text-[#1a1a1a] h-[42px] flex items-center justify-center px-4 overflow-hidden">
      <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.08em] flex items-center justify-center gap-3 whitespace-nowrap">
        <span>GLOBALLY RECOGNISED · INTERNATIONALLY RESPECTED</span>
        <span className="hidden md:inline">|</span>
        <div className="hidden md:flex items-center gap-3">
          <span>WDOMS</span>
          <span>|</span>
          <span>PMDC</span>
          <span>|</span>
          <span>WHO</span>
          <span>|</span>
          <span>WFME</span>
          <span>|</span>
          <span>ECFMG / USMLE</span>
          <span>|</span>
          <span>IARR</span>
          <span>|</span>
          <span>NMC India</span>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] h-[72px] flex items-center">
      <div className="mx-auto flex w-full max-w-[1144px] items-center justify-between px-[21px]">
        <Logo />
        <nav className="hidden lg:flex items-center gap-[34px] text-[15px] font-medium text-[#1a1a1a]">
          <Link to="/" className="hover:text-red hover:underline decoration-[#e9be00] decoration-2 underline-offset-4 [&.active]:text-[#ef3e36]">Home</Link>
          <Link to="/about" className="hover:text-red hover:underline decoration-[#e9be00] decoration-2 underline-offset-4 [&.active]:text-[#ef3e36]">About Us</Link>
          <a href="/#offer" className="hover:text-red hover:underline decoration-[#e9be00] decoration-2 underline-offset-4">The Program</a>
          <a href="/#fees" className="hover:text-red hover:underline decoration-[#e9be00] decoration-2 underline-offset-4">Fees</a>
          <a href="/#proof" className="hover:text-red hover:underline decoration-[#e9be00] decoration-2 underline-offset-4">Success Stories</a>
          <a href="/#faq" className="hover:text-red hover:underline decoration-[#e9be00] decoration-2 underline-offset-4">FAQ</a>
          <Link to="/blog" className="hover:text-red hover:underline decoration-[#e9be00] decoration-2 underline-offset-4 [&.active]:text-[#ef3e36]">Blog</Link>
        </nav>
        <Link
          to="/"
          hash="apply"
          onClick={handleCheckEligibilityClick}
          className="rounded-[6px] bg-[#ef3e36] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c9302a]"
        >
          Check Eligibility
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70">
      <div className="mx-auto max-w-[1144px] px-[34px] py-[89px]">
        <div className="grid gap-[34px] md:grid-cols-3 md:items-center">
          <div>
            <Logo light />
            <p className="mt-[13px] text-sm text-white/60">
              Verified &amp; transparent process — helping students study medicine abroad with 24/7
              local support.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-[21px] text-sm">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="hover:text-white">
              WhatsApp
            </a>
            <a href="https://instagram.com/shary_and_co" className="hover:text-white">
              Instagram
            </a>
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
        <div className="mt-[55px] border-t border-white/10 pt-[21px] text-center text-xs text-white/50">
          © 2026 Shary &amp; Co. — Azerbaijan Medical University admissions.
        </div>
      </div>
      <div className="h-20 md:hidden" />
    </footer>
  );
}

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
      <Link
        to="/"
        hash="apply"
        onClick={handleCheckEligibilityClick}
        className="flex w-full items-center justify-center rounded-[6px] bg-[#ef3e36] px-4 py-3 text-sm font-bold text-white hover:bg-[#c9302a]"
      >
        Check My Eligibility — Free →
      </Link>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <Navbar />
      {children}
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
