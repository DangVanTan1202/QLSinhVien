const API_BASE = "http://guyqn123-001-site1.ptempurl.com/api/odata";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
// 1. Lấy tất cả môn học (gồm lớp học và giảng viên)
export const fetchAllMonHocs = async () => {
  try {
    const res = await fetch(`${API_BASE}/MonHocs?$expand=GiangVien,LopHoc`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await res.json();
    return data.value || [];
  } catch (error) {
    console.error("Lỗi fetch tất cả môn học:", error);
    return [];
  }
};

// 2. Lấy danh sách sinh viên theo lớp (bao gồm họ tên từ User)
export const fetchSinhViensByLop = async (idLopHoc) => {
    try {
      // Fetch sinh viên theo lớp
      const res = await fetch(`${API_BASE}/SinhViens?$filter=idLopHoc eq ${idLopHoc}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const sinhViensData = await res.json();
      const sinhViens = sinhViensData.value || [];
      
      // Lấy thông tin họ tên từ bảng User cho từng sinh viên
      const sinhViensWithNames = await Promise.all(
        sinhViens.map(async (sv) => {
          const userRes = await fetch(`${API_BASE}/Users?$filter=id eq ${sv.user_id}`, {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });
          const userData = await userRes.json();
          const user = userData.value[0] || {};
          return {
            ...sv,
            hoTen: user.hoTen || "Chưa có họ tên", // Lấy họ tên hoặc để mặc định nếu không có
          };
        })
      );
      console.log(" Sinh viên với họ tên:", sinhViensWithNames);
      return sinhViensWithNames; // Trả về sinh viên với thông tin họ tên
    } catch (error) {
      console.error("Lỗi fetch SinhViens:", error);
      return []; // Nếu có lỗi, trả về mảng rỗng
    }
  };
//  Lấy điểm số của sinh viên theo môn học và lớp học
export const getDiemTheoLopVaMon = async (idLopHoc, idMonHoc) => {
    try {
      const res = await fetch(
        `${API_BASE}/DiemSoes?$filter=idMonHoc eq ${idMonHoc} and SinhVien/idLopHoc eq ${idLopHoc}&$expand=SinhVien`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (!res.ok) throw new Error("Không thể lấy dữ liệu điểm");
      const data = await res.json();
      return data.value.map((d) => ({
        id: d.id,
        idSinhVien: d.SinhVien?.id,
        hoTen: d.SinhVien?.hoTen,
        maSinhVien: d.SinhVien?.maSinhVien,
        diem: d.diem,
        isDuyet: d.isDuyet,
      }));
      
    } catch (error) {
      console.error("Lỗi khi lấy điểm:", error);
      return [];
    }
  };
//  Duyệt toàn bộ điểm trong danh sách (IsDuyet = true)
export const duyetBangDiem = async (dsDiem) => {
    try {
      await Promise.all(
        dsDiem.map((d) =>
          fetch(`${API_BASE}/DiemSoes(${d.id})`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ isDuyet: true }),
          })
        )
      );
    } catch (error) {
      console.error("Lỗi duyệt bảng điểm:", error);
      throw error;
    }
  };
  //  Từ chối toàn bộ điểm trong danh sách (IsDuyet = false)
  export const tuChoiBangDiem = async (dsDiem) => {
    try {
      await Promise.all(
        dsDiem.map((d) =>
          fetch(`${API_BASE}/DiemSoes(${d.id})`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ isDuyet: false }),
          })
        )
      );
    } catch (error) {
      console.error("Lỗi từ chối bảng điểm:", error);
      throw error;
    }
  };
  // 3 Xóa điểm của lớp và môn học khi bị từ chối
  export const xoaBangDiem = async (idLopHoc, idMonHoc) => {
    if (!idLopHoc || !idMonHoc) {
      console.error("Thiếu idLopHoc hoặc idMonHoc");
      throw new Error("Thiếu idLopHoc hoặc idMonHoc");
    }
  
    try {
      // Lấy danh sách các bản ghi điểm liên quan
      const res = await fetch(
        `${API_BASE}/DiemSoes?$filter=idMonHoc eq ${idMonHoc} and SinhVien/idLopHoc eq ${idLopHoc}&$expand=SinhVien`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
  
      if (!res.ok) {
        const error = await res.json();
        console.error("Lỗi khi fetch danh sách điểm:", error);
        throw new Error("Không thể lấy danh sách điểm");
      }
  
      const data = await res.json();
      const dsDiem = data.value || [];
  
      // Xoá từng bản ghi điểm
      await Promise.all(
        dsDiem.map((d) =>
          fetch(`${API_BASE}/DiemSoes(${d.id})`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          })
        )
      );
    } catch (error) {
      console.error("Lỗi khi xoá bảng điểm:", error);
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
  
