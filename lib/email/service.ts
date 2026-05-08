import { Resend } from "resend";
import prisma from "@/lib/prisma";
import { render } from "@react-email/render";
import { OrderConfirmationTemplate } from "./templates/order-confirmation";
import { AppointmentReminderTemplate } from "./templates/appointment-reminder";
import { PasswordResetTemplate } from "./templates/password-reset";
import { NewsletterWelcomeTemplate } from "./templates/newsletter-welcome";

export class EmailService {
  private resend: Resend | null = null;
  private fromEmail = "Rebelle Boutique <hola@rebelleboutique.com>";

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      const resendConfig = await prisma.siteConfig.findUnique({
        where: { key: "RESEND_API_KEY" },
      });

      if (resendConfig?.value) {
        this.resend = new Resend(resendConfig.value);
      }

      const fromConfig = await prisma.siteConfig.findUnique({
        where: { key: "EMAIL_FROM" },
      });

      if (fromConfig?.value) {
        this.fromEmail = fromConfig.value;
      }
    } catch (error) {
      console.error("Error initializing email service:", error);
    }
  }

  private async ensureInitialized() {
    if (!this.resend) {
      await this.initialize();
    }
    return this.resend !== null;
  }

  async sendOrderConfirmation(params: {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    orderDate: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      image?: string;
    }>;
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
    shippingAddress: {
      street: string;
      number: string;
      colonia: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    estimatedDelivery?: string;
    trackingNumber?: string;
  }) {
    if (!(await this.ensureInitialized())) {
      throw new Error("Email service not initialized");
    }

    const html = await render(
      OrderConfirmationTemplate({
        orderNumber: params.orderNumber,
        customerName: params.customerName,
        orderDate: params.orderDate,
        items: params.items,
        subtotal: params.subtotal,
        shipping: params.shipping,
        discount: params.discount,
        total: params.total,
        shippingAddress: params.shippingAddress,
        estimatedDelivery: params.estimatedDelivery,
        trackingNumber: params.trackingNumber,
      })
    );

    const text = `
      Confirmación de Pedido #${params.orderNumber}
      
      Hola ${params.customerName},
      
      Tu pedido #${params.orderNumber} ha sido confirmado y está siendo procesado.
      Te notificaremos cuando sea enviado.
      
      Detalles del pedido:
      ${params.items.map(item => `- ${item.name} x${item.quantity}: $${item.price.toFixed(2)}`).join('\n')}
      
      Subtotal: $${params.subtotal.toFixed(2)}
      Envío: $${params.shipping.toFixed(2)}
      ${params.discount > 0 ? `Descuento: -$${params.discount.toFixed(2)}` : ''}
      Total: $${params.total.toFixed(2)}
      
      Dirección de envío:
      ${params.shippingAddress.street} #${params.shippingAddress.number}
      ${params.shippingAddress.colonia}, ${params.shippingAddress.city}
      ${params.shippingAddress.state}, ${params.shippingAddress.zip}
      ${params.shippingAddress.country}
      
      ${params.trackingNumber ? `Número de seguimiento: ${params.trackingNumber}` : ''}
      ${params.estimatedDelivery ? `Entrega estimada: ${params.estimatedDelivery}` : ''}
      
      Gracias por tu compra,
      Rebelle Boutique
    `;

    try {
      const result = await this.resend!.emails.send({
        from: this.fromEmail,
        to: params.customerEmail,
        subject: `✅ Confirmación de Pedido #${params.orderNumber} - Rebelle Boutique`,
        html,
        text,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return {
        success: true,
        emailId: result.data?.id,
      };
    } catch (error: any) {
      console.error("Error sending order confirmation email:", error);
      throw error;
    }
  }

  async sendAppointmentReminder(params: {
    customerName: string;
    customerEmail: string;
    serviceName: string;
    appointmentDate: string;
    appointmentTime: string;
    duration: number;
    location?: string;
    address?: string;
    stylistName?: string;
    preparationNotes?: string;
    rescheduleLink?: string;
    cancelLink?: string;
  }) {
    if (!(await this.ensureInitialized())) {
      throw new Error("Email service not initialized");
    }

    const html = await render(
      AppointmentReminderTemplate({
        customerName: params.customerName,
        serviceName: params.serviceName,
        appointmentDate: params.appointmentDate,
        appointmentTime: params.appointmentTime,
        duration: params.duration,
        location: params.location,
        address: params.address,
        stylistName: params.stylistName,
        preparationNotes: params.preparationNotes,
        rescheduleLink: params.rescheduleLink,
        cancelLink: params.cancelLink,
      })
    );

    const text = `
      Recordatorio de Cita - Rebelle Boutique
      
      Hola ${params.customerName},
      
      Te recordamos que tienes una cita programada para mañana.
      
      Detalles de la cita:
      Servicio: ${params.serviceName}
      Fecha: ${params.appointmentDate}
      Hora: ${params.appointmentTime}
      Duración: ${params.duration} minutos
      Estilista: ${params.stylistName || "Thalia"}
      
      Ubicación: ${params.location || "Rebelle Studio"}
      Dirección: ${params.address || "Av. Principal 123, Col. Centro, Ciudad de México"}
      
      ${params.preparationNotes ? `Notas de preparación: ${params.preparationNotes}` : ''}
      
      ${params.rescheduleLink ? `Reprogramar: ${params.rescheduleLink}` : ''}
      ${params.cancelLink ? `Cancelar: ${params.cancelLink}` : ''}
      
      Para confirmar tu asistencia, no es necesario hacer nada.
      Te esperamos en tu horario programado.
      
      ¿Tienes dudas?
      WhatsApp: +52 664 123 4567
      Email: hola@rebelleboutique.com
      
      Saludos,
      Rebelle Studio
    `;

    try {
      const result = await this.resend!.emails.send({
        from: this.fromEmail,
        to: params.customerEmail,
        subject: `⏰ Recordatorio: Tu cita es mañana - Rebelle Boutique`,
        html,
        text,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return {
        success: true,
        emailId: result.data?.id,
      };
    } catch (error: any) {
      console.error("Error sending appointment reminder email:", error);
      throw error;
    }
  }

  async sendPasswordReset(params: {
    customerName: string;
    customerEmail: string;
    resetLink: string;
    expiresIn?: string;
    ipAddress?: string;
    browserInfo?: string;
  }) {
    if (!(await this.ensureInitialized())) {
      throw new Error("Email service not initialized");
    }

    const html = await render(
      PasswordResetTemplate({
        customerName: params.customerName,
        resetLink: params.resetLink,
        expiresIn: params.expiresIn || "24 horas",
        ipAddress: params.ipAddress,
        browserInfo: params.browserInfo,
      })
    );

    const text = `
      Restablecimiento de Contraseña - Rebelle Boutique
      
      Hola ${params.customerName},
      
      Recibimos una solicitud para restablecer la contraseña de tu cuenta.
      Si no fuiste tú, ignora este email y verifica la seguridad de tu cuenta.
      
      Para crear una nueva contraseña, visita:
      ${params.resetLink}
      
      Este enlace es válido por ${params.expiresIn || "24 horas"}.
      
      Detalles de la solicitud:
      Dirección IP: ${params.ipAddress || "No disponible"}
      Navegador: ${params.browserInfo || "No disponible"}
      
      Si no reconoces esta actividad, te recomendamos:
      - Cambiar tu contraseña inmediatamente
      - Revisar la actividad reciente de tu cuenta
      - Contactar a nuestro equipo de soporte
      
      ¿Necesitas ayuda?
      Email: hola@rebelleboutique.com
      Horario: Lunes a Viernes 9:00 - 18:00
      
      Este es un email automático de seguridad. Por favor no responder.
    `;

    try {
      const result = await this.resend!.emails.send({
        from: this.fromEmail,
        to: params.customerEmail,
        subject: `🔒 Restablece tu contraseña - Rebelle Boutique`,
        html,
        text,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return {
        success: true,
        emailId: result.data?.id,
      };
    } catch (error: any) {
      console.error("Error sending password reset email:", error);
      throw error;
    }
  }

  async sendNewsletterWelcome(params: {
    subscriberName: string;
    subscriberEmail: string;
    welcomeOffer?: {
      code: string;
      discount: number;
      expires: string;
    };
    popularProducts?: Array<{
      name: string;
      image: string;
      price: number;
      link: string;
    }>;
    upcomingEvents?: Array<{
      title: string;
      date: string;
      description: string;
      link?: string;
    }>;
    socialLinks?: {
      instagram?: string;
      facebook?: string;
      tiktok?: string;
      pinterest?: string;
    };
  }) {
    if (!(await this.ensureInitialized())) {
      throw new Error("Email service not initialized");
    }

    const html = await render(
      NewsletterWelcomeTemplate({
        subscriberName: params.subscriberName,
        welcomeOffer: params.welcomeOffer,
        popularProducts: params.popularProducts,
        upcomingEvents: params.upcomingEvents,
        socialLinks: params.socialLinks,
      })
    );

    const text = `
      ¡Bienvenida a la Familia Rebelle!
      
      Hola ${params.subscriberName},
      
      Estamos emocionadas de tenerte con nosotras. Como miembro de nuestra comunidad, 
      serás la primera en conocer nuevas colecciones, tendencias exclusivas y ofertas especiales.
      
      ${params.welcomeOffer ? `
      Tu regalo de bienvenida:
      Código: ${params.welcomeOffer.code}
      Descuento: ${params.welcomeOffer.discount}%
      Válido hasta: ${params.welcomeOffer.expires}
      ` : ''}
      
      ${params.popularProducts && params.popularProducts.length > 0 ? `
      Lo más popular:
      ${params.popularProducts.slice(0, 3).map(p => `- ${p.name}: $${p.price.toFixed(2)}`).join('\n')}
      
      Ver tienda completa: https://rebelleboutique.com/tienda
      ` : ''}
      
      ${params.upcomingEvents && params.upcomingEvents.length > 0 ? `
      Próximos eventos:
      ${params.upcomingEvents.map(e => `- ${e.title} (${e.date}): ${e.description}`).join('\n')}
      ` : ''}
      
      Síguenos en redes sociales para contenido exclusivo:
      ${params.socialLinks?.instagram ? `Instagram: ${params.socialLinks.instagram}` : ''}
      ${params.socialLinks?.facebook ? `Facebook: ${params.socialLinks.facebook}` : ''}
      ${params.socialLinks?.tiktok ? `TikTok: ${params.socialLinks.tiktok}` : ''}
      ${params.socialLinks?.pinterest ? `Pinterest: ${params.socialLinks.pinterest}` : ''}
      
      ¿Qué puedes esperar?
      - Eventos exclusivos y lanzamientos
      - Ofertas especiales para suscriptores
      - Tips de estilo y tendencias
      - Contenido detrás de cámaras
      - Historias de nuestra comunidad Rebelle
      
      Gracias por unirte a nuestra comunidad de estilo con actitud.
      
      Visitar tienda: https://rebelleboutique.com
      
      Saludos,
      Rebelle Boutique
    `;

    try {
      const result = await this.resend!.emails.send({
        from: this.fromEmail,
        to: params.subscriberEmail,
        subject: `🎉 ¡Bienvenida a Rebelle Boutique, ${params.subscriberName}!`,
        html,
        text,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return {
        success: true,
        emailId: result.data?.id,
      };
    } catch (error: any) {
      console.error("Error sending newsletter welcome email:", error);
      throw error;
    }
  }

  async sendTestEmail(to: string) {
    if (!(await this.ensureInitialized())) {
      throw new Error("Email service not initialized");
    }

    try {
      const result = await this.resend!.emails.send({
        from: this.fromEmail,
        to,
        subject: "✅ Prueba de Email - Rebelle Boutique",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #D3AE6E;">Prueba de Email Exitosa</h1>
            <p>El servicio de email de Rebelle Boutique está configurado correctamente.</p>
            <p>Fecha: ${new Date().toLocaleDateString("es-MX")}</p>
            <p>Hora: ${new Date().toLocaleTimeString("es-MX")}</p>
          </div>
        `,
        text: `Prueba de email exitosa - Rebelle Boutique\n\nEl servicio está configurado correctamente.\nFecha: ${new Date().toLocaleDateString("es-MX")}\nHora: ${new Date().toLocaleTimeString("es-MX")}`,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return {
        success: true,
        emailId: result.data?.id,
      };
    } catch (error: any) {
      console.error("Error sending test email:", error);
      throw error;
    }
  }
}

// Singleton instance
export const emailService = new EmailService();