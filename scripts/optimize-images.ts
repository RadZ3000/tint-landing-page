import fs from "fs";
import path from "path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUTPUT_DIR = path.join(PUBLIC_DIR, "optimized");

const widths = [480, 960, 1600];

const images = [
  { src: "mood/parked-sun.jpg", originalWidth: 2000 },
  { src: "mood/cabin-glare.jpg", originalWidth: 2000 },
  { src: "brand/logo-mark.png", originalWidth: 512 },
  { src: "brand/logo-lockup.png", originalWidth: 1080 },
];

async function optimizeImage(imagePath: string, originalWidth: number) {
  const fullPath = path.join(PUBLIC_DIR, imagePath);
  const ext = path.extname(imagePath);
  const dirname = path.dirname(imagePath);
  const basename = path.basename(imagePath, ext);

  const outputDir = path.join(OUTPUT_DIR, dirname);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const isPng = ext.toLowerCase() === ".png";

  for (const width of widths) {
    if (width >= originalWidth) {
      const outputPath = path.join(outputDir, `${basename}-${originalWidth}w.webp`);
      await sharp(fullPath)
        .webp({ quality: isPng ? 90 : 85 })
        .toFile(outputPath);
      console.log(`✓ Generated ${outputPath}`);
      break;
    }

    const outputPath = path.join(outputDir, `${basename}-${width}w.webp`);
    await sharp(fullPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: isPng ? 90 : 85 })
      .toFile(outputPath);
    console.log(`✓ Generated ${outputPath}`);
  }
}

async function main() {
  console.log("🖼️  Optimizing images...\n");

  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const image of images) {
    await optimizeImage(image.src, image.originalWidth);
  }

  console.log("\n✅ All images optimized!");
}

main().catch(console.error);
