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
  color: string; // Orange
};

export type BakeryMapBakeryFilterEntity = {
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
  color: string;
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
  bakeryName: string;
  reviewNum: number;
  distance: number;
};

type BakeryFacilityInfoType = 'PARKING' | 'WIFI' | 'DELIVERY' | 'PET' | 'SHIPPING' | 'BOOKING';

export type BakeryMenuEntity = {
  id: number;
  name: string;
  rating: number;
  reviewNum: number;
  price: string;
  image: Array<string>;
};

export type BakerySingleEntity = {
  bakeryInfo: {
    image: string | null;
    name: string;
    flagNum: number;
    rating: number;
    reviewNum: number;
    address: string;
    hours: string;
    websiteURL: string;
    instagramURL: string;
    facebookURL: string;
    blogURL: string;
    phoneNumber: string;
  };
  flagInfo: {
    flagId: number;
    isFlaged: boolean;
  };
  menu: BakeryMenuEntity[];
  facilityInfoList: Array<BakeryFacilityInfoType>;
};

export type BakeryReviewEntity = {
  id: number;
  userId: number;
  userImage: string;
  nickName: string;
  reviewNum: number;
  followerNum: number;
  productRatingList: [
    {
      productName: string;
      rating: number;
    }
  ];
  imageList: Array<string>;
  content: string;
  likeNum: number;
  commentNum: number;
  createdAt: string;
  averageRating: number;
};

type ReviewUserInfo = {
  userId: number;
  userImage: string;
  nickName: string;
  reviewNum: number;
  followerNum: number;
  isFollow: boolean;
  isMe: boolean;
};

type ReviewInfo = {
  id: number;
  productRatingList: Array<{
    productName: string;
    rating: number;
  }>;
  imageList: Array<string>;
  content: string;
  likeNum: number;
  commentNum: number;
  createdAt: string;
  averageRating: number;
};

export type ReviewContent = {
  userInfo: ReviewUserInfo;
  reviewInfo: ReviewInfo;
};

export type ReviewEntity = {
  pageNumber: number;
  numberOfElements: number;
  size: number;
  hasNext: boolean;
  contents: ReviewContent[];
};
