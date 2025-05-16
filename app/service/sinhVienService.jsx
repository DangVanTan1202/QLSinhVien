const API_BASE = "http://guyqn123-001-site1.ptempurl.com/api/odata";


// Lấy token từ localStorage
export const getToken = () => {
  return localStorage.getItem("token") || "";
};
export const fetchSinhViensClient = async (setSinhViens) => {
  try {
    const res = await fetch(`${API_BASE}/SinhViens?$expand=User,LopHoc`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setSinhViens(data.value || []);
  } catch (error) {
    console.error("Lỗi fetch sinh viên:", error);
  }
};

// Lấy danh sách user (lọc loại tài khoản là sinh viên nếu cần)
export const fetchUsers = async (setUsers) => {
  try {
    const res = await fetch(`${API_BASE}/Users`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    setUsers(data.value || []);
  } catch (error) {
    console.error("Lỗi fetch users:", error);
  }
};

// Lấy danh sách lớp học
export const fetchLopHocs = async (setLopHocs) => {
  try {
    const res = await fetch(`${API_BASE}/LopHocs`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    setLopHocs(data.value || []);
  } catch (error) {
    console.error("Lỗi fetch lớp học:", error);
  }
};

// Thêm sinh viên
export const addSinhVien = async (data) => {
    try {
      // Kiểm tra và ép kiểu dữ liệu trước khi gửi
      const payload = {
        maSinhVien: data.maSinhVien,
        ngaySinh: data.ngaySinh, // đảm bảo định dạng 'YYYY-MM-DD'
        user_id: Number(data.user_id), // ép kiểu để tránh lỗi
        idLopHoc: Number(data.idLopHoc),
      };
  
      console.log("Payload gửi đi:", payload); // debug trước khi gửi
  
      const res = await fetch(`${API_BASE}/SinhViens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        const error = await res.json();
        console.error("Lỗi chi tiết từ API:", error);
        throw new Error(`Lỗi thêm: ${error?.["odata.error"]?.message?.value || "Không rõ lỗi"}`);
      }
  
      const result = await res.json();
      console.log("Thêm sinh viên thành công:", result);
      return result;
    } catch (error) {
      console.error(" Lỗi thêm sinh viên:", error.message);
      throw error;
    }
  };
  

// Cập nhật sinh viên
export const updateSinhVien = async (id, data) => {
  try {
    // Kiểm tra và ép kiểu dữ liệu trước khi gửi
    const payload = {
        maSinhVien: data.maSinhVien,
        ngaySinh: data.ngaySinh, // đảm bảo định dạng 'YYYY-MM-DD'
        user_id: Number(data.user_id), // ép kiểu để tránh lỗi
        idLopHoc: Number(data.idLopHoc),
      };
  
      console.log("Payload gửi đi:", payload); // debug trước khi gửi
    const res = await fetch(`${API_BASE}/SinhViens(${id})`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Lỗi cập nhật: ${error?.["odata.error"]?.message?.value || "Không rõ lỗi"}`);
    }

    console.log("Cập nhật sinh viên thành công");
  } catch (error) {
    console.error("Lỗi cập nhật sinh viên:", error);
  }
};

// Xoá sinh viên
export const deleteSinhVien = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/SinhViens(${id})`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Lỗi xoá: ${error}`);
    }

    console.log("Xoá sinh viên thành công");
  } catch (error) {
    console.error("Lỗi xoá sinh viên:", error);
  }
};

// Lấy danh sách chức năng
export const fetchChucNangs = async (setChucNangs) => {
  try {
    const res = await fetch(`${API_BASE}/ChucNangs`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    setChucNangs(data.value || []);
  } catch (error) {
    console.error("Lỗi fetch chức năng:", error);
  }
};

// Lấy danh sách phân quyền theo loại tài khoản
export const fetchPhanQuyenByLoaiTK = async (idLoaiTK, setPhanQuyenList) => {
  try {
    const res = await fetch(`${API_BASE}/PhanQuyenLoaiTks?$filter=IdLoaiTK eq ${idLoaiTK}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    const data = await res.json();
    setPhanQuyenList(data.value || []);
  } catch (error) {
    console.error("Lỗi fetch phân quyền:", error);
  }
};
