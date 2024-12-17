import { KeywordStatus } from "@enums/keyword.enum";
import { Pagination } from "./common.interface";

export interface Keyword {
  id: number;
  userId: string;
  keyword: string;
  status: KeywordStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface KeywordList extends Pagination {
  total: number;
  keywords: Keyword[];
}
