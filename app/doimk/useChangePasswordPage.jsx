import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUsers } from "../service/quyenService";
import { doiMatKhau } from "../service/doimkService";

export function useChangePasswordPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.LoaiTK_Code!== "Admin") {
        router.push("/login");
        return;
      }
      setUser(parsedUser);
      const token = localStorage.getItem("token");
      fetchUsers(token, setUsers);
    } catch (error) {
      console.error("Lỗi đọc dữ liệu user:", error);
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và xác nhận không khớp");
      return;
    }

    const result = await doiMatKhau(oldPassword, newPassword);
    if (result.success) {
      setSuccess("Đổi mật khẩu thành công");
      setError("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setError(result.message || "Đổi mật khẩu thất bại");
      setSuccess("");
    }
  };

  return {
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
  };
}
