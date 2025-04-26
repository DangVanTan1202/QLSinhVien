"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SinhVienUI from "./ui";
import useSinhVienLogic from "./logicSinhVien";

export default function SinhVienClient() {
  const {
    user,
    handleLogout,
    sinhViens,
    users,
    lopHocs,
    permissions,
    handleDelete,
    reloadSinhViens,
  } = useSinhVienLogic();

  return (
    <SinhVienUI
      user={user}
      handleLogout={handleLogout}
      data={sinhViens}
      users={users}
      lopHocs={lopHocs}
      permissions={permissions}
      onDelete={handleDelete}
      onSubmitSuccess={reloadSinhViens}
    />
  );
}
