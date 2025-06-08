import { useState, useContext } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { ProductContext } from "@/App";
import { supabase } from '@/lib/supabase';

const steps = [
  "上传图片", "基础信息", "物品故事", "定价方式", "发布确认"
];

const categories = ["教材资料", "电子产品", "生活用品", "运动户外", "美妆服饰", "玄学幸运物"];
const tagsList = ["学霸遗产", "幸运物", "考神附体", "九成新", "带笔记", "限女生", "限自提"];
const conditions = ["全新", "几乎全新", "轻微使用", "明显使用", "有瑕疵"];
const tradeModes = [
  { label: "固定价", value: "fixed" },
  { label: "拍卖", value: "auction" },
  { label: "以物易物", value: "barter" }
];

function StepProgress({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg",
            i < step ? "bg-blue-500 text-white" : i === step ? "bg-pink-500 text-white animate-bounce" : "bg-gray-200 text-gray-400"
          )}>{i + 1}</div>
          {i < steps.length - 1 && <div className="w-8 h-1 bg-gray-200 mx-1 rounded" />}
        </div>
      ))}
      <span className="ml-4 text-blue-600 font-bold text-lg animate-wiggle">🐱‍💻</span>
    </div>
  );
}

function AskAlumniButton() {
  return (
    <button className="fixed right-10 bottom-10 z-50 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-lg font-bold animate-bounce">
      <i className="fa-solid fa-comments"></i> 问问校友
    </button>
  );
}

