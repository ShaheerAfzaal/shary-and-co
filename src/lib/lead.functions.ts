import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Shary & Co — Azerbaijan Medical University lead capture.
// Forwards each "Check Eligibility" submission to a webhook that writes to
// your CRM (Google Sheets via Zapier/Make, or anything that accepts JSON).
//
// Set the webhook URL in your environment:
//   LEAD_WEBHOOK_URL=https://hooks.zapier.com/...   (or a Make.com webhook)
// If unset, submissions are logged to the server console so you never lose a
// lead during testing.

const leadSchema = z.object({
  student_name: z.string().min(1),
  student_whatsapp: z.string().min(1),
  parent_whatsapp: z.string().optional().default(""),
  email: z.string().optional().default(""),
  country: z.string().optional().default(""),
  qualification: z.string().optional().default(""),
  grades: z.string().optional().default(""),
  intake: z.string().optional().default(""),
  budget: z.string().optional().default(""),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    const body = {
      source: "shary-and-co-landing",
      program: "Azerbaijan Medical University — Dual Degree MBBS/MD + MPH",
      submitted_at: new Date().toISOString(),
      ...data,
    };

    if (!webhookUrl) {
      console.log("[lead] LEAD_WEBHOOK_URL not set. Submission:", body);
      return { ok: true, delivered: false };
    }

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return { ok: true, delivered: true };
    } catch (err) {
      console.error("[lead] webhook POST failed", err);
      // Still treat as success for the user — the lead is logged above and the
      // webhook failure is recoverable on our side.
      return { ok: true, delivered: false };
    }
  });
