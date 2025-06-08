import { cn } from "@/lib/utils";

export default function QuickPost() {
  return (
    <div className={cn(
      "bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4",
      "text-white shadow-md cursor-pointer",
      "transition-transform duration-200 hover:scale-[1.02]"
    )}>
      <h3 className="font-bold text-lg mb-2">快速发布</h3>
      <p className="text-sm opacity-90 mb-3">3步完成物品发布</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
            <span className="text-xs font-bold">1</span>
          </div>
          <span className="text-sm">拍照识别</span>
        </div>
        
        <div className="w-8 h-px bg-white/40 mx-1"></div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
            <span className="text-xs font-bold">2</span>
          </div>
          <span className="text-sm">填写信息</span>
        </div>
        
        <div className="w-8 h-px bg-white/40 mx-1"></div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
            <span className="text-xs font-bold">3</span>
          </div>
          <span className="text-sm">发布成功</span>
        </div>
      </div>
    </div>
  );
}