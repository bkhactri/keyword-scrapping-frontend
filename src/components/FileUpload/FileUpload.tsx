import React, { ChangeEvent, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAuth } from "@contexts/useAuthContext";
import api from "@config/axios-request";
import { toast } from "react-toastify";

export default function FileUpload() {
  const { accessToken } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (
        (event.target as HTMLInputElement).files &&
        (event.target as HTMLInputElement).files.length
      ) {
        const [file] = (event.target as HTMLInputElement).files;
        setSelectedFile(file);
      }
    },
    []
  );

  const handleRemoveSelectedFile = () => {
    setSelectedFile(null);
  };

  const handleProcessSelectedFile = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await api.post<{ keywords: string[] }>(
        "/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const pendingKeywords = response.data.keywords;

      if (pendingKeywords.length) {
        toast.info(`Processing ${pendingKeywords.length} keyword(s)`);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Processing failed! Please try again"
      );
    }
  };

  return (
    <>
      <Box className="flex items-start justify-between px-6 pt-6 pb-4">
        <Box className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-100">
          <span className="logo-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 512 419.116"
            >
              <g>
                <path
                  d="M16.991,419.116A16.989,16.989,0,0,1,0,402.125V16.991A16.989,16.989,0,0,1,16.991,0H146.124a17,17,0,0,1,10.342,3.513L227.217,57.77H437.805A16.989,16.989,0,0,1,454.8,74.761v53.244h40.213A16.992,16.992,0,0,1,511.6,148.657L454.966,405.222a17,17,0,0,1-16.6,13.332H410.053v.562ZM63.06,384.573H424.722L473.86,161.988H112.2Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </span>
        </Box>
      </Box>
      <Box className="px-6 py-2">
        <p className="font-bold">
          Upload a file to scrap Google search results
        </p>
        <p className="text-gray-500">Attach the file below</p>
        <span className="text-sm italic text-gray-500 mt-1">
          To prepare your CSV file
          <ul style={{ listStyleType: "circle", paddingLeft: "20px" }}>
            <li>Create new column named &quot;Keyword&quot;</li>
            <li>List each keyword on a separate row below the header</li>
            <li>
              Limit: Maximum <strong>100</strong> keywords per file
            </li>
          </ul>
        </span>

        <Box className="z-1 flex flex-col items-center justify-center mt-2 h-60 border-dashed border-gray-400 border hover:border-solid hover:border-gray-500 focus:border-gray-500">
          {selectedFile ? (
            <Box
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <CancelIcon
                className={`z-0 cursor-pointer absolute right-0 top-0 ${
                  isHovered ? "" : "hidden"
                }`}
                onClick={handleRemoveSelectedFile}
              />
              <Box className="flex flex-col items-center">
                <FilePresentIcon className="text-orange-600 size-16" />
                <Typography fontSize="sm">
                  <strong>Selected file:</strong> {selectedFile.name}
                </Typography>
                <Typography fontSize="sm">
                  <strong>File size:</strong>{" "}
                  {(selectedFile.size / (1024 * 1024)).toFixed(5)} MB
                </Typography>
                <Typography fontSize="sm">
                  <strong>File mimetype:</strong> {selectedFile.type}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Button
              component="label"
              className="w-full h-full cursor-pointer normal-case bg-transparent flex flex-col items-center"
            >
              <Input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <UploadFileIcon fontSize="large" className="text-orange-600" />
              <Typography className="mt-4 font-bold text-gray-900">
                Drag file here to upload.
              </Typography>
              <Typography className=" text-gray-500 text-center">
                Alternatively, you can select a file by <br />
                <strong className="text-orange-600 font-bold cursor-pointer">
                  Clicking here
                </strong>
              </Typography>
            </Button>
          )}
        </Box>
      </Box>
      <Box className="px-6 pb-4 flex justify-between">
        <Typography className="text-sm text-gray-400 italic">
          Supported format: CSV
        </Typography>
        <Typography className="text-sm text-gray-400 italic">
          Maximum size: 1MB
        </Typography>
      </Box>
      <Box className="flex items-center justify-end px-4 py-3 border-t border-gray-200">
        <Button
          type="submit"
          className={`capitalize font-medium px-4 py-2 rounded-lg ml-2
            ${!selectedFile ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-700 text-white hover:cursor-pointer"}
          `}
          onClick={handleProcessSelectedFile}
          disabled={!selectedFile}
        >
          Process
        </Button>
      </Box>
    </>
  );
}
