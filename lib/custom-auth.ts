import { cookies } from "next/headers";

function decodeJWT(token: string): { sub: string; email: string; name: string; role: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    let payload = parts[1];
    while (payload.length % 4 !== 0) {
      payload += "=";
    }
    
    const decoded = Buffer.from(payload, "base64").toString("utf-8");
    const data = JSON.parse(decoded);
    
    if (!data.sub || !data.email) return null;
    
    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (data.exp && data.exp < now) return null;
    
    return {
      sub: data.sub,
      email: data.email,
      name: data.name || "",
      role: data.role || "",
    };
  } catch {
    return null;
  }
}

// Custom auth function that reads our own auth-token cookie
export async function customAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  
  if (!token) {
    return { user: null };
  }
  
  const payload = decodeJWT(token);
  
  if (!payload) {
    return { user: null };
  }
  
  return {
    user: {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      image: null as string | null,
    },
  };
}

// Re-export auth as customAuth for convenience
export const auth = customAuth;