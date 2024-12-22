import React, { useCallback, useEffect, useState } from "react";
import get from "lodash/get";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TableVirtuoso } from "react-virtuoso";
import { useGlobalState } from "@store/global-state/useGlobalState";
import { Keyword } from "@interfaces/keyword.interface";
import { KeywordStatus, keywordStatusColor } from "@enums/keyword.enum";
import KeywordDetailModal from "@components/KeywordDetailModal/KeywordDetailModal";
import { useScrapping } from "@contexts/useScrappingContext";
import { socketIO } from "@config/socket";
import {
  ScrappingColumnData,
  ScrappingTableDataKey,
} from "@interfaces/table.interface";
import { timeDiffInSecondsAndMinutes } from "@helpers/time.helper";
import VirtuosoTable from "./VirtuosoTable";

interface ResultTableProps {
  searchKeyword: string;
}

const columns: ScrappingColumnData[] = [
  {
    width: 100,
    label: "Keyword",
    dataKey: "keyword",
  },
  {
    width: 50,
    label: "Status",
    dataKey: "status",
  },
  {
    width: 50,
    label: "Total links",
    dataKey: "searchResult.totalLinks",
  },
  {
    width: 50,
    label: "Total Ads",
    dataKey: "searchResult.totalAds",
  },
  {
    width: 50,
    label: "Processed in",
    dataKey: "processedIn",
  },
];

export default function ResultTable({ searchKeyword }: ResultTableProps) {
  const { setIsScrapping, processingKeywords, setProcessingKeywords } =
    useScrapping();
  const [isOpenDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [selectedKeywordId, setSelectedKeywordId] = useState<number>();
  const [rows, setRows] = useState<Keyword[]>([]);
  const location = useLocation();
  const { user } = useGlobalState();

  const getRowContentFormat = (
    row: Keyword,
    dataKey: ScrappingTableDataKey
  ) => {
    const value = get(row, dataKey as string);

    switch (dataKey) {
      case "status":
        return (
          <Typography className="capitalize" color={keywordStatusColor[value]}>
            &#x2022; {value}
          </Typography>
        );
      case "processedIn":
        return <>{timeDiffInSecondsAndMinutes(row.createdAt, row.updatedAt)}</>;
      default:
        return value;
    }
  };

  const rowContent = (
    _index: number,
    row: Keyword,
    callbackClick: (row: Keyword) => void
  ) => {
    const handleOnClick = () => {
      callbackClick(row);
    };

    return (
      <>
        {columns.map((column) => (
          <TableCell
            onClick={handleOnClick}
            key={column.dataKey}
            style={{ width: column.width, cursor: "pointer" }}
            variant="body"
          >
            {getRowContentFormat(row, column.dataKey)}
          </TableCell>
        ))}
      </>
    );
  };

  const fixedHeaderContent = () => {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            style={{ width: column.width }}
            className="font-bold text-orange-400 bg-white"
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  const handleRowClick = (row: Keyword) => {
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

  const filteredRows = React.useMemo(() => {
    const regex = searchKeyword ? new RegExp(searchKeyword, "i") : null;
    return rows.filter((row) => {
      if (!regex) {
        return true;
      }

      return regex.test(row.keyword);
    });
  }, [rows, searchKeyword]);

  const onKeywordProcessedCallback = useCallback(
    (data: Keyword) => {
      const remainKeywords = processingKeywords.filter((keyword) => {
        return keyword !== data.keyword;
      });

      if (
        !remainKeywords.length ||
        remainKeywords.length === processingKeywords.length
      ) {
        setIsScrapping(false);
        toast.success("Completed processing all keywords");
      }

      setProcessingKeywords(remainKeywords);
      setRows((prevRows) => [data, ...prevRows]);
    },
    [processingKeywords, setIsScrapping, setProcessingKeywords]
  );

  const onDisconnectSocketCallback = useCallback(() => {
    if (location.pathname !== "/upload") {
      toast.warning("Real time scrapping is not available");
    }
  }, [location.pathname]);

  useEffect(() => {
    socketIO.connect(user.id, onDisconnectSocketCallback);

    socketIO.onKeywordProcessed(onKeywordProcessedCallback);

    return () => {
      socketIO.disconnect();
    };
  }, [onDisconnectSocketCallback, onKeywordProcessedCallback, user.id]);

  return (
    <Paper style={{ height: "70vh", width: "100%" }}>
      <TableVirtuoso
        data={filteredRows}
        components={VirtuosoTable}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={(index, row) => rowContent(index, row, handleRowClick)}
      />

      <KeywordDetailModal
        isOpen={isOpenDetailModal}
        keywordId={selectedKeywordId}
        handleClose={handleCloseModal}
      />
    </Paper>
  );
}
