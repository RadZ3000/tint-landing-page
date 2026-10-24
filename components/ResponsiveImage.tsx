import Image, { ImageProps } from "next/image";
import manifest from "@/lib/generated/image-variants.json";

interface ResponsiveImageProps extends Omit<ImageProps, "src" | "width" | "height"> {
  src: string;
  alt: string;
  sizes?: string;
}

const isDev = process.env.NODE_ENV === "development";

export function ResponsiveImage({ 
  src, 
  alt, 
  sizes,
  className, 
  style, 
  priority,
  ...props 
}: ResponsiveImageProps) {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return (
      <Image 
        src={src} 
        alt={alt} 
        fill
        sizes={sizes}
        className={className} 
        style={style} 
        priority={priority} 
        {...props} 
      />
    );
  }

  const imageData = manifest[src as keyof typeof manifest];
  
  if (!imageData) {
    if (isDev) {
      console.warn(`ResponsiveImage: No manifest entry for "${src}", falling back to original`);
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img 
        src={src} 
        alt={alt} 
        className={className}
        style={style}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    );
  }

  const pathWithoutExt = src.replace(/\.[^/.]+$/, "");
  const basePath = pathWithoutExt.replace(/^\//, "");

  const srcset = imageData.variants
    .map((width) => `/optimized/${basePath}-${width}w.webp ${width}w`)
    .join(", ");

  const defaultWidth = imageData.variants[Math.floor(imageData.variants.length / 2)];
  const defaultSrc = `/optimized/${basePath}-${defaultWidth}w.webp`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={defaultSrc}
      srcSet={srcset}
      sizes={sizes}
      alt={alt}
      width={imageData.width}
      height={imageData.height}
      style={style}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
