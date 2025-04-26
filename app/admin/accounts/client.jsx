"use client";

import { useAccountPage } from "./useAccountPage";
import AccountUI from "./UI";

export default function Client() {
  const {
    user,
    users,
    loaiTaiKhoans,
    permissions,
    handleLogout,
    handleDelete,
    handleSubmitSuccess,
  } = useAccountPage();

  return (
    <AccountUI
      user={user}
      handleLogout={handleLogout}
      data={users}
      loaiTaiKhoans={loaiTaiKhoans}
      permissions={permissions}
      onDelete={handleDelete}
      onSubmitSuccess={handleSubmitSuccess}
    />
  );
}
