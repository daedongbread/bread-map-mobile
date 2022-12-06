export type NoticeEntry = {
  image: string;
  /**
   * 오늘 알람 발신 유저 고유 번호 (제보 빵집/상품 추가, 즐겨찾기 빵집 관리자 글 업데이트 알림 땐 null)
   */
  fromUserId: number | null;
  title: string;
  /**
   * 오늘 알람 내용 고유 번호 (리뷰 아이디 or 댓글 아이디 or 빵집 아이디 or 상품 아이디 or 빵집 관리자 글 아이디)
   */
  contentId: number;
  /**
   * 오늘 알람 세부 내용 (팔로우 알람일 땐 null);
   */
  content: string | null;
  /**
   * 오늘 알람 생성일
   */
  createdAt: string;
};
