import type { APIRoute } from "astro";
import { randomUUID } from "node:crypto";

export const prerender = false;

const successMessage = "Thank you! Your request has been submitted successfully. Our team will contact you shortly.";

type LeadPayload = {
  fullName?: unknown;
  name?: unknown;
  companyName?: unknown;
  company?: unknown;
  email?: unknown;
  countryCode?: unknown;
  mobileNumber?: unknown;
  phone?: unknown;
  country?: unknown;
  message?: unknown;
  sourcePage?: unknown;
  pageSource?: unknown;
  source?: unknown;
};

type Lead = {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  mobileNumber: string;
  country: string;
  message: string;
  sourcePage: string;
  submittedAt: string;
};

const textValue = (value: unknown) => String(value || "").trim();

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });

const validateLead = (payload: LeadPayload, refererHeader = "") => {
  const countryCode = textValue(payload.countryCode);
  const rawMobile = textValue(payload.mobileNumber || payload.phone).replace(/\s+/g, " ");
  const mobileNumber = countryCode ? `${countryCode} ${rawMobile}`.trim() : rawMobile;

  const lead = {
    id: randomUUID(),
    fullName: textValue(payload.fullName || payload.name),
    companyName: textValue(payload.companyName || payload.company || "N/A"),
    email: textValue(payload.email).toLowerCase(),
    mobileNumber,
    country: textValue(payload.country || "N/A"),
    message: textValue(payload.message),
    sourcePage: textValue(payload.sourcePage || payload.pageSource || payload.source || refererHeader || "Direct / Unknown"),
    submittedAt: new Date().toISOString(),
  } satisfies Lead;

  const missing = [
    ["Full Name", lead.fullName],
    ["Email Address", lead.email],
    ["Mobile Number", rawMobile],
  ].filter(([, value]) => !value);

  if (missing.length > 0) {
    return { error: `Please complete: ${missing.map(([label]) => label).join(", ")}.` };
  }

  if (!isEmail(lead.email)) {
    return { error: "Please enter a valid email address." };
  }

  if (!/^\+?[0-9][0-9\s().-]{6,24}$/.test(lead.mobileNumber)) {
    return { error: "Please enter a valid mobile number with country code." };
  }

  return { lead };
};

const readSupabaseConfig = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.");
  }

  return {
    url: url.replace(/\/$/, ""),
    key,
  };
};

const storeLead = async (lead: Lead) => {
  const { url, key } = readSupabaseConfig();
  const basePayload = {
    id: lead.id,
    full_name: lead.fullName,
    company_name: lead.companyName,
    email: lead.email,
    mobile_number: lead.mobileNumber,
    country: lead.country,
    submitted_at: lead.submittedAt,
  };

  // Try inserting with source_page column first
  const response = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      ...basePayload,
      message: lead.message,
      source_page: lead.sourcePage,
    }),
  });

  if (!response.ok) {
    const details = await response.text();

    // Fallback: If Supabase schema does not have 'source_page' column (PGRST204), retry without source_page key
    if (details.includes("PGRST204") || details.includes("source_page")) {
      const fallbackResponse = await fetch(`${url}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          ...basePayload,
          message: `[Source Page: ${lead.sourcePage}]\n${lead.message}`.trim(),
        }),
      });

      if (!fallbackResponse.ok) {
        const fallbackDetails = await fallbackResponse.text();
        throw new Error(`Supabase insert failed: ${fallbackDetails || fallbackResponse.statusText}`);
      }
      return;
    }

    throw new Error(`Supabase insert failed: ${details || response.statusText}`);
  }
};

export const POST: APIRoute = async ({ request }) => {
  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ message: "Invalid form submission." }, 400);
  }

  const referer = request.headers.get("referer") || "";
  const validation = validateLead(payload, referer);
  if ("error" in validation) {
    return jsonResponse({ message: validation.error }, 400);
  }

  try {
    await storeLead(validation.lead);
  } catch (error) {
    console.error(error);
    return jsonResponse(
      {
        message: error instanceof Error ? error.message : "The lead could not be submitted. Please try again.",
      },
      500,
    );
  }

  return jsonResponse({ message: successMessage });
};
