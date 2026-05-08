#!/bin/bash
# Actualizar código sin tocar .env ni la base de datos
set -euo pipefail
cd /opt/rebelle-store
cp -a .env /tmp/rebelle.env.bak
tar xzf /tmp/rebelle-bundle.tgz
mv /tmp/rebelle.env.bak .env
chmod 600 .env
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
pm2 restart rebelle-store || pm2 start npm --name rebelle-store --cwd /opt/rebelle-store -- start
pm2 save
echo "Update OK"
