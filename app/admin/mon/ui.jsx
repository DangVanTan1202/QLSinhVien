"use client";

import { useState } from "react";
import { PlusCircle, Trash2, Pencil, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  addMonHoc,
  updateMonHoc,
} from "../../service/monHocService";

export default function MonHocUI({
  user,
  handleLogout,
  data,
  giangViens,
  lopHocs,
  permissions,
  onDelete,
  onSubmitSuccess,
}) {
  const [formData, setFormData] = useState({
    id: null,
    maMonHoc: "",
    tenMonHoc: "",
    idGiangVien: "",
    LopHoc_Id: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    const numericFields = ["idGiangVien", "LopHoc_Id"];
    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    if (isEdit) {
      await updateMonHoc(formData.id, formData);
    } else {
      await addMonHoc(formData);
    }
    setFormData({
      id: null,
      maMonHoc: "",
      tenMonHoc: "",
      idGiangVien: "",
      LopHoc_Id: "",
    });
    setIsEdit(false);
    setShowForm(false);
    onSubmitSuccess();
  };

  const filteredData = data.filter((mh) => {
    return (
      mh.maMonHoc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mh.tenMonHoc?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-yellow-50 via-pink-100 to-purple-100 text-gray-900 font-sans">
      <Sidebar user={user} />
      <div className="flex-1 px-8 py-6">
        <Header user={user} onLogout={handleLogout} />
        <h2 className="text-4xl font-bold text-orange-600 mb-8">Quản lý môn học</h2>

        <div className="p-6 space-y-6 bg-white rounded-xl shadow-lg border border-purple-200">
          {/* Tìm kiếm + Thêm */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm môn học..."
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
                    maMonHoc: "",
                    tenMonHoc: "",
                    idGiangVien: "",
                    LopHoc_Id: "",
                  });
                }}
              >
                <PlusCircle size={18} /> thêm môn học
              </button>
            )}
          </div>

          {/* Bảng dữ liệu */}
          {permissions.Xem ? (
            <div className="overflow-auto">
              <table className="w-full bg-white shadow rounded overflow-hidden">
                <thead className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white">
                  <tr className="bg-orange-100 text-red-700">
                    <th className="p-3 text-left">Mã MH</th>
                    <th className="p-3 text-left">Tên môn học</th>
                    <th className="p-3 text-left">Giảng viên</th>
                    <th className="p-3 text-left">Lớp học</th>
                    {(permissions.Sua || permissions.Xoa) && (
                      <th className="p-3 text-left">Thao tác</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((mh) => {
                    const gv = giangViens.find((g) => g.id === mh.idGiangVien);
                    const lh = lopHocs.find((l) => l.id === mh.LopHoc_Id);
                    return (
                      <tr key={mh.id} className="hover:bg-green-100 transition">
                        <td className="p-3">{mh.maMonHoc}</td>
                        <td className="p-3">{mh.tenMonHoc}</td>
                        <td className="p-3">{gv?.maGiangVien || "N/A"}</td>
                        <td className="p-3">{lh?.TenLop || "N/A"}</td>
                        {(permissions.Sua || permissions.Xoa) && (
                          <td className="space-x-2">
                            {permissions.Sua && (
                              <button
                                className="p-3 text-blue-600"
                                onClick={() => {
                                  setIsEdit(true);
                                  setShowForm(true);
                                  setFormData({
                                    id: mh.id,
                                    maMonHoc: mh.maMonHoc,
                                    tenMonHoc: mh.tenMonHoc,
                                    idGiangVien: mh.idGiangVien,
                                    LopHoc_Id: mh.LopHoc_Id,
                                  });
                                }}
                              >
                                <Pencil size={18} /> sửa
                              </button>
                            )}
                            {permissions.Xoa && (
                              <button
                                className="p-3 text-red-600"
                                onClick={() => onDelete(mh.id)}
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
                  {isEdit ? "Sửa" : "Thêm"} môn học
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="maMonHoc"
                    placeholder="Mã môn học"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={formData.maMonHoc}
                    onChange={handleInput}
                  />
                  <input
                    type="text"
                    name="tenMonHoc"
                    placeholder="Tên môn học"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={formData.tenMonHoc}
                    onChange={handleInput}
                  />
                  <select
                    name="idGiangVien"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={formData.idGiangVien}
                    onChange={handleInput}
                  >
                    <option value="">-- Chọn giảng viên --</option>
                    {giangViens.map((gv) => (
                      <option key={gv.id} value={gv.id}>
                        {gv.maGiangVien}
                      </option>
                    ))}
                  </select>
                  <select
                    name="LopHoc_Id"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={formData.LopHoc_Id}
                    onChange={handleInput}
                  >
                    <option value="">-- Chọn lớp học --</option>
                    {lopHocs.map((lh) => (
                      <option key={lh.id} value={lh.id}>
                        {lh.TenLop}
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
