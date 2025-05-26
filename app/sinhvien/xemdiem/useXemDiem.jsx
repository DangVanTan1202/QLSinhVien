"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  fetchDiemBySinhVienId,
  fetchPhanQuyenByLoaiTK,
  fetchChucNangs,
  fetchSinhVienByUserId,
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
          function convertDiemHe10(diem10) {
            if (diem10 === null || isNaN(diem10)) return { diem4: "N/A", diemChu: "N/A", ketQua: "Không đạt" };
            let diem4 = 0;
            let diemChu = "F";
            let ketQua = "Không đạt";
            if (diem10 >= 8.5) {
              diem4 = 4.0;
              diemChu = "A";
              ketQua = "Đạt";
            } else if (diem10 >= 7.0) {
              diem4 = 3.0;
              diemChu = "B";
              ketQua = "Đạt";
            } else if (diem10 >= 5.5) {
              diem4 = 2.0;
              diemChu = "C";
              ketQua = "Đạt";
            } else if (diem10 >= 4.0) {
              diem4 = 1.0;
              diemChu = "D";
              ketQua = "Đạt";
            } else {
              diem4 = 0;
              diemChu = "F";
              ketQua = "Không đạt";
            }
            return {
              diem4,
              diemChu,
              ketQua,
            };
          }          
          const mappedData = await Promise.all(
            rawData.map(async (item) => {
              const diemCC = item.diemCC ?? null;
              const diemGK = item.diemGK ?? null;
              const diemCK = item.diemCK ?? null;
              const diem = item.diem ?? null;
          
              const { diem4, diemChu, ketQua } = convertDiemHe10(diem);
          
              return {
                maMonHoc: item.MonHoc?.maMonHoc || "N/A",
                tenMonHoc: item.MonHoc?.tenMonHoc || "N/A",
                diemCC: diemCC ?? "Chưa có",
                diemGK: diemGK ?? "Chưa có",
                diemCK: diemCK ?? "Chưa có",
                diem: diem ?? "Chưa có",
                diemHe4: diem4,
                diemChu,
                ketQua,
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
