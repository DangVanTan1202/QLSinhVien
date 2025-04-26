"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { X } from "lucide-react";
import { useState } from "react";

export default function XemDiemUI({ user, handleLogout, data, permissions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = (data || []).filter((item) => {
    const keyword = searchTerm.toLowerCase();
    return (
      (item.maMonHoc?.toLowerCase() || "").includes(keyword) ||
      (item.tenMonHoc?.toLowerCase() || "").includes(keyword) ||
      (item.tenGiangVien?.toLowerCase() || "").includes(keyword)
    );
  });
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-pink-100 to-purple-100 text-gray-900 font-sans">
      <Sidebar user={user} />
      <div className="flex-1 px-8 py-6">
        <Header user={user} onLogout={handleLogout} />
        <h2 className="text-4xl font-bold text-orange-600 mb-8">Xem điểm</h2>

        <div className="p-6 space-y-6 bg-white rounded-xl shadow-lg border border-purple-200">
          {/* Tìm kiếm */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="🔍 Tìm theo môn học, giảng viên..."
              className="input input-bordered w-full max-w-md border-pink-400 focus:ring-2 focus:ring-pink-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Bảng điểm */}
          {permissions.Xem ? (
            <div className="overflow-auto">
              <table className="w-full bg-white shadow rounded overflow-hidden">
                <thead className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white">
                  <tr className="text-white">
                    <th className="p-3 text-left">Mã môn học</th>
                    <th className="p-3 text-left">Tên môn học</th>
                    <th className="p-3 text-left">Giảng viên</th>
                    <th className="p-3 text-left">Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-green-100 transition border-b"
                    >
                      <td className="p-3">{item.maMonHoc}</td>
                      <td className="p-3">{item.tenMonHoc}</td>
                      <td className="p-3">{item.tenGiangVien}</td>
                      <td className="p-3 font-semibold text-blue-600">{item.diem}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-red-600 font-bold mt-4">
              <X size={18} className="inline mr-2" />
              Bạn không có quyền xem điểm!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
