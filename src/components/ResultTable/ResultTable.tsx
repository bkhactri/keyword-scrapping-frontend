import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import Chance from "chance";

interface Data {
  id: number;
  keyword: string;
  status: string;
  createdAt: string;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width?: number;
}

const chance = new Chance(42);

function createData(id: number): Data {
  return {
    id,
    keyword: chance.word(),
    status: "complete",
    createdAt: chance.date().toLocaleString(),
  };
}

const columns: ColumnData[] = [
  {
    width: 100,
    label: "Keyword",
    dataKey: "keyword",
  },
  {
    width: 100,
    label: "Status",
    dataKey: "status",
  },
  {
    width: 50,
    label: "Uploaded At",
    dataKey: "createdAt",
    numeric: true,
  },
];

const rows: Data[] = Array.from({ length: 200 }, (_, index) =>
  createData(index)
);

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

VirtuosoTableComponents.Scroller.displayName = "VirtuosoScroller";
VirtuosoTableComponents.TableHead.displayName = "VirtuosoTableHead";
VirtuosoTableComponents.TableBody.displayName = "VirtuosoTableBody";

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          className="font-bold text-orange-400 bg-white"
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Data) {
  return (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </>
  );
}

export default function ResultTable() {
  return (
    <Paper style={{ height: "80vh", width: "100%" }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
