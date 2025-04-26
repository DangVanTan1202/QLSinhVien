const API_BASE = "http://guyqn123-001-site1.ptempurl.com/api/odata";

// Lấy token từ localStorage
export const getToken = () => {
  return localStorage.getItem("token") || "";
};

// 👉 Dùng trong Server Component để lấy môn học
export const fetchMonHocs = async () => {
  try {
    const res = await fetch(`${API_BASE}/MonHocs?$expand=GiangVien,LopHoc`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    return data.value || [];
  } catch (error) {
    console.error("Lỗi fetch môn học:", error);
    return [];
  }
};

// 👉 Dùng trong Client Component để lấy môn học và cập nhật state
export const fetchMonHocsClient = async (setMonHocs) => {
  try {
    const res = await fetch(`${API_BASE}/MonHocs?$expand=GiangVien,LopHoc`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setMonHocs(data.value || []);
  } catch (error) {
    console.error("Lỗi fetch môn học:", error);
  }
};
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
// Lấy danh sách giảng viên
export const fetchGiangViens = async (setGiangViens) => {
  try {
    const res = await fetch(`${API_BASE}/GiangViens`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    setGiangViens(data.value || []);
  } catch (error) {
    console.error("Lỗi fetch giảng viên:", error);
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

// Thêm môn học
export const addMonHoc = async (data) => {
  try {
    // Kiểm tra và ép kiểu dữ liệu trước khi gửi
    const payload = {
      maMonHoc: data.maMonHoc,
      tenMonHoc: data.tenMonHoc,
      idGiangVien: Number(data.idGiangVien),
      idLopHoc: Number(data.idLopHoc),
    };

    console.log("Payload gửi đi:", payload); // debug trước khi gửi

    const res = await fetch(`${API_BASE}/MonHocs`, {
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
    console.log("Thêm môn học thành công:", result);
    return result;
  } catch (error) {
    console.error("Lỗi thêm môn học:", error.message);
    throw error;
  }
};

// Cập nhật môn học
export const updateMonHoc = async (id, data) => {
  try {
    // Kiểm tra và ép kiểu dữ liệu trước khi gửi
    const payload = {
      maMonHoc: data.maMonHoc,
      tenMonHoc: data.tenMonHoc,
      idGiangVien: Number(data.idGiangVien),
      idLopHoc: Number(data.idLopHoc),
    };

    console.log("Payload gửi đi:", payload); // debug trước khi gửi

    const res = await fetch(`${API_BASE}/MonHocs(${id})`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Lỗi cập nhật: ${error || "Không rõ lỗi"}`);
    }

    console.log("Cập nhật môn học thành công");
  } catch (error) {
    console.error("Lỗi cập nhật môn học:", error);
  }
};

// Xoá môn học
export const deleteMonHoc = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/MonHocs(${id})`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Lỗi xoá: ${error}`);
    }

    console.log("Xoá môn học thành công");
  } catch (error) {
    console.error("Lỗi xoá môn học:", error);
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

