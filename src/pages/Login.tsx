import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: 登录逻辑
    setTimeout(() => {
      setIsSubmitting(false);
      // 登录成功后跳转首页
      navigate("/");
    }, 1500);
  };

  return (
    <div className={cn("bg-light-blue min-h-screen pb-20")}> 
      <Navbar />
      <div className="px-4 pt-20 max-w-md mx-auto">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">登录</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full mt-4 py-2 px-4 bg-blue-600 text-white font-medium rounded-md",
                "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {isSubmitting ? "登录中..." : "登录"}
            </button>
          </form>
        </div>
        <div className="text-center text-sm text-gray-600">
          还没有账号？
          <button
            className="text-blue-600 hover:underline ml-1"
            onClick={() => navigate("/register")}
          >
            马上注册！
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
} 