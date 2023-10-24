import { useEffect, useState, useCallback } from "react";

// react-table components
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  useFilters,
  usePagination,
  useAsyncDebounce,
} from "react-table";

// @mui material components
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";

// Material Dashboard 2 PRO React TS examples components
import Search from "pages/revenue/RevenueTable/section/Search";
import dayjs, { Dayjs } from "dayjs";
import DropDownOption from "pages/revenue/RevenueTable/section/DropDownOption";
import { useRevenueStore } from "store/AcademyStore";
import RevenueCalendar from "pages/revenue/RevenueTable/RevenueCalendar";

import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import TableRoot from "./TableRoot";
import { DaliyPicker } from "./section/DaliyPicker";
import { WeekPicker } from "./section/WeekPicker";
import { DropDown } from "./section/DropDown";
import { RevenueTableBody } from "./section/RevenueTableBody";
import RevenueTableHead from "./section/RevenueTableHead";
import { DropDownSearch } from "./section/DropDownSearch";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// Declaring props types for RevenueTable

interface Row {
  columns: { accessor: string; [key: string]: any }[];
  data: { [key: string]: any }[];
}
interface Props {
  columns: { accessor: string; [key: string]: any }[];
  data: { [key: string]: any }[];
  entriesPerPage?:
    | false
    | {
        defaultValue: number;
        entries: number[];
      };
  showTotalEntries?: boolean;
  pagination?: {
    variant: "contained" | "gradient";
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";
  };
  isSorted?: boolean;
}

