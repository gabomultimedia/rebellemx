import React from "react";

interface PasswordResetProps {
  customerName: string;
  resetLink: string;
  expiresIn: string;
  ipAddress?: string;
  browserInfo?: string;
  supportEmail?: string;
}

export function PasswordResetTemplate({
  customerName,
  resetLink,
  expiresIn = "24 horas",
  ipAddress = "No disponible",
  browserInfo = "No disponible",
  supportEmail = "hola@rebelleboutique.com",
}: PasswordResetProps) {
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
          Restablecimiento de Contraseña
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: "30px", backgroundColor: "#0a0a0a" }}>
        {/* Security Notice */}
        <div style={{
          background: "rgba(244, 67, 54, 0.1)",
          padding: "25px",
          borderRadius: "10px",
          borderLeft: "4px solid #F44336",
          marginBottom: "30px"
        }}>
          <h2 style={{ color: "#ffffff", margin: "0 0 15px 0", fontSize: "20px" }}>
            🔒 Solicitud de Restablecimiento
          </h2>
          <p style={{ color: "#ffffff", opacity: "0.9", margin: "0", lineHeight: "1.6" }}>
            Hola {customerName}, recibimos una solicitud para restablecer la contraseña de tu cuenta.
            Si no fuiste tú, ignora este email y verifica la seguridad de tu cuenta.
          </p>
        </div>

        {/* Reset Instructions */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 20px 0", fontSize: "18px" }}>
            🔑 Restablece tu Contraseña
          </h3>
          
          <div style={{ backgroundColor: "#1a1a1a", borderRadius: "8px", padding: "25px" }}>
            <p style={{ color: "#ffffff", opacity: "0.9", margin: "0 0 20px 0", lineHeight: "1.6" }}>
              Para crear una nueva contraseña, haz clic en el botón de abajo. 
              Este enlace es válido por <strong>{expiresIn}</strong>.
            </p>
            
            <div style={{ textAlign: "center", margin: "30px 0" }}>
              <a href={resetLink} style={{
                display: "inline-block",
                backgroundColor: "#D3AE6E",
                color: "#000000",
                padding: "16px 40px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "center",
                minWidth: "200px"
              }}>
                Restablecer Contraseña
              </a>
            </div>
            
            <p style={{ color: "#ffffff", opacity: "0.7", margin: "20px 0 0 0", fontSize: "14px", textAlign: "center" }}>
              O copia y pega este enlace en tu navegador:
            </p>
            <div style={{
              backgroundColor: "#000000",
              padding: "15px",
              borderRadius: "6px",
              marginTop: "10px",
              wordBreak: "break-all"
            }}>
              <p style={{ color: "#D3AE6E", margin: "0", fontSize: "12px", fontFamily: "monospace" }}>
                {resetLink}
              </p>
            </div>
          </div>
        </div>

        {/* Security Information */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 20px 0", fontSize: "18px" }}>
            🛡️ Información de Seguridad
          </h3>
          
          <div style={{ 
            backgroundColor: "rgba(33, 150, 243, 0.1)", 
            borderRadius: "8px", 
            padding: "20px",
            borderLeft: "4px solid #2196F3"
          }}>
            <p style={{ color: "#ffffff", fontWeight: "bold", margin: "0 0 15px 0" }}>
              Detalles de la solicitud:
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
              <div>
                <p style={{ color: "#2196F3", fontSize: "12px", margin: "0 0 5px 0" }}>Dirección IP</p>
                <p style={{ color: "#ffffff", fontSize: "14px", margin: "0", fontFamily: "monospace" }}>
                  {ipAddress}
                </p>
              </div>
              <div>
                <p style={{ color: "#2196F3", fontSize: "12px", margin: "0 0 5px 0" }}>Navegador</p>
                <p style={{ color: "#ffffff", fontSize: "14px", margin: "0" }}>
                  {browserInfo}
                </p>
              </div>
            </div>
            
            <p style={{ color: "#ffffff", opacity: "0.8", margin: "15px 0 0 0", fontSize: "13px", lineHeight: "1.6" }}>
              Si no reconoces esta actividad, te recomendamos:
            </p>
            <ul style={{ color: "#ffffff", opacity: "0.8", margin: "10px 0 0 0", paddingLeft: "20px", fontSize: "13px", lineHeight: "1.6" }}>
              <li>Cambiar tu contraseña inmediatamente</li>
              <li>Revisar la actividad reciente de tu cuenta</li>
              <li>Habilitar autenticación de dos factores si está disponible</li>
              <li>Contactar a nuestro equipo de soporte</li>
            </ul>
          </div>
        </div>

        {/* Password Tips */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 20px 0", fontSize: "18px" }}>
            💡 Consejos para una Contraseña Segura
          </h3>
          
          <div style={{ 
            backgroundColor: "rgba(76, 175, 80, 0.1)", 
            borderRadius: "8px", 
            padding: "20px",
            borderLeft: "4px solid #4CAF50"
          }}>
            <ul style={{ color: "#ffffff", opacity: "0.9", margin: "0", paddingLeft: "20px", lineHeight: "1.8" }}>
              <li>Usa al menos 12 caracteres</li>
              <li>Combina mayúsculas, minúsculas, números y símbolos</li>
              <li>No uses información personal (nombre, fecha de nacimiento)</li>
              <li>Evita contraseñas comunes como "123456" o "password"</li>
              <li>Considera usar un gestor de contraseñas</li>
              <li>No reutilices contraseñas en diferentes sitios</li>
            </ul>
          </div>
        </div>

        {/* Support Information */}
        <div style={{ 
          backgroundColor: "rgba(33, 33, 33, 0.8)", 
          borderRadius: "8px", 
          padding: "20px",
          textAlign: "center"
        }}>
          <p style={{ color: "#ffffff", margin: "0 0 15px 0", fontWeight: "bold" }}>
            ¿Necesitas ayuda?
          </p>
          <p style={{ color: "#ffffff", opacity: "0.8", margin: "0 0 10px 0", fontSize: "14px" }}>
            Email: {supportEmail}
          </p>
          <p style={{ color: "#ffffff", opacity: "0.8", margin: "0", fontSize: "14px" }}>
            Horario de soporte: Lunes a Viernes 9:00 - 18:00
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
        <div style={{ color: "#ffffff", opacity: "0.5", fontSize: "12px", lineHeight: "1.6" }}>
          <p style={{ margin: "0 0 10px 0" }}>
            © ${new Date().getFullYear()} Rebelle Boutique. Todos los derechos reservados.
          </p>
          <p style={{ margin: "0 0 10px 0" }}>
            Este es un email automático de seguridad. Por favor no responder.
          </p>
          <p style={{ margin: "0" }}>
            Si recibiste este email por error, ignóralo y elimínalo.
          </p>
        </div>
      </div>
    </div>
  );
}