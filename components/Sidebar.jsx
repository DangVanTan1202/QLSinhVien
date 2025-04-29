"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Bell, Settings, Book, Users, BarChart2, ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({ user }) {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const getMenuItems = () => {
    let items = [
      { name: "Trang chủ", icon: <Home />, path: "/home" },
      { name: "Hướng dẫn sử dụng", icon: <Book />, path: "/guide" },
    ];
    if (!user || !user.LoaiTK_Name) return items;
    switch (user.LoaiTK_Name.toLowerCase()) {
      case "sinh viên":
        items.push({ name: "Điểm số cá nhân", icon: <BarChart2 />, path: "/sinhvien/xemdiem" });
        break;
      case "giảng viên":
        items.push({ name: "Quản lý sinh viên", icon: <Users />, path: "/teacher/qlsv" });
        items.push({ name: "Chấm điểm sinh viên", icon: <BarChart2 />, path: "/teacher/diem" });
        items.push({ name: "Thông báo", icon: <Bell />, path: "/teacher/thongbao" });
        break;
      case "admin":
        items.push({ name: "Quản lý tài khoản", icon: <Users />, path: "/admin/accounts" });
        items.push({ name: "Phê duyệt điểm", icon: <BarChart2 />, path: "/admin/duyet" });
        items.push({ name: "Quản lý quyền", icon: <Settings/>, path: "/admin/quyen" });
        items.push({ name: "Quản lý sinh viên", icon: <Users />, path: "/teacher/qlsv" });
        items.push({ name: "Quản lý giảng viên", icon: <Users />, path: "/admin/qlgv" });
        items.push({ name: "Quản lý môn học", icon: <Book />, path: "/admin/mon" });
        break;
      default:
        break;
    }
    return items;
  };

  return (
    <aside
      className={`relative bg-gray-800 text-rose-500 p-6 flex flex-col min-h-screen transition-all duration-300 
      ${isCollapsed ? "w-22" : "w-64"}`}
    >
      {/* Nút Toggle Sidebar*/}
      <button
        onClick={toggleSidebar}
        className="absolute -right-5 top-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white 
        rounded-full p-3 shadow-xl hover:scale-110 transition-all duration-300"
      >
        {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
      </button>

      {/* Logo / Tiêu đề */}
      {!isCollapsed && <h2 className="text-xl font-bold mb-4 text-center">Hệ Thống QLSV</h2>}

      {/* Danh sách menu */}
      <nav className="flex-1 overflow-y-auto space-y-2">
        {getMenuItems().map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            className={`w-full flex items-center gap-3 text-left text-white hover:bg-orange-500 
              transition-all duration-200 ${isCollapsed ? "justify-center px-0" : "px-3"}`}
            onClick={() => router.push(item.path)}
          >
            {item.icon}
            {!isCollapsed && <span className="flex-1">{item.name}</span>}
          </Button>
        ))}
      </nav>

      {/* Footer bên dưới Sidebar */}
      {!isCollapsed && (
        <div className="border-t border-gray-700 pt-4 mt-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} QLSV</p>
        </div>
      )}
    </aside>
  );
}
