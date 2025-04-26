"use client";
import { PlusCircle, Trash2, Pencil, X, Check } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";
import { addGiangVien, updateGiangVien } from "../../service/giangVienService";
export default function GiangVienUI({
  data,
  user,
  handleLogout,
  users,
  permissions,
  onDelete,
  onSubmitSuccess,
}) {
  const [formData, setFormData] = useState({
    id: "",
    maGiangVien: "",
    ngaySinh: "",
    user_id: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInput = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async () => {
    // Kiểm tra dữ liệu trước khi gửi
    if (!formData.maGiangVien.trim() || !formData.ngaySinh || !formData.user_id) {
      alert("Vui lòng nhập đầy đủ thông tin: Mã giảng viên, Ngày sinh, và Tài khoản.");
      return;
    }
  
    const dataToSend = {
      maGiangVien: formData.maGiangVien.trim(),
      ngaySinh: new Date(formData.ngaySinh).toISOString(), // Chuyển thành dạng ISO
      user_id: formData.user_id,
    };
  
    try {
      if (isEdit) {
        await updateGiangVien(formData.id, dataToSend);
      } else {
        await addGiangVien(dataToSend); // KHÔNG gửi id lúc thêm
      }
  
      setFormData({
        id: null,
        maGiangVien: "",
        ngaySinh: "",
        user_id: "",
      });
      setIsEdit(false);
      setShowForm(false);
      onSubmitSuccess();
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật giảng viên:", error);
      alert("Có lỗi xảy ra khi lưu dữ liệu. Vui lòng thử lại.");
    }
  };
  

  const filteredData = data.filter(
    (gv) =>
      gv.maGiangVien?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      users
        .find((u) => u.id === gv.user_id)
        ?.hoTen?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 font-sans">
      <Sidebar user={user} />
      <div className="flex-1 px-8 py-6">
        <Header user={user} onLogout={handleLogout} />
        <h2 className="text-4xl font-bold text-orange-600 mb-8 ">
          Quản lý giảng viên
        </h2>
        <div className="p-6 space-y-6 bg-white rounded-xl shadow-lg border border-purple-200">
          {/* Tìm kiếm + Thêm */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder=" Tìm kiếm giảng viên..."
              className="input input-bordered w-full max-w-md border-pink-400 focus:ring-2 focus:ring-pink-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {permissions.Them && (
              <button
                className="ml-4 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 flex items-center gap-2"
                onClick={() => {
                  setIsEdit(false);
                  setShowForm(true);
                  setFormData({
                    id: null,
                    maGiangVien: "",
                    ngaySinh: "",
                    user_id: "",
                  });
                }}
              >
                <PlusCircle className="mr-2" size={18} />
                cập nhật thông tin giảng viên
              </button>
            )}
          </div>

          {/* Bảng dữ liệu */}
          {permissions.Xem ? (
            <div className="overflow-auto">
              <table className="w-full bg-white shadow rounded overflow-hidden">
                <thead className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white">
                  <tr className="bg-orange-100 text-red-700">
                    <th className="p-3 text-left"> Mã GV</th>
                    <th className="p-3 text-left">Họ tên</th>
                    <th className="p-3 text-left">Ngày sinh</th>
                    {(permissions.Sua || permissions.Xoa) && (
                      <th className="p-3 text-left">Thao tác</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((gv) => {
                    const user = users.find((u) => u.id === gv.user_id);
                    return (
                      <tr key={gv.id} className="hover:bg-green-100 transition">
                        <td className="p-3">{gv.maGiangVien}</td>
                        <td className="p-3">{user?.hoTen}</td>
                        <td className="p-3">
                          {new Date(gv.ngaySinh).toLocaleDateString()}
                        </td>
                        {(permissions.Sua || permissions.Xoa) && (
                          <td className="space-x-2">
                            {permissions.Sua && (
                              <button
                                className="p-3 text-blue-600"
                                onClick={() => {
                                  setIsEdit(true);
                                  setShowForm(true);
                                  setFormData({
                                    id: gv.id,
                                    maGiangVien: gv.maGiangVien,
                                    ngaySinh: gv.ngaySinh,
                                    user_id: gv.user_id,
                                  });
                                }}
                              >
                                <Pencil size={18} /> sửa
                              </button>
                            )}
                            {permissions.Xoa && (
                              <button
                                className="p-3 text-red-600"
                                onClick={() => onDelete(gv.id)}
                              >
                                <Trash2 size={18} /> xóa
                              </button>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-red-600 font-bold mt-4">
              <X size={18} /> Bạn không có quyền xem dữ liệu!
            </div>
          )}

          {(permissions.Them || permissions.Sua) && showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              {/* Lớp overlay có nền mờ */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl animate-fade-in">
                <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">
                  {isEdit ? "Sửa" : "Thêm"} giảng viên
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="maGiangVien"
                    placeholder="Mã giảng viên"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={formData.maGiangVien}
                    onChange={handleInput}
                  />
                  <input
                    type="date"
                    name="ngaySinh"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={formData.ngaySinh?.split("T")[0] || ""}
                    onChange={handleInput}
                  />
                  <select
                    name="user_id"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={formData.user_id}
                    onChange={handleInput}
                  >
                    <option value="">-- Chọn tài khoản giảng viên --</option>
                    {(() => {
                      const filteredUsers = users.filter((u) => {
                        if (u.LoaiTk_Id !== 2) {
                          return false;
                        }

                        // Kiểm tra đã gán vào giảng viên chưa (đủ cả mã và ngày sinh)
                        const daGan = data.some(
                          (gv) =>
                            gv.user_id === u.id &&
                            gv.maGiangVien?.trim() !== "" &&
                            gv.ngaySinh !== null
                        );
                        // Nếu đang sửa, cho phép giữ lại user hiện tại
                        if (isEdit && formData.user_id === u.id) {
                          return true;
                        }

                        return !daGan;
                      });
                      return filteredUsers.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.hoTen}
                        </option>
                      ));
                    })()}
                  </select>
                </div>

                {/* Các nút hành động */}
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    className="btn btn-primary px-6 text-center text-white bg-orange-500 hover:bg-orange-600 font-bold mt-4"
                    onClick={handleSubmit}
                  >
                    {isEdit ? "Cập nhật" : "Thêm"}
                  </button>

                  <button
                    className="btn btn-outline px-6 text-center text-red-600 font-bold mt-4 "
                    onClick={() => setShowForm(false)}
                  >
                    hủy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
