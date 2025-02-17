import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TableComponents } from "react-virtuoso";
import { Keyword } from "@interfaces/keyword.interface";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const VirtuosoTable: TableComponents<Keyword> = {
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
  EmptyPlaceholder: () => {
    return (
      <tbody>
        <tr>
          <td colSpan={4} style={{ textAlign: "center" }}>
            <Box className="h-[45vh] flex flex-col justify-center items-center">
              <SmartToyIcon className="text-orange-400 size-20" />
              <Typography className="text-orange-400">
                No uploaded keywords
              </Typography>
            </Box>
          </td>
        </tr>
      </tbody>
    );
  },
};

VirtuosoTable.Scroller.displayName = "VirtuosoScroller";
VirtuosoTable.TableHead.displayName = "VirtuosoTableHead";
VirtuosoTable.TableBody.displayName = "VirtuosoTableBody";

export default VirtuosoTable;
