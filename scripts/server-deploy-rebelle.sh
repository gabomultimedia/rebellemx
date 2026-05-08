#!/bin/bash
set -euo pipefail
cd /opt/rebelle-store

DBPASS=$(openssl rand -hex 16)
NAUTH=$(openssl rand -hex 32)

mysql -u root <<SQL
CREATE DATABASE IF NOT EXISTS rebelle_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
DROP USER IF EXISTS 'rebelleapp'@'localhost';
CREATE USER 'rebelleapp'@'localhost' IDENTIFIED BY '${DBPASS}';
GRANT ALL PRIVILEGES ON rebelle_store.* TO 'rebelleapp'@'localhost';
FLUSH PRIVILEGES;
SQL

cat > /opt/rebelle-store/.env <<EOF
DATABASE_URL="mysql://rebelleapp:${DBPASS}@127.0.0.1:3306/rebelle_store"
NEXTAUTH_URL="https://rebelle.abundiss.com"
NEXTAUTH_SECRET="${NAUTH}"
NEXT_PUBLIC_APP_URL="https://rebelle.abundiss.com"
PORT=3001
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""
RESEND_API_KEY=""
EMAIL_FROM="Rebelle Boutique <hola@rebelleboutique.com>"
NEXT_PUBLIC_WHATSAPP_NUMBER="526641234567"
NEXT_PUBLIC_GOOGLE_MAPS_KEY=""
ADMIN_EMAIL="admin@rebelleboutique.com"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
EOF

chmod 600 /opt/rebelle-store/.env

npm ci
npx prisma generate
npx prisma migrate deploy
npm run build

pm2 delete rebelle-store 2>/dev/null || true
pm2 start npm --name rebelle-store --cwd /opt/rebelle-store -- start
pm2 save

echo "Deploy OK. App on PORT 3001. Secrets in /opt/rebelle-store/.env"
