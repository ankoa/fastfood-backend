export class Helpers {
  static makeSlugFromString = (str: string): string => {
    return str
      .toLowerCase() // chuyển sang chữ thường
      .normalize('NFD') // tách ký tự Unicode
      .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
      .replace(/đ/g, 'd') // chuyển đ thành d
      .replace(/\s+/g, '-') // thay khoảng trắng bằng -
      .replace(/[^a-z0-9\-]/g, '') // bỏ ký tự không hợp lệ
      .replace(/\-+/g, '-') // loại bỏ dấu - lặp
      .replace(/^\-+|\-+$/g, ''); // loại bỏ - đầu/cuối
  };
}
