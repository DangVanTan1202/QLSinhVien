"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchSinhViensClient,
  fetchUsers,
  fetchLopHocs,
  fetchPhanQuyenByLoaiTK,
  fetchChucNangs,
  deleteSinhVien,
} from "../../service/sinhVienService";

export default function useSinhVienLogic() {
  const [user, setUser] = useState(null);
  const [sinhViens, setSinhViens] = useState([]);
  const [users, setUsers] = useState([]);
  const [lopHocs, setLopHocs] = useState([]);
  const [permissions, setPermissions] = useState({
    Them: false,
    Sua: false,
    Xoa: false,
    Xem: false,
  });
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (!["GV", "Admin"].includes(parsedUser.LoaiTK_Code)) {
      router.push("/login");
      return;
    }

    setUser(parsedUser);
  }, [router]);

  useEffect(() => {
    const loadData = async () => {
      await fetchSinhViensClient(setSinhViens);
      await fetchUsers(setUsers);
      await fetchLopHocs(setLopHocs);

      const quyenData = await new Promise((resolve) => {
        fetchPhanQuyenByLoaiTK(1, resolve); //  ID loại tài khoản Admin
      });

      const chucNangsData = await new Promise((resolve) => {
        fetchChucNangs(resolve);
      });

      const QLSVId = chucNangsData.find((c) => c.code === "QLSV")?.id;
      const quyenQLSV = quyenData.find((q) => q.IdChucNang === QLSVId) || {};

      setPermissions({
        Them: quyenQLSV?.Them ?? false,
        Sua: quyenQLSV?.Sua ?? false,
        Xoa: quyenQLSV?.Xoa ?? false,
        Xem: quyenQLSV?.Xem ?? false,
      });
    };

    loadData();
  }, []);

  const handleDelete = async (id) => {
    await deleteSinhVien(id);
    setSinhViens((prev) => prev.filter((sv) => sv.id !== id));
  };

  const reloadSinhViens = async () => {
    await fetchSinhViensClient(setSinhViens);
  };

  return {
    user,
    handleLogout,
    sinhViens,
    users,
    lopHocs,
    permissions,
    handleDelete,
    reloadSinhViens,
  };
}
