"use client";

import { useRoleLogic } from "./useRoleLogic";
import RoleUI from "./UI";

export default function RoleClient() {
  const {
    user,
    users,
    loaiTKList,
    selectedLoaiTK,
    setSelectedLoaiTK,
    chucNangs,
    phanQuyenList,
    handlePermissionChange,
    handleLogout,
  } = useRoleLogic();

  return (
    <RoleUI
      user={user}
      users={users}
      loaiTKList={loaiTKList}
      selectedLoaiTK={selectedLoaiTK}
      setSelectedLoaiTK={setSelectedLoaiTK}
      chucNangs={chucNangs}
      phanQuyenList={phanQuyenList}
      onPermissionChange={handlePermissionChange}
      handleLogout={handleLogout}
    />
  );
}
