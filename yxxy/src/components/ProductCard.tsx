import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  distance: string;
  image: string;
  certified: boolean;
  tags: string[];
  carbonFootprint?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  distance,
  image,
  certified,
  tags,
  carbonFootprint
}: ProductCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-md overflow-hidden border border-blue-50 hover:shadow-lg transition-all duration-200 cursor-pointer group",
      "flex flex-col h-full"
    )}>
      <div className="relative aspect-square bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
        <img 
          src={image} 
          alt={name}
          className="w-4/5 h-4/5 object-contain rounded-xl drop-shadow-md group-hover:scale-105 transition"
        />
        {certified && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white p-1 rounded-full shadow">
            <i className="fa-solid fa-check text-xs"></i>
          </div>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-semibold text-blue-900 truncate mb-1 text-base">{name}</h3>
        <div className="flex justify-between items-center mb-1">
          <span className="text-pink-500 font-bold text-lg">¥{price}</span>
          <span className="text-blue-400 text-xs bg-blue-50 rounded px-2 py-0.5">{distance}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map(tag => (
            <span 
              key={tag}
              className="px-2 py-0.5 bg-pink-100 text-pink-600 text-xs rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        {carbonFootprint && (
          <div className="mt-auto text-green-700 bg-green-50 rounded p-1 text-xs text-center">
            {carbonFootprint}
          </div>
        )}
      </div>
    </div>
  );
}