export type RecentKeywordsEntity = {
  recentKeywords: Array<string>;
};

export type SuggestionsEntity = {
  keywordSuggestions: Array<string>;
};

export type PopularKeywordsEntity = Array<PopularKeyword>;

export type PopularKeyword = {
  keyword: string;
  rank: number;
};

export type SearchBakeryEntity = {
  subwayStationName: string;
  searchResultDtoList: Array<BakeryDTO>;
};

export type BakeryDTO = {
  bakeryId: number;
  bakeryName: string;
  breadId: number;
  breadName: string;
  address: string;
  distance: number; // 9493401.0,
  reviewNum: number; // 0
  totalScore: number; // 0.0
};

export type SearchType = 'POPULAR' | 'DISTANCE' | string;
