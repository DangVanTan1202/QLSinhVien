"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Atom, Baby, Blend } from "lucide-react";

export default function Header({ user, onLogout }) {
  const router = useRouter();// Khởi tạo hook useRouter
  const hasUser = user && Object.keys(user).length > 0;// Kiểm tra xem người dùng có thông tin hay không

  return (
    <header className="flex justify-between items-center bg-cyan-500 p-4 shadow-md rounded-lg text-white">
      {hasUser ? (
        <div className="flex items-center gap-4">
          <div className="w-16 h-16">
            <img
              src="/nonsv-removebg-preview.png"
              alt="User Avatar"
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div>
            <p className="font-bold text-lg"> {user.HoTen}</p>
          </div>
        </div>
      ) : (
        <p className="text-white text-lg font-semibold">
          Chào mừng đến hệ thống quản lý sinh viên
        </p>
      )}
      <div className="flex gap-4">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-white"
          onClick={() => router.push("/lienHe")}
        >
          <Bell />
          <span>Liên hệ</span>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-white"
          onClick={() => router.push("/doimk")}
        >
          <Atom />
          <span> Đổi mật khẩu</span>
        </Button>
        {hasUser && (
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-white"
            onClick={onLogout}
          >
            <LogOut />
            <span>Đăng xuất</span>
          </Button>
        )}
      </div>
    </header>
  );
}
