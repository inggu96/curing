import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import RevenueTable from "pages/revenue/RevenueTable";
import { RevenueData, RevenueColumns } from "./Data";
import { useMemo } from "react";
import dayjs from "dayjs";

const RevenueList = () => {
  const columns = useMemo(() => RevenueColumns, []);
  const data = useMemo(() => {
    return RevenueData.map((item) => ({
      ...item,
      day: dayjs(item.day).format("YYYY-MM-DD HH:mm"),
    }));
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display="flex" flexDirection="row" gap={2}></MDBox>
      <RevenueTable columns={columns} data={data} />
    </DashboardLayout>
  );
};

export default RevenueList;
