import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportToExcel(diemData) {
  if (!diemData || diemData.length === 0) return;

  // ánh xạ lại tên cột
  const mappedData = diemData.map((item) => ({
    "Mã môn học": item.maMonHoc,
    "Tên môn học": item.tenMonHoc,
    "Điểm chuyên cần": item.diemCC,
    "Điểm giữa kỳ": item.diemGK,
    "Điểm cuối kỳ": item.diemCK,
    "Điểm hệ 10": item.diem,
    "Điểm hệ 4": item.diemHe4,
    "Điểm chữ": item.diemChu,
    "Kết quả": item.ketQua,
  }));

  const worksheet = XLSX.utils.json_to_sheet(mappedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "BangDiem");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, "bang_diem.xlsx");
}
