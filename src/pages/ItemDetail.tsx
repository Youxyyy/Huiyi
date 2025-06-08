import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { itemDetailData, commentsData, tradeOptions } from "@/data/mock";
import Banner from "@/components/Banner";

export default function ItemDetail() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(1);
  const [expandedComment, setExpandedComment] = useState<number | null>(null);

  const handleBack = () => {
    navigate("/");
  };

  const handleCall = () => {
    // 模拟呼叫功能
    alert(`正在呼叫卖家: ${itemDetailData.seller.name}`);
  };

  return (
     <div className={cn("bg-light-blue min-h-screen pb-20")}>
      <Navbar />
      
      <div className="px-4">
        <button 
          onClick={handleBack}
          className="mt-4 flex items-center text-gray-600"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          返回
        </button>

        {/* 商品图片轮播 */}
        <div className="mt-4">
          <Banner />
        </div>

        {/* 商品基本信息 */}
        <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{itemDetailData.title}</h1>
              <div className="flex items-center mt-1">
                <span className="text-red-500 font-bold text-lg">¥{itemDetailData.price}</span>
                <span className="text-gray-400 text-sm line-through ml-2">¥{itemDetailData.originalPrice}</span>
              </div>
            </div>
            <button 
              onClick={handleCall}
              className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center"
            >
              <i className="fa-solid fa-phone mr-1"></i>
              一键呼叫
            </button>
          </div>

          <div className="mt-3">
            <div className="flex items-center text-sm text-gray-500">
              <i className="fa-solid fa-location-dot mr-1"></i>
              <span>{itemDetailData.location} · {itemDetailData.distance}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <i className="fa-solid fa-clock mr-1"></i>
              <span>{itemDetailData.postedTime}发布</span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-gray-900">商品描述</h3>
            <p className="text-gray-700 mt-1">{itemDetailData.description}</p>
          </div>

          {/* 卖家信息 */}
          <div className="mt-4 flex items-center">
            <img 
              src={itemDetailData.seller.avatar} 
              alt={itemDetailData.seller.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <div className="font-medium">{itemDetailData.seller.name}</div>
              <div className="text-sm text-gray-500">
                {itemDetailData.seller.department} · {itemDetailData.seller.grade}
              </div>
            </div>
            <div className="ml-auto bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
              信用分: {itemDetailData.seller.creditScore}
            </div>
          </div>

          {/* 商品标签 */}
          <div className="flex flex-wrap gap-2 mt-4">
            {itemDetailData.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* 交易保障模块 */}
        <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-3">交易保障</h2>
          <div className="bg-blue-50 text-blue-800 p-3 rounded-lg mb-4 text-sm">
            <i className="fa-solid fa-shield-alt mr-2"></i>
            校园认证交易平台，保障您的交易安全
          </div>

          <div className="space-y-3">
            {tradeOptions.map(option => (
              <div 
                key={option.id}
                className={cn(
                  "border rounded-lg p-3 cursor-pointer transition-colors",
                  selectedOption === option.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                )}
                onClick={() => setSelectedOption(option.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{option.title}</h3>
                  {selectedOption === option.id && (
                    <i className="fa-solid fa-check-circle text-blue-500"></i>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <span className="mr-3">风险等级: {option.riskLevel}</span>
                  <span>最低信用分: {option.minCreditScore}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 学长学姐说 */}
        <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-3">学长学姐说</h2>
          
          {/* 头像墙 */}
          <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
            {commentsData.map(comment => (
              <img 
                key={comment.id}
                src={comment.user.avatar}
                alt={comment.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ))}
          </div>

          {/* 评论列表 */}
          <div className="space-y-4">
            {commentsData.map(comment => (
              <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center">
                  <img 
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="ml-2">
                    <div className="font-medium text-sm">{comment.user.name}</div>
                    <div className="text-xs text-gray-500">{comment.user.department}</div>
                  </div>
                  <div className="ml-auto text-xs text-gray-400">{comment.time}</div>
                </div>
                <div className="mt-2">
                  <p className={cn(
                    "text-gray-700 text-sm",
                    expandedComment === comment.id ? "" : "line-clamp-2"
                  )}>
                    {comment.content}
                  </p>
                  {comment.content.length > 60 && (
                    <button 
                      className="text-blue-500 text-xs mt-1"
                      onClick={() => setExpandedComment(
                        expandedComment === comment.id ? null : comment.id
                      )}
                    >
                      {expandedComment === comment.id ? "收起" : "展开"}
                    </button>
                  )}
                </div>
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <i className="fa-solid fa-heart mr-1"></i>
                  <span>{comment.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
