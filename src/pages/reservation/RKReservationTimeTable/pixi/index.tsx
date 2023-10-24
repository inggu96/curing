import MDBox from "components/MDBox";
import { TimeTable } from "./TimeTable";
import { useEffect, useRef } from "react";

const RKReservationTimeTable = () => {
  const root = useRef<HTMLDivElement>();
  const timeTable = useRef<TimeTable>();

  useEffect(() => {
    timeTable.current = new TimeTable(root.current);
  }, []);

  return <div ref={root} style={{ width: "100%", height: "100vh" }}></div>;
};

export default RKReservationTimeTable;
