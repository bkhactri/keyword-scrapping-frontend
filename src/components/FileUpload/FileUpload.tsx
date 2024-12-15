import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function FileUpload() {
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
        <span className="text-sm italic text-gray-500">
          To prepare your CSV file
          <ul style={{ listStyleType: "circle", paddingLeft: "20px" }}>
            <li>Create new column named &quot;Keyword&quot;</li>
            <li>List each keyword on a separate row below the header</li>
            <li>
              Limit: Maximum <strong>100</strong> keywords per file
            </li>
          </ul>
        </span>
        <Button
          type="button"
          className="normal-case mt-5 bg-transparent p-12 w-full flex flex-col items-center border-dashed border-gray-400 border hover:border-solid hover:border-gray-500 focus:border-gray-500"
        >
          <span className="w-9 h-9 text-orange-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 340.531 419.116"
            >
              <path
                d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
                transform="translate(2944 428)"
                fill="currentColor"
              />
            </svg>
          </span>
          <span className="mt-4 font-bold text-gray-900">
            Drag file here to upload.
          </span>
          <span className=" text-gray-500">
            Alternatively, you can select a file by <br />
            <strong className="text-orange-600 font-bold">clicking here</strong>
          </span>
        </Button>
      </Box>
      <Box className="px-6 pb-4 flex justify-between">
        <span className="text-sm text-gray-400 italic">
          Supported format: CSV
        </span>
        <span className="text-sm text-gray-400 italic">Maximum size: 1MB</span>
      </Box>
      <Box className="flex items-center justify-end px-4 py-3 border-t border-gray-200">
        <Button
          type="button"
          className="bg-orange-500 text-white capitalize font-medium px-4 py-2 rounded-lg hover:bg-orange-700 focus:outline-none ml-2"
        >
          Process
        </Button>
      </Box>
    </>
  );
}