export default function Publish() {
  const [step, setStep] = useState(0);
  // 基础信息
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [condition, setCondition] = useState(conditions[2]);
  // 定价与交易方式
  const [price, setPrice] = useState("");
  const [tradeMode, setTradeMode] = useState(tradeModes[0].value);
  const [barterDesc, setBarterDesc] = useState("");
  // 图片上传
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  // 物品故事
  const [memory, setMemory] = useState("");
  const [wish, setWish] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { products, setProducts } = useContext(ProductContext);

  // 智能标题建议（模拟）
  const suggestTitle = () => setTitle("九成新《C++ Primer》附笔记");

  const toggleTag = (tag: string) => {
    setTags(tags => tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(prev => [...prev, ...files]);
      // 生成预览
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    // 构造新商品对象
    const imageUrl = imagePreviews[0] || "https://placehold.co/200x200?text=No+Image";
    const newProduct = {
      name: title,
      price: Number(price) || 0,
      distance: "校内",
      image: imageUrl,
      certified: true,
      tags,
    };
    // 插入到 Supabase
    const { error } = await supabase.from('products').insert([newProduct]);
    if (error) {
      alert('发布失败：' + error.message);
      setIsSubmitting(false);
      return;
    }
    // 刷新商品列表
    const { data } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (data) setProducts(data);
    setIsSubmitting(false);
    alert("发布成功！");
    // 清空表单
    setImages([]);
    setImagePreviews([]);
    setTitle("");
    setCategory(categories[0]);
    setTags([]);
    setCondition(conditions[2]);
    setPrice("");
    setTradeMode(tradeModes[0].value);
    setBarterDesc("");
    setMemory("");
    setWish("");
    setStep(0);
  };

  return (
    <div className="bg-light-blue min-h-screen font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto px-8 pt-10 pb-24">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-blue-700">发布二手宝贝</h1>
          <span className="ml-2 px-3 py-1 bg-pink-100 text-pink-600 rounded-full font-medium text-base">校园专属 · 安全认证</span>
        </div>
        <StepProgress step={step} />
        <div className="bg-white rounded-2xl shadow-lg p-8 min-h-[420px] flex flex-col justify-between">
          {/* 步骤内容区 */}
          <div className="flex-1 min-h-[320px] flex flex-col justify-start">
            {step === 0 && (
              <div>
                <div className="font-bold text-lg mb-2">1. 上传图片</div>
                <div className="text-gray-500 mb-4">支持多图，首图为封面。未上传时：快给TA拍张证件照吧！</div>
                <div className="flex flex-wrap gap-4 mb-4">
                  {imagePreviews.map((src, idx) => (
                    <div key={idx} className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-blue-200 bg-blue-50 flex items-center justify-center">
                      <img src={src} alt="预览" className="object-cover w-full h-full" />
                      <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-500 hover:bg-red-100"><i className="fa-solid fa-xmark"></i></button>
                      {idx === 0 && <span className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">封面</span>}
                    </div>
                  ))}
                  <label className="w-28 h-28 flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-xl cursor-pointer text-blue-400 hover:bg-blue-50 transition">
                    <i className="fa-solid fa-camera text-2xl mb-1"></i>
                    <span className="text-xs">上传图片</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
              </div>
            )}
            {step === 1 && (
              <div>
                <div className="font-bold text-lg mb-2">2. 填写基础信息</div>
                <div className="text-gray-500 mb-4">智能标题建议、分类、标签、新旧程度等</div>
                <div className="mb-4 flex gap-2 items-center">
                  <input
                    className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
                    placeholder="请输入标题，如九成新C++教材..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <button
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm"
                    onClick={suggestTitle}
                    type="button"
                  >
                    智能建议
                  </button>
                </div>
                <div className="mb-4 flex gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">分类</label>
                    <select
                      className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">新旧程度</label>
                    <select
                      className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
                      value={condition}
                      onChange={e => setCondition(e.target.value)}
                    >
                      {conditions.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">标签（可多选）</label>
                  <div className="flex flex-wrap gap-2">
                    {tagsList.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        className={cn(
                          "px-3 py-1 rounded-full border text-sm font-medium transition",
                          tags.includes(tag)
                            ? "bg-blue-600 text-white border-blue-600" : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50"
                        )}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <div className="font-bold text-lg mb-2">3. 物品故事</div>
                <div className="text-gray-500 mb-4">请用模板填写你的故事，支持语音转文字</div>
                <div className="bg-blue-50 rounded-xl p-4 mb-2">
                  <div className="mb-2 font-medium">【我和TA的回忆】</div>
                  <textarea className="w-full h-16 border rounded p-2 mb-2" placeholder="- 这台笔记本陪我熬过3个课程设计..." value={memory} onChange={e => setMemory(e.target.value)} />
                  <div className="mb-2 font-medium">【给下一任主人的话】</div>
                  <textarea className="w-full h-16 border rounded p-2" placeholder="- 希望你能用它写出比我更棒的代码！" value={wish} onChange={e => setWish(e.target.value)} />
                  <button className="mt-2 px-4 py-1 bg-pink-500 text-white rounded-full text-sm"><i className="fa-solid fa-microphone"></i> 语音转文字</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <div className="font-bold text-lg mb-2">4. 定价与交易方式</div>
                <div className="text-gray-500 mb-4">智能定价建议、交易方式选择（固定价/拍卖/以物易物）</div>
                <div className="mb-4 flex gap-2 items-center">
                  <input
                    className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
                    placeholder="请输入价格，如50"
                    value={price}
                    onChange={e => setPrice(e.target.value.replace(/[^\d.]/g, ""))}
                    disabled={tradeMode === "barter"}
                  />
                  <button
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm"
                    type="button"
                  >
                    智能定价
                  </button>
                </div>
                <div className="mb-4 flex gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">交易方式</label>
                    <select
                      className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
                      value={tradeMode}
                      onChange={e => setTradeMode(e.target.value)}
                    >
                      {tradeModes.map(mode => (
                        <option key={mode.value} value={mode.value}>{mode.label}</option>
                      ))}
                    </select>
                  </div>
                  {tradeMode === "barter" && (
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">想换什么？</label>
                      <input
                        className="px-3 py-2 border rounded focus:ring-2 focus:ring-blue-400"
                        placeholder="如滑板/耳机..."
                        value={barterDesc}
                        onChange={e => setBarterDesc(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <div className="font-bold text-lg mb-2">5. 发布确认</div>
                <div className="text-gray-500 mb-4">请确认所有信息无误后发布，首次发布可解锁成就！</div>
                <div className="h-40 flex items-center justify-center text-green-400">（信息预览/确认区）</div>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-8">
            <button
              className="px-6 py-2 rounded-full bg-gray-200 text-gray-600 font-bold disabled:opacity-50"
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0 || isSubmitting}
            >
              上一步
            </button>
            <button
              className="px-8 py-2 rounded-full bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition disabled:opacity-50"
              onClick={step === steps.length - 1 ? handlePublish : () => setStep(s => Math.min(steps.length - 1, s + 1))}
              disabled={isSubmitting || (step === steps.length - 1 && isSubmitting)}
            >
              {isSubmitting ? "发布中..." : step === steps.length - 1 ? "发布" : "下一步"}
            </button>
          </div>
        </div>
      </div>
      <AskAlumniButton />
      <Footer />
    </div>
  );
} 