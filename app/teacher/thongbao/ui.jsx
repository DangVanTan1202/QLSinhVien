"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function ThongBaoUI({
  user,
  handleLogout,
  monHocs,
  sinhViens,
  onMonHocChange,
  onNhapLai,
 // permissions,
}) {
  const [selectedMonHoc, setSelectedMonHoc] = useState("");
  const [selectedLop, setSelectedLop] = useState("");
  const handleSelectMonHoc = (e) => {
    const id = e.target.value;
    setSelectedMonHoc(id);
    const mon = monHocs.find((m) => m.id == id);
    if (mon) {
      setSelectedLop(mon.LopHoc.id);
      onMonHocChange(mon.id);
    }
  };
  const isBangDiemTuChoi = sinhViens?.some((sv) => sv.IsDuyet === false);
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100">
      <Sidebar user={user} />
      <div className="flex-1 p-6">
        <Header user={user}  onLogout={handleLogout} />
        <h2 className="text-3xl font-bold text-orange-600 mb-6">
          Thông báo bảng điểm
        </h2>
        {/* {permissions.Xem ? ( */}
          <>
             <div className="space-y-8 p-6 border-pink-200 mb-10">
              <select
                className="p-3 border border-orange-300 rounded-md w-full bg-white text-gray-700 focus:ring-2 focus:ring-orange-400 transition"
                value={selectedMonHoc}
                onChange={handleSelectMonHoc}
              >
                <option value="">-- Chọn môn học --</option>
                {monHocs.map((mh) => (
                  <option key={mh.id} value={mh.id}>
                    {mh.maMonHoc} - {mh.tenMonHoc} ({mh.LopHoc?.TenLop}) - GV:{" "}
                    {mh.GiangVien?.hoTen}
                  </option>
                ))}
              </select>
            </div>

            {selectedLop && (
              <div className="bg-white p-6 rounded-xl shadow-md border">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Danh sách sinh viên lớp 
                  {monHocs.find((m) => m.id == selectedMonHoc)?.LopHoc?.TenLop}
                </h3>
                <table className="w-full border border-gray-300 text-left">
                  <thead className="bg-orange-100">
                    <tr>
                      <th className="p-3">Họ tên</th>
                      <th className="p-3">Mã SV</th>
                      <th className="p-3">Điểm</th>
                      <th className="p-3">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sinhViens.map((sv) => (
                      <tr key={sv.id} className="hover:bg-purple-50">
                        <td className="p-3">{sv.hoTen}</td>
                        <td className="p-3">{sv.maSinhVien}</td>
                        <td className="p-3">{sv.diem ?? "Chưa có"}</td>
                        <td className="p-3">
                          {sv.IsDuyet === true
                            ? "✅ Đã duyệt"
                            : sv.IsDuyet === false
                            ? "❌ Bị từ chối"
                            : "⏳ Chờ duyệt"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {isBangDiemTuChoi && (
                  <div className="mt-5 text-right">
                    <button
                      onClick={onNhapLai}
                      className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Nhập lại bảng điểm
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        {/* // ) : (
        //   <div className="text-center text-red-600 font-bold mt-10">
        //     Bạn không có quyền xem trang này.
        //   </div>
        // )} */}
      </div>
    </div>
  );
}