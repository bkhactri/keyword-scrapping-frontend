export type ScrappingTableDataKey =
  | "keyword"
  | "status"
  | "processedIn"
  | "searchResult.totalAds"
  | "searchResult.totalLinks";

export interface ScrappingColumnData {
  dataKey: ScrappingTableDataKey;
  label: string;
  width?: number;
}
