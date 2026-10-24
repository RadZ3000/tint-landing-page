import Image, { ImageProps } from "next/image";

interface ResponsiveImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function ResponsiveImage({ src, alt, width, height, className, style, priority, ...props }: ResponsiveImageProps) {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return <Image src={src} alt={alt} width={width} height={height} className={className} style={style} priority={priority} {...props} />;
  }

  const pathWithoutExt = src.replace(/\.[^/.]+$/, "");
  const basePath = pathWithoutExt.replace(/^\//, "");

  let srcset = "";
  let defaultSrc = "";

  if (basePath.includes("logo-mark")) {
    srcset = `/optimized/${basePath}-480w.webp 480w, /optimized/${basePath}-512w.webp 512w`;
    defaultSrc = `/optimized/${basePath}-512w.webp`;
  } else if (basePath.includes("logo-lockup")) {
    srcset = `/optimized/${basePath}-480w.webp 480w, /optimized/${basePath}-960w.webp 960w, /optimized/${basePath}-1080w.webp 1080w`;
    defaultSrc = `/optimized/${basePath}-960w.webp`;
  } else {
    srcset = `/optimized/${basePath}-480w.webp 480w, /optimized/${basePath}-960w.webp 960w, /optimized/${basePath}-1600w.webp 1600w`;
    defaultSrc = `/optimized/${basePath}-960w.webp`;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={defaultSrc}
      srcSet={srcset}
      alt={alt}
      width={width}
      height={height}
      style={style}
      className={className}
      loading={priority ? undefined : "lazy"}
    />
  );
}
