import React from "react";
import SearchBar from "@components/SearcBar/SearchBar";
import ResultTable from "@components/ResultTable/ResultTable";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function Report() {
  return (
    <div className="flex flex-col px-6 pt-6 pb-4 gap-4">
      <Stack direction="row" spacing={1} className="items-center">
        <Typography variant="h5" className="font-bold text-orange-500">
          Uploaded Keywords
        </Typography>
        <Tooltip
          title={
            <Box className="p-4 text-xs">
              <Typography variant="body2" gutterBottom>
                Uploaded keywords are displayed here. Keywords are listed in the
                order of search completion.
              </Typography>
              <Typography variant="body2">
                <strong>Important:</strong> Uploading a new file will clear the
                existing keyword list and start a fresh search.
              </Typography>
            </Box>
          }
          placement="right"
        >
          <HelpOutlineIcon className="text-orange-400 cursor-pointer" />
        </Tooltip>
      </Stack>
      <SearchBar />
      <ResultTable />
    </div>
  );
}
