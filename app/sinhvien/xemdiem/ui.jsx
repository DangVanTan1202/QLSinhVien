"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { X } from "lucide-react";
import { useState } from "react";
import { exportToExcel } from "../../../components/exportToExcel";
export default function XemDiemUI({
  user,
  handleLogout,
  data,
  permissions,
  xepLoai,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = (data || []).filter((item) => {
    const keyword = searchTerm.toLowerCase();
    return (
      (item.maMonHoc?.toLowerCase() || "").includes(keyword) ||
      (item.tenMonHoc?.toLowerCase() || "").includes(keyword)
    );
  });
  return (
    <div className="flex min-h-screen bg-neutral-200 text-gray-900 font-sans">
      <Sidebar user={user} />
      <div className="flex-1 px-8 py-6">
        <Header user={user} onLogout={handleLogout} />
        <h2 className="text-4xl font-bold text-orange-600 mb-8">Xem điểm</h2>
        <div className="p-6 space-y-6 bg-white rounded-xl shadow-lg border border-purple-200">
          {/* Tìm kiếm */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder=" Tìm theo môn học, giảng viên..."
              className="input input-bordered w-full max-w-md border-pink-400 focus:ring-2 focus:ring-pink-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Bảng điểm */}
          {permissions.Xem ? (
            <>
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => exportToExcel(filteredData)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                >
                  Xuất Excel
                </button>
              </div>
              <div className="overflow-auto">
                <table className="w-full bg-white shadow rounded overflow-hidden">
                  <thead className="bg-pink-200 text-stone-700">
                    <tr>
                      <th className="p-3 text-left">Mã môn học</th>
                      <th className="p-3 text-left">Tên môn học</th>
                      <th className="p-3 text-center">Điểm Chuyên cần</th>
                      <th className="p-3 text-center">Điểm Giữa kỳ</th>
                      <th className="p-3 text-center">Điểm Cuối kỳ</th>
                      <th className="p-3 text-center">Điểm Hệ 10 </th>
                      <th className="p-3 text-center">Điểm Hệ 4</th>
                      <th className="p-3 text-center">Điểm chữ</th>
                      <th className="p-3 text-center">Kết quả</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index} className="hover:bg-green-100 ">
                        <td className="p-3">{item.maMonHoc}</td>
                        <td className="p-3">{item.tenMonHoc}</td>
                        <td className="p-3 text-center font-semibold text-sky-600">
                          {item.diemCC}
                        </td>
                        <td className="p-3 text-center font-semibold text-sky-600">
                          {" "}
                          {item.diemGK}
                        </td>
                        <td className="p-3 text-center font-semibold text-sky-600">
                          {item.diemCK}
                        </td>
                        <td className="p-3 text-center font-semibold text-blue-600">
                          {item.diem}{" "}
                        </td>
                        <td className="p-3 text-center font-semibold text-blue-600">
                          {item.diemHe4}
                        </td>
                        <td className="p-3 text-center font-semibold text-gray-600">
                          {item.diemChu}
                        </td>
                        <td className="p-3 text-center font-semibold text-red-600">
                          {item.ketQua}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {xepLoai && (
                <div className="mt-4 p-6 border rounded-xl bg-yellow-50 shadow text-base space-y-2">
                  <p className="text-lg">
                     <strong>GPA hệ 10:</strong>{" "}
                    <span className="text-blue-600 font-semibold">
                      {xepLoai.DiemTrungBinh || "N/A"}
                    </span>
                  </p>
                  <p className="text-lg">
                    <strong>GPA hệ 4:</strong>{" "}
                    <span className="text-purple-600 font-semibold">
                      {xepLoai.DiemTrungBinh
                        ? (
                            (parseFloat(xepLoai.DiemTrungBinh) / 10) *
                            4
                          ).toFixed(2)
                        : "N/A"}
                    </span>
                  </p>
                  <p className="text-lg">
                     <strong>Xếp loại:</strong>{" "}
                    <span className="text-green-700 font-semibold">
                      {xepLoai.XepLoai || "N/A"}
                    </span>
                  </p>
                </div>
              )}
            </>
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
