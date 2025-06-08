import { useState } from "react";
import { cn } from "@/lib/utils";

// mock数据
const legacyItems = [
  {
    id: 1,
    name: "数据结构",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=computer%20science%20textbook&sign=9aae188581c626a4c8d5a424377d4808",
    storyMarkdown: `**【物品曾立下的功劳】**\n- 这本《数据结构》划了重点，附带我的挂科重修心得\n**【我对下一任主人的祝福】**\n- 希望你能用它征服期末考试，别像我一样熬夜到凌晨3点！`,
    tags: ["学霸の笔记", "熬夜战士の台灯"],
    transferHistory: [
      { owner: "2019级张学姐", year: "2019" },
      { owner: "2021级李学长", year: "2021" },
      { owner: "2023级你", year: "2023" }
    ],
    carbonReport: { water: 15, carbon: 3 },
    buyerStories: [
      { user: "小王", content: "用这本书期末考了90分！", time: "2024-06-01" }
    ]
  },
  {
    id: 2,
    name: "幸运台灯",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=dorm%20desk%20lamp&sign=3c8fb067b756924557df10c5eeebb06f",
    storyMarkdown: `**【物品曾立下的功劳】**\n- 陪伴我考过雅思的幸运物，希望照亮你的路\n**【我对下一任主人的祝福】**\n- 祝你学业顺利，天天开心！`,
    tags: ["玄学幸运物", "考神附体"],
    transferHistory: [
      { owner: "2020级王学长", year: "2020" },
      { owner: "2023级你", year: "2023" }
    ],
    carbonReport: { water: 10, carbon: 2 },
    buyerStories: []
  }
];

function Markdown({ content }: { content: string }) {
  // 简单markdown渲染
  return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />;
}

export default function AcademicLegacyCarousel() {
  const [current, setCurrent] = useState(0);
  const [newStory, setNewStory] = useState("");
  const [items, setItems] = useState(legacyItems);

  const handlePrev = () => setCurrent((current - 1 + items.length) % items.length);
  const handleNext = () => setCurrent((current + 1) % items.length);

  const handleAddStory = () => {
    if (!newStory.trim()) return;
    setItems(items => items.map((item, idx) => idx === current ? {
      ...item,
      buyerStories: [...item.buyerStories, { user: "你", content: newStory, time: new Date().toLocaleDateString() }]
    } : item));
    setNewStory("");
  };

  const item = items[current];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-gray-900">学术遗产专区</h2>
        <div>
          <button onClick={handlePrev} className="px-2 text-gray-400 hover:text-blue-600">&#8592;</button>
          <button onClick={handleNext} className="px-2 text-gray-400 hover:text-blue-600">&#8594;</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <img src={item.image} alt={item.name} className="w-32 h-32 rounded-lg object-cover mx-auto md:mx-0" />
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {item.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">{tag}</span>
            ))}
          </div>
          <Markdown content={item.storyMarkdown} />
          <div className="mt-2 text-xs text-green-700 bg-green-50 rounded p-2">
            本物品已累计节约{item.carbonReport.water}L水、减少{item.carbonReport.carbon}kg碳排放
          </div>
          <div className="mt-2">
            <div className="font-semibold text-sm mb-1">传承路径：</div>
            <ol className="border-l-2 border-blue-200 pl-3 text-xs">
              {item.transferHistory.map((h, i) => (
                <li key={i} className="mb-1 relative">
                  <span className="absolute -left-3 top-0 w-2 h-2 bg-blue-400 rounded-full"></span>
                  {h.year} {h.owner}
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-3">
            <div className="font-semibold text-sm mb-1">买家续写故事：</div>
            {item.buyerStories.length === 0 && <div className="text-gray-400 text-xs">暂无续写，快来成为新故事的主角吧！</div>}
            <ul className="space-y-1">
              {item.buyerStories.map((s, i) => (
                <li key={i} className="text-xs bg-gray-50 rounded p-1"><b>{s.user}</b>：{s.content} <span className="text-gray-400">({s.time})</span></li>
              ))}
            </ul>
            <div className="flex mt-2 gap-2">
              <input
                value={newStory}
                onChange={e => setNewStory(e.target.value)}
                placeholder="写下你的故事..."
                className="flex-1 px-2 py-1 border rounded text-xs"
              />
              <button onClick={handleAddStory} className="bg-blue-600 text-white px-3 py-1 rounded text-xs">续写</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 