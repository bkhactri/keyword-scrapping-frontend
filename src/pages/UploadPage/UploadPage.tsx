import React from "react";
import FileUpload from "@components/FileUpload/FileUpload";
import Report from "@components/Report/Report";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { ScrappingProvider } from "@contexts/useScrappingContext";

export default function UploadPage() {
  return (
    <ScrappingProvider>
      <Box className="container mx-auto p-4">
        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          <Box className="md:w-1/3 w-full">
            <Box className="max-w-screen-md mx-auto bg-white rounded-lg shadow-lg">
              <FileUpload />
            </Box>
          </Box>
          <Box className="md:w-2/3 w-full">
            <Box className="max-w-screen-lg mx-auto bg-white rounded-lg shadow-lg">
              <Report />
            </Box>
          </Box>
        </Stack>
      </Box>
    </ScrappingProvider>
  );
}
