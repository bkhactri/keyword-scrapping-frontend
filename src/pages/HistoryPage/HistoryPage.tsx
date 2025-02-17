import React from "react";
import Box from "@mui/material/Box";
import HistoryTable from "@components/HistoryTable/HistoryTable";

export default function HistoryPage() {
  return (
    <Box className="container mx-auto p-4">
      <HistoryTable />
    </Box>
  );
}
