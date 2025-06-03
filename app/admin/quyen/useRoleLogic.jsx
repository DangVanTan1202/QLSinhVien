"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  fetchUsers,
  fetchLoaiTK,
  fetchChucNangs,
  fetchPhanQuyenLoaiTK,
  updatePhanQuyen,
  deletePhanQuyen,
} from "../../service/quyenService";

export function useRoleLogic() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loaiTKList, setLoaiTKList] = useState([]);
  const [selectedLoaiTK, setSelectedLoaiTK] = useState("");// ID loại TK được chọn
  const [chucNangs, setChucNangs] = useState([]);
  const [phanQuyenList, setPhanQuyenList] = useState([]);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.LoaiTK_Name !== "Admin") {
        router.push("/login");
        return;
      }
      setUser(parsedUser);
      const token = localStorage.getItem("token");
      fetchUsers(token, setUsers);
    } catch (error) {
      console.error("Lỗi đọc dữ liệu user:", error);
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);
  useEffect(() => {
    fetchLoaiTK(setLoaiTKList);
    fetchChucNangs(setChucNangs);
  }, []);

  useEffect(() => {
    if (selectedLoaiTK) { 
      fetchPhanQuyenLoaiTK(selectedLoaiTK, setPhanQuyenList);
    } else {
      setPhanQuyenList([]);// chọn loại tài khoản nào, thì phanQuyenList sẽ được đặt lại thành [] (rỗng).
    }
  }, [selectedLoaiTK]);

  const handlePermissionChange = async ({ chucNangId, permission, value }) => {//nhận đầu vào từ ui
    const loaiTKId = parseInt(selectedLoaiTK);
    const existing = phanQuyenList.find( // Tìm trong danh sách phân quyền (phanQuyenList) xem đã có quyền cho chức năng đó và loại tài khoản đó chưa.
      (pq) => pq.IdChucNang === chucNangId && pq.IdLoaiTK === loaiTKId
    );

    if (permission === "DELETE_ALL" && existing?.Id) {
      await deletePhanQuyen(existing.Id);
    } else {
      const updatedQuyen = {
        Id: existing?.Id,//// nếu tồn tại thì là update, không thì là thêm mới
        IdChucNang: chucNangId,
        IdLoaiTK: loaiTKId,
        Them: existing?.Them ?? false,
        //Các giá trị được gán từ existing nếu có (đã từng phân quyền), nếu không thì mặc định là false.
        Sua: existing?.Sua ?? false,
        Xoa: existing?.Xoa ?? false,
        Duyet: existing?.Duyet ?? false,
        Xem: existing?.Xem ?? false,
        TuChoi: existing?.TuChoi ?? false,
        Nop: existing?.Nop ?? false,
      };
      updatedQuyen[permission] = value;//Gán quyền đang được thay đổi (permission) sang true hoặc false tùy theo người dùng vừa click checkbox nào.

      await updatePhanQuyen(updatedQuyen);
    }

    fetchPhanQuyenLoaiTK(loaiTKId, setPhanQuyenList);
  };

  return {
    user,
    users,
    loaiTKList,
    selectedLoaiTK,
    setSelectedLoaiTK,
    chucNangs,
    phanQuyenList,
    handlePermissionChange,
    handleLogout,
  };
}
