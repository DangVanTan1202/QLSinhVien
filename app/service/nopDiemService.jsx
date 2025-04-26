
const API_BASE = "http://guyqn123-001-site1.ptempurl.com/api/odata";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};
// Lấy danh sách môn học theo giảng viên hiện tại
export const fetchMonHocsByGiangVien = async (idGiangVien) => {
    try {
      const res = await fetch(`${API_BASE}/MonHocs?$expand=GiangVien,LopHoc`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      const data = await res.json();
      console.log("Danh sách môn học trả về:", data.value);
      console.log("Lọc theo giảng viên ID:", idGiangVien);
      return (data.value || []).filter(mon => mon.GiangVien && String(mon.GiangVien.id) === String(idGiangVien));
    } catch (error) {
      console.error("Lỗi fetch MonHocs:", error);
      return [];
    }
  };
// Lấy danh sách sinh viên theo lớp học
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
      return data.value;
    } catch (error) {
      console.error("Lỗi khi lấy điểm:", error);
      return [];
    }
  };
// Gửi điểm cho sinh viên
export const submitDiem = async ({ idSinhVien, idMonHoc, diem, idGiangVien }) => {
    try {
      // 1. Kiểm tra điểm đã có chưa
      const checkRes = await fetch(
        `${API_BASE}/DiemSoes?$filter=idSinhVien eq ${idSinhVien} and idMonHoc eq ${idMonHoc}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      const checkData = await checkRes.json();
  
      if (checkData.value.length > 0) {
        // Đã có điểm rồi => Không gửi nữa
        throw new Error("Sinh viên này đã có điểm cho môn học này.");
      }
      // 2. Gửi điểm nếu chưa có
      const res = await fetch(`${API_BASE}/DiemSoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          idSinhVien,
          idMonHoc,
          diem,
          idGiangVien,
          isDuyet: null, 
        }),
      });
  
      if (!res.ok) {
        throw new Error("Không thể gửi điểm");
      }
  
      return await res.json();
    } catch (error) {
      console.error("Lỗi gửi điểm:", error.message);
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
  