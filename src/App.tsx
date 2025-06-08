import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ItemDetail from "@/pages/ItemDetail";
import CampusAuth from "@/pages/CampusAuth";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Marketplace from "@/pages/Marketplace";
import Publish from "@/pages/Publish";
import { createContext, useEffect, useState } from "react";
import { productsData } from "@/data/mock";
import { supabase } from '@/lib/supabase';

type AuthStatus = 'unauthenticated' | 'pending' | 'authenticated' | 'failed';

export interface UserInfo {
  name: string;
  studentId: string;
  department: string;
  grade: string;
  avatar: string;
  creditScore: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  distance: string;
  image: string;
  certified: boolean;
  tags: string[];
}

export const AuthContext = createContext({
  status: 'unauthenticated' as AuthStatus,
  userInfo: null as UserInfo | null,
  setStatus: (status: AuthStatus) => {},
  setUserInfo: (userInfo: UserInfo) => {},
  logout: () => {},
});

export const ProductContext = createContext({
  products: [] as Product[],
  setProducts: (p: Product[]) => {},
});

export default function App() {
  const [status, setStatus] = useState<AuthStatus>(() => {
    const saved = localStorage.getItem('authStatus');
    return saved ? JSON.parse(saved) : 'unauthenticated';
  });
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const saved = localStorage.getItem('userInfo');
    return saved ? JSON.parse(saved) : null;
  });
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    localStorage.setItem('authStatus', JSON.stringify(status));
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [status, userInfo]);

  // 拉取商品列表
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });
      if (!error && data) setProducts(data);
    }
    fetchProducts();
  }, []);

  const logout = () => {
    setStatus('unauthenticated');
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{ status, userInfo, setStatus, setUserInfo, logout }}
    >
      <ProductContext.Provider value={{ products, setProducts }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item-detail" element={<ItemDetail />} />
          <Route path="/campus-auth" element={<CampusAuth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
        </Routes>
      </ProductContext.Provider>
    </AuthContext.Provider>
  );
}
