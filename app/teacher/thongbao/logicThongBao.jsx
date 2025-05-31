"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchAllMonHocs,
  fetchSinhViensByLop,
  getDiemTheoLopVaMon,
  xoaBangDiem,
  fetchGiangVienByUserId,
} from "../../service/duyetDiemService";
export default function useThongBaoLogic() {
  const [user, setUser] = useState(null);
  const [monHocs, setMonHocs] = useState([]);
  const [sinhViens, setSinhViens] = useState([]);
  const [diemList, setDiemList] = useState([]);
  const [selectedMonHoc, setSelectedMonHoc] = useState(null);
  const [loading, setLoading] = useState(true);
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
      try {
        setLoading(true);

       if (parsedUser.LoaiTK_Code === "GV") {
               const giangVien = await fetchGiangVienByUserId(parsedUser.Id);
               if (giangVien) {
                 parsedUser.GiangVien = giangVien;
                 localStorage.setItem("user", JSON.stringify(parsedUser));
               }
             }

        setUser(parsedUser);

        const monHocData = await fetchAllMonHocs();
        if (parsedUser.LoaiTk_Code === "GV") {
          const idGiangVien = parsedUser.GiangVien?.id;
          const monHocCuaGV = monHocData.filter((mh) => mh.idGiangVien === idGiangVien);
          setMonHocs(monHocCuaGV);
        } else {
          setMonHocs(monHocData);
        }
      } catch (error) {
        console.error("Lỗi khi load dữ liệu trang thông báo:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleMonHocChange = async (monHocId) => {
    const monHoc = monHocs.find((mh) => mh.id === monHocId);
    if (!monHoc) return;

    setSelectedMonHoc(monHoc);

    const lopId = monHoc?.idLopHoc;
    if (!lopId) return;

    try {
      const [sinhViens, diemList] = await Promise.all([
        fetchSinhViensByLop(lopId),
        getDiemTheoLopVaMon(lopId, monHocId),
      ]);

      const mergedData = sinhViens.map((sv) => {
        const diem = diemList.find((d) => d.idSinhVien === sv.id);
        return {
          ...sv,
          diemCC: diem?.diemCC ?? null,
          diemGK: diem?.diemGK ?? null,
          diemCK: diem?.diemCK ?? null,
          diem: diem?.diem ?? null,
          isDuyet: diem?.isDuyet ?? null,
        };
      });
      setSinhViens(mergedData);
      setDiemList(diemList);
    } catch (err) {
      console.error("Lỗi khi load điểm và sinh viên:", err);
    }
  };

  const handleNhapLai = async () => {
    if (!selectedMonHoc) return;

    const idLopHoc = selectedMonHoc?.idLopHoc;
    const idMonHoc = selectedMonHoc?.id;

    if (!idLopHoc || !idMonHoc) {
      console.error("Thiếu idLopHoc hoặc idMonHoc");
      return;
    }

    try {
      await xoaBangDiem(idLopHoc, idMonHoc);
      router.push("/teacher/diem");
    } catch (err) {
      console.error("Lỗi khi xóa bảng điểm:", err);
    }
  };

  return {
    user,
    handleLogout,
    monHocs,
    sinhViens,
    selectedMonHoc,
    loading,
    handleMonHocChange,
    handleNhapLai,
  };
}
