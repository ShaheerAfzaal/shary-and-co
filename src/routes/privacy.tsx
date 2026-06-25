import { createFileRoute, Link } from "@tanstack/react-router";

const CONTACT_EMAIL = "sharyandco.apply@gmail.com";
const WHATSAPP_NUMBER = "923352982999";
const LAST_UPDATED = "25 June 2026";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Shary & Co" },
      {
        name: "description",
        content:
          "How Shary & Co collects, uses, and protects the information you submit through our eligibility form.",
      },
      // Ensure ad/preview crawlers can index the policy for Meta ad review.
      { name: "robots", content: "index, follow" },
    ],
  }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-[34px]">
      <h2 className="text-[20px] font-bold text-navy md:text-[26px]">{title}</h2>
      <div className="mt-[13px] space-y-[13px] text-[16px] leading-relaxed text-ink-muted">
        {children}
      </div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <main className="bg-surface">
      <div className="mx-auto max-w-3xl px-[21px] py-[55px] md:py-[89px]">
        <h1 className="text-[32px] font-extrabold tracking-tight text-navy md:text-[42px]">
          Privacy Policy
        </h1>
        <p className="mt-[13px] text-sm text-ink-muted">Last updated: {LAST_UPDATED}</p>

        <p className="mt-[34px] text-[16px] leading-relaxed text-ink-muted">
          Shary &amp; Co ("we", "us", "our") helps students apply to study medicine at
          Azerbaijan Medical University. This policy explains what information we collect
          through this website, how we use it, and the choices you have. By submitting our
          eligibility form you agree to the practices described below.
        </p>

        <Section title="Information we collect">
          <p>
            When you complete the "Check Your Eligibility" form, we collect the details you
            choose to provide, which may include:
          </p>
          <ul className="ml-[21px] list-disc space-y-[8px]">
            <li>Your full name</li>
            <li>Your WhatsApp number (and, optionally, a parent's WhatsApp number)</li>
            <li>Your email address</li>
            <li>Your country of residence</li>
            <li>
              Your academic qualification, grades/percentage, desired intake, and budget range
            </li>
          </ul>
          <p>
            We do not knowingly collect sensitive personal data, and we ask that you do not
            submit any. The form is the only place on this site where we actively collect
            personal information.
          </p>
        </Section>

        <Section title="How we use your information">
          <p>We use the information you provide to:</p>
          <ul className="ml-[21px] list-disc space-y-[8px]">
            <li>Assess your eligibility for the Dual Degree MBBS/MD + MPH program;</li>
            <li>
              Contact you — primarily via WhatsApp, and where relevant by email or phone — to
              answer your questions and guide you through the admissions process;
            </li>
            <li>Send you program details, fee information, and next steps; and</li>
            <li>Improve our services and respond to your requests.</li>
          </ul>
          <p>
            We only use your information for the purposes above. We do not sell your personal
            information.
          </p>
        </Section>

        <Section title="How your information is shared">
          <p>
            Your details are handled by our admissions team and may be processed by trusted
            service providers that help us operate this site and manage enquiries (for example,
            our lead-management/automation tools and Google services). Where an application
            proceeds, relevant details may be shared with Azerbaijan Medical University to
            support your admission. We may also disclose information where required by law.
          </p>
        </Section>

        <Section title="Advertising">
          <p>
            We use the Meta (Facebook/Instagram) Pixel to measure the performance of our ads and
            to understand how visitors interact with this site. This may involve cookies and
            similar technologies. You can control cookies through your browser settings and
            manage ad preferences through your Meta account.
          </p>
        </Section>

        <Section title="Data retention">
          <p>
            We keep your information for as long as needed to assist with your application and
            for legitimate business or legal purposes. You may ask us to delete your data at any
            time (see below).
          </p>
        </Section>

        <Section title="Your choices and rights">
          <p>
            You can ask us to access, correct, or delete the personal information we hold about
            you, or ask us to stop contacting you. To make a request, contact us using the
            details below and we will respond within a reasonable timeframe.
          </p>
        </Section>

        <Section title="Contact us">
          <p>
            If you have any questions about this policy or your data, contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-red hover:underline">
              {CONTACT_EMAIL}
            </a>{" "}
            or on{" "}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-red hover:underline"
            >
              WhatsApp
            </a>
            .
          </p>
        </Section>

        <div className="mt-[55px]">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-[8px] rounded-[6px] bg-[#C1121F] px-[28px] py-[13px] text-[16px] font-semibold text-white transition hover:bg-[#9e0e19]"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
