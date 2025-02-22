import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { Keyword, KeywordList } from "@interfaces/keyword.interface";
import { toast } from "react-toastify";
import api from "@config/axios-request";
import { Filter, Pagination } from "@interfaces/common.interface";
import { useAuth } from "@contexts/useAuthContext";
import debounce from "lodash/debounce";
import SearchBar from "@components/SearcBar/SearchBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import { KeywordStatus, keywordStatusColor } from "@enums/keyword.enum";
import Typography from "@mui/material/Typography";
import KeywordDetailModal from "@components/KeywordDetailModal/KeywordDetailModal";
import { timeDiffInSecondsAndMinutes } from "@helpers/time.helper";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    cellClassName: "text-center",
    headerAlign: "center",
  },
  { field: "keyword", headerName: "Keyword", type: "string", width: 500 },
  {
    field: "status",
    headerName: "Status",
    type: "custom",
    width: 200,
    cellClassName: "text-center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams<Keyword>) => {
      return (
        <Typography
          className="capitalize h-full flex justify-center items-center"
          color={keywordStatusColor[params.value as KeywordStatus]}
        >
          &#x2022; {params.value}
        </Typography>
      );
    },
  },
  {
    field: "totalLinks",
    headerName: "Total links",
    type: "number",
    width: 200,
    cellClassName: "text-center",
    headerAlign: "center",
    valueFormatter: (_, row: Keyword) => {
      return Number(row.searchResult.totalLinks) || 0;
    },
  },
  {
    field: "totalAds",
    headerName: "Total Ads",
    type: "number",
    width: 200,
    cellClassName: "text-center",
    headerAlign: "center",
    valueFormatter: (_, row: Keyword) => {
      return Number(row.searchResult.totalAds) || 0;
    },
  },
  {
    field: "processedIn",
    headerName: "Processed in",
    type: "string",
    width: 200,
    cellClassName: "text-right",
    headerAlign: "right",
    valueFormatter: (_, row: Keyword) => {
      const { createdAt, updatedAt } = row;
      return timeDiffInSecondsAndMinutes(createdAt, updatedAt);
    },
  },
];

export default function HistoryTable() {
  const { accessToken } = useAuth();
  const [rows, setRows] = useState<Keyword[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    pageSize: 20,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpenDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [selectedKeywordId, setSelectedKeywordId] = useState<number>();

  const fetchKeywords = useCallback(
    async (paginateReq?: Pagination, filter?: Filter) => {
      setIsLoading(true);
      try {
        const response = await api.get<KeywordList>("/keywords", {
          params: {
            page: paginateReq?.page,
            pageSize: paginateReq?.pageSize,
            search: filter?.search,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const keywordList = response.data;

        if (keywordList) {
          setTotalRows(keywordList.total);
          setRows(keywordList.keywords);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearchKeyword = useCallback(
    debounce((searchReq: string) => {
      fetchKeywords(pagination, { search: searchReq });
    }, 400),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value as string);
    debounceSearchKeyword(event.target.value as string);
  };

  useEffect(() => {
    fetchKeywords();
  }, [fetchKeywords]);

  const handlePaginationChanged = debounce(
    (paginationValue: Pagination): void => {
      setPagination(paginationValue);
      fetchKeywords(paginationValue);
    },
    300
  );

  const refreshKeywordList = debounce(() => {
    fetchKeywords(pagination, { search: searchTerm });
  }, 400);

  const handleRowClick = ({ row }: { row: Keyword }) => {
    if (row.status !== KeywordStatus.Completed) {
      toast.warning("Keyword processing not completed");
      return;
    }

    setOpenDetailModal(true);
    setSelectedKeywordId(row.id);
  };

  const handleCloseModal = () => {
    setOpenDetailModal(false);
    setSelectedKeywordId(null);
  };

  return (
    <Stack className="flex flex-col h-[80vh] w-full">
      <Box className="flex flex-row gap-2">
        <Button
          className="border-solid border-gray-300 border"
          onClick={refreshKeywordList}
        >
          <ReplayIcon className="text-orange-400" />
        </Button>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={false}
        disableColumnSelector
        disableColumnFilter
        disableColumnSorting
        disableColumnMenu
        disableColumnResize
        disableRowSelectionOnClick
        pageSizeOptions={[20]}
        rowCount={totalRows}
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        loading={isLoading}
        paginationModel={pagination}
        onPaginationModelChange={handlePaginationChanged}
        onRowClick={handleRowClick}
        className="mt-3"
        sx={{
          ".MuiDataGrid-overlayWrapperInner": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-row:hover": {
            cursor: "pointer",
          },
          "& .MuiDataGrid-columnHeader--sortable": {
            cursor: "default",
          },
        }}
      />

      <KeywordDetailModal
        isOpen={isOpenDetailModal}
        keywordId={selectedKeywordId}
        handleClose={handleCloseModal}
      />
    </Stack>
  );
}
