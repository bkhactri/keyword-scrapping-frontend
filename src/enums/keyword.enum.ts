export enum KeywordStatus {
  Pending = "pending",
  InProgress = "in-progress",
  Completed = "completed",
  Failed = "failed",
}

export const keywordStatusColor = {
  [KeywordStatus.Pending]: "secondary",
  [KeywordStatus.InProgress]: "warning",
  [KeywordStatus.Completed]: "success",
  [KeywordStatus.Failed]: "error",
};
