import { useState } from "react";
import { cn } from "@/lib/utils";

const hotTags = [
  "C++教材", "四六级资料", "考研真题", "学霸の笔记", "玄学幸运物", "雅思资料", "考神附体"
];

export default function HotTags({ onSelect }: { onSelect?: (tag: string) => void }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="mb-4">
      <div className="font-bold text-gray-900 mb-2">同校热搜</div>
      <div className="flex flex-wrap gap-2">
        {hotTags.map(tag => (
          <button
            key={tag}
            className={cn(
              "px-3 py-1 rounded-full text-xs border transition",
              active === tag ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
            )}
            onClick={() => {
              setActive(tag);
              onSelect && onSelect(tag);
            }}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
} 