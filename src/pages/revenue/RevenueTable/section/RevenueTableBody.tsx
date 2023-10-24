import React, { useState } from "react";
import { TableBody, TableRow } from "@mui/material";
// import RevenueDetail from "pages/revenue/RevenueDetail";
import RevenueTableBodyCell from "./RevenueTableBodyCell";
import RevenueDetail from "pages/revenue/RevenueDetail";
import { useRevenueStore } from "store/AcademyStore";

interface TableBodyProps {
  rows: any[];
  prepareRow: (row: any) => void;
  selectRevenue: (original: any) => void;
  getTableBodyProps(): any;
}

export const RevenueTableBody = ({
  rows,
  prepareRow,
  selectRevenue,
  getTableBodyProps,
}: TableBodyProps) => {
  const isOnModal = useRevenueStore((state) => state.isOnModal);
  const { modalOn } = useRevenueStore((state) => ({
    modalOn: state.modalOn,
  }));
  const [selectedId, setSelectedId] = useState();

  return (
    <TableBody {...getTableBodyProps()}>
      {rows.map((row, key) => {
        prepareRow(row);
        return (
          <>
            <TableRow
              sx={{
                backgroundColor: "#fff",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "4px 10px 7px -10px rgba(0,0,0,0.69)",
              }}
              key={key}
              {...row.getRowProps()}
              onClick={() => {
                setSelectedId(row.original);
                console.log("selectedId", selectedId);
                modalOn();
              }}
            >
              {row.cells.map((cell: any, cellIndex: any) => (
                <RevenueTableBodyCell
                  key={cellIndex}
                  cellIndex={cellIndex}
                  isFirstRow={key === 0}
                  isLastRow={rows.length - 1}
                  isLastCell={row.cells.length - 1}
                  align={cell.column.align ? cell.column.align : "left"}
                  {...cell.getCellProps()}
                >
                  {cell.render("Cell")}
                </RevenueTableBodyCell>
              ))}
            </TableRow>
            {isOnModal && <RevenueDetail selectedId={selectedId} isOnModal={isOnModal} />}

            {key !== rows.length - 1 && (
              <TableRow style={{ height: "15px", visibility: "hidden", borderRadius: "15px" }} />
            )}
          </>
        );
      })}
    </TableBody>
  );
};
