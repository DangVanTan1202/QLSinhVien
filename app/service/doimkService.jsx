export async function doiMatKhau(MatKhauCu,MatKhauMoi ) {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return { success: false, message: "Không tìm thấy token đăng nhập." };
    }
    const response = await fetch(
      "http://guyqn123-001-site1.ptempurl.com/QuanLyTaiKhoan/DoiMatKhau",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({ MatKhauCu, MatKhauMoi }),
      }
    );
    const result = await response.json();
    if (response.ok) {
      return { success: true, data: result };
    } else {
      return { success: false, message: result.message || "Đổi mật khẩu thất bại." };
    }
  } catch (error) {
    return { success: false, message: "Lỗi kết nối máy chủ." };
  }
}
