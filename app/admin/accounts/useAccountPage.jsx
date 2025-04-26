import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchUsersClient,
  fetchLoaiTaiKhoans,
  fetchPhanQuyenByLoaiTK,
  fetchChucNangs,
  deleteUser,
} from "../../service/accountService";

export function useAccountPage() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loaiTaiKhoans, setLoaiTaiKhoans] = useState([]);
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
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchUsersClient(setUsers);
      await fetchLoaiTaiKhoans(setLoaiTaiKhoans);

      const quyenData = await new Promise((resolve) => {
        fetchPhanQuyenByLoaiTK(1, resolve);
      });

      const chucNangsData = await new Promise((resolve) => {
        fetchChucNangs(resolve);
      });

      const QLTaiKhoanId = chucNangsData.find((c) => c.code === "QLTK")?.id;
      const quyenQLTaiKhoan = quyenData.find((q) => q.IdChucNang === QLTaiKhoanId) || {};

      setPermissions({
        Them: quyenQLTaiKhoan?.Them,
        Sua: quyenQLTaiKhoan?.Sua,
        Xoa: quyenQLTaiKhoan?.Xoa,
        Xem: quyenQLTaiKhoan?.Xem,
      });
    };

    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleSubmitSuccess = async () => {
    await fetchUsersClient(setUsers);
  };

  return {
    user,
    users,
    loaiTaiKhoans,
    permissions,
    handleLogout,
    handleDelete,
    handleSubmitSuccess,
  };
}
