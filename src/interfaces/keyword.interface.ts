import { KeywordStatus } from "@enums/keyword.enum";
import { Pagination } from "./common.interface";
import { SearchResult } from "./report.interface";

export interface Keyword {
  id: number;
  userId: string;
  keyword: string;
  status: KeywordStatus;
  searchResult: SearchResult;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface KeywordList extends Pagination {
  total: number;
  keywords: Keyword[];
}
