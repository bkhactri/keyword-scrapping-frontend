export interface ReportKeyword {
  keywordId: number;
  keyword: string;
  totalAds: number;
  totalLinks: number;
  htmlCachePage: string;
  createdAt?: Date;
  updatedAt?: Date;
}
