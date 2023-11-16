export type Post = {
  postId: number;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  thumbnail: string;
  postTopic: PostTopic;
  images: string[];
  isUserLiked: boolean;
  isUserCommented: boolean;
  createdDate: Date;
  writerInfo: WriterInfo;
  bakeryInfo: BakeryInfo;
};

export type PostTopic = 'ALL' | 'BREAD_STORY' | 'EVENT' | 'REVIEW' | 'FREE_TALK' | 'EATEN_BREAD';
export type ReportType = PostTopic | 'COMMENT';

export type Comment = {
  id: number;
  content: string;
  isFirstDepth: boolean;
  parentId: number;
  targetCommentUserNickname: string | null;
  userId: number;
  nickname: string;
  profileImage: string;
  isUserLiked: boolean;
  likeCount: number;
  createdDate: Date;
  status: CommentStatus;
};

type CommentStatus = 'ACTIVE' | 'DELETED' | 'BLOCKED_BY_ADMIN' | 'BLOCKED_BY_USER';

type WriterInfo = {
  userId: number;
  nickname: string;
  profileImage: string;
  reviewCount: number;
  followerCount: number;
  isFollowed: boolean;
};

type BakeryInfo = {
  bakeryId: number;
  name: string;
  address: string;
  thumbnail: string;
};
