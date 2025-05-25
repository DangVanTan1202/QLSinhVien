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
      onLopChange(mon.LopHoc.id);
      setDsDiem([]);
    }
  };

  const handleInputChange = (idSinhVien, type, value) => {
    let numericValue = value === "" ? 0 : parseFloat(value);
    if (isNaN(numericValue)) numericValue = 0;

    setDsDiem((prev) => {
      const index = prev.findIndex((d) => d.idSinhVien === idSinhVien);
      const updated = [...prev];
      if (index !== -1) {
        updated[index][type] = numericValue;
        updated[index].diem = calculateDiem(updated[index]);
        return updated;
      } else {
        const newEntry = {
          idSinhVien,
          idMonHoc: Number(selectedMonHoc),
          idGiangVien: user?.GiangVien?.id || 0,
          diemCC: type === "diemCC" ? numericValue : 0,
          diemGK: type === "diemGK" ? numericValue : 0,
          diemCK: type === "diemCK" ? numericValue : 0,
          diem: 0,
        };
        newEntry.diem = calculateDiem(newEntry);
        return [...prev, newEntry];
      }
    });
  };

  const calculateDiem = ({ diemCC = 0, diemGK = 0, diemCK = 0 }) => {
    return parseFloat((diemCC * 0.1 + diemGK * 0.3 + diemCK * 0.6).toFixed(2));
  };

  return (
    <div className="flex min-h-screen bg-neutral-200 text-gray-900 font-sans">
      <Sidebar user={user} />
      <div className="flex-1 px-8 py-6">
        <Header user={user} onLogout={handleLogout} />
        <h2 className="text-4xl font-bold text-orange-600 mb-8">
          nhập điểm cho sinh viên
        </h2>
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
                    {mh.maMonHoc} - {mh.tenMonHoc} ({mh.LopHoc?.tenLop})
                  </option>
                ))}
              </select>
            </div>
            {selectedLop && (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
                <h3 className="text-xl font-semibold mb-4">
                  Danh sách sinh viên lớp{" "}
                  {monHocs.find((m) => m.id == selectedMonHoc)?.LopHoc?.tenLop}
                </h3>
                <table className="w-full text-left border border-gray-200">
                  <thead>
                    <tr className="bg-pink-200 text-stone-700">
                      <th className="p-3">Họ tên</th>
                      <th className="p-3">Mã SV</th>
                      <th className="p-3">Điểm CC</th>
                      <th className="p-3">Điểm GK</th>
                      <th className="p-3">Điểm CK</th>
                      <th className="p-3">Điểm TB</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(sinhViens || []).map((sv) => {
                      const svDiem = dsDiem.find((d) => d.idSinhVien === sv.id);
                      return (
                        <tr key={sv.id} className="hover:bg-green-100">
                          <td className="p-3">{sv.hoTen}</td>
                          <td className="p-3">{sv.maSinhVien}</td>

                          {["diemCC", "diemGK", "diemCK"].map((type) => (
                            <td className="p-2" key={type}>
                              <input
                                type="number"
                                step="0.01"
                                min={0}
                                max={10}
                                className="w-20 px-2 py-1 text-sm rounded-md border-2 border-orange-400 focus:outline-none focus:ring-0 focus:border-orange-400"
                                value={svDiem?.[type] ?? ""}
                                onChange={(e) => {
                                  let raw = e.target.value;
                                  if (raw === "") {
                                    handleInputChange(sv.id, type, "");
                                    return;
                                  }
                                  let value = parseFloat(raw);
                                  if (isNaN(value)) return;
                                  if (value < 0) value = 0;
                                  if (value > 10) value = 10;
                                  handleInputChange(sv.id, type, value);
                                }}
                              />
                            </td>
                          ))}
                          <td className="p-2 text-center">
                            {svDiem?.diem?.toFixed(2) || "----"}
                          </td>
                        </tr>
                      );
                    })}
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
