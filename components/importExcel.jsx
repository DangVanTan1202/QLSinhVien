import * as XLSX from "xlsx";

/**
 * Đọc file Excel và trích xuất danh sách điểm của sinh viên.
 * @param {File} file - File Excel được người dùng upload.
 * @returns {Promise<Array>} - Danh sách điểm, mỗi phần tử là 1 object: { maSinhVien, hoTen, diemCC, diemGK, diemCK }
 */
export async function importExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      const formattedData = jsonData.map((row) => ({
        maSinhVien: row["Mã sinh viên"]?.toString().trim() || "",
        hoTen: row["Họ tên"]?.toString().trim() || "",
        diemCC: parseFloat(row["Điểm chuyên cần"]) || 0,
        diemGK: parseFloat(row["Điểm giữa kỳ"]) || 0,
        diemCK: parseFloat(row["Điểm cuối kỳ "]) || 0,
      }));
      resolve(formattedData);
    };
    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}
