import React from "react";

interface OrderConfirmationProps {
  orderNumber: string;
  customerName: string;
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
    interior?: string;
    colonia: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export function OrderConfirmationTemplate({
  orderNumber,
  customerName,
  orderDate,
  items,
  subtotal,
  shipping,
  discount,
  total,
  shippingAddress,
  estimatedDelivery,
  trackingNumber,
}: OrderConfirmationProps) {
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
          Confirmación de Pedido
        </p>
      </div>

      {/* Order Confirmation */}
      <div style={{ padding: "30px", backgroundColor: "#0a0a0a" }}>
        <div style={{
          background: "rgba(211, 174, 110, 0.1)",
          padding: "25px",
          borderRadius: "10px",
          borderLeft: "4px solid #D3AE6E",
          marginBottom: "30px"
        }}>
          <h2 style={{ color: "#ffffff", margin: "0 0 15px 0", fontSize: "20px" }}>
            ✅ ¡Gracias por tu compra, {customerName}!
          </h2>
          <p style={{ color: "#ffffff", opacity: "0.9", margin: "0 0 20px 0", lineHeight: "1.6" }}>
            Tu pedido <strong>#{orderNumber}</strong> ha sido confirmado y está siendo procesado.
            Te notificaremos cuando sea enviado.
          </p>
          
          <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#D3AE6E", fontSize: "14px", margin: "0 0 5px 0" }}>Número de Pedido</p>
              <p style={{ color: "#ffffff", fontSize: "18px", margin: "0", fontWeight: "bold" }}>
                #{orderNumber}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#D3AE6E", fontSize: "14px", margin: "0 0 5px 0" }}>Fecha</p>
              <p style={{ color: "#ffffff", fontSize: "18px", margin: "0", fontWeight: "bold" }}>
                {orderDate}
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 20px 0", fontSize: "18px" }}>
            📦 Detalles del Pedido
          </h3>
          
          <div style={{ backgroundColor: "#1a1a1a", borderRadius: "8px", overflow: "hidden" }}>
            {items.map((item, index) => (
              <div key={index} style={{
                display: "flex",
                alignItems: "center",
                padding: "15px",
                borderBottom: index < items.length - 1 ? "1px solid rgba(255, 255, 255, 0.1)" : "none"
              }}>
                {item.image && (
                  <div style={{ width: "60px", height: "60px", marginRight: "15px" }}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "4px" }}
                    />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#ffffff", margin: "0 0 5px 0", fontWeight: "bold" }}>
                    {item.name}
                  </p>
                  <p style={{ color: "#ffffff", opacity: "0.7", margin: "0", fontSize: "14px" }}>
                    Cantidad: {item.quantity}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ color: "#D3AE6E", margin: "0", fontWeight: "bold" }}>
                    ${item.price.toFixed(2)}
                  </p>
                  <p style={{ color: "#ffffff", opacity: "0.7", margin: "5px 0 0 0", fontSize: "14px" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 20px 0", fontSize: "18px" }}>
            💰 Resumen del Pedido
          </h3>
          
          <div style={{ backgroundColor: "#1a1a1a", borderRadius: "8px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ color: "#ffffff", opacity: "0.8" }}>Subtotal</span>
              <span style={{ color: "#ffffff" }}>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ color: "#ffffff", opacity: "0.8" }}>EnvÍo</span>
              <span style={{ color: "#ffffff" }}>${shipping.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ color: "#ffffff", opacity: "0.8" }}>Descuento</span>
                <span style={{ color: "#4CAF50" }}>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              marginTop: "15px", 
              paddingTop: "15px",
              borderTop: "2px solid rgba(255, 255, 255, 0.1)"
            }}>
              <span style={{ color: "#ffffff", fontWeight: "bold", fontSize: "18px" }}>Total</span>
              <span style={{ color: "#D3AE6E", fontWeight: "bold", fontSize: "18px" }}>
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 20px 0", fontSize: "18px" }}>
            📍 Dirección de Envío
          </h3>
          
          <div style={{ backgroundColor: "#1a1a1a", borderRadius: "8px", padding: "20px" }}>
            <p style={{ color: "#ffffff", margin: "0 0 10px 0" }}>
              {shippingAddress.street} #{shippingAddress.number}
              {shippingAddress.interior && ` Int. ${shippingAddress.interior}`}
            </p>
            <p style={{ color: "#ffffff", margin: "0 0 10px 0" }}>
              {shippingAddress.colonia}, {shippingAddress.city}
            </p>
            <p style={{ color: "#ffffff", margin: "0 0 10px 0" }}>
              {shippingAddress.state}, {shippingAddress.zip}
            </p>
            <p style={{ color: "#ffffff", margin: "0" }}>
              {shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Tracking & Delivery */}
        {trackingNumber && (
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ color: "#ffffff", margin: "0 0 20px 0", fontSize: "18px" }}>
              🚚 Información de Envío
            </h3>
            
            <div style={{ 
              backgroundColor: "rgba(33, 150, 243, 0.1)", 
              borderRadius: "8px", 
              padding: "20px",
              borderLeft: "4px solid #2196F3"
            }}>
              <p style={{ color: "#ffffff", margin: "0 0 10px 0", fontWeight: "bold" }}>
                Número de Seguimiento: {trackingNumber}
              </p>
              {estimatedDelivery && (
                <p style={{ color: "#ffffff", opacity: "0.8", margin: "0" }}>
                  Entrega estimada: {estimatedDelivery}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div style={{ 
          backgroundColor: "rgba(76, 175, 80, 0.1)", 
          borderRadius: "8px", 
          padding: "20px",
          borderLeft: "4px solid #4CAF50"
        }}>
          <h3 style={{ color: "#ffffff", margin: "0 0 15px 0", fontSize: "18px" }}>
            📝 Próximos Pasos
          </h3>
          <ul style={{ color: "#ffffff", opacity: "0.9", margin: "0", paddingLeft: "20px", lineHeight: "1.8" }}>
            <li>Recibirás una notificación cuando tu pedido sea enviado</li>
            <li>Puedes rastrear tu pedido en cualquier momento desde tu cuenta</li>
            <li>Para cualquier duda, contáctanos en hola@rebelleboutique.com</li>
            <li>Tiempo de respuesta: 24-48 horas hábiles</li>
          </ul>
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
          Rebelle Boutique · Transformando tu estilo con actitud
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
            Ver Mi Pedido
          </a>
        </div>
        
        <div style={{ color: "#ffffff", opacity: "0.5", fontSize: "12px", lineHeight: "1.6" }}>
          <p style={{ margin: "0 0 10px 0" }}>
            © ${new Date().getFullYear()} Rebelle Boutique. Todos los derechos reservados.
          </p>
          <p style={{ margin: "0" }}>
            Este es un email automático, por favor no responder directamente.
            Para asistencia, contacta a hola@rebelleboutique.com
          </p>
        </div>
      </div>
    </div>
  );
}