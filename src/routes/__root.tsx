import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Study MBBS in Azerbaijan — Dual Degree MBBS + MPH | Shary & Co" },
      {
        name: "description",
        content:
          "Globally recognised Dual Degree MBBS/MD + MPH at Azerbaijan Medical University for $7,950/year. No entry test, no foundation year. September intake — check your eligibility in 60 seconds.",
      },
      { name: "author", content: "Shary & Co" },
      { property: "og:title", content: "Study MBBS in Azerbaijan — Dual Degree | Shary & Co" },
      {
        property: "og:description",
        content:
          "Globally recognised Dual Degree MBBS + MPH for $7,950/year. September intake. Check your eligibility now.",
      },
      { property: "og:image", content: "https://www.sharyandco.com/brand/logo.svg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Study MBBS in Azerbaijan — Dual Degree | Shary & Co" },
      {
        name: "twitter:description",
        content:
          "Globally recognised Dual Degree MBBS + MPH for $10,000/year. September intake. Check your eligibility now.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/brand/logo.svg" },
      { rel: "apple-touch-icon", href: "/brand/logo.svg" },
      { rel: "shortcut icon", href: "/brand/logo.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: `{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Shary & Co",
            "url": "https://www.sharyandco.com",
            "logo": "https://www.sharyandco.com/brand/logo.svg",
            "sameAs": [
              "https://instagram.com/shary_and_co",
              "https://wa.me/923352982999"
            ]
          }`
        }} />
        {/* Meta Pixel base code injected into head when VITE_META_PIXEL_ID is set */}
        {import.meta.env.VITE_META_PIXEL_ID ? (
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${import.meta.env.VITE_META_PIXEL_ID}');fbq('track','PageView');`,
            }}
          />
        ) : null}
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { Layout } from "../components/Layout";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Client-side integration: attach event listeners for Meta Pixel events.
  // Uses vanilla JS, IntersectionObserver, and guards to ensure each event
  // fires only once per page session.
  useEffect(() => {
    const w = window as any;
    if (!w) return;

    // Bucket for fired flags to avoid duplicate events.
    if (!w.__shary_pixel_fired) w.__shary_pixel_fired = {};

    // Helper to safely call fbq if available.
    const track = (eventName: string, params?: Record<string, unknown>, useFiredOnce: boolean = true) => {
      try {
        if (!w.fbq) return;
        if (useFiredOnce && w.__shary_pixel_fired[eventName]) return;
        if (eventName.startsWith('trackCustom')) {
            w.fbq('trackCustom', params?.eventName as string, params?.data || {});
        } else {
            w.fbq('track', eventName, params || {});
        }
        if (useFiredOnce) w.__shary_pixel_fired[eventName] = true;
      } catch (err) {
        // swallow errors — tracking should not break the app
      }
    };

    // 1) Delegate WhatsApp link clicks & Check Eligibility Clicks
    const onClick = (ev: MouseEvent) => {
      try {
        const target = ev.target as Element | null;
        const a = target?.closest ? (target.closest('a') as HTMLAnchorElement | null) : null;
        if (a && a.href) {
          const href = a.href;
          if (href.includes('wa.me') || href.includes('api.whatsapp.com')) {
            track('Contact', {
              content_name: 'whatsapp_click',
              content_category: 'CTA'
            }, false); // allowed to fire multiple times
          }
        }
        
        const button = target?.closest ? (target.closest('button') as HTMLButtonElement | null) : null;
        const text = (button?.textContent || a?.textContent || '').toLowerCase();
        if (text.includes('check eligibility') || text.includes('check my eligibility') || text.includes('check your eligibility')) {
            track('Lead', {
              content_name: 'check_eligibility_button',
              content_category: 'CTA'
            }, false); // allowed to fire multiple times
        }
      } catch (e) {
        /* ignore */
      }
    };
    document.addEventListener('click', onClick, { passive: true });

    // 2) Observe fees section coming into view -> 'ViewContent'
    const feesEl = document.getElementById('fees');
    if (feesEl && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            track('ViewContent', { content_name: 'fee_breakdown' });
            observer.disconnect();
          }
        });
      }, { threshold: 0.5 });
      io.observe(feesEl);
    }

    // 3) Observe 90% Scroll Depth
    const handleScroll = () => {
      if (w.__shary_pixel_fired['ScrollDepth']) return;
      
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight * 0.9;
      
      if (scrollPosition >= threshold) {
        track('trackCustom', {
          eventName: 'ScrollDepth',
          data: {
            content_name: 'page_bottom',
            depth_percent: 90
          }
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 4) Video play: detect first user interaction with the iframe (click/focus)
    const iframe = document.querySelector('iframe[title*="Azerbaijan Medical University"]') as HTMLIFrameElement | null;
    if (iframe) {
      const videoPlayHandler = () => {
        track('ViewContent', { content_name: 'intro_video' });
        // YouTube API integration handled within VideoEmbed component directly for better accuracy
        iframe.removeEventListener('click', videoPlayHandler);
        iframe.removeEventListener('focus', videoPlayHandler);
      };
      iframe.addEventListener('click', videoPlayHandler, { passive: true });
      iframe.addEventListener('focus', videoPlayHandler, { passive: true });
    }

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Layout>
        <Outlet />
      </Layout>
    </QueryClientProvider>
  );
}
