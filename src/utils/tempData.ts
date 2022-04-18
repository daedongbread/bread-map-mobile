const bakeryMenu: BakeryMenu[] = [
  {
    name: '오리지날 크루아상',
    price: 4200,
    rating: 5,
  },
  {
    name: '사과파이',
    price: 4900,
    rating: 4,
  },
  {
    name: '잠봉뵈르1',
    price: 9000,
    rating: 4.8,
  },
  {
    name: '잠봉뵈르3',
    price: 6230,
    rating: 4.8,
  },
  {
    name: '잠봉뵈르4',
    price: 9070,
    rating: 4.8,
  },
  {
    name: '잠봉뵈르5',
    price: 8040,
    rating: 4.8,
  },
];

const bakeryReviews: BakeryReview[] = [
  {
    breadCategoryId: 1,
    contents: '항상 남부터미널 오면 꼭 방문해서 몇개씩 사갑니다. 넘 맛나요~ㅎㅎㅎ 또 먹구싶다',
    imgPathList: [
      '../../../assets/images/bread.png',
      '../../../assets/images/bread.png',
      '../../../assets/images/bread.png',
    ],
    lastModifiedDateTime: '2021/03/02',
    memberId: 32254,
    memberName: '빵순이',
    menuId: 4,
    menuName: '오리지널 크루아상',
    menuReviewId: 1,
    rating: 4.6,
  },
  {
    breadCategoryId: 1,
    contents: '그냥 그래요',
    imgPathList: [
      '../../../assets/images/bread.png',
      '../../../assets/images/bread2.png',
      '../../../assets/images/bread.png',
    ],
    lastModifiedDateTime: '2021/03/03',
    memberId: 31254,
    memberName: 'mMMMMM',
    menuId: 4,
    menuName: '사과파이',
    menuReviewId: 2,
    rating: 2.4,
  },
  {
    breadCategoryId: 1,
    contents: '존맛탱.....',
    imgPathList: [
      '../../../assets/images/bread2.png',
      '../../../assets/images/bread.png',
      '../../../assets/images/bread.png',
    ],
    lastModifiedDateTime: '2021/03/04',
    memberId: 32252,
    memberName: '서울앵무새',
    menuId: 4,
    menuName: '잠봉뵈르',
    menuReviewId: 3,
    rating: 5,
  },
  {
    breadCategoryId: 1,
    contents: '생각보다 맛있어요 ㅎㅎ',
    imgPathList: [
      '../../../assets/images/bread.png',
      '../../../assets/images/bread2.png',
      '../../../assets/images/bread2.png',
    ],
    lastModifiedDateTime: '2021/03/07',
    memberId: 55221,
    memberName: '으에',
    menuId: 4,
    menuName: '오리지널 크루아상',
    menuReviewId: 4,
    rating: 4.3,
  },
  {
    breadCategoryId: 1,
    contents: '생각보다 맛있어요 ㅎㅎ',
    imgPathList: [
      '../../../assets/images/bread.png',
      '../../../assets/images/bread2.png',
      '../../../assets/images/bread2.png',
    ],
    lastModifiedDateTime: '2021/03/07',
    memberId: 55221,
    memberName: '으에',
    menuId: 4,
    menuName: '오리지널 크루아상',
    menuReviewId: 5,
    rating: 4.3,
  },
  {
    breadCategoryId: 1,
    contents: '생각보다 맛있어요 ㅎㅎ',
    imgPathList: [
      '../../../assets/images/bread.png',
      '../../../assets/images/bread2.png',
      '../../../assets/images/bread2.png',
    ],
    lastModifiedDateTime: '2021/03/07',
    memberId: 55221,
    memberName: '으에',
    menuId: 4,
    menuName: '오리지널 크루아상',
    menuReviewId: 6,
    rating: 4.3,
  },
  {
    breadCategoryId: 1,
    contents: '생각보다 맛있어요 ㅎㅎ',
    imgPathList: [
      '../../../assets/images/bread.png',
      '../../../assets/images/bread2.png',
      '../../../assets/images/bread2.png',
    ],
    lastModifiedDateTime: '2021/03/07',
    memberId: 55221,
    memberName: '으에',
    menuId: 4,
    menuName: '오리지널 크루아상',
    menuReviewId: 7,
    rating: 4.3,
  },
];

const bakeryInfo: BakeryInfo = {
  address: '서울 서초구 서초중앙로 18',
  bakeryId: 5,
  bakeryName: '루엘드파리',
  basicInfoList: ['PET', 'WIFI', 'PARKING', 'DELIVERY', 'SHIPPING'],
  businessHour: '매일 08:00 ~ 21:00',
  telNumber: '02-322-0939',
  websiteUrlList: ['https://smartstore.naver.com/ruelledeparis'],
};

type BakeryMenu = {
  name: string;
  price: number;
  rating: number;
};

type BakeryReview = {
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

type BakeryInfo = {
  address: string;
  //avgRating: number;
  bakeryId: number;
  //menusCount: number;
  bakeryName: string;
  basicInfoList: string[]; /// ['PET']
  businessHour: string;
  //flagType: 'NONE';
  //flagsCount: number;
  //imgPath: string;
  //menuReviewsCount: number;
  //personalRating: number;
  //ratingCount: number;
  telNumber: string;
  websiteUrlList: string[];
};

export { bakeryMenu, bakeryReviews, bakeryInfo };
export type { BakeryMenu, BakeryReview, BakeryInfo };
