"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  fetchDiemBySinhVienId,
  fetchPhanQuyenByLoaiTK,
  fetchChucNangs,
  fetchSinhVienByUserId,
  fetchUserById,
} from "../../service/xemDiem";
export function useXemDiem() {
  const [user, setUser] = useState(null);
  const [diemData, setDiemData] = useState([]);
  const [permissions, setPermissions] = useState({ Xem: false });
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
    if (!["SV", "Admin"].includes(parsedUser.LoaiTK_Code)) {
      router.push("/login");
      return;
    }

    setUser(parsedUser);

    const loadPermissionsAndData = async () => {
      try {
        const quyenData = await new Promise((resolve) => {
          fetchPhanQuyenByLoaiTK(parsedUser?.LoaiTK_Id, resolve);
        });
        const chucNangsData = await new Promise((resolve) => {
          fetchChucNangs(resolve);
        });

        const XDId = chucNangsData.find((c) => c.code === "XD")?.id;
        const quyenXemDiem = quyenData.find((q) => q.IdChucNang === XDId) || {};
        const hasXem = quyenXemDiem?.Xem;

        setPermissions({ Xem: hasXem });

        if (hasXem) {
          const userId = parsedUser?.id || parsedUser?.user_id || parsedUser?.Id;
          if (!userId) throw new Error("Không tìm thấy ID người dùng hợp lệ.");

          const sinhVien = await fetchSinhVienByUserId(userId);
          const rawData = await fetchDiemBySinhVienId(sinhVien.id);

          const mappedData = await Promise.all(
            rawData.map(async (item) => {
              let tenGiangVien = "N/A";
              const giangVienUserId = item.GiangVien?.user_id;
              if (giangVienUserId) {
                try {
                  const userGV = await fetchUserById(giangVienUserId);
                  tenGiangVien = userGV?.hoTen || "N/A";
                } catch (error) {
                  console.error("Lỗi khi lấy thông tin giảng viên:", error);
                }
              }
              return {
                maMonHoc: item.MonHoc?.maMonHoc || "N/A",
                tenMonHoc: item.MonHoc?.tenMonHoc || "N/A",
                tenGiangVien,
                diem: item.diem ?? "Chưa có",
              };
            })
          );

          setDiemData(mappedData);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu điểm:", error);
      }
    };

    loadPermissionsAndData();
  }, []);

  return {
    user,
    diemData,
    permissions,
    handleLogout,
  };
}
