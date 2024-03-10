const URL = {
  JOB_BY_MENU: (id = "1") => `/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`,
  JOB_DETAIL: (id = "1") => `/cong-viec/lay-cong-viec-chi-tiet/${id}`,
  JOB_COMMENT: (id = "1") => `/binh-luan/lay-binh-luan-theo-cong-viec/${id}`
};

export default URL;
