"use client";
import { useState } from "react";
import { PlusCircleIcon, ArrowBigLeftDashIcon } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
export default function DuyetDiemUI({
  user,
  handleLogout,
  monHocs,
  sinhViens,
  permissions,
  onMonHocChange,
  onDuyet,
  onTuChoi,
}) {
  const [selectedMonHoc, setSelectedMonHoc] = useState(null);
  const handleSelectMonHoc = (monHoc) => {
    setSelectedMonHoc(monHoc);
    onMonHocChange(monHoc.id);
  };
  const handleBack = () => {
    setSelectedMonHoc(null);
  };
  const trangThaiBangDiem =
    sinhViens.length > 0 && "isDuyet" in sinhViens[0] //Nếu không có sinh viên → không có bảng điểm → trả về null.
      ? sinhViens[0].isDuyet ?? null // Kiểm tra xem đối tượng sinh viên đầu tiên có chứa thuộc tính isDuyet không.
      : null;
  return (
    <div className="flex min-h-screen bg-neutral-200 text-gray-900 font-sans">
      <Sidebar user={user} />
      <div className="flex-1 px-8 py-6">
        <Header user={user} onLogout={handleLogout} />
        <h2 className="text-4xl font-bold text-orange-600 mb-8">
          Duyệt bảng điểm môn học
        </h2>
        {permissions.Xem ? (
          <>
            {!selectedMonHoc ? (
              <div className="bg-white p-6 rounded-xl shadow-md border border-orange-200">
                <h3 className="text-lg font-semibold mb-4 text-orange-700">
                  Danh sách môn học
                </h3>
                <table className="w-full text-left border border-gray-300">
                  <thead className="bg-pink-200 text-stone-700">
                    <tr>
                      <th className="p-3">Mã môn học</th>
                      <th className="p-3">Tên môn học</th>
                      <th className="p-3">Lớp học</th>
                      <th className="p-3"> Mã Giảng viên</th>
                      <th className="text-center w-20">Chọn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monHocs.map((mh) => (
                      <tr key={mh.id} className="hover:bg-green-100">
                        <td className="p-3">{mh.maMonHoc}</td>
                        <td className="p-3">{mh.tenMonHoc}</td>
                        <td className="p-3">{mh.LopHoc?.tenLop}</td>
                        <td className="p-3">{mh.GiangVien?.maGiangVien}</td>
                        <td className="p-3 text-center w-20">
                          <button
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                            onClick={() => handleSelectMonHoc(mh)}
                          >
                            <PlusCircleIcon size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    Danh sách sinh viên lớp {selectedMonHoc.LopHoc?.tenLop}
                  </h3>
                  <button
                    className="text-blue-600 hover:underline font-medium"
                    onClick={handleBack}
                  >
                    --Quay lại chọn môn học--
                  </button>
                </div>
                <table className="w-full text-left border border-gray-200">
                  <thead className="bg-pink-200 text-stone-700">
                    <tr>
                      <th className="p-3">Họ tên</th>
                      <th className="p-3">Mã SV</th>
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
                        <td className="p-3">{sv.hoTen}</td>
                        <td className="p-3">{sv.maSinhVien}</td>
                        <td className="p-3 text-center">{sv.diemCC ?? "-"}</td>
                        <td className="p-3 text-center">{sv.diemGK ?? "-"}</td>
                        <td className="p-3 text-center">{sv.diemCK ?? "-"}</td>
                        <td className="p-3 text-center">{sv.diem ?? "Chưa có"}</td>
                        {/* <td className="p-3">
                          {sv?.isDuyet === true
                            ? "Đã duyệt"
                            : sv?.isDuyet === false
                            ? "Bị từ chối"
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

                {/* Nút duyệt/từ chối */}
                {(permissions.Duyet || permissions.TuChoi) &&
                  trangThaiBangDiem === null && (
                    <div className="mt-4 flex justify-end space-x-3">
                      {permissions.TuChoi && (
                        <button
                          className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition font-medium"
                          onClick={onTuChoi}
                        >
                          Từ chối bảng điểm
                        </button>
                      )}
                      {permissions.Duyet && (
                        <button
                          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition font-medium"
                          onClick={onDuyet}
                        >
                          Duyệt bảng điểm
                        </button>
                      )}
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
