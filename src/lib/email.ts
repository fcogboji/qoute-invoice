import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: { filename: string; content: Buffer }[];
};

export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  const resend = getResend();
  if (!resend) {
    return { success: false, error: "Email not configured" };
  }

  const from = process.env.RESEND_FROM_EMAIL ?? "tradeinvoice <onboarding@resend.dev>";
  const to = Array.isArray(options.to) ? options.to : [options.to];

  const attachments = options.attachments?.map((a) => ({
    filename: a.filename,
    content: a.content,
  }));

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments,
  });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

/** Welcome email when a new user registers (app owner → user) */
export async function sendWelcomeEmail(to: string, name: string | null): Promise<{ success: boolean }> {
  const firstName = name?.split(" ")[0] || "there";
  const result = await sendEmail({
    to,
    subject: "Welcome to tradeinvoice",
    html: `
      <p>Hi ${firstName},</p>
      <p>Welcome to tradeinvoice! You're all set to create quotes and invoices for your customers.</p>
      <p>Get started by adding a customer and creating your first quote. If you have any questions, we're here to help.</p>
      <p>Best regards,<br/>The tradeinvoice Team</p>
    `,
    text: `Hi ${firstName},\n\nWelcome to tradeinvoice! You're all set to create quotes and invoices for your customers.\n\nGet started by adding a customer and creating your first quote. If you have any questions, we're here to help.\n\nBest regards,\nThe tradeinvoice Team`,
  });
  return { success: result.success };
}

/** Subscription confirmation when user subscribes (app owner → user) */
export async function sendSubscriptionConfirmation(to: string, name: string | null): Promise<{ success: boolean }> {
  const firstName = name?.split(" ")[0] || "there";
  const result = await sendEmail({
    to,
    subject: "Thanks for subscribing to tradeinvoice",
    html: `
      <p>Hi ${firstName},</p>
      <p>Thanks for subscribing to tradeinvoice! Your subscription is now active.</p>
      <p>You can create unlimited quotes and invoices, add your logo to documents, and send them to customers via email or WhatsApp.</p>
      <p>Best regards,<br/>The tradeinvoice Team</p>
    `,
    text: `Hi ${firstName},\n\nThanks for subscribing to tradeinvoice! Your subscription is now active.\n\nYou can create unlimited quotes and invoices, add your logo to documents, and send them to customers via email or WhatsApp.\n\nBest regards,\nThe tradeinvoice Team`,
  });
  return { success: result.success };
}

/** Subscription canceled / churn (app owner → user) */
export async function sendSubscriptionCanceled(to: string, name: string | null): Promise<{ success: boolean }> {
  const firstName = name?.split(" ")[0] || "there";
  const result = await sendEmail({
    to,
    subject: "Sorry to see you go — tradeinvoice",
    html: `
      <p>Hi ${firstName},</p>
      <p>Your tradeinvoice subscription has been canceled. You can still access your account until the end of your current billing period.</p>
      <p>Changed your mind? You can resubscribe anytime from your <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://tradeinvoice.co.uk"}/pricing">pricing page</a>.</p>
      <p>Best regards,<br/>The tradeinvoice Team</p>
    `,
    text: `Hi ${firstName},\n\nYour tradeinvoice subscription has been canceled. You can still access your account until the end of your current billing period.\n\nChanged your mind? You can resubscribe anytime from your pricing page.\n\nBest regards,\nThe tradeinvoice Team`,
  });
  return { success: result.success };
}

