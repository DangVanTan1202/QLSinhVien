"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
export default function RoleUI({
  user,
  users,
  handleLogout,
  loaiTKList,
  selectedLoaiTK,
  setSelectedLoaiTK,
  chucNangs,
  phanQuyenList,
  onPermissionChange
}) {
  const [selectedChucNangToAdd, setSelectedChucNangToAdd] = useState("");

  const getQuyen = (chucNangId) =>
    phanQuyenList.find((pq) => pq.IdChucNang === chucNangId) || {};

  const permissions = [
    { label: "Thêm", key: "Them" },
    { label: "Sửa", key: "Sua" },
    { label: "Xóa", key: "Xoa" },
    { label: "Duyệt", key: "Duyet" },
    { label: "Xem", key: "Xem" },
    { label: "Từ chối", key: "TuChoi" },
    { label: "Nộp", key: "Nop" }
  ];

  const chucNangsDaPhanQuyen = phanQuyenList.map((pq) => pq.IdChucNang);
  const chucNangsChuaPhanQuyen = chucNangs.filter(
    (cn) => !chucNangsDaPhanQuyen.includes(cn.id)
  );

  const handleAddChucNang = () => {
    if (selectedChucNangToAdd) {
      onPermissionChange({
        chucNangId: parseInt(selectedChucNangToAdd),
        permission: "Xem", // Quyền mặc định khi thêm mới
        value: true,
      });
      setSelectedChucNangToAdd("");
    }
  };

  const handleRemoveChucNang = (chucNangId) => {
    onPermissionChange({
      chucNangId,
      permission: "DELETE_ALL",
      value: false
    });
  };
  return (
    <div className="flex min-h-screen bg-neutral-200 text-gray-800 font-sans">
    <Sidebar user={user} />
    <div className="flex-1 px-8 py-6">
      <Header user={user} onLogout={handleLogout} />
  
      <div className="mt-6">
        <h2 className="text-3xl font-semibold text-orange-600 mb-6">
          Phân quyền theo loại tài khoản
        </h2>
  
        <div className="mb-8">
          <label className="block text-base font-medium mb-2 text-gray-700">
            Chọn loại tài khoản:
          </label>
          <select
            className="p-3 border border-orange-300 rounded-md w-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            value={selectedLoaiTK}
            onChange={(e) => setSelectedLoaiTK(e.target.value)}
          >
            <option value="">-- Chọn loại tài khoản --</option>
            {loaiTKList.map((tk) => (
              <option key={tk.id} value={tk.id}>
                {tk.ten}
              </option>
            ))}
          </select>
        </div>
  
        {selectedLoaiTK && (
          <>
            <table className="w-full text-sm border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-pink-200 text-stone-700 rounded-md">
                  <th className="p-3 text-left">Chức năng</th>
                  {permissions.map((perm) => (
                    <th key={perm.key} className="p-3 text-center">{perm.label}</th>
                  ))}
                  <th className="p-3 text-center">Xoá chức năng</th>
                </tr>
              </thead>
              <tbody>
                {phanQuyenList.map((pq) => {
                  const chucNang = chucNangs.find((cn) => cn.id === pq.IdChucNang);
                  return (
                    <tr
                      key={pq.IdChucNang}
                      className="bg-white shadow-sm hover:shadow-md transition duration-150 rounded"
                    >
                      <td className="p-3">{chucNang?.name}</td>
                      {permissions.map((perm) => (
                        <td key={perm.key} className="p-3 text-center">
                          <input
                            type="checkbox"
                            checked={pq[perm.key] === true}
                            onChange={(e) =>
                              onPermissionChange({
                                chucNangId: pq.IdChucNang,
                                permission: perm.key,
                                value: e.target.checked,
                              })
                            }
                            className="w-5 h-5 accent-teal-300 cursor-pointer"
                          />
                        </td>
                      ))}
                      <td className="p-3 text-center">
                        <button
                          className="text-red-600 hover:underline transition"
                          onClick={() => handleRemoveChucNang(pq.IdChucNang)}
                        >
                          Xoá
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
  
            {chucNangsChuaPhanQuyen.length > 0 && (
              <div className="mt-8">
                <label className="block text-base font-semibold text-gray-700 mb-2">
                  Thêm chức năng mới:
                </label>
                <div className="flex gap-4 items-center">
                  <select
                    className="p-3 border border-orange-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-orange-400 transition"
                    value={selectedChucNangToAdd}
                    onChange={(e) => setSelectedChucNangToAdd(e.target.value)}
                  >
                    <option value="">-- Chọn chức năng --</option>
                    {chucNangsChuaPhanQuyen.map((cn) => (
                      <option key={cn.id} value={cn.id}>
                        {cn.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition font-medium"
                    onClick={handleAddChucNang}
                  >
                    Thêm
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </div>
  
  );
}
