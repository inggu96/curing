import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import { SettlementData, SettlementColumns } from "./Data";
import { useMemo } from "react";
import dayjs from "dayjs";
import SettlementTable from "examples/Tables/SettlementTable";

const SettlementList = () => {
  const columns = useMemo(() => SettlementColumns, []);
  const data = useMemo(() => {
    return SettlementData.map((item) => ({
      ...item,
      day: dayjs(item.day).format("YYYY-MM-DD HH:mm"),
    }));
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display="flex" flexDirection="row" gap={2}></MDBox>
      <SettlementTable columns={columns} data={data} />
    </DashboardLayout>
  );
};

export default SettlementList;
