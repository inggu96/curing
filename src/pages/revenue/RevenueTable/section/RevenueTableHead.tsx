import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { TableRow } from "@mui/material";
import MDBox from "components/MDBox";
import RevenueTableHeadCell from "./RevenueTableHeadCell";

interface RevenueTableHeadProps {
  headerGroups: any[];
}

const RevenueTableHead: React.FC<RevenueTableHeadProps> = ({ headerGroups }) => (
  <MDBox component="thead">
    {headerGroups.map((headerGroup: any) =>
      headerGroup.headers.map((column: any) =>
        column.Filter ? <div key={column.id}>{column.render("Filter")}</div> : null
      )
    )}
    {/* table header 영역 */}
    {headerGroups.map((headerGroup: any, key: any) => (
      <TableRow
        sx={{
          backgroundColor: "#fff",
          color: "#344767",
          fontWeight: 600,
          marginBotton: "122px",
        }}
        key={key}
        {...headerGroup.getHeaderGroupProps()}
      >
        {headerGroup.headers.map((column: any, key: any) => (
          // 헤더 rowCell
          <RevenueTableHeadCell
            sx={{ border: "15px" }}
            key={key}
            isFirstRow={key === 0}
            isLastRow={key === headerGroup.headers.length - 1}
            cellIndex={key}
            {...column.getHeaderProps(column.getSortByToggleProps())}
          >
            {column.render("Header")}
            {key === 4 && (
              <span>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <KeyboardArrowUp />
                  ) : (
                    <KeyboardArrowDown />
                  )
                ) : (
                  <KeyboardArrowDown />
                )}
              </span>
            )}
          </RevenueTableHeadCell>
        ))}
      </TableRow>
    ))}
  </MDBox>
);

export default RevenueTableHead;
