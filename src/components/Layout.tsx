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
    <div className="dark-red-band text-[#FAF7F2] min-h-[40px] flex items-center justify-center px-4 py-1.5">
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

/* Brand glyphs (single-path, fill = currentColor) for the footer social row. */
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8v8.44C19.61 23.08 24 18.09 24 12.07Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14c.5-1.88.5-5.81.5-5.81s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6Zm-2 0-8 5-8-5h16Zm0 12H4V8l8 5 8-5v10Z" />
    </svg>
  );
}
function WhatsAppGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.12-.27-.2-.57-.35ZM12.05 21.78h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.88 9.88ZM20.46 3.49A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.42Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/share/1YcYyBfmXR/?mibextid=wwXIfr", Icon: FacebookIcon },
  { label: "Instagram", href: "https://www.instagram.com/shary_and_co?igsh=MWg0Y2NzMmZsaTMzZA==", Icon: InstagramIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@shary_and_co1?_r=1&_t=ZS-97WMYp4ZKAD", Icon: TikTokIcon },
  { label: "YouTube", href: "https://youtube.com/@sharyandco?si=pCNdNezg1xI3X-JR", Icon: YouTubeIcon },
  { label: "Email", href: "mailto:sharyandco.apply@gmail.com", Icon: MailIcon },
  { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}`, Icon: WhatsAppGlyph },
];

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
          <div className="flex flex-col items-center gap-[16px]">
            <div className="flex flex-wrap justify-center gap-[13px]">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-[#C1121F] hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
            <Link to="/privacy" className="text-sm hover:text-white">
              Privacy Policy
            </Link>
          </div>
          <div className="text-sm md:text-right">
            📞 +92 335 2982999
            <br />
            sharyandco.apply@gmail.com
          </div>
        </div>
        <div className="mt-[55px] border-t border-white/10 pt-[21px] text-center text-xs text-white/50">
          {/* Requested as "© 2019". If 2019 is the founding year, "© 2019–2026" is the
              more conventional, non-stale option. */}
          © 2019 Shary &amp; Co — Your trusted advisor for international admissions.
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
