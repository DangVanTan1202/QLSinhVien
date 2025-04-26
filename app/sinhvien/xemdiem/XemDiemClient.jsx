"use client";

import { useXemDiem } from "./useXemDiem";
import XemDiemUI from "./ui";

export default function XemDiemClient() {
  const {
    user,
    diemData,
    permissions,
    handleLogout,
  } = useXemDiem();

  return (
    <XemDiemUI
      user={user}
      handleLogout={handleLogout}
      data={diemData}
      permissions={permissions}
    />
  );
}
