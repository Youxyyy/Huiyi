import { useState, useEffect } from "react";
import { bannerData, itemDetailData } from "@/data/mock";
import { cn } from "@/lib/utils";

interface BannerProps {
  images?: Array<{ id: number; image: string; title?: string }>;
  height?: string;
  showTitle?: boolean;
}

export default function Banner({ 
  images = bannerData, 
  height = "h-48",
  showTitle = true
}: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={cn("relative w-full overflow-hidden rounded-xl", height)}>
      {images.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={item.image}
            alt={item.title || "商品图片"}
            className="w-full h-full object-cover"
          />
          {showTitle && item.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-semibold">{item.title}</h3>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}