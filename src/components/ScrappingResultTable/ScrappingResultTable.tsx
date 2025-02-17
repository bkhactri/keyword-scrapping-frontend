import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { TableVirtuoso } from "react-virtuoso";
import { useGlobalState } from "@store/global-state/useGlobalState";
import { Keyword } from "@interfaces/keyword.interface";
import { useScrapping } from "@contexts/useScrappingContext";
import { keywordStatusColor } from "@enums/keyword.enum";
import VirtuosoTable from "./VirtuosoTable";

interface ResultTableProps {
  searchKeyword: string;
}

interface ScrappingColumnData {
  dataKey: keyof Keyword;
  label: string;
  width?: number;
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
    label: "Created At",
    dataKey: "createdAt",
  },
  {
    width: 50,
    label: "Completed At",
    dataKey: "updatedAt",
  },
];

export default function ResultTable({ searchKeyword }: ResultTableProps) {
  const { socket } = useScrapping();
  const [rows, setRows] = useState<Keyword[]>([]);
  const location = useLocation();
  const { user } = useGlobalState();

  const getRowContentFormat = (row: Keyword, dataKey: keyof Keyword) => {
    switch (dataKey) {
      case "status":
        return (
          <Typography
            className="capitalize"
            color={keywordStatusColor[row[dataKey as string]]}
          >
            &#x2022; {row[dataKey as string]}
          </Typography>
        );
      case "createdAt":
      case "updatedAt":
        return <>{new Date(row[dataKey as string]).toString()}</>;
      default:
        return row[dataKey as string];
    }
  };

  const rowContent = (_index: number, row: Keyword) => {
    return (
      <>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            style={{ width: column.width }}
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

  const filteredRows = React.useMemo(() => {
    const regex = searchKeyword ? new RegExp(searchKeyword, "i") : null;
    return rows.filter((row) => {
      if (!regex) {
        return true;
      }

      return regex.test(row.keyword);
    });
  }, [rows, searchKeyword]);

  useEffect(() => {
    socket.on("connect", () => {
      socket?.emit("identify", user.id);
    });

    socket.on("disconnect", () => {
      if (location.pathname !== "/upload") {
        toast.warning("Real time scrapping is not available");
      }
    });

    socket?.on("keyword-processed", (data: Keyword) => {
      toast.success(
        <>
          Processed keyword <strong>{data.keyword}</strong>
        </>,
        { delay: 1000 }
      );

      setRows((prevRows) => [data, ...prevRows]);
    });

    return () => {
      socket?.disconnect();
    };
  }, [location.pathname, socket, user.id]);

  return (
    <Paper style={{ height: "65vh", width: "100%" }}>
      <TableVirtuoso
        data={filteredRows}
        components={VirtuosoTable}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
