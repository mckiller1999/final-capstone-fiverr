export interface BookedJobs {
    id: number,
    maCongViec: number,
    maNguoiThue: number,
    ngayThue: string,
    hoanThanh: boolean,
}

export interface HiredJobs {
    congViec : {  
        danhGia: number,
        giaTien: number,
        hinhAnh: "",
        id: number,
        maChiTietLoaiCongViec: number,
        moTa: "",
        moTaNgan: "",
        nguoiTao: number,
        saoCongViec: number,
        tenCongViec: "",
    },
    hoanThanh: boolean,
    id: number,
    ngayThue: ""
}