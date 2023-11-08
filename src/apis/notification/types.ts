export type Notification = {
  noticeId: number;
  image: string;
  title: string;
  contentId: number;
  content: string;
  contentParam: string;
  isFollow: boolean;
  createdAt: string;
  noticeType: NotificationType;
};

export type NotificationType =
  | 'FOLLOW'
  | 'REVIEW_COMMENT'
  | 'REVIEW_LIKE'
  | 'RECOMMENT'
  | 'COMMENT_LIKE'
  | 'ADD_BAKERY'
  | 'ADD_PRODUCT'
  | 'REPORT_BAKERY_ADDED'
  | 'EVENT'
  | 'BAKERY_ADDED'
  | 'CURATION';

// FOLLOW("팔로우"), REVIEW_COMMENT("리뷰 댓글"), REVIEW_LIKE("리뷰 좋아요"), RECOMMENT("대댓글"), COMMENT_LIKE("댓글 좋아요"), REPORT_BAKERY_ADDED("제보한 빵집 추가"), ADD_PRODUCT("제보한 빵 추가"), EVENT("제보한 상품 추가"), BAKERY_ADDED("빵집 추가"), CURATION("큐레이션"),
