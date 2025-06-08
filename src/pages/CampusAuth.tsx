import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/App";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { campusAuthData } from "@/data/mock";

export default function CampusAuth() {
  const { setStatus, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(campusAuthData.studentInfo);
  const [creditScore] = useState(campusAuthData.creditScore);
  const [riskControl] = useState(campusAuthData.riskControl);
  const [tags, setTags] = useState(campusAuthData.tags);
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, [field]: event.target?.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟提交过程
    setTimeout(() => {
      const mockUserInfo = {
        name: formData.name,
        studentId: formData.studentId,
        department: formData.department,
        grade: formData.grade,
        avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=college%20student%20avatar&sign=9f30d9d30e9926f946e95fa0ab891100",
        creditScore: 75
      };
      
      setStatus('authenticated');
      setUserInfo(mockUserInfo);
      setIsSubmitting(false);
      navigate("/");
    }, 2000);
  };

  return (
     <div className={cn("bg-light-blue min-h-screen pb-20")}>
      <Navbar />
      
      <div className="px-4">
        <button 
          onClick={() => navigate("/")}
          className="mt-4 flex items-center text-gray-600"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          返回
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">校园认证</h1>

        {/* 学籍验证表单 */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">学籍验证</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">学号</label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">学院</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">请选择学院</option>
                  <option value="计算机学院">计算机学院</option>
                  <option value="软件学院">软件学院</option>
                  <option value="电子工程学院">电子工程学院</option>
                  <option value="机械工程学院">机械工程学院</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">年级</label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">请选择年级</option>
                  <option value="大一">大一</option>
                  <option value="大二">大二</option>
                  <option value="大三">大三</option>
                  <option value="大四">大四</option>
                  <option value="研究生">研究生</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">身份证正面</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "idCardFront")}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">身份证反面</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "idCardBack")}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">学生证照片</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "studentCard")}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full mt-6 py-2 px-4 bg-blue-600 text-white font-medium rounded-md",
                "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isSubmitting ? "提交中..." : "提交认证"}
            </button>
          </form>
        </div>

        {/* 信用分展示 */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">信用分</h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-blue-600">{creditScore.score || "--"}</div>
              <div className="text-sm text-gray-500 mt-1">当前等级: {creditScore.level}</div>
            </div>
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-blue-500 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">{creditScore.score || "--"}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <p>{creditScore.description}</p>
            {creditScore.lastUpdated && (
              <p className="mt-1 text-xs text-gray-400">最后评估: {creditScore.lastUpdated}</p>
            )}
          </div>
        </div>

        {/* 风控系统 */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">风控系统</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">AI识别状态</span>
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                riskControl.aiStatus === "通过" ? "bg-green-100 text-green-800" :
                riskControl.aiStatus === "未评估" ? "bg-gray-100 text-gray-800" :
                "bg-yellow-100 text-yellow-800"
              )}>
                {riskControl.aiStatus}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">人工审核状态</span>
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                riskControl.manualStatus === "通过" ? "bg-green-100 text-green-800" :
                riskControl.manualStatus === "未审核" ? "bg-gray-100 text-gray-800" :
                "bg-yellow-100 text-yellow-800"
              )}>
                {riskControl.manualStatus}
              </span>
            </div>
            {riskControl.lastChecked && (
              <div className="text-xs text-gray-400 mt-2">
                最后检查: {riskControl.lastChecked}
              </div>
            )}
          </div>
        </div>

        {/* 标签管理 */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-3">专属标签管理</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <div key={tag} className="flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                <span className="text-sm">{tag}</span>
                <button 
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-blue-400 hover:text-blue-600"
                >
                  <i className="fa-solid fa-xmark text-xs"></i>
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="输入新标签"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleAddTag}
              className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              添加
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}