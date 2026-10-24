import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const MANIFEST_PATH = path.join(process.cwd(), "lib", "generated", "image-variants.json");

function sha256File(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(content).digest("hex");
}

function discoverImages() {
  const images = [];
  
  function scan(dir, relativePath = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(relativePath, entry.name);
      
      if (entry.isDirectory() && entry.name !== "optimized") {
        scan(fullPath, relPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
          images.push(`/${relPath.replace(/\\/g, "/")}`);
        }
      }
    }
  }
  
  scan(PUBLIC_DIR);
  return images;
}

function checkImages() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error("❌ Image manifest not found. Run: npm run optimize:images");
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
  const images = discoverImages();

  const manifestKeys = Object.keys(manifest).sort();
  const discoveredKeys = images.sort();

  if (manifestKeys.length !== discoveredKeys.length) {
    console.error("❌ Image manifest is stale (count mismatch)");
    console.error(`   Manifest: ${manifestKeys.length} images`);
    console.error(`   Discovered: ${discoveredKeys.length} images`);
    console.error("\nRun: npm run optimize:images");
    process.exit(1);
  }

  for (let i = 0; i < manifestKeys.length; i++) {
    if (manifestKeys[i] !== discoveredKeys[i]) {
      console.error("❌ Image manifest is stale (different images)");
      console.error(`   Expected: ${discoveredKeys[i]}`);
      console.error(`   Found: ${manifestKeys[i]}`);
      console.error("\nRun: npm run optimize:images");
      process.exit(1);
    }
  }

  for (const [src, data] of Object.entries(manifest)) {
    const sourcePath = path.join(PUBLIC_DIR, src.substring(1));
    
    if (!fs.existsSync(sourcePath)) {
      console.error(`❌ Source image missing: ${sourcePath}`);
      console.error("\nRun: npm run optimize:images");
      process.exit(1);
    }

    const currentHash = sha256File(sourcePath);
    if (data.sha256 !== currentHash) {
      console.error(`❌ Source image changed: ${src}`);
      console.error(`   Expected hash: ${data.sha256}`);
      console.error(`   Current hash:  ${currentHash}`);
      console.error("\nRun: npm run optimize:images");
      process.exit(1);
    }

    const pathWithoutExt = src.replace(/\.[^/.]+$/, "");
    const basePath = pathWithoutExt.replace(/^\//, "");

    for (const width of data.variants) {
      const optimizedPath = path.join(PUBLIC_DIR, "optimized", `${basePath}-${width}w.webp`);
      if (!fs.existsSync(optimizedPath)) {
        console.error(`❌ Missing optimized image: ${optimizedPath}`);
        console.error("\nRun: npm run optimize:images");
        process.exit(1);
      }
    }
  }

  console.log("✅ Image variants are up to date");
}

checkImages();
