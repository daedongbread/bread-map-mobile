export type FeedEntity = {
  feedId: number;
  imageUrl: string;
  feedType: string;
  redirectUrl: string;
};

export type FeedDetail = {
  common: FeedDetailCommon;
  curation: Array<FeedDetailCuration>;
  landing: null;
  likeCounts: number;
};

export type FeedDetailCommon = {
  feedId: number;
  subTitle: string;
  introduction: string;
  conclusion: string;
  thumbnailUrl: string;
  feedType: string;
  categoryName: string;
  activated: string;
  activateTime: string;
};

export type FeedDetailCuration = {
  bakeryId: number;
  bakeryName: string;
  bakeryAddress: string;
  openingHours: string;
  bakeryImageUrl: string;
  checkPoint: string;
  newBreadTime: string;
  address: string;
  detailedAddress: string;
  websiteURL: string;
  instagramURL: string;
  facebookURL: string;
  blogURL: string;
  facilityInfo: Array<String>;
  phoneNumber: string;
  productId: number;
  productName: string;
  productPrice: string;
  productImageUrl: string;
};

export type LikeEntity = {
  userId: number;
  likeStatus: string;
  likeCounts: number;
};
