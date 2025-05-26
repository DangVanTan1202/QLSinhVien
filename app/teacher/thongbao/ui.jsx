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
  const trangThaiBangDiem =
    sinhViens.length > 0 && "isDuyet" in sinhViens[0] //Nếu không có sinh viên → không có bảng điểm → trả về null.
      ? sinhViens[0].isDuyet ?? null // Kiểm tra xem đối tượng sinh viên đầu tiên có chứa thuộc tính isDuyet không.
      : null;
  return (
    <div className="flex min-h-screen bg-neutral-200">
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
                   môn : ({mh.maMonHoc} - {mh.tenMonHoc} )   lớp :({mh.LopHoc?.tenLop})
                    {mh.GiangVien?.hoTen}
                  </option>
                ))}
              </select>
            </div>

            {selectedLop && (
              <div className="bg-white p-6 rounded-xl shadow-md border">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  Danh sách sinh viên lớp 
                  {monHocs.find((m) => m.id == selectedMonHoc)?.LopHoc?.tenLop}
                </h3>
                <table className="w-full border border-gray-300 text-left">
                  <thead className="bg-pink-200 text-stone-700">
                    <tr>
                      <th className="p-3 text-center">Mã sinh viên</th>
                      <th className="p-3 text-center">Họ tên</th>
                      <th className="p-3 text-center">Điểm Chuyên cần</th>
                      <th className="p-3 text-center">Điểm Giữa kỳ</th>
                      <th className="p-3 text-center">Điểm Cuối kỳ</th>
                      <th className="p-3 text-center">Điểm TB</th>
                      {/* <th className="p-3">Trạng thái</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {sinhViens.map((sv) => (
                      <tr key={sv.id} className="hover:bg-green-100">
                        <td className="p-3 text-center">{sv.maSinhVien}</td>
                        <td className="p-3 text-center">{sv.hoTen}</td>
                        <td className="p-3 text-center">{sv.diemCC ?? "-"}</td>
                        <td className="p-3 text-center">{sv.diemGK ?? "-"}</td>
                        <td className="p-3 text-center">{sv.diemCK ?? "-"}</td>
                        <td className="p-3 text-center">{sv.diem ?? "-"}</td>
                        {/* <td className="p-3">
                          {sv.isDuyet === true
                            ? " Đã duyệt"
                            : sv.isDuyet === false
                            ? " Bị từ chối"
                            : "Chờ duyệt"}
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                 {/* Trạng thái bảng điểm */}
                {sinhViens.length > 0 && (
                  <div className="mt-4 text-right font-medium">
                    Trạng thái bảng điểm:{" "}
                    <span
                      className={`${
                        trangThaiBangDiem === null
                          ? "text-yellow-500"
                          : trangThaiBangDiem === true
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {trangThaiBangDiem === null
                        ? "Chờ duyệt"
                        : trangThaiBangDiem === true
                        ? "Đã duyệt"
                        : "Bị từ chối"}
                    </span>
                  </div>
                )}
                {trangThaiBangDiem === false && (
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