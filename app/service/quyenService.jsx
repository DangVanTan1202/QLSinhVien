export const fetchUsers = async (token, setUsers) => {
  if (!token) return;
  try {
    const res = await fetch("http://guyqn123-001-site1.ptempurl.com/api/odata/Users", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Lỗi khi lấy danh sách tài khoản");
    const data = await res.json();
    console.log("Danh sách tài khoản:", data);
    setUsers(data.value || []);
  } catch (error) {
    console.error(error);
  }
};
// Lấy token từ localStorage
export const getToken = () => {
  return localStorage.getItem("token") || "";
};
// Lấy danh sách loại tài khoản
export const fetchLoaiTK = async (setLoaiTKList) => {
  try {
    const res = await fetch("http://guyqn123-001-site1.ptempurl.com/api/odata/LoaiTks");
    const data = await res.json();
    const filtered = (data.value || []).filter(item => item.Name !== "");
    setLoaiTKList(filtered);
  } catch (error) {
    console.error("Lỗi fetch loại tài khoản:", error);
  }
};
// Lấy danh sách chức năng
export const fetchChucNangs = async (setChucNangs) => {
  try {
    const res = await fetch("http://guyqn123-001-site1.ptempurl.com/api/odata/ChucNangs", {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    const data = await res.json();
    setChucNangs(data.value || []);
  } catch (error) {
    console.error("Lỗi fetch chức năng:", error);
  }
};
// Lấy danh sách phân quyền theo loại tài khoản
export const fetchPhanQuyenLoaiTK = async (idLoaiTK, setPhanQuyenList) => {
  try {
    const res = await fetch(`http://guyqn123-001-site1.ptempurl.com/api/odata/PhanQuyenLoaiTks?$filter=IdLoaiTK eq ${idLoaiTK}`, {
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
// Cập nhật hoặc thêm mới phân quyền
export const updatePhanQuyen = async (quyen) => {
  try {
    const method = quyen.Id ? "PATCH" : "POST";
    const url = quyen.Id
      ? `http://guyqn123-001-site1.ptempurl.com/api/odata/PhanQuyenLoaiTks(${quyen.Id})`
      : `http://guyqn123-001-site1.ptempurl.com/api/odata/PhanQuyenLoaiTks`;
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(quyen)
    });
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`Lỗi: ${errorData}`);
    }

    console.log("Cập nhật quyền thành công");
  } catch (error) {
    console.error("Lỗi cập nhật phân quyền:", error);
  }
};

// Xoá phân quyền theo ID
export const deletePhanQuyen = async (idPhanQuyen) => {
  try {
    const res = await fetch(`http://guyqn123-001-site1.ptempurl.com/api/odata/PhanQuyenLoaiTks(${idPhanQuyen})`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(`Lỗi xóa: ${errorData}`);
    }
    console.log("Xoá phân quyền thành công");
  } catch (error) {
    console.error("Lỗi xoá phân quyền:", error);
  }
};
