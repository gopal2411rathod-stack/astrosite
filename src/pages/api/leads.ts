import type { APIRoute } from "astro";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import net from "node:net";
import tls from "node:tls";

export const prerender = false;

const successMessage = "Thank you! Your request has been submitted successfully. Our team will contact you shortly.";
const recipientEmail = process.env.LEAD_EMAIL_TO || "gopal2411rathod@gmail.com";
const leadsDirectory = process.env.LEAD_STORAGE_DIR || (process.env.VERCEL ? tmpdir() : join(process.cwd(), ".data"));
const leadsFile = join(leadsDirectory, "leads.json");

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

const storeLead = async (lead: Lead) => {
  await mkdir(dirname(leadsFile), { recursive: true });

  let leads: Lead[] = [];
  try {
    const existing = await readFile(leadsFile, "utf8");
    leads = JSON.parse(existing) as Lead[];
    if (!Array.isArray(leads)) {
      leads = [];
    }
  } catch {
    leads = [];
  }

  leads.push(lead);
  await writeFile(leadsFile, JSON.stringify(leads, null, 2));
};

const escapeHeader = (value: string) => value.replace(/[\r\n]+/g, " ").trim();
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatLeadText = (lead: Lead) => [
  "New lead submitted from Hegrix.com",
  "",
  `Full Name: ${lead.fullName}`,
  `Company Name: ${lead.companyName}`,
  `Email Address: ${lead.email}`,
  `Mobile Number: ${lead.mobileNumber}`,
  `Country: ${lead.country}`,
  `Description/Message: ${lead.message}`,
  `Date and Time of Submission: ${new Date(lead.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
].join("\n");

const formatLeadHtml = (lead: Lead) => {
  const rows = [
    ["Full Name", lead.fullName],
    ["Company Name", lead.companyName],
    ["Email Address", lead.email],
    ["Mobile Number", lead.mobileNumber],
    ["Country", lead.country],
    ["Description/Message", lead.message],
    ["Date and Time of Submission", `${new Date(lead.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`],
  ];

  return `<h2>New lead submitted from Hegrix.com</h2><table cellpadding="8" cellspacing="0" border="1">${rows
    .map(([label, value]) => `<tr><th align="left">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`)
    .join("")}</table>`;
};

const readSmtpConfig = () => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !user || !pass || !from) {
    throw new Error("Email is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM environment variables.");
  }

  return { host, port, secure, user, pass, from };
};

const readSmtpResponse = (socket: net.Socket | tls.TLSSocket) =>
  new Promise<string>((resolve, reject) => {
    let data = "";
    const onData = (chunk: Buffer) => {
      data += chunk.toString("utf8");
      const lines = data.split(/\r?\n/).filter(Boolean);
      const lastLine = lines.at(-1);
      if (lastLine && /^\d{3} /.test(lastLine)) {
        socket.off("data", onData);
        socket.off("error", onError);
        resolve(data);
      }
    };
    const onError = (error: Error) => {
      socket.off("data", onData);
      reject(error);
    };
    socket.on("data", onData);
    socket.on("error", onError);
  });

const smtpCommand = async (socket: net.Socket | tls.TLSSocket, command: string, expected: number[]) => {
  socket.write(`${command}\r\n`);
  const response = await readSmtpResponse(socket);
  const code = Number(response.slice(0, 3));
  if (!expected.includes(code)) {
    throw new Error(`SMTP command failed: ${response.trim()}`);
  }
  return response;
};

const connectSmtp = (host: string, port: number, secure: boolean) =>
  new Promise<net.Socket | tls.TLSSocket>((resolve, reject) => {
    const socket = secure ? tls.connect(port, host, () => resolve(socket)) : net.connect(port, host, () => resolve(socket));
    socket.setTimeout(15000);
    socket.once("timeout", () => reject(new Error("SMTP connection timed out.")));
    socket.once("error", reject);
  });

const sendLeadEmail = async (lead: Lead) => {
  const config = readSmtpConfig();
  let socket = await connectSmtp(config.host, config.port, config.secure);

  await readSmtpResponse(socket);
  await smtpCommand(socket, `EHLO ${config.host}`, [250]);

  if (!config.secure && config.port === 587) {
    await smtpCommand(socket, "STARTTLS", [220]);
    socket = tls.connect({ socket, servername: config.host });
    await smtpCommand(socket, `EHLO ${config.host}`, [250]);
  }

  await smtpCommand(socket, "AUTH LOGIN", [334]);
  await smtpCommand(socket, Buffer.from(config.user).toString("base64"), [334]);
  await smtpCommand(socket, Buffer.from(config.pass).toString("base64"), [235]);
  await smtpCommand(socket, `MAIL FROM:<${config.from}>`, [250]);
  await smtpCommand(socket, `RCPT TO:<${recipientEmail}>`, [250, 251]);
  await smtpCommand(socket, "DATA", [354]);

  const boundary = `lead-${lead.id}`;
  const subject = `New lead from ${escapeHeader(lead.fullName)} - Hegrix.com`;
  const message = [
    `From: ${escapeHeader(config.from)} <${config.from}>`,
    `To: ${recipientEmail}`,
    `Reply-To: ${escapeHeader(lead.fullName)} <${lead.email}>`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=utf-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    formatLeadText(lead),
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=utf-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    formatLeadHtml(lead),
    "",
    `--${boundary}--`,
    ".",
  ].join("\r\n");

  socket.write(`${message}\r\n`);
  const result = await readSmtpResponse(socket);
  const code = Number(result.slice(0, 3));
  if (code !== 250) {
    throw new Error(`SMTP send failed: ${result.trim()}`);
  }

  await smtpCommand(socket, "QUIT", [221]);
  socket.end();
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
    await sendLeadEmail(validation.lead);
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




