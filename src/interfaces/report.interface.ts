import { KeywordStatus } from "@enums/keyword.enum";

export interface ReportKeyword {
  keywordId: number;
  keyword: string;
  status: KeywordStatus;
  totalAds: number;
  totalLinks: number;
  htmlCachePage: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SearchResult {
  id?: number;
  keywordId?: number;
  totalAds?: number;
  totalLinks?: number;
  htmlCacheId?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}
