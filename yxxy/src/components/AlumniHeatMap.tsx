import { cn } from "@/lib/utils";

// mock数据
const hotAreas = [
  { name: "图书馆", count: 32, left: "30%", top: "40%" },
  { name: "计算机楼", count: 18, left: "60%", top: "30%" },
  { name: "操场", count: 12, left: "50%", top: "70%" },
];
const alumniMarks = [
  { name: "张学姐", place: "计算机楼3楼实验室", left: "62%", top: "32%" },
  { name: "王学长", place: "图书馆东侧自习区", left: "32%", top: "42%" },
];

export default function AlumniHeatMap() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-12 border border-blue-100">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
        <i className="fa-solid fa-map-location-dot text-blue-500"></i> 校友热力地图
      </h2>
      <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl overflow-hidden">
        {/* 校园地图底图可替换为真实图片 */}
        <img src="https://img.zcool.cn/community/01b6e95e2e2e2fa8012193a3e7e1e2.jpg@1280w_1l_2o_100sh.jpg" alt="校园地图" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        {/* 热点区域 */}
        {hotAreas.map(area => (
          <div
            key={area.name}
            className="absolute flex flex-col items-center"
            style={{ left: area.left, top: area.top }}
          >
            <div className="w-10 h-10 bg-pink-400/60 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white animate-pulse">
              {area.count}
            </div>
            <span className="mt-1 text-xs bg-white/80 text-pink-600 px-2 py-0.5 rounded shadow">{area.name}</span>
          </div>
        ))}
        {/* 学长学姐标记 */}
        {alumniMarks.map(mark => (
          <div
            key={mark.name}
            className="absolute flex flex-col items-center group"
            style={{ left: mark.left, top: mark.top }}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-white">
              <i className="fa-solid fa-user-graduate"></i>
            </div>
            <span className="mt-1 text-xs bg-white/90 text-blue-600 px-2 py-0.5 rounded shadow group-hover:bg-blue-600 group-hover:text-white transition">{mark.name}在此<br/>{mark.place}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 