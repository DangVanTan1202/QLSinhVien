
const API_BASE = 'http://guyqn123-001-site1.ptempurl.com/api/odata';

export const getToken = () => {
  return localStorage.getItem("token") || "";
};

// 👉 Lấy danh sách tài khoản
export const fetchUsersClient = async (setUsers) => {
  try {
    const res = await fetch(`${API_BASE}/Users?$expand=LoaiTk`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    const data = await res.json();
    setUsers(data.value || []);
  } catch (error) {
    console.error("Lỗi fetch tài khoản:", error);
  }
};

// 👉 Lấy danh sách loại tài khoản
export const fetchLoaiTaiKhoans = async (setLoaiTaiKhoans) => {
  try {
    const res = await fetch(`${API_BASE}/LoaiTks`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    const data = await res.json();
    setLoaiTaiKhoans(data.value || []);
  } catch (error) {
    console.error("Lỗi fetch loại tài khoản:", error);
  }
};

// 👉 Thêm tài khoản mới
export const addUser = async (data) => {
  try {
    const payload = {
      tenTaiKhoan: data.tenTaiKhoan,
      matKhau: data.matKhau,
      hoTen: data.hoTen,
      LoaiTK_Id: Number(data.LoaiTK_Id),
    };
    const res = await fetch(`${API_BASE}/Users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(`Lỗi thêm tài khoản: ${error?.["odata.error"]?.message?.value || "Không rõ lỗi"}`);
    }

    const result = await res.json();
    console.log("Thêm tài khoản thành công:", result);
    return result;
  } catch (error) {
    console.error("Lỗi thêm tài khoản:", error.message);
    throw error;
  }
};

// 👉 Cập nhật tài khoản
export const updateUser = async (id, data) => {
  try {
    const payload = {
      tenTaiKhoan: data.tenTaiKhoan,
      matKhau: data.matKhau,
      hoTen: data.hoTen,
      LoaiTk_Id: Number(data.LoaiTk_Id),
    };

    const res = await fetch(`${API_BASE}/Users(${id})`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Lỗi cập nhật: ${error}`);
    }

    console.log("Cập nhật tài khoản thành công");
  } catch (error) {
    console.error("Lỗi cập nhật tài khoản:", error);
    throw error;
  }
};

// 👉 Xoá tài khoản
export const deleteUser = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/Users(${id})`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Lỗi xoá tài khoản: ${error}`);
    }

    console.log("Xoá tài khoản thành công");
  } catch (error) {
    console.error("Lỗi xoá tài khoản:", error);
    throw error;
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

