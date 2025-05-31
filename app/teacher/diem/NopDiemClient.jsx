"use client";

import { useNopDiem } from "./useNopDiem";
import NopDiemUI from "./ui";

export default function NopDiemClient() {
  const {
    user,
    monHocs,
    sinhViens,
    permissions,
    heSo,             
    setHeSo,          
    handleLogout,
    handleLopChange,
    handleSubmit,
  } = useNopDiem();

  return (
    <NopDiemUI
      user={user}
      handleLogout={handleLogout}
      monHocs={monHocs}
      sinhViens={sinhViens}
      permissions={permissions}
      heSo={heSo}            
      setHeSo={setHeSo}       
      onLopChange={handleLopChange}
      onSubmit={handleSubmit}
    />
  );
}
