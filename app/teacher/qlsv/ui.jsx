"use client";

import { useState } from "react";
import { PlusCircle, Trash2, Pencil, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { addSinhVien, updateSinhVien } from "../../service/sinhVienService";

export default function SinhVienUI({
  user,
  handleLogout,
  data,
  users,
  lopHocs,
  permissions,
  onDelete,
  onSubmitSuccess,
}) {
  const [formData, setFormData] = useState({
    id: null,
    maSinhVien: "",
    ngaySinh: "",
    user_id: "",
    idLopHoc: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["user_id", "idLopHoc"];
    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (isEdit) {
      await updateSinhVien(formData.id, formData);
    } else {
      // Khi thêm mới thì loại bỏ trường id
      const { id, ...dataToAdd } = formData;
      await addSinhVien(dataToAdd);
    }

    setFormData({
      id: null,
      maSinhVien: "",
      ngaySinh: "",
      user_id: "",
      idLopHoc: "",
    });
    setIsEdit(false);
    setShowForm(false);
    onSubmitSuccess();
  };

  const filteredData = data.filter((sv) => {
    const userMatched =
      users.find((u) => u.id === sv.user_id)?.hoTen?.toLowerCase() || "";
    return (
      sv.maSinhVien?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userMatched.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 font-sans">
      <Sidebar user={user} />
      <div className="flex-1 px-8 py-6">
        <Header user={user} onLogout={handleLogout} />
        <h2 className="text-4xl font-bold text-orange-600 mb-8">
          Quản lý sinh viên
        </h2>

        <div className="p-6 space-y-6 bg-neutral-200 rounded-xl shadow-lg border border-purple-200">
          {/* Tìm kiếm + Thêm */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm sinh viên..."
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
                    maSinhVien: "",
                    ngaySinh: "",
                    user_id: "",
                    idLopHoc: "",
                  });
                }}
              >
                <PlusCircle size={18} /> cập nhật thông tin sinh viên
              </button>
            )}
          </div>

          {/* Bảng dữ liệu */}
          {permissions.Xem ? (
            <div className="overflow-auto">
              <table className="w-full bg-white shadow rounded overflow-hidden">
                <thead className="bg-neutral-200">
                  <tr className="bg-pink-200 text-stone-700">
                    <th className="p-3 text-left">Mã SV</th>
                    <th className="p-3 text-left">Họ tên</th>
                    <th className="p-3 text-left">Ngày sinh</th>
                    <th className="p-3 text-left">Lớp</th>
                    {(permissions.Sua || permissions.Xoa) && (
                      <th className="p-3 text-left">Thao tác</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((sv) => {
                    const u = users.find((u) => u.id === sv.user_id);
                    const l = lopHocs.find((lh) => lh.id === sv.idLopHoc);
                    return (
                      <tr key={sv.id} className="hover:bg-green-100 transition">
                        <td className="p-3">{sv.maSinhVien}</td>
                        <td className="p-3">{u?.hoTen}</td>
                        <td className="p-3">
                          {new Date(sv.ngaySinh).toLocaleDateString()}
                        </td>
                        <td className="p-3">{l?.tenLop}</td>
                        {(permissions.Sua || permissions.Xoa) && (
                          <td className="space-x-2">
                            {permissions.Sua && (
                              <button
                                className="p-3 text-blue-600"
                                onClick={() => {
                                  setIsEdit(true);
                                  setShowForm(true);
                                  setFormData({
                                    id: sv.id,
                                    maSinhVien: sv.maSinhVien,
                                    ngaySinh: sv.ngaySinh,
                                    user_id: sv.user_id,
                                    idLopHoc: sv.idLopHoc,
                                  });
                                }}
                              >
                                <Pencil size={18} /> sửa
                              </button>
                            )}
                            {permissions.Xoa && (
                              <button
                                className="p-3 text-red-600"
                                onClick={() => onDelete(sv.id)}
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

          {/* Form thêm/sửa */}
          {(permissions.Them || permissions.Sua) && showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl animate-fade-in">
                <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">
                  {isEdit ? "Sửa" : "Thêm"} sinh viên
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="maSinhVien"
                    placeholder="Mã sinh viên"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={formData.maSinhVien}
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
                    <option value="">-- Chọn tài khoản sinh viên --</option>
                    {users
                      .filter((u) => {
                        console.log(" Kiểm tra user:", u);

                        if (u.LoaiTk_Id !== 3) {
                          console.log(
                            " Bỏ qua vì không phải loại tài khoản sinh viên:",
                            u
                          );
                          return false;
                        }

                        const daGan = data.some((sv) => {
                          const match =
                            sv.user_id === u.id &&
                            sv.maSinhVien?.trim() !== "" &&
                            sv.ngaySinh &&
                            sv.idLopHoc;
                          if (match) {
                            console.log(
                              ` Đã gán tài khoản user_id=${u.id} cho sinh viên:`,
                              sv
                            );
                          }
                          return match;
                        });

                        if (isEdit && formData.user_id === u.id) {
                          console.log(
                            " Đang edit chính tài khoản này, cho phép:",
                            u
                          );
                          return true;
                        }

                        if (daGan) {
                          console.log(
                            "Tài khoản đã gán sinh viên, bỏ qua:",
                            u
                          );
                          return false;
                        } else {
                          console.log("Tài khoản hợp lệ, cho phép chọn:", u);
                          return true;
                        }
                      })
                      .map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.hoTen}
                        </option>
                      ))}
                  </select>

                  <select
                    name="idLopHoc"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={formData.idLopHoc}
                    onChange={handleInput}
                  >
                    <option value="">-- Chọn lớp học --</option>
                    {lopHocs.map((lh) => (
                      <option key={lh.id} value={lh.id}>
                        {lh.tenLop}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    className="btn btn-primary px-6 text-center text-red-600 font-bold mt-4"
                    onClick={handleSubmit}
                  >
                    {isEdit ? "Cập nhật" : "Thêm"}
                  </button>
                  <button
                    className="btn btn-outline px-6 text-center text-red-600 font-bold mt-4"
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
