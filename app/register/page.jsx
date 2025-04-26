"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({ TenDangNhap: "", MatKhau: "", confirmPassword: "", HoTen: "" ,LoaiTK_Id:""});
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const router = useRouter();
  const getAvatarSrc = () => {
    const tenTaikhoanLength = form.TenDangNhap.length;
    const hoTenLength = form.HoTen.length;
    const maxLength = Math.max(tenTaikhoanLength, hoTenLength);
    if (showPassword) return "/showpassword.png";
    if (focusedField === "MatKhau" || (form.MatKhau.length > 0 && focusedField !== "TenDangNhap" && focusedField !== "HoTen")) 
      return "/textbox_password.png";
    if (focusedField === "comfirmPassword" || (form.MatKhau.length > 0 && focusedField !== "TenDangNhap" && focusedField !== "HoTen")) 
      return "/textbox_password.png";
    if (focusedField === "TenDangNhap" && form.TenDangNhap.length === 0) return "/textbox_user_Clicked.JPG";
    if (focusedField === "HoTen" && form.HoTen.length === 0) return "/textbox_user_Clicked.JPG";
    if (maxLength === 0) return "/debut.jpg";
    return `/textbox_user_${Math.min(maxLength, 24)}.jpg`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Sending request with:", {
      TenDangNhap: form.TenDangNhap,
      MatKhau: form.MatKhau,
      HoTen: form.HoTen,
      LoaiTK_Id: Number(form.LoaiTK_Id)
    });
    try {
      const res = await fetch("http://guyqn123-001-site1.ptempurl.com/Login/Register(Dang_Ky)", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          TenDangNhap: form.TenDangNhap,
          MatKhau: form.MatKhau,
          HoTen: form.HoTen,
          LoaiTK_Id: parseInt(form.LoaiTK_Id),
        }),
      });
      console.log("Response status:", res.status);
      const data = await res.json().catch(() => null);
      console.log("Response data:", data);
      if (res.ok) {
        alert("Đăng ký thành công!");
        router.push("/login");
      } else {
        alert(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Có lỗi xảy ra khi gửi yêu cầu!");
    }
  };
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-300 to-orange-500">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/daihoc.webp')" }}></div>
      <header className="w-full bg-red-700 text-white shadow-md py-4 px-8 flex justify-between items-center fixed top-0 z-10">
        <h1 className="text-2xl font-bold">Hệ Thống Quản Lý Sinh Viên</h1>
        <nav className="space-x-6">
          <Button variant="ghost" className="text-white" onClick={() => router.push("/homePage")}>Home</Button>
         <Button variant="ghost" className="text-white" onClick={() => router.push("/contact")}>Liên Hệ</Button>
        </nav>
      </header>
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-blue-100/30 p-8 shadow-2xl rounded-2xl border border-orange-600 backdrop-blur-md"
      >
        <div className="flex justify-center mb-6">
          <Image src={getAvatarSrc()} alt="Avatar" width={120} height={120} className="rounded-full border-4 border-orange-600 shadow-lg"/>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input placeholder="Tên đăng nhập" value={form.TenDangNhap} onChange={(e) => setForm({ ...form, TenDangNhap: e.target.value })} onFocus={() => setFocusedField("TenDangNhap")} onBlur={() => setFocusedField("")} className="w-full bg-white border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"/>
          <Input placeholder="Họ tên" value={form.HoTen} onChange={(e) => setForm({ ...form, HoTen: e.target.value })} onFocus={() => setFocusedField("HoTen")} onBlur={() => setFocusedField("")} className="w-full bg-white border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"/>
          <div className="relative">
            <Input placeholder="Mật khẩu" type={showPassword ? "text" : "password"} value={form.MatKhau} onChange={(e) => setForm({ ...form, MatKhau: e.target.value })} onFocus={() => setFocusedField("MatKhau")} onBlur={() => setFocusedField("")} className="w-full bg-white border rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-orange-500"/>
            <button type="button" className="absolute right-3 top-3 text-gray-500 hover:text-gray-700" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Input placeholder="Xác nhận mật khẩu" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}  onFocus={() => setFocusedField("MatKhau")} onBlur={() => setFocusedField("")} className="w-full bg-white border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"/>
          <select value={form.LoaiTK_Id} onChange={(e) => setForm({ ...form, LoaiTK_Id: e.target.value })} className="w-full bg-white border rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500">
            <option value={3}>Sinh viên</option>
            <option value={2}>Giảng viên</option>
          </select>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold shadow-md">Đăng Ký</Button>
          </motion.div>
        </form>
        <div className="mt-6">
          <p className="text-black-600"> Đã có tài khoản ?</p>
          <Button variant="outline" className="mt-2 w-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white" onClick={() => router.push("/login")}>Đăng Nhập</Button>
        </div>
      </motion.div>
      <footer className="w-full bg-gray-900 text-white text-center py-4 fixed bottom-0">
        &copy; 2025 Hệ Thống Quản Lý Sinh Viên - All Rights Reserved
      </footer>
    </div>
  );
}
