import { useContext } from "react";
import { ProductContext } from "@/App";
import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import QuickPost from "@/components/QuickPost";
import Footer from "@/components/Footer";
import AcademicLegacyCarousel from "@/components/AcademicLegacyCarousel";
import HotTags from "@/components/HotTags";
import CarbonRanking from "@/components/CarbonRanking";
import AlumniHeatMap from "@/components/AlumniHeatMap";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockCarbon = [
  "已减少50kg纸张浪费",
  "已节约15L水+减少3kg碳排放",
  "已减少10kg塑料使用"
];

export default function Home() {
  const { products } = useContext(ProductContext);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const navigate = useNavigate();
  // 为演示，给每个商品加mock碳足迹
  const filtered = products
    .filter(p => !filterTag || p.tags.includes(filterTag))
    .map((p, i) => ({ ...p, carbonFootprint: mockCarbon[i % mockCarbon.length] }));

  return (
    <div className={cn("bg-light-blue min-h-screen pb-20 font-sans")}> 
      <Navbar />
      <div className="px-6 pt-8 max-w-5xl mx-auto">
        {/* 平台名称和宣传语 */}
        <div className="text-center pt-2 pb-8">
          <h1 className="text-6xl font-pacifico text-blue-700 mb-2 tracking-tight drop-shadow-lg">有幸相遇</h1>
          <p className="text-2xl font-pacifico text-blue-400 mb-2">让我们赋予物品灵魂 让他继续发光</p>
        </div>
        <div className="mb-10">
          <Banner height="h-[260px]" />
        </div>
        <div className="mb-10">
          <AcademicLegacyCarousel />
        </div>
        <div className="mb-10">
          <HotTags onSelect={setFilterTag} />
        </div>
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-100 via-white to-blue-50 rounded-2xl p-8 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
                <i className="fa-solid fa-fire text-pink-500"></i> 发现校园好物
              </h2>
              <button
                onClick={() => navigate("/marketplace")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-full shadow transition text-lg"
              >
                进入学生专属二手交易平台
              </button>
            </div>
            <p className="text-blue-400 mb-6 text-lg">探索学长学姐们留下的珍贵物品，让它们继续发光发热</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
        <CarbonRanking />
        <AlumniHeatMap />
      </div>
      <Footer />
    </div>
  );
}