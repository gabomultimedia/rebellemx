#!/usr/bin/env bash
# Rebelle — referencia rápida. En Windows/XAMPP suele bastar con crear la BD en phpMyAdmin
# y usar DATABASE_URL en .env. El script completo del prompt original es para Ubuntu/Debian + MariaDB.
set -e
echo "Crea la base en MySQL/MariaDB:"
echo "  CREATE DATABASE rebelle_store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
echo "Luego: cd rebelle-store && npx prisma migrate dev && npm run db:seed"
