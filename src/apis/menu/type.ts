export type MenuEntity = {
  id: number;
  name: string;
  rating: number;
  reviewNum: number;
  price: number;
  image?: string;
};

export type MenuForReviewEntity = {
  id: number;
  name: string;
  price?: number;
  image?: string;
};
