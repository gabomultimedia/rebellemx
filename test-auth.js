// Script para probar autenticación
const https = require('https');
const http = require('http');

const testAuth = async () => {
  console.log('Probando autenticación...');
  
  const data = new URLSearchParams({
    email: 'admin@rebelleboutique.com',
    password: 'Admin2024!Rebelle',
    redirect: 'false'
  }).toString();

  const options = {
    hostname: 'localhost',
    port: 3003,
    path: '/api/auth/[...nextauth]',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    
    let responseData = '';
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log(`Response: ${responseData}`);
    });
  });

  req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
  });

  req.write(data);
  req.end();
};

testAuth();