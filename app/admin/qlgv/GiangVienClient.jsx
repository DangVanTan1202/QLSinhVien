"use client";

import { useGiangVienLogic } from "./useGiangVienLogic";
import GiangVienUI from "./UI";

export default function GiangVienClient() {
  const {
    user,
    giangViens,
    users,
    permissions,
    handleLogout,
    handleDelete,
    onSubmitSuccess,
  } = useGiangVienLogic();

  return (
    <GiangVienUI
      user={user}
      handleLogout={handleLogout}
      data={giangViens}
      users={users}
      permissions={permissions}
      onDelete={handleDelete}
      onSubmitSuccess={onSubmitSuccess}
    />
  );
}
