import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50",
      "backdrop-blur-md bg-white/70 border-t border-blue-100",
      "mx-auto max-w-5xl rounded-t-2xl shadow-2xl",
      "px-8 py-3 flex items-center justify-around",
      "transition-all duration-300"
    )}>
      <button className="text-blue-600 flex flex-col items-center hover:text-blue-800 transition">
        <i className="fa-solid fa-house text-xl"></i>
        <span className="text-xs mt-1">首页</span>
      </button>
      
      <button className="text-gray-500 flex flex-col items-center hover:text-blue-600 transition">
        <i className="fa-solid fa-magnifying-glass text-xl"></i>
        <span className="text-xs mt-1">搜索</span>
      </button>
      
      <button className="text-gray-500 flex flex-col items-center hover:text-blue-600 transition">
        <i className="fa-solid fa-message text-xl"></i>
        <span className="text-xs mt-1">消息</span>
      </button>
      
      <button className="text-gray-500 flex flex-col items-center hover:text-blue-600 transition">
        <i className="fa-solid fa-user text-xl"></i>
        <span className="text-xs mt-1">我的</span>
      </button>
    </nav>
  );
}