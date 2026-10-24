import fs from "fs";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUTPUT_DIR = path.join(PUBLIC_DIR, "optimized");
const MANIFEST_PATH = path.join(process.cwd(), "lib", "generated", "image-variants.json");

const WIDTHS = [96, 480, 960, 1600];

interface ImageVariant {
  width: number;
  height: number;
  variants: number[];
  sha256: string;
}

type Manifest = Record<string, ImageVariant>;

async function discoverImages(): Promise<string[]> {
  const images: string[] = [];
  
  function scan(dir: string, relativePath = ""): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relativePath, entry.name);
      
      if (entry.isDirectory() && entry.name !== "optimized") {
        scan(fullPath, relPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
          images.push(relPath);
        }
      }
    }
  }
  
  scan(PUBLIC_DIR);
  return images;
}

async function optimizeImage(imagePath: string): Promise<ImageVariant> {
  const fullPath = path.join(PUBLIC_DIR, imagePath);
  const ext = path.extname(imagePath);
  const dirname = path.dirname(imagePath);
  const basename = path.basename(imagePath, ext);

  const outputDir = path.join(OUTPUT_DIR, dirname);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const metadata = await sharp(fullPath).metadata();
  const originalWidth = metadata.width;
  const originalHeight = metadata.height;
  
  if (!originalWidth || !originalHeight) {
    throw new Error(`Could not read dimensions for ${imagePath}`);
  }

  const sourceContent = fs.readFileSync(fullPath);
  const sha256 = crypto.createHash("sha256").update(sourceContent).digest("hex");

  const isPng = ext.toLowerCase() === ".png";
  const generatedWidths: number[] = [];

  for (const width of WIDTHS) {
    if (width >= originalWidth) {
      const outputPath = path.join(outputDir, `${basename}-${originalWidth}w.webp`);
      await sharp(fullPath)
        .webp({ quality: isPng ? 90 : 85 })
        .toFile(outputPath);
      console.log(`✓ Generated ${path.relative(PUBLIC_DIR, outputPath)}`);
      generatedWidths.push(originalWidth);
      break;
    }

    const outputPath = path.join(outputDir, `${basename}-${width}w.webp`);
    await sharp(fullPath)
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: isPng ? 90 : 85 })
      .toFile(outputPath);
    console.log(`✓ Generated ${path.relative(PUBLIC_DIR, outputPath)}`);
    generatedWidths.push(width);
  }
  
  return {
    width: originalWidth,
    height: originalHeight,
    variants: generatedWidths,
    sha256,
  };
}

async function main(): Promise<void> {
  console.log("🖼️  Discovering images...\n");
  
  const images = await discoverImages();
  
  if (images.length === 0) {
    console.log("No images found to optimize.");
    return;
  }
  
  console.log(`Found ${images.length} image(s)\n`);

  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const manifest: Manifest = {};

  for (const image of images) {
    const variant = await optimizeImage(image);
    const src = `/${image.replace(/\\/g, "/")}`;
    manifest[src] = variant;
  }

  const manifestDir = path.dirname(MANIFEST_PATH);
  if (!fs.existsSync(manifestDir)) {
    fs.mkdirSync(manifestDir, { recursive: true });
  }
  
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\n✅ Manifest written to ${path.relative(process.cwd(), MANIFEST_PATH)}`);
  console.log(`✅ Optimized ${images.length} image(s)!`);
}

main().catch((error) => {
  console.error("Error optimizing images:", error);
  process.exit(1);
});
