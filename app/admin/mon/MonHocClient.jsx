"use client";

import { useMonHocLogic } from "./useMonHocLogic";
import MonHocUI from "./ui";

export default function MonHocClient() {
  const {
    user,
    monHocs,
    giangViens,
    lopHocs,
    permissions,
    handleLogout,
    handleDelete,
    onSubmitSuccess,
  } = useMonHocLogic();

  return (
    <MonHocUI
      user={user}
      handleLogout={handleLogout}
      data={monHocs}
      giangViens={giangViens}
      lopHocs={lopHocs}
      permissions={permissions}
      onDelete={handleDelete}
      onSubmitSuccess={onSubmitSuccess}
    />
  );
}