const RevenueTable = ({
  columns,
  data,
  entriesPerPage,
  showTotalEntries,
  pagination,
  isSorted,
}: Props): JSX.Element => {
  let defaultValue: any;
  let entries: any[];

  if (entriesPerPage) {
    defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : "10";
    entries = entriesPerPage.entries ? entriesPerPage.entries : ["10", "25", "50", "100"];
  }

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: "" },
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  }: any = tableInstance;

  const [globalFilterValue, setGlobalFilterValue] = useState<Dayjs | null>(dayjs());

  const { selectRevenue } = useRevenueStore();
  const [selectedOption, setSelectedOption] = useState("일간");
  const [selectedSearchOption, setSelectedSearchOption] = useState("예약자명");
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(7, "day"));
  const [dayRows, setDayRows] = useState<Row[]>(rows);
  const [filteredRows, setFilteredRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSizes, setPageSizes] = useState(10);
  const startIndex = currentPage * pageSizes;
  const endIndex = startIndex + pageSizes;
  const pageData = filteredRows.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredRows.length / pageSizes);

  useEffect(() => {
    if (startDate) {
      setGlobalFilter(startDate.format("YYYY-MM-DD"));
    }
  }, [setGlobalFilter, startDate]);

  const renderPagination = pageOptions.map((option: any) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MDPagination>
  ));

  const handleInputPagination = ({ target: { value } }: any) => {
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));
  };

  const customizedPageOptions = pageOptions.map((option: any) => option + 1);

  const handleInputPaginationValue = ({ target: value }: any) => gotoPage(Number(value.value - 1));

  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  // '다음' 버튼 클릭 시 호출될 함수
  const WeekNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // '이전' 버튼 클릭 시 호출될 함수
  const WeekPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderCustomPagination = Array.from({ length: totalPages }, (_, index) => (
    <MDPagination
      item
      key={index}
      onClick={() => setCurrentPage(index)}
      active={currentPage === index}
    >
      {index + 1}
    </MDPagination>
  ));

  //서치바 함수
  const onSearchChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
    console.log(value);
  }, 100);

  // 일간 주간 월간달력
  const daliyDataPicker = (newValue: any) => {
    let selectedDate = dayjs(newValue);
    setGlobalFilter(selectedDate.format("YYYY-MM-DD"));
    setGlobalFilterValue(newValue);
  };

  const weekDataPicker = (type: "start" | "end") => (newValue: Dayjs) => {
    if (type === "start") {
      setStartDate(newValue);
    } else if (type === "end") {
      setEndDate(newValue);
    }
  };

  const monthDataPicker = (newValue: any) => {
    let selectedDate = dayjs(newValue);
    setGlobalFilter(selectedDate.format("YYYY-MM"));
    setGlobalFilterValue(newValue);
  };

  useEffect(() => {
    if (selectedOption === "주간") {
      filterRows(startDate, endDate);
    }
  }, [selectedOption, startDate, endDate]);

  // row 필터링
  const filterRows = useCallback((start: Dayjs | null, end: Dayjs | null) => {
    if (!start || !end) return console.log("dayRows", dayRows);

    let filteredData = dayRows.filter(
      (row: any) => {
        return (
          dayjs(row.original.day).isSameOrAfter(start) &&
          dayjs(row.original.day).isSameOrBefore(end)
        );
      },

      [dayRows]
    );
    setFilteredRows(filteredData);
  }, []);

  let costRows = selectedOption === "주간" ? pageData : rows;

  //총액
  const totalCost = costRows
    .reduce((acc: any, row: any) => {
      if (row.original.cost) {
        const cost = parseInt(row.original.cost.replace(/,/g, ""));
        return acc + cost;
      }
      return acc;
    }, 0)
    .toLocaleString();

  return (
    <TableRoot>
      <TableContainer className="tableWrap">
        {/* 상단 메뉴바 전체 컨테이너 */}
        <MDBox className="tableContainer">
          {/* 일간 인풋바 */}
          <DropDown
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            defaultValue="일간"
            value={selectedOption}
            options={["일간", "주간", "월간"]}
            size="medium"
            width="5rem"
            variant="standard"
          />
          {/* 달력 컴포넌트 */}
          <MDBox className="calendar">
            {selectedOption === "일간" && (
              <DaliyPicker
                globalFilterValue={globalFilterValue}
                setGlobalFilterValue={setGlobalFilterValue}
                pickData={daliyDataPicker}
                selectedOption="일간"
                format="YYYY.MM.DD.dd"
              />
            )}

            {selectedOption === "주간" && (
              <WeekPicker
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                pickData={weekDataPicker}
              />
            )}

            {selectedOption === "월간" && (
              <DaliyPicker
                globalFilterValue={globalFilterValue}
                setGlobalFilterValue={setGlobalFilterValue}
                pickData={monthDataPicker}
                selectedOption="월간"
                format="YYYY.MM"
              />
            )}
          </MDBox>
          {/* 코트 , 이용권 옵션바 */}
          <DropDownOption onSubmit={onSearchChange} label="코트 종류(전체)" />
          <DropDownOption onSubmit={onSearchChange} label="이용권 종류(전체)" />

          {/* 서치바 옵션 */}
          <DropDownSearch
            setSelectedSearchOption={setSelectedSearchOption}
            defaultValue="예약자명"
            options={["예약자명", "코트종류", "이용권종류"]}
            size="small"
            width="8rem"
            isAlternativeStyle={true}
          />
          {/* 서치바 */}
          <Search selectedSearchOption={selectedSearchOption} onSubmit={onSearchChange} />
        </MDBox>
        <MDBox
          className="revenue"
          sx={{
            mt: 1,
            mb: 5,
          }}
        >
          {/* 매출 컴포넌트 */}
          <MDTypography>
            총 매출 <span className="totalCost">{totalCost}원</span>
          </MDTypography>
          <MDTypography>
            총 결제건 <span className="totalCost">{costRows.length}회</span>
          </MDTypography>
        </MDBox>

        {/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ여기까지는공통컴포넌트ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/}

        <Table {...getTableProps()}>
          {(selectedOption === "일간" || selectedOption === "주간") && (
            <RevenueTableHead headerGroups={headerGroups} />
          )}
          {/* 일간 table row 및 페이지네이션 */}
          <MDBox className="emptyBox" />

          {selectedOption === "일간" && (
            <>
              <RevenueTableBody
                rows={page}
                prepareRow={prepareRow}
                selectRevenue={selectRevenue}
                getTableBodyProps={getTableBodyProps}
              />
              <MDBox
                className="pagenation"
                p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
              >
                {pageOptions.length > 1 && (
                  <MDPagination
                    variant={pagination.variant ? pagination.variant : "gradient"}
                    color={pagination.color ? pagination.color : "info"}
                  >
                    {/* 이전페이지 버튼 */}
                    {canPreviousPage && (
                      <MDPagination item onClick={() => previousPage()}>
                        <Icon className="iconBold">chevron_left</Icon>
                      </MDPagination>
                    )}
                    {renderPagination.length > 6 ? (
                      <MDBox width="5rem" mx={1}>
                        <MDInput
                          inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                          value={customizedPageOptions[pageIndex]}
                          onChange={(event: any) => {
                            handleInputPagination(event);
                            handleInputPaginationValue(event);
                          }}
                        />
                      </MDBox>
                    ) : (
                      renderPagination
                    )}
                    {/* 다음페이지 버튼 */}
                    {canNextPage && (
                      <MDPagination item onClick={() => nextPage()}>
                        <Icon className="iconBold">chevron_right</Icon>
                      </MDPagination>
                    )}
                  </MDPagination>
                )}
              </MDBox>
            </>
          )}

          {selectedOption === "주간" && (
            <>
              <RevenueTableBody
                rows={pageData}
                prepareRow={prepareRow}
                selectRevenue={selectRevenue}
                getTableBodyProps={getTableBodyProps}
              />
              <MDBox className="pagenation" p={!showTotalEntries && pageData.length === 1 ? 0 : 3}>
                <MDPagination
                  variant={pagination.variant ? pagination.variant : "gradient"}
                  color={pagination.color ? pagination.color : "info"}
                >
                  {currentPage > 0 && (
                    <MDPagination item onClick={WeekPreviousPage}>
                      <Icon className="iconBold">chevron_left</Icon>
                    </MDPagination>
                  )}

                  {renderCustomPagination}

                  {currentPage + 1 < totalPages && (
                    <MDPagination item onClick={WeekNextPage}>
                      <Icon className="iconBold">chevron_right</Icon>
                    </MDPagination>
                  )}
                </MDPagination>
              </MDBox>
            </>
          )}
        </Table>

        {selectedOption === "월간" && (
          <RevenueCalendar
            columns={columns}
            data={data}
            setSelectedOption={setSelectedOption}
            setGlobalFilterValue={setGlobalFilterValue}
          />
        )}
      </TableContainer>
    </TableRoot>
  );
};

// Declaring default props for RevenueTable
RevenueTable.defaultProps = {
  entriesPerPage: { defaultValue: 10, entries: ["5", "10", "15", "20", "25"] },
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
};

export default RevenueTable;
