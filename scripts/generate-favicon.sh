#!/bin/sh
# Génère favicon.ico, icon.png et apple-icon.png depuis public/images/brand/icon.png
# Usage: bash scripts/generate-favicon.sh (depuis /var/www/almumayiz)

set -e
SRC="./public/images/brand/icon.png"

if [ ! -f "$SRC" ]; then
  echo "ERROR: $SRC introuvable. Upload l'image source en premier."
  echo "  scp icon.png user@server:/var/www/almumayiz/public/images/brand/icon.png"
  exit 1
fi

echo "Conversion des favicons depuis $SRC …"

docker run --rm \
  -v "$(pwd)/public":/img \
  -v "$(pwd)/app":/out \
  alpine:latest \
  sh -c "
    apk add --no-cache imagemagick > /dev/null 2>&1

    # favicon.ico 16+32
    convert /img/images/brand/icon.png \
      \( -clone 0 -resize 32x32 \) \
      \( -clone 0 -resize 16x16 \) \
      -delete 0 /out/favicon.ico

    # icon.png 192x192 (balise <link rel=icon> moderne)
    convert /img/images/brand/icon.png \
      -resize 192x192 \
      /out/icon.png

    # apple-icon.png 180x180 (iOS Safari)
    convert /img/images/brand/icon.png \
      -resize 180x180 \
      /out/apple-icon.png

    echo '  OK'
  "

echo "  ✓ app/favicon.ico  (16px + 32px)"
echo "  ✓ app/icon.png     (192px)"
echo "  ✓ app/apple-icon.png (180px)"
echo ""
echo "Rebuild Docker pour prendre en compte les changements :"
echo "  docker compose -f docker-compose.prod.yml build app && docker compose -f docker-compose.prod.yml up -d app"
