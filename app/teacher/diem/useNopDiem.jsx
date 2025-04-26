"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchMonHocsByGiangVien,
  fetchSinhViensByLop,
  submitDiem,
  fetchChucNangs,
  fetchPhanQuyenByLoaiTK,
} from "../../service/nopDiemService";

export const useNopDiem = () => {
  const [user, setUser] = useState(null);
  const [monHocs, setMonHocs] = useState([]);
  const [sinhViens, setSinhViens] = useState([]);
  const [permissions, setPermissions] = useState({
    Xem: false,
    Nop: false,
  });

  const router = useRouter();

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

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

    const loadData = async () => {
      if (parsedUser.LoaiTK_Code === "GV") {
        const res = await fetch(
          `http://guyqn123-001-site1.ptempurl.com/api/odata/GiangViens?$filter=user_id eq ${parsedUser.Id}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        const data = await res.json();
        if (data.value?.length > 0) {
          parsedUser.GiangVien = data.value[0];
          localStorage.setItem("user", JSON.stringify(parsedUser));
        }
      }

      setUser(parsedUser);
      const monHocData = await fetchMonHocsByGiangVien(parsedUser.GiangVien?.id);
      setMonHocs(monHocData);

      const quyenData = await new Promise((resolve) =>
        fetchPhanQuyenByLoaiTK(2, resolve)
      );
      const chucNangData = await new Promise((resolve) =>
        fetchChucNangs(resolve)
      );
      const chucNangNopDiem = chucNangData.find((c) => c.code === "QLDS");
      const quyenNopDiem = quyenData.find(
        (q) => q.IdChucNang === chucNangNopDiem?.id
      )
      setPermissions({
        Xem: quyenNopDiem?.Xem,
        Nop: quyenNopDiem?.Nop,
      });
    };

    loadData();
  }, []);

  const handleLopChange = async (lopId) => {
    const data = await fetchSinhViensByLop(lopId);
    setSinhViens(data);
  };

  const handleSubmit = async (dsDiem) => {
    let successCount = 0;
    let errorMessages = [];

    for (const d of dsDiem) {
      try {
        await submitDiem(d);
        successCount++;
      } catch (error) {
        const sv = sinhViens.find((s) => s.id === d.idSinhVien);
        const maSinhVien = sv?.maSinhVien || `ID ${d.idSinhVien}`;
        errorMessages.push(`mã sinh viên ${maSinhVien}: ${error.message}`);
      }
    }

    if (successCount > 0) {
      alert(`✅ Đã nộp điểm cho ${successCount} sinh viên.`);
    }

    if (errorMessages.length > 0) {
      alert(
        `⚠️ Một số sinh viên đã có điểm và không được ghi lại:\n\n${errorMessages.join(
          "\n"
        )}`
      );
    }
  };

  return {
    user,
    monHocs,
    sinhViens,
    permissions,
    handleLogout,
    handleLopChange,
    handleSubmit,
  };
};
