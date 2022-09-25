type MenuReviewEntity = {
  breadCategoryId: number;
  contents: string;
  imgPathList: string[];
  lastModifiedDateTime: string;
  memberId: number;
  memberName: string;
  menuId: number;
  menuName: string;
  menuReviewId: number;
  rating: number;
};

type SimpleReview = {
  id: number;
  content: string;
};

export type BakeryMapBakeryEntity = {
  longitude: number;
  latitude: number;
  image: null;
  id: number;
  name: string;
  flagNum: number;
  rating: number;
  reviewNum: number;
  simpleReviewList: SimpleReview[];
  distance: number;
  popularNum: number;
};

export type BakeryEntity = {
  longitude: number;
  latitude: number;
  address: string;
  avgRating: number;
  bakeryId: number;
  bakeryName: string;
  breadCategoryList: string[];
  flagsCount: number;
  imgPath: string;
  menuReviewList: MenuReviewEntity[];
  menuReviewsCount: number;
  ratingCount: number;
};

export type SearchEntity = {
  bakeryId: number;
  bakeryName: number;
  reviewNum: number;
  distance: number;
};
