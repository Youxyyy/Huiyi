import { cn } from "@/lib/utils";

const dormRanking = [
  { dorm: "1号楼", score: 1200 },
  { dorm: "2号楼", score: 950 },
  { dorm: "3号楼", score: 800 },
  { dorm: "4号楼", score: 700 },
];
const personalRanking = [
  { name: "张三", score: 600 },
  { name: "李四", score: 500 },
  { name: "王五", score: 400 },
  { name: "赵六", score: 350 },
];

export default function CarbonRanking() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-green-100">
      <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
        <i className="fa-solid fa-leaf text-green-500"></i> 碳积分排行榜
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-2">🏆 宿舍楼排行</h3>
          <ol className="space-y-2">
            {dormRanking.map((d, i) => (
              <li key={d.dorm} className={cn(
                "flex items-center justify-between p-2 rounded-lg",
                i === 0 ? "bg-green-100 font-bold text-green-800" : "bg-gray-50 text-gray-700"
              )}>
                <span>{i + 1}. {d.dorm}</span>
                <span>{d.score} 分</span>
                {i === 0 && <span className="ml-2 text-xs bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full">月度冠军</span>}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-2">个人排行</h3>
          <ol className="space-y-2">
            {personalRanking.map((p, i) => (
              <li key={p.name} className={cn(
                "flex items-center justify-between p-2 rounded-lg",
                i === 0 ? "bg-green-100 font-bold text-green-800" : "bg-gray-50 text-gray-700"
              )}>
                <span>{i + 1}. {p.name}</span>
                <span>{p.score} 分</span>
                {i === 0 && <span className="ml-2 text-xs bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full">环保骑士</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
} 