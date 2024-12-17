import { KeywordStatus } from "@enums/keyword.enum";

export interface Keyword {
  id: number;
  userId: string;
  keyword: string;
  status: KeywordStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
