/**
 * Plantillas de correo (Resend / Nodemailer).
 * Conecta RESEND_API_KEY y EMAIL_FROM en producción.
 */
export async function sendOrderConfirmation(to: string, orderNumber: string) {
  if (!process.env.RESEND_API_KEY) {
    console.info("[email] omitido: sin RESEND_API_KEY", { to, orderNumber });
    return;
  }
  // await resend.emails.send({ ... })
}

export async function sendAppointmentConfirmation(to: string) {
  if (!process.env.RESEND_API_KEY) {
    console.info("[email] omitido: sin RESEND_API_KEY", { to });
    return;
  }
}
