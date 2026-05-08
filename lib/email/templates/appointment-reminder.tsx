import React from "react";

interface AppointmentReminderProps {
  customerName: string;
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
}

export function AppointmentReminderTemplate({
  customerName,
  serviceName,
  appointmentDate,
  appointmentTime,
  duration,
  location = "Rebelle Studio",
  address = "Av. Principal 123, Col. Centro, Ciudad de México",
  stylistName = "Thalia",
  preparationNotes,
  rescheduleLink,
  cancelLink,
}: AppointmentReminderProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        padding: "40px 30px",
        textAlign: "center",
        borderBottom: "2px solid #D3AE6E"
      }}>
        <h1 style={{ color: "#D3AE6E", margin: "0 0 10px 0", fontSize: "28px" }}>
          Rebelle Boutique
        </h1>
        <p style={{ color: "#ffffff", opacity: "0.8", margin: "0", fontSize: "16px" }}>
          Recordatorio de Cita
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: "30px", backgroundColor: "#0a0a0a" }}>
        {/* Important Notice */}
        <div style={{
          background: "rgba(255, 193, 7, 0.1)",
          padding: "25px",
          borderRadius: "10px",
          borderLeft: "4px solid #FFC107",
          marginBottom: "30px"
        }}>
          <h2 style={{ color: "#ffffff", margin: "0 0 15px 0", fontSize: "20px" }}>
            ⏰ Recordatorio: Tu cita es mañana
          </h2>
          <p style={{ color: "#ffffff", opacity: "0.9", margin: "0", lineHeight: "1.6" }}>
            Hola {customerName}, te recordamos que tienes una cita programada para mañana.
            Por favor confirma tu asistencia o reprograma si es necesario.
          </p>
        </div>

        {/* Appointment Details */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 20px 0", fontSize: "18px" }}>
            📅 Detalles de la Cita
          </h3>
          
          <div style={{ backgroundColor: "#1a1a1a", borderRadius: "8px", padding: "25px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <p style={{ color: "#D3AE6E", fontSize: "14px", margin: "0 0 5px 0" }}>Servicio</p>
                <p style={{ color: "#ffffff", fontSize: "18px", margin: "0", fontWeight: "bold" }}>
                  {serviceName}
                </p>
              </div>
              <div>
                <p style={{ color: "#D3AE6E", fontSize: "14px", margin: "0 0 5px 0" }}>Duración</p>
                <p style={{ color: "#ffffff", fontSize: "18px", margin: "0", fontWeight: "bold" }}>
                  {duration} minutos
                </p>
              </div>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div>
                <p style={{ color: "#D3AE6E", fontSize: "14px", margin: "0 0 5px 0" }}>Fecha</p>
                <p style={{ color: "#ffffff", fontSize: "18px", margin: "0", fontWeight: "bold" }}>
                  {appointmentDate}
                </p>
              </div>
              <div>
                <p style={{ color: "#D3AE6E", fontSize: "14px", margin: "0 0 5px 0" }}>Hora</p>
                <p style={{ color: "#ffffff", fontSize: "18px", margin: "0", fontWeight: "bold" }}>
                  {appointmentTime}
                </p>
              </div>
            </div>
            
            <div>
              <p style={{ color: "#D3AE6E", fontSize: "14px", margin: "0 0 5px 0" }}>Estilista</p>
              <p style={{ color: "#ffffff", fontSize: "18px", margin: "0", fontWeight: "bold" }}>
                {stylistName}
              </p>
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 20px 0", fontSize: "18px" }}>
            📍 Ubicación
          </h3>
          
          <div style={{ backgroundColor: "#1a1a1a", borderRadius: "8px", padding: "25px" }}>
            <p style={{ color: "#ffffff", fontWeight: "bold", margin: "0 0 10px 0", fontSize: "16px" }}>
              {location}
            </p>
            <p style={{ color: "#ffffff", opacity: "0.9", margin: "0 0 15px 0", lineHeight: "1.6" }}>
              {address}
            </p>
            
            <div style={{ 
              backgroundColor: "rgba(33, 150, 243, 0.1)", 
              padding: "15px", 
              borderRadius: "6px",
              marginTop: "15px"
            }}>
              <p style={{ color: "#2196F3", margin: "0 0 10px 0", fontWeight: "bold", fontSize: "14px" }}>
                💡 Recomendaciones:
              </p>
              <ul style={{ color: "#ffffff", opacity: "0.9", margin: "0", paddingLeft: "20px", lineHeight: "1.6" }}>
                <li>Llega 10 minutos antes de tu cita</li>
                <li>Trae inspiración o referencias si las tienes</li>
                <li>Estacionamiento disponible en el lugar</li>
                <li>Wi-Fi gratuito para clientes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Preparation Notes */}
        {preparationNotes && (
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ color: "#ffffff", margin: "0 0 20px 0", fontSize: "18px" }}>
              📝 Notas de Preparación
            </h3>
            
            <div style={{ 
              backgroundColor: "rgba(156, 39, 176, 0.1)", 
              borderRadius: "8px", 
              padding: "20px",
              borderLeft: "4px solid #9C27B0"
            }}>
              <p style={{ color: "#ffffff", opacity: "0.9", margin: "0", lineHeight: "1.6" }}>
                {preparationNotes}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 20px 0", fontSize: "18px" }}>
            🔄 ¿Necesitas hacer cambios?
          </h3>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 1fr", 
            gap: "15px",
            marginBottom: "20px"
          }}>
            {rescheduleLink && (
              <a href={rescheduleLink} style={{
                display: "block",
                backgroundColor: "transparent",
                color: "#D3AE6E",
                padding: "15px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "14px",
                textAlign: "center",
                border: "2px solid #D3AE6E"
              }}>
                Reprogramar Cita
              </a>
            )}
            
            {cancelLink && (
              <a href={cancelLink} style={{
                display: "block",
                backgroundColor: "transparent",
                color: "#F44336",
                padding: "15px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "14px",
                textAlign: "center",
                border: "2px solid #F44336"
              }}>
                Cancelar Cita
              </a>
            )}
          </div>
          
          <div style={{ 
            backgroundColor: "rgba(76, 175, 80, 0.1)", 
            padding: "15px", 
            borderRadius: "6px",
            textAlign: "center"
          }}>
            <p style={{ color: "#4CAF50", margin: "0", fontSize: "14px" }}>
              ✅ Para confirmar tu asistencia, no es necesario hacer nada.
              Te esperamos en tu horario programado.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div style={{ 
          backgroundColor: "rgba(33, 33, 33, 0.8)", 
          borderRadius: "8px", 
          padding: "20px",
          textAlign: "center"
        }}>
          <p style={{ color: "#ffffff", margin: "0 0 15px 0", fontWeight: "bold" }}>
            📞 ¿Tienes dudas?
          </p>
          <p style={{ color: "#ffffff", opacity: "0.8", margin: "0 0 10px 0", fontSize: "14px" }}>
            WhatsApp: +52 664 123 4567
          </p>
          <p style={{ color: "#ffffff", opacity: "0.8", margin: "0 0 10px 0", fontSize: "14px" }}>
            Email: hola@rebelleboutique.com
          </p>
          <p style={{ color: "#ffffff", opacity: "0.8", margin: "0", fontSize: "14px" }}>
            Horario: Lunes a Sábado 9:00 - 19:00
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: "#000000",
        padding: "30px",
        textAlign: "center",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <p style={{ color: "#ffffff", opacity: "0.7", margin: "0 0 20px 0", fontSize: "14px" }}>
          Rebelle Studio · Transformando tu estilo con actitud
        </p>
        
        <div style={{ color: "#ffffff", opacity: "0.5", fontSize: "12px", lineHeight: "1.6" }}>
          <p style={{ margin: "0 0 10px 0" }}>
            © ${new Date().getFullYear()} Rebelle Boutique. Todos los derechos reservados.
          </p>
          <p style={{ margin: "0" }}>
            Este es un recordatorio automático enviado 24 horas antes de tu cita.
          </p>
        </div>
      </div>
    </div>
  );
}