export interface JobDetail {
  id: number;
  tenCongViec: string;
  danhGia: number;
  giaTien: number;
  nguoiTao: number;
  hinhAnh: string;
  moTa: string;
  maChiTietLoaiCongViec: number;
  moTaNgan: string;
  saoCongViec: number;
}

export interface JobCategoryModel {
  id: number;
  tenLoaiCongViec: string;
  dsNhomChiTietLoai: DsNhomChiTietLoai[];
}

export interface DsNhomChiTietLoai {
  id: number;
  tenNhom: string;
  hinhAnh: string;
  maLoaiCongviec: number;
  dsChiTietLoai: DsChiTietLoai[];
}

export interface DsChiTietLoai {
  id: number;
  tenChiTiet: string;
}
