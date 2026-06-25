import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

const WHATSAPP_NUMBER = "923352982999";

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img
        src={light ? "/brand/logo.svg" : "/brand/logo-shary.png"}
        alt="Shary & Co — Education Consultants"
        className="h-[44px] w-auto md:h-[52px]"
      />
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
    <div className="bg-[#C1121F] text-[#FAF7F2] min-h-[40px] flex items-center justify-center px-4 py-1.5">
      <span className="font-montserrat text-[10px] md:text-xs font-semibold uppercase tracking-[0.14em] text-center">
        September Intake · Admissions Close 25 August 2026
      </span>
    </div>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const { pathname } = useLocation();

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const navItemCls = "hover:text-[#C1121F] hover:underline decoration-[#D4A017] decoration-2 underline-offset-4 [&.active]:text-[#C1121F]";
  const mobileNavItemCls = "block py-[13px] font-montserrat text-[16px] font-medium text-[#222222] border-b border-border last:border-b-0 hover:text-[#C1121F]";

  return (
    <header className="sticky top-0 z-40 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex h-[72px] w-full max-w-[1144px] items-center justify-between px-[21px]">
        <Logo />
        <nav className="hidden lg:flex items-center gap-[34px] font-montserrat text-[15px] font-medium text-[#222222]">
          <Link to="/" className={navItemCls}>Home</Link>
          <Link to="/about" className={navItemCls}>About Us</Link>
          <a href="/#offer" className={navItemCls}>The Program</a>
          <a href="/#fees" className={navItemCls}>Fees</a>
          <a href="/#proof" className={navItemCls}>Success Stories</a>
          <a href="/#faq" className={navItemCls}>FAQ</a>
          <Link to="/blog" className={navItemCls}>Blog</Link>
        </nav>
        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden inline-flex h-[42px] w-[42px] items-center justify-center rounded-md text-[#222222] hover:bg-gray-100"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" aria-hidden="true">
              {menuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-border bg-white shadow-lg"
        >
          <nav className="mx-auto max-w-[1144px] px-[21px] py-[8px]">
            <Link to="/" className={mobileNavItemCls} onClick={closeMenu}>Home</Link>
            <Link to="/about" className={mobileNavItemCls} onClick={closeMenu}>About Us</Link>
            <a href="/#offer" className={mobileNavItemCls} onClick={closeMenu}>The Program</a>
            <a href="/#fees" className={mobileNavItemCls} onClick={closeMenu}>Fees</a>
            <a href="/#proof" className={mobileNavItemCls} onClick={closeMenu}>Success Stories</a>
            <a href="/#faq" className={mobileNavItemCls} onClick={closeMenu}>FAQ</a>
            <Link to="/blog" className={mobileNavItemCls} onClick={closeMenu}>Blog</Link>
            <Link
              to="/"
              hash="apply"
              onClick={(e) => { handleCheckEligibilityClick(e); closeMenu(); }}
              className="sm:hidden mt-[13px] mb-[8px] flex items-center justify-center rounded-[6px] bg-[#C1121F] px-4 py-[13px] text-sm font-bold text-[#FAF7F2] hover:bg-[#9e0e19]"
            >
              Check Eligibility →
            </Link>
          </nav>
        </div>
      )}
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
        className="flex w-full items-center justify-center rounded-[6px] bg-[#C1121F] px-4 py-3 text-sm font-bold text-white hover:bg-[#9e0e19]"
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
