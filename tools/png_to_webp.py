"""
Convierte todas las imágenes .png a .webp sin pérdida de calidad.
Recorre recursivamente la carpeta assets/img/.
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow no está instalado.")
    print("Ejecuta primero:  pip install Pillow")
    sys.exit(1)

# Raíz del proyecto (un nivel arriba de tools/)
PROJECT_ROOT = Path(__file__).resolve().parent.parent
IMG_DIR = PROJECT_ROOT / "assets" / "img"


def convert_png_to_webp(source: Path) -> Path:
    """Convierte un archivo PNG a WebP lossless y devuelve la ruta de salida."""
    dest = source.with_suffix(".webp")
    with Image.open(source) as img:
        img.save(dest, format="WEBP", lossless=True, quality=100)
    return dest


def main() -> None:
    if not IMG_DIR.is_dir():
        print(f"No se encontró la carpeta: {IMG_DIR}")
        sys.exit(1)

    png_files = sorted(IMG_DIR.rglob("*.png"))

    if not png_files:
        print("No se encontraron archivos .png para convertir.")
        return

    print(f"Se encontraron {len(png_files)} archivo(s) .png en {IMG_DIR}\n")

    for png in png_files:
        rel = png.relative_to(PROJECT_ROOT)
        webp = convert_png_to_webp(png)
        original_kb = png.stat().st_size / 1024
        webp_kb = webp.stat().st_size / 1024
        print(f"  ✔ {rel}  →  {webp.name}  ({original_kb:.1f} KB → {webp_kb:.1f} KB)")

    print(f"\nConversión completada. Total: {len(png_files)} imágenes.")


if __name__ == "__main__":
    main()
