import { useState, useContext } from "react";
import { ProductContext } from "@/App";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const categories = [
  "全部", "教材资料", "电子产品", "生活用品", "运动户外", "美妆服饰", "玄学幸运物"
];
const sortOptions = [
  { label: "综合排序", value: "default" },
  { label: "价格从低到高", value: "priceAsc" },
  { label: "价格从高到低", value: "priceDesc" },
  { label: "距离最近", value: "distance" }
];

function PublishFab() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/publish")}
      className="fixed right-12 bottom-32 z-50 bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 text-xl font-bold animate-bounce border-4 border-white transition-all duration-200"
    >
      <i className="fa-solid fa-plus"></i> 发布宝贝
    </button>
  );
}

export default function Marketplace() {
  const { products } = useContext(ProductContext);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("全部");
  const [sort, setSort] = useState("default");

  let filtered = products.filter(p =>
    (activeCat === "全部" || p.tags.includes(activeCat)) &&
    (p.name.includes(search) || p.tags.some(t => t.includes(search)))
  );
  if (sort === "priceAsc") filtered = filtered.sort((a, b) => a.price - b.price);
  if (sort === "priceDesc") filtered = filtered.sort((a, b) => b.price - a.price);
  // 距离排序略

  return (
    <div className="bg-light-blue min-h-screen font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto px-8 pt-8 pb-20">
        {/* 搜索栏 */}
        <div className="flex items-center gap-4 mb-8">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜索宝贝/关键词/标签..."
            className="flex-1 px-5 py-3 rounded-full border border-blue-200 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-4 py-2 rounded-full border border-blue-200 bg-white shadow text-blue-700 font-medium"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-8">
          {/* 左侧分类栏 */}
          <aside className="w-48 shrink-0">
            <div className="bg-white rounded-2xl shadow p-4 mb-6">
              <div className="font-bold text-blue-700 mb-3 text-lg">分类</div>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      className={cn(
                        "w-full text-left px-4 py-2 rounded-lg transition font-medium",
                        activeCat === cat ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      )}
                      onClick={() => setActiveCat(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl shadow p-4 text-center text-blue-700 font-bold text-lg">
              <i className="fa-solid fa-bolt text-pink-500 mr-2"></i>青春好物推荐
            </div>
          </aside>
          {/* 右侧商品瀑布流 */}
          <main className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.length === 0 ? (
                <div className="col-span-3 text-center text-gray-400 py-20 text-xl">暂无相关宝贝</div>
              ) : (
                filtered.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))
              )}
            </div>
          </main>
        </div>
      </div>
      <PublishFab />
      <Footer />
    </div>
  );
} 