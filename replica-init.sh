#!/bin/bash
set -e

echo "🔁 Configurando Replica PostgreSQL..."

until pg_isready -h pg-primary -p 5432; do
  echo "Aguardando Primary..."
  sleep 2
done

rm -rf /var/lib/postgresql/data/*

PGPASSWORD=postgres pg_basebackup -h pg-primary -p 5432 -D /var/lib/postgresql/data -U postgres -Fp -Xs -P -R

echo "Replica pronta! 🚀"
