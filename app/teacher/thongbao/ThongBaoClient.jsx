"use client";

import useThongBaoLogic from "./logicThongBao";
import ThongBaoUI from "./ui";

export default function ThongBaoClient() {
  const {
    user,
    handleLogout,
    monHocs,
    sinhViens,
    selectedMonHoc,
    loading,
    handleMonHocChange,
    handleNhapLai,
  } = useThongBaoLogic();

  if (loading) return <div className="p-4 text-center">Đang tải dữ liệu...</div>;

  return (
    <ThongBaoUI
      user={user}
      handleLogout={handleLogout}
      monHocs={monHocs}
      sinhViens={sinhViens}
      selectedMonHoc={selectedMonHoc}
      onMonHocChange={handleMonHocChange}
      onNhapLai={handleNhapLai}
    />
  );
}
