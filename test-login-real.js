// Test real de login simulando el frontend
const http = require('http');

// Primero, obtener la página de login para ver si hay un token CSRF
http.get('http://localhost:3005/cuenta/login', (res) => {
  console.log('Status login page:', res.statusCode);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    // Buscar token CSRF en la página (si existe)
    const csrfMatch = data.match(/name="csrfToken" value="([^"]+)"/);
    const csrfToken = csrfMatch ? csrfMatch[1] : 'test-csrf-token';
    
    console.log('CSRF Token encontrado:', csrfToken ? 'Sí' : 'No');
    
    // Ahora intentar login
    const postData = new URLSearchParams({
      csrfToken: csrfToken,
      email: 'admin@rebelleboutique.com',
      password: 'Admin2024!Rebelle',
      redirect: 'false',
      callbackUrl: '/',
      json: 'true'
    }).toString();
    
    const options = {
      hostname: 'localhost',
      port: 3005,
      path: '/api/auth/[...nextauth]',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res) => {
      console.log(`\nLogin Status: ${res.statusCode}`);
      console.log('Headers:', JSON.stringify(res.headers, null, 2));
      
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        console.log('Response:', responseData);
        
        // Si el login fue exitoso, probar el endpoint de test-auth
        if (res.statusCode === 200) {
          console.log('\n--- Probando autenticación después de login ---');
          http.get('http://localhost:3005/api/test-auth', (authRes) => {
            let authData = '';
            authRes.on('data', (chunk) => {
              authData += chunk;
            });
            authRes.on('end', () => {
              console.log('Test Auth Status:', authRes.statusCode);
              console.log('Test Auth Response:', authData);
            });
          });
        }
      });
    });
    
    req.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
    });
    
    req.write(postData);
    req.end();
  });
});