"use client";

import { useXemDiem } from "./useXemDiem";
import XemDiemUI from "./ui";

export default function XemDiemClient() {
  const {
    user,
    diemData,
    permissions,
    handleLogout,
    xepLoai,
  } = useXemDiem();
  return (
    <XemDiemUI
      user={user}
      handleLogout={handleLogout}
      data={diemData}
      xepLoai={xepLoai} 
      permissions={permissions}
    />
  );
}
