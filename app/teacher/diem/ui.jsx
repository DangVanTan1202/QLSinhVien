"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function NopDiemUI({
  user,
  handleLogout,
  monHocs,
  sinhViens,
  permissions,
  onLopChange,
  onSubmit,
}) {
  const [selectedMonHoc, setSelectedMonHoc] = useState("");
  const [selectedLop, setSelectedLop] = useState("");
  const [dsDiem, setDsDiem] = useState([]);
  const handleSelectMonHoc = (e) => {
    const id = e.target.value;
    setSelectedMonHoc(id);
    const mon = monHocs.find((m) => m.id == id);
    if (mon) {
      setSelectedLop(mon.LopHoc.id);
      console.log("🔍 Lớp được chọn:", mon.LopHoc.id);
      onLopChange(mon.LopHoc.id);
      setDsDiem([]);
    }
  };
  const handleInputChange = (idSinhVien, value) => {
    const diem = Number(value);
    setDsDiem((prev) => {
      const index = prev.findIndex((d) => d.idSinhVien === idSinhVien);
      if (index !== -1) {
        const updated = [...prev];
        updated[index].diem = diem;
        return updated;
      }
      return [
        ...prev,
        {
          idSinhVien,
          idMonHoc: Number(selectedMonHoc),
          idGiangVien: user?.GiangVien?.id || 0,
          diem,
        },
      ];
    });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-pink-100 to-purple-100 text-gray-900 font-sans">
      <Sidebar user={user} />
      <div className="flex-1 px-8 py-6">
        <Header user={user} onLogout={handleLogout} />
        <h2 className="text-4xl font-bold text-orange-600 mb-8">nhập điểm cho sinh viên </h2>
        {permissions.Xem ? (
          <>
            <div className="space-y-2 p-6 border-pink-200 mb-6">
              <select
                className="p-3 border border-orange-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-orange-400 transition"
                value={selectedMonHoc}
                onChange={handleSelectMonHoc}
              >
                <option value="">-- Chọn môn học --</option>
                {monHocs.map((mh) => (
                  <option key={mh.id} value={mh.id}>
                    {mh.maMonHoc} - {mh.tenMonHoc} ({mh.LopHoc?.TenLop})
                  </option>
                ))}
              </select>
            </div>
            {selectedLop && (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
                <h3 className="text-xl font-semibold mb-4">
                  Danh sách sinh viên lớp
                   {monHocs.find(m => m.id == selectedMonHoc)?.LopHoc?.TenLop}
                </h3>
                <table className="w-full text-left border border-gray-200">
                  <thead>
                    <tr className="bg-orange-100 text-red-700">
                      <th className="p-3">Họ tên</th>
                      <th className="p-3">Mã SV</th>
                      <th className="p-3">Điểm</th>
                    </tr>
                  </thead>
                  <tbody>
                  {(sinhViens || []).map((sv) => (
                      <tr key={sv.id} className="hover:bg-green-100">
                        <td className="p-3">{sv.hoTen}</td>
                        <td className="p-3">{sv.maSinhVien}</td>
                        <td className="p-0">
                          <input
                            type="number"
                            min={1}
                            max={10}
                            className="input input-bordered w-28 px-4 py-2 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                            onChange={(e) =>
                              handleInputChange(sv.id, e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {permissions.Nop && (
                  <div className="mt-4 flex justify-end">
                    <button
                      className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition font-medium"
                      onClick={() => onSubmit(dsDiem)}
                    >
                      Nộp điểm
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-red-600 font-bold mt-10">
          Bạn không có quyền xem trang này
          </div>
        )}
      </div>
    </div>
  );
}