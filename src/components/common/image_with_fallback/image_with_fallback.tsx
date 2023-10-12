import Image from "next/image";
import { useState, useEffect } from "react";

type ImageWithFallbackProps = {
  fallbackImage: string;
  alt: string;
  src: string;
  width: number;
  height: number;
};

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  fallbackImage,
  alt,
  src,
  ...props
}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallbackImage : src}
      {...props}
    />
  );
};

export { ImageWithFallback };
