"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ChangePasswordUI from "./UI";
import { useChangePasswordPage } from "./useChangePasswordPage";

export default function Client() {
  const {
    user,
    handleLogout,
    oldPassword,
    newPassword,
  
    confirmPassword,
    showOld,
    showNew,
    showConfirm,
    setOldPassword,
    setNewPassword,
    setConfirmPassword,
    setShowOld,
    setShowNew,
    setShowConfirm,
    handleSubmit,
    error,
    success,
  } = useChangePasswordPage();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Sidebar user={user} />
      <div className="flex-1 px-8 py-6">
        <Header user={user} onLogout={handleLogout} />
        <ChangePasswordUI
          oldPassword={oldPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          showOld={showOld}
          showNew={showNew}
          showConfirm={showConfirm}
          setOldPassword={setOldPassword}
          setNewPassword={setNewPassword}
          setConfirmPassword={setConfirmPassword}
          setShowOld={setShowOld}
          setShowNew={setShowNew}
          setShowConfirm={setShowConfirm}
          handleSubmit={handleSubmit}
          error={error}
          success={success}
        />
      </div>
    </div>
  );
}
