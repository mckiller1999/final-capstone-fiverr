const URL = {
  JOB_BY_MENU: (id = "1") => `/cong-viec/lay-chi-tiet-loai-cong-viec/${id}`,
  JOB_DETAIL: (id = "1") => `/cong-viec/lay-cong-viec-chi-tiet/${id}`,
  JOB_COMMENT: (id = "1") => `/binh-luan/lay-binh-luan-theo-cong-viec/${id}`,
  JOB_SEARCH_ID: (id = "1") => `/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`,
  JOB_MENU: `/cong-viec/lay-menu-loai-cong-viec`,
  ALL_COMMENT : `/binh-luan`,
  COMMENT_DELETE: (id = "1") => `/binh-luan/${id}`
};

export default URL;