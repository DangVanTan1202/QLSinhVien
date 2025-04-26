"use client";

import { useDuyetDiemPage } from "./useDuyetDiemPage";
import DuyetDiemUI from "./ui";

export default function DuyetDiemClient() {
  const {
    user,
    monHocs,
    sinhViens,
    diemList,
    selectedMonHoc,
    permissions,
    handleLogout,
    handleMonHocChange,
    handleDuyet,
    handleTuChoi,
  } = useDuyetDiemPage();

  return (
    <DuyetDiemUI
      user={user}
      handleLogout={handleLogout}
      monHocs={monHocs}
      diemList={diemList}
      sinhViens={sinhViens}
      selectedMonHoc={selectedMonHoc}
      onMonHocChange={handleMonHocChange}
      permissions={permissions}
      onDuyet={handleDuyet}
      onTuChoi={handleTuChoi}
    />
  );
}
