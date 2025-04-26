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
  const [selectedLoaiTK, setSelectedLoaiTK] = useState("");
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
      setPhanQuyenList([]);
    }
  }, [selectedLoaiTK]);

  const handlePermissionChange = async ({ chucNangId, permission, value }) => {
    const loaiTKId = parseInt(selectedLoaiTK);
    const existing = phanQuyenList.find(
      (pq) => pq.IdChucNang === chucNangId && pq.IdLoaiTK === loaiTKId
    );

    if (permission === "DELETE_ALL" && existing?.Id) {
      await deletePhanQuyen(existing.Id);
    } else {
      const updatedQuyen = {
        Id: existing?.Id,
        IdChucNang: chucNangId,
        IdLoaiTK: loaiTKId,
        Them: existing?.Them ?? false,
        Sua: existing?.Sua ?? false,
        Xoa: existing?.Xoa ?? false,
        Duyet: existing?.Duyet ?? false,
        Xem: existing?.Xem ?? false,
        TuChoi: existing?.TuChoi ?? false,
        Nop: existing?.Nop ?? false,
      };
      updatedQuyen[permission] = value;

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
