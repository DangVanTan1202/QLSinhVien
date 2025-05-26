const API_BASE = "http://guyqn123-001-site1.ptempurl.com/api/odata";
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
//  Lấy danh sách tài khoản
export const fetchUsersClient = async (setUsers) => {
  try {
    const res = await fetch(`${API_BASE}/Users`, {
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

export const fetchSinhVienByUserId = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId không hợp lệ!");
    }

    const res = await fetch(
      `${API_BASE}/SinhViens?$filter=user_id eq ${userId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Không thể lấy thông tin sinh viên");
    }

    const data = await res.json();

    // Trả về sinh viên đầu tiên (vì user_id là duy nhất)
    return data?.value?.[0];
  } catch (error) {
    console.error(" Lỗi khi lấy sinh viên theo user_id:", error);
    throw error;
  }
};

export const fetchDiemBySinhVienId = async (idSinhVien) => {
    try {
      if (!idSinhVien) {
        throw new Error("idSinhVien không hợp lệ!");
      }
      const res = await fetch(
        `${API_BASE}/DiemSoes?$expand=MonHoc,GiangVien&$filter=idSinhVien eq ${idSinhVien} and isDuyet eq true`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Không thể lấy dữ liệu điểm");
      }
      const data = await res.json();
      return data?.value || [];
    } catch (error) {
      console.error(" Lỗi khi lấy điểm sinh viên:", error);
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
  