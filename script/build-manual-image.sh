#!/usr/bin/env bash
set -euo pipefail

revision=${1:-}
if [[ ! "$revision" =~ ^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,127}$ ]]; then
  echo "用法: bash document/script/build-manual-image.sh <手册修订号>" >&2
  exit 2
fi

cd "$(dirname "$0")/.."
export NEXT_PUBLIC_MANUAL_REVISION="$revision"
export NEXT_TELEMETRY_DISABLED=1
pnpm build

context=.next/standalone
if [[ -f "$context/document/server.js" ]]; then
  app="$context/document"
else
  app="$context"
fi
test -f "$app/server.js"
cp -a .next/static "$app/.next/"
docker build --network=none -f Dockerfile.manual --build-arg "APP_DIR=${app#"$context"}" \
  --tag "glowlink-docs:$revision" "$context"
