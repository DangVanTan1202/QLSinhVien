export async function doiMatKhau(oldPassword, newPassword) {
    try {
      const response = await fetch(
        "http://qltruonghoc.ddns.net/QuanLyTaiKhoan/DoiMatKhau",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );
      const result = await response.json();
  
      if (response.ok) {
        return { success: true, data: result };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { success: false, message: "Lỗi kết nối máy chủ" };
    }
  }
  