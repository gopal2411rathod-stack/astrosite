import type { APIRoute } from "astro";
import { randomUUID } from "node:crypto";

export const prerender = false;

const successMessage = "Thank you! Your request has been submitted successfully. Our team will contact you shortly.";

type LeadPayload = {
  fullName?: unknown;
  companyName?: unknown;
  email?: unknown;
  countryCode?: unknown;
  mobileNumber?: unknown;
  country?: unknown;
  message?: unknown;
};

type Lead = {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  mobileNumber: string;
  country: string;
  message: string;
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

const validateLead = (payload: LeadPayload) => {
  const countryCode = textValue(payload.countryCode);
  const localMobile = textValue(payload.mobileNumber).replace(/\s+/g, " ");
  const lead = {
    id: randomUUID(),
    fullName: textValue(payload.fullName),
    companyName: textValue(payload.companyName),
    email: textValue(payload.email).toLowerCase(),
    mobileNumber: `${countryCode} ${localMobile}`.trim(),
    country: textValue(payload.country),
    message: textValue(payload.message),
    submittedAt: new Date().toISOString(),
  } satisfies Lead;

  const missing = [
    ["Full Name", lead.fullName],
    ["Company Name", lead.companyName],
    ["Email Address", lead.email],
    ["Mobile Number", localMobile],
    ["Country", lead.country],
    ["Description/Message", lead.message],
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
  const response = await fetch(`${url}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      id: lead.id,
      full_name: lead.fullName,
      company_name: lead.companyName,
      email: lead.email,
      mobile_number: lead.mobileNumber,
      country: lead.country,
      message: lead.message,
      submitted_at: lead.submittedAt,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
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

  const validation = validateLead(payload);
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
