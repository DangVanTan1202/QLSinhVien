"use client";

import { useState } from "react";
import { PlusCircle, Trash2, Pencil, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { addUser, updateUser } from "../../service/accountService";

export default function AccountUI({
  user,
  handleLogout,
  data,
  loaiTaiKhoans,
  permissions,
  onDelete,
  onSubmitSuccess,
}) {
  const [formData, setFormData] = useState({
    id: "",
    tenTaiKhoan: "",
    hoTen: "",
    matKhau: "",
    LoaiTK_Id: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");  

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "LoaiTK_Id" ? Number(value) : value,
    }));
  };
  const handleSubmit = async () => {
    if (isEdit) {
      await updateUser(formData.id, formData);
    } else {
      await addUser(formData);
    }
    setFormData({ id: null, tenTaiKhoan: "", hoTen: "", matKhau: "", LoaiTK_Id: "" });
    setIsEdit(false);
    setShowForm(false);
    onSubmitSuccess();
  };
  const filteredData = (data || []).filter(
    (tk) =>
      tk.tenTaiKhoan.toLowerCase().includes(searchTerm.toLowerCase())
  );
  //  Lọc loại tài khoản để dùng trong select
  const filteredLoaiTaiKhoans = loaiTaiKhoans.filter((l) => l.ten !== "Admin");
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 font-sans">
      <Sidebar user={user} />
      <div className="flex-1 px-8 py-6">
        <Header user={user} onLogout={handleLogout} />
        <h2 className="text-4xl font-bold text-orange-600 mb-8">Quản lý tài khoản</h2>

        <div className="p-6 space-y-6 bg-white rounded-xl shadow-lg border border-purple-200">
          {/* Search + Add */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm tài khoản..."
              className="input input-bordered w-full max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {permissions.Them && (
              <button
                className="ml-4 px-4 py-2 bg-orange-500 text-white rounded-full flex items-center gap-2"
                onClick={() => {
                  setIsEdit(false);
                  setShowForm(true);
                  setFormData({ id: null, tenTaiKhoan: "", hoTen: "", matKhau: "", LoaiTK_Id: "" });
                }}
              >
                <PlusCircle size={18} /> Thêm tài khoản
              </button>
            )}
          </div>

          {/* Data Table */}
          {permissions.Xem ? (
            <div className="overflow-auto">
              <table className="w-full bg-white shadow rounded">
                <thead className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white">
                  <tr>
                    <th className="p-3 text-left">Tên đăng nhập</th>
                    <th className="p-3 text-left">Họ tên</th>
                    <th className="p-3 text-left">Loại tài khoản</th>
                    {(permissions.Sua || permissions.Xoa) && (
                      <th className="p-3 text-left">Thao tác</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((tk) => {
                    const loai = loaiTaiKhoans.find((l) => l.id === tk.LoaiTk_Id);                    
                    return (
                      <tr key={tk.id} className="hover:bg-green-100">
                        <td className="p-3">{tk.tenTaiKhoan}</td>
                        <td className="p-3">{tk.hoTen}</td>
                        <td className="p-3">{loai?.ten || "không tìm thấy"}</td>
                        {(permissions.Sua || permissions.Xoa) && (
                          <td className="space-x-2 p-3">
                            {permissions.Sua && (
                              <button
                                className="text-blue-600"
                                onClick={() => {
                                  setIsEdit(true);
                                  setShowForm(true);
                                  setFormData({ ...tk });
                                }}
                              >
                                <Pencil size={18} /> Sửa
                              </button>
                            )}
                            {permissions.Xoa && (
                              <button
                                className="text-red-600"
                                onClick={() => onDelete(tk.id)}
                              >
                                <Trash2 size={18} /> Xóa
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

          {/* Add/Edit Form */}
          {(permissions.Them || permissions.Sua) && showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-white rounded-2xl p-8 w-full max-w-xl">
                <h2 className="text-2xl font-semibold text-orange-600 mb-6">
                  {isEdit ? "Sửa" : "Thêm"} tài khoản
                </h2>
                <div className="space-y-4">
                  <input
                    name="tenTaiKhoan"
                    placeholder="Tên đăng nhập"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.tenTaiKhoan}
                    onChange={handleInput}
                  />
                  <input
                    name="hoTen"
                    placeholder="Họ tên"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.hoTen}
                    onChange={handleInput}
                  />
                  <input
                    name="matKhau"
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.matKhau}
                    onChange={handleInput}
                  />
                  <select
                    name="LoaiTK_Id"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.LoaiTK_Id}
                    onChange={handleInput}
                  >
                    <option value="">-- Chọn loại tài khoản --</option>
                    {filteredLoaiTaiKhoans.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.ten}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="px-6 py-2 bg-orange-500 text-white rounded"
                    onClick={handleSubmit}
                  >
                    {isEdit ? "Cập nhật" : "Thêm"}
                  </button>
                  <button
                    className="px-6 py-2 border rounded"
                    onClick={() => setShowForm(false)}
                  >
                    Hủy
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
