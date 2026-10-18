export class Helper {
  static makeSlug(text: string): string {
    if (!text) return '';
    return text
      .normalize('NFD') // Chuyển sang chuẩn Unicode NFD
      .replace(/[\u0300-\u036f]/g, '') // Xóa các dấu tiếng Việt
      .replace(/đ/g, 'd').replace(/Đ/g, 'D') // Xử lý chữ Đ
      .toLowerCase() // Chuyển thành chữ thường
      .trim() // Xóa khoảng trắng 2 đầu
      .replace(/[^a-z0-9\s]/g, '') // Xóa các ký tự đặc biệt
      .replace(/\s+/g, '-'); // Thay khoảng trắng bằng dấu gạch ngang
  }
}