/** Payment receipt / renewal (app owner → user) */
export async function sendPaymentReceipt(
  to: string,
  name: string | null,
  amount: string,
  isRenewal: boolean,
  invoiceUrl?: string | null
): Promise<{ success: boolean }> {
  const firstName = name?.split(" ")[0] || "there";
  const subject = isRenewal ? "Your tradeinvoice subscription has renewed" : "Thanks for your payment — tradeinvoice";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://tradeinvoice.co.uk";

  const invoiceLinkHtml = invoiceUrl
    ? `<p>You can view this invoice here: <a href="${invoiceUrl}">${invoiceUrl}</a></p>`
    : `<p>You can view your invoices in <a href="${appUrl}/dashboard/settings">settings</a> or in your Stripe customer portal.</p>`;

  const invoiceLinkText = invoiceUrl
    ? `You can view this invoice here: ${invoiceUrl}`
    : `You can view your invoices in your dashboard settings or in your Stripe customer portal.`;

  const result = await sendEmail({
    to,
    subject,
    html: `
      <p>Hi ${firstName},</p>
      <p>${isRenewal ? "Your tradeinvoice subscription has renewed successfully." : "We've received your payment."}</p>
      <p><strong>Amount paid: ${amount}</strong></p>
      ${invoiceLinkHtml}
      <p>Best regards,<br/>The tradeinvoice Team</p>
    `,
    text: `Hi ${firstName},\n\n${isRenewal ? "Your tradeinvoice subscription has renewed successfully." : "We've received your payment."}\n\nAmount paid: ${amount}\n\n${invoiceLinkText}\n\nBest regards,\nThe tradeinvoice Team`,
  });
  return { success: result.success };
}

/** Payment failed — update card (app owner → user) */
export async function sendPaymentFailed(to: string, name: string | null): Promise<{ success: boolean }> {
  const firstName = name?.split(" ")[0] || "there";
  const result = await sendEmail({
    to,
    subject: "Your payment failed — tradeinvoice",
    html: `
      <p>Hi ${firstName},</p>
      <p>We couldn't process your tradeinvoice subscription payment. Please update your payment method to avoid any interruption to your service.</p>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL || "https://tradeinvoice.co.uk"}/dashboard/settings">Update payment method</a></p>
      <p>If you have any questions, please contact us.</p>
      <p>Best regards,<br/>The tradeinvoice Team</p>
    `,
    text: `Hi ${firstName},\n\nWe couldn't process your tradeinvoice subscription payment. Please update your payment method in your dashboard settings to avoid any interruption to your service.\n\nBest regards,\nThe tradeinvoice Team`,
  });
  return { success: result.success };
}

/** Trial ending soon (app owner → user) */
export async function sendTrialEndingSoon(to: string, name: string | null, daysLeft: number): Promise<{ success: boolean }> {
  const firstName = name?.split(" ")[0] || "there";
  const dayText = daysLeft === 1 ? "1 day" : `${daysLeft} days`;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://tradeinvoice.co.uk";
  const result = await sendEmail({
    to,
    subject: `Your tradeinvoice trial ends in ${dayText}`,
    html: `
      <p>Hi ${firstName},</p>
      <p>Your 7-day free trial ends in ${dayText}. Your card will be charged automatically when the trial ends.</p>
      <p>To continue using tradeinvoice without interruption, no action is needed. To cancel before you're charged, visit your <a href="${appUrl}/dashboard/settings">settings</a>.</p>
      <p>Best regards,<br/>The tradeinvoice Team</p>
    `,
    text: `Hi ${firstName},\n\nYour 7-day free trial ends in ${dayText}. Your card will be charged automatically when the trial ends.\n\nTo cancel before you're charged, visit your dashboard settings.\n\nBest regards,\nThe tradeinvoice Team`,
  });
  return { success: result.success };
}

/** Setup reminder for users who registered but haven't subscribed (app owner → user) */
export async function sendSetupReminder(to: string, name: string | null): Promise<{ success: boolean }> {
  const firstName = name?.split(" ")[0] || "there";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://tradeinvoice.co.uk";
  const result = await sendEmail({
    to,
    subject: "Finish setting up your tradeinvoice account",
    html: `
      <p>Hi ${firstName},</p>
      <p>You started setting up your tradeinvoice account but didn&apos;t finish choosing a plan.</p>
      <p>tradeinvoice lets you create UK-ready quotes and invoices in minutes — 7-day free trial included.</p>
      <p><a href="${appUrl}/pricing">Click here to pick a plan and finish setup</a>.</p>
      <p>Best regards,<br/>The tradeinvoice Team</p>
    `,
    text: `Hi ${firstName},\n\nYou started setting up your tradeinvoice account but didn't finish choosing a plan.\n\ntradeinvoice lets you create UK-ready quotes and invoices in minutes — 7-day free trial included.\n\nFinish setup here: ${appUrl}/pricing\n\nBest regards,\nThe tradeinvoice Team`,
  });
  return { success: result.success };
}
