"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchMonHocsByGiangVien,
  fetchSinhViensByLop,
  submitDiem,
  fetchChucNangs,
  fetchPhanQuyenByLoaiTK,
  fetchGiangVienByUserId,
} from "../../service/nopDiemService";

export const useNopDiem = () => {
  const [user, setUser] = useState(null);
  const [monHocs, setMonHocs] = useState([]);
  const [sinhViens, setSinhViens] = useState([]);
  const [heSo, setHeSo] = useState("6-4");
  const [permissions, setPermissions] = useState({
    Xem: false,
    Nop: false,
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

    const loadData = async () => {
      if (parsedUser.LoaiTK_Code === "GV") {
        const giangVien = await fetchGiangVienByUserId(parsedUser.Id);
        if (giangVien) {
          parsedUser.GiangVien = giangVien;
          localStorage.setItem("user", JSON.stringify(parsedUser));
        }
      }
      setUser(parsedUser);
      const monHocData = await fetchMonHocsByGiangVien(
        parsedUser.GiangVien?.id
      );
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
      );
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

  const tinhDiemTrungBinh = (diemCC, diemGK, diemCK) => {
    const cc = parseFloat(diemCC) || 0;
    const gk = parseFloat(diemGK) || 0;
    const ck = parseFloat(diemCK) || 0;

    switch (heSo) {
      case "6-4":
        return +(cc * 0.1 + gk * 0.3 + ck * 0.6).toFixed(2);
      case "7-3":
        return +(cc * 0.2 + gk * 0.5 + ck * 0.3).toFixed(2);
      case "5-5":
        return +(cc * 0.2 + gk * 0.3 + ck * 0.5).toFixed(2);
      default:
        return +(cc * 0.1 + gk * 0.3 + ck * 0.6).toFixed(2);
    }
  };

  const handleSubmit = async (dsDiem) => {
    let successCount = 0;
    let errorMessages = [];

    for (const d of dsDiem) {
      const diemCC = parseFloat(d.diemCC) || 0;
      const diemGK = parseFloat(d.diemGK) || 0;
      const diemCK = parseFloat(d.diemCK) || 0;
      const diem = tinhDiemTrungBinh(diemCC, diemGK, diemCK);

      try {
        await submitDiem({
          ...d,
          diemCC,
          diemGK,
          diemCK,
          diem,
        });
        successCount++;
      } catch (error) {
        const sv = sinhViens.find((s) => s.id === d.idSinhVien);
        const maSinhVien = sv?.maSinhVien || `ID ${d.idSinhVien}`;
        errorMessages.push(`mã sinh viên ${maSinhVien}: ${error.message}`);
      }
    }

    if (successCount > 0) {
      alert(`Đã nộp điểm cho ${successCount} sinh viên.`);
    }

    if (errorMessages.length > 0) {
      alert(
        `Một số sinh viên đã có điểm và không được ghi lại:\n\n${errorMessages.join(
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
    heSo,
    setHeSo,
  };
};
