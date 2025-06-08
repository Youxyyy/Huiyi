import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/App";

export default function Navbar() {
  // const [activeTab, setActiveTab] = useState("teaching"); // 不再需要
  const { status, userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50",
      "px-4 py-3 flex items-center justify-between",
      "pointer-events-none"
    )}>
      <div></div>
      <div className="pointer-events-auto">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 transition"
        >
          登录
        </button>
      </div>
    </nav>
  );
}