#!/usr/bin/env bash
set -e
docker compose -f docker-local-dev.yaml up -d

sleep 30
rm src/database/migrations/* || echo "Migrations empty"

yarn run migration:generate -- src/database/migrations/CreateNameTable
yarn run migration:run
yarn run seed:run
yarn run start:dev
