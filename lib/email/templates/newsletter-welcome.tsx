import React from "react";

interface NewsletterWelcomeProps {
  subscriberName: string;
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
}

export function NewsletterWelcomeTemplate({
  subscriberName,
  welcomeOffer,
  popularProducts = [],
  upcomingEvents = [],
  socialLinks = {},
}: NewsletterWelcomeProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        padding: "50px 30px",
        textAlign: "center",
        borderBottom: "2px solid #D3AE6E"
      }}>
        <h1 style={{ color: "#D3AE6E", margin: "0 0 15px 0", fontSize: "32px" }}>
          Rebelle Boutique
        </h1>
        <p style={{ color: "#ffffff", opacity: "0.8", margin: "0", fontSize: "18px" }}>
          Bienvenida a la Familia Rebelle
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: "30px", backgroundColor: "#0a0a0a" }}>
        {/* Welcome Message */}
        <div style={{
          background: "rgba(211, 174, 110, 0.1)",
          padding: "30px",
          borderRadius: "10px",
          borderLeft: "4px solid #D3AE6E",
          marginBottom: "40px",
          textAlign: "center"
        }}>
          <h2 style={{ color: "#ffffff", margin: "0 0 20px 0", fontSize: "24px" }}>
            🎉 ¡Hola {subscriberName}, bienvenida a la comunidad Rebelle!
          </h2>
          <p style={{ color: "#ffffff", opacity: "0.9", margin: "0", lineHeight: "1.8", fontSize: "16px" }}>
            Estamos emocionadas de tenerte con nosotras. Como miembro de nuestra comunidad, 
            serás la primera en conocer nuevas colecciones, tendencias exclusivas y ofertas especiales.
          </p>
        </div>

        {/* Welcome Offer */}
        {welcomeOffer && (
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ color: "#ffffff", margin: "0 0 25px 0", fontSize: "22px", textAlign: "center" }}>
              🎁 Tu Regalo de Bienvenida
            </h3>
            
            <div style={{ 
              background: "linear-gradient(135deg, #D3AE6E 0%, #c19a5b 100%)",
              borderRadius: "12px",
              padding: "30px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "100px",
                height: "100px",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: "50%"
              }}></div>
              <div style={{
                position: "absolute",
                bottom: "-30px",
                left: "-30px",
                width: "80px",
                height: "80px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%"
              }}></div>
              
              <p style={{ color: "#000000", fontSize: "18px", margin: "0 0 15px 0", fontWeight: "bold" }}>
                {welcomeOffer.discount}% DE DESCUENTO
              </p>
              <div style={{ 
                backgroundColor: "#000000", 
                color: "#D3AE6E", 
                padding: "15px",
                borderRadius: "8px",
                margin: "20px auto",
                maxWidth: "300px",
                fontFamily: "monospace",
                fontSize: "20px",
                fontWeight: "bold",
                letterSpacing: "2px"
              }}>
                {welcomeOffer.code}
              </div>
              <p style={{ color: "#000000", margin: "15px 0 0 0", fontSize: "14px" }}>
                Válido hasta: {welcomeOffer.expires}
              </p>
              <p style={{ color: "#000000", opacity: "0.8", margin: "10px 0 0 0", fontSize: "12px" }}>
                Aplica en tu primera compra online
              </p>
            </div>
          </div>
        )}

        {/* Popular Products */}
        {popularProducts.length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ color: "#ffffff", margin: "0 0 25px 0", fontSize: "22px", textAlign: "center" }}>
              ✨ Lo Más Popular
            </h3>
            
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
              gap: "20px",
              marginBottom: "30px"
            }}>
              {popularProducts.slice(0, 4).map((product, index) => (
                <a 
                  key={index}
                  href={product.link}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#1a1a1a",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ height: "150px", overflow: "hidden" }}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        style={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover",
                          transition: "transform 0.3s ease"
                        }}
                      />
                    </div>
                    <div style={{ padding: "15px" }}>
                      <p style={{ 
                        color: "#ffffff", 
                        margin: "0 0 10px 0", 
                        fontSize: "14px",
                        fontWeight: "bold",
                        height: "40px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical"
                      }}>
                        {product.name}
                      </p>
                      <p style={{ color: "#D3AE6E", margin: "0", fontWeight: "bold" }}>
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            <div style={{ textAlign: "center" }}>
              <a href="https://rebelleboutique.com/tienda" style={{
                display: "inline-block",
                backgroundColor: "transparent",
                color: "#D3AE6E",
                padding: "12px 30px",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "14px",
                border: "2px solid #D3AE6E"
              }}>
                Ver Tienda Completa
              </a>
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div style={{ marginBottom: "40px" }}>
            <h3 style={{ color: "#ffffff", margin: "0 0 25px 0", fontSize: "22px", textAlign: "center" }}>
              📅 Próximos Eventos
            </h3>
            
            <div style={{ backgroundColor: "#1a1a1a", borderRadius: "10px", overflow: "hidden" }}>
              {upcomingEvents.map((event, index) => (
                <div key={index} style={{
                  padding: "20px",
                  borderBottom: index < upcomingEvents.length - 1 ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "15px"
                }}>
                  <div style={{
                    backgroundColor: "#D3AE6E",
                    color: "#000000",
                    width: "50px",
                    height: "50px",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: "0"
                  }}>
                    <span style={{ fontSize: "12px", fontWeight: "bold" }}>EVENTO</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#ffffff", margin: "0 0 5px 0", fontWeight: "bold" }}>
                      {event.title}
                    </p>
                    <p style={{ color: "#D3AE6E", margin: "0 0 10px 0", fontSize: "14px" }}>
                      📅 {event.date}
                    </p>
                    <p style={{ color: "#ffffff", opacity: "0.8", margin: "0 0 10px 0", fontSize: "14px", lineHeight: "1.6" }}>
                      {event.description}
                    </p>
                    {event.link && (
                      <a href={event.link} style={{
                        color: "#D3AE6E",
                        fontSize: "14px",
                        textDecoration: "none",
                        fontWeight: "bold"
                      }}>
                        Más información →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Media */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 20px 0", fontSize: "22px", textAlign: "center" }}>
            📱 Síguenos en Redes
          </h3>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: "15px",
            marginBottom: "30px"
          }}>
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
                backgroundColor: "#1a1a1a",
                borderRadius: "50%",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "20px",
                transition: "background-color 0.3s ease"
              }}>
                📸
              </a>
            )}
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
                backgroundColor: "#1a1a1a",
                borderRadius: "50%",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "20px",
                transition: "background-color 0.3s ease"
              }}>
                👍
              </a>
            )}
            {socialLinks.tiktok && (
              <a href={socialLinks.tiktok} style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
                backgroundColor: "#1a1a1a",
                borderRadius: "50%",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "20px",
                transition: "background-color 0.3s ease"
              }}>
                🎵
              </a>
            )}
            {socialLinks.pinterest && (
              <a href={socialLinks.pinterest} style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "50px",
                backgroundColor: "#1a1a1a",
                borderRadius: "50%",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "20px",
                transition: "background-color 0.3s ease"
              }}>
                📌
              </a>
            )}
          </div>
          
          <p style={{ color: "#ffffff", opacity: "0.8", margin: "0", textAlign: "center", fontSize: "14px", lineHeight: "1.6" }}>
            Compartimos contenido exclusivo, detrás de cámaras, tips de estilo 
            y primeras vistas de nuevas colecciones.
          </p>
        </div>

        {/* What to Expect */}
        <div style={{ 
          backgroundColor: "rgba(33, 150, 243, 0.1)", 
          borderRadius: "10px", 
          padding: "25px",
          marginBottom: "30px"
        }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 15px 0", fontSize: "18px", textAlign: "center" }}>
            📬 ¿Qué puedes esperar?
          </h3>
          <ul style={{ 
            color: "#ffffff", 
            opacity: "0.9", 
            margin: "0", 
            paddingLeft: "20px", 
            lineHeight: "1.8",
            listStyleType: "none"
          }}>
            <li style={{ marginBottom: "10px" }}>• 📅 Eventos exclusivos y lanzamientos</li>
            <li style={{ marginBottom: "10px" }}>• 💎 Ofertas especiales para suscriptores</li>
            <li style={{ marginBottom: "10px" }}>• 👗 Tips de estilo y tendencias</li>
            <li style={{ marginBottom: "10px" }}>• 🎥 Contenido detrás de cámaras</li>
            <li>• ❤️ Historias de nuestra comunidad Rebelle</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: "#000000",
        padding: "40px 30px",
        textAlign: "center",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <p style={{ color: "#ffffff", opacity: "0.7", margin: "0 0 20px 0", fontSize: "14px" }}>
          Gracias por unirte a nuestra comunidad de estilo con actitud.
        </p>
        
        <div style={{ marginBottom: "20px" }}>
          <a href="https://rebelleboutique.com" style={{
            display: "inline-block",
            backgroundColor: "#D3AE6E",
            color: "#000000",
            padding: "12px 30px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "14px"
          }}>
            Visitar Tienda
          </a>
        </div>
        
        <div style={{ color: "#ffffff", opacity: "0.5", fontSize: "12px", lineHeight: "1.6" }}>
          <p style={{ margin: "0 0 10px 0" }}>
            © ${new Date().getFullYear()} Rebelle Boutique. Todos los derechos reservados.
          </p>
          <p style={{ margin: "0 0 10px 0" }}>
            <a href="https://rebelleboutique.com/unsubscribe" style={{ color: "#D3AE6E", textDecoration: "none" }}>
              Cancelar suscripción
            </a> | 
            <a href="https://rebelleboutique.com/preferences" style={{ color: "#D3AE6E", textDecoration: "none", marginLeft: "10px" }}>
              Preferencias
            </a>
          </p>
          <p style={{ margin: "0" }}>
            Rebelle Boutique, Av. Principal 123, Col. Centro, Ciudad de México
          </p>
        </div>
      </div>
    </div>
  );
}