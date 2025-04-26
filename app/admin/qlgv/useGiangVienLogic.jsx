import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  fetchGiangViensClient,
  fetchUsers,
  fetchPhanQuyenByLoaiTK,
  fetchChucNangs,
  deleteGiangVien,
} from "../../service/giangVienService";

export function useGiangVienLogic() {
  const [user, setUser] = useState(null);
  const [giangViens, setGiangViens] = useState([]);
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState({
    Them: false,
    Sua: false,
    Xoa: false,
    Xem: false,
  });
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.LoaiTK_Name !== "Admin") {
      router.push("/login");
      return;
    }
    setUser(parsedUser);
  }, [router]);

  useEffect(() => {
    const loadData = async () => {
      await fetchGiangViensClient(setGiangViens);
      await fetchUsers(setUsers);
      const quyenData = await new Promise((resolve) => {
        fetchPhanQuyenByLoaiTK(1, resolve); // 1 là loại tài khoản admin
      });

      const chucNangsData = await new Promise((resolve) => {
        fetchChucNangs(resolve);
      });

      const QLGVId = chucNangsData.find((c) => c.code === "QLGV")?.id;
      const quyenQLGV = quyenData.find((q) => q.IdChucNang === QLGVId) || {};

      setPermissions({
        Them: quyenQLGV?.Them,
        Sua: quyenQLGV?.Sua,
        Xoa: quyenQLGV?.Xoa,
        Xem: quyenQLGV?.Xem,
      });
    };

    loadData();
  }, []);

  const handleDelete = async (id) => {
    await deleteGiangVien(id);
    setGiangViens((prev) => prev.filter((gv) => gv.id !== id));
  };

  return {
    user,
    giangViens,
    users,
    permissions,
    handleLogout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    },
    handleDelete,
    onSubmitSuccess: async () => {
      await fetchGiangViensClient(setGiangViens);
    },
  };
}
