import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  fetchMonHocsClient,
  fetchGiangViens,
  fetchLopHocs,
  fetchPhanQuyenByLoaiTK,
  fetchChucNangs,
  deleteMonHoc,
} from "../../service/monHocService";

export function useMonHocLogic() {
  const [user, setUser] = useState(null);
  const [monHocs, setMonHocs] = useState([]);
  const [giangViens, setGiangViens] = useState([]);
  const [lopHocs, setLopHocs] = useState([]);
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
      await fetchMonHocsClient(setMonHocs);
      await fetchGiangViens(setGiangViens);
      await fetchLopHocs(setLopHocs);

      const quyenData = await new Promise((resolve) => {
        fetchPhanQuyenByLoaiTK(1, resolve); // 1 là loại tài khoản admin
      });

      const chucNangsData = await new Promise((resolve) => {
        fetchChucNangs(resolve);
      });

      const QLMonHocId = chucNangsData.find((c) => c.code === "QLMH")?.id;
      const quyenQLMonHoc = quyenData.find((q) => q.IdChucNang === QLMonHocId) || {};

      setPermissions({
        Them: quyenQLMonHoc?.Them,
        Sua: quyenQLMonHoc?.Sua,
        Xoa: quyenQLMonHoc?.Xoa,
        Xem: quyenQLMonHoc?.Xem,
      });
    };

    loadData();
  }, []);

  const handleDelete = async (id) => {
    await deleteMonHoc(id);
    setMonHocs((prev) => prev.filter((mh) => mh.id !== id));
  };

  return {
    user,
    monHocs,
    giangViens,
    lopHocs,
    permissions,
    handleLogout: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    },
    handleDelete,
    onSubmitSuccess: async () => {
      await fetchMonHocsClient(setMonHocs);
    },
  };
}
