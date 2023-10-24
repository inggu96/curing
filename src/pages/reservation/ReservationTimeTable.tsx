import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useCourtList } from "operations/queries/court";
import { useAcademyStore } from "store";
import { useReservationCode, useReservationList } from "operations/queries/reservation";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { ButtonGroup, Drawer } from "@mui/material";
import RKReservationDetailDrawer from "./RKReservationDetailDrawer";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { useReservationCancel } from "operations/mutations/reservation";
import FilterRow, { DisplayType } from "./components/FilterRow";
import RKWeekReservationTable from "./components/RKReservationTable/RKWeekReservationTable";
import RKDayReservationTable from "./components/RKReservationTable/RKDailyReservationTable";

const filterToCourt = (reservations: IReservation[], courtId?: string | null) => {
  if (!courtId) {
    return [];
  }
  return reservations?.filter(
    (reservation) => reservation.ticketPlan.courts.map((court) => court.id).includes(courtId) ?? []
  );
};
const ReservationTimeTable = () => {
  const academy = useAcademyStore((state) => state.academy);
  const [selectDay, setSelectDay] = useState<Dayjs>(dayjs());
  const [displayType, setDisplayType] = useState<keyof typeof DisplayType>("DAY");
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [selectReservation, setSelectReservation] = useState<IReservation | null>(null);

  const startDay = useMemo(() => selectDay.startOf("week"), [selectDay]);
  const endDay = useMemo(() => selectDay.endOf("week"), [selectDay]);

  const { data: courts, isSuccess } = useCourtList(academy?.id);
  const { data: reservationList } = useReservationList({
    academyId: academy?.id,
    start: startDay,
    end: endDay,
  });
  const { data: code } = useReservationCode(selectReservation?.id);
  const { mutate: cancelReservation } = useReservationCancel();

  const [court, setCourt] = useState<ICourt | null>(courts?.at(0));

  const filteredReservationList = useMemo(() => {
    if (displayType === "WEEK") {
      return filterToCourt(reservationList ?? [], court?.id);
    }
    return reservationList;
  }, [displayType, reservationList, court]);

  useEffect(() => {
    if (courts && courts.length > 0) {
      setCourt(courts?.at(0));
    }
  }, [isSuccess]);

  const handleClose = () => {
    setSelectReservation(null);
    setIsDetailOpen(false);
  };

  const handleClickTime = (reservation: IReservation) => {
    setSelectReservation(reservation);
    setIsDetailOpen(true);
  };

  const handleCancel = () => {
    cancelReservation(selectReservation);
    handleClose();
    setSelectReservation(null);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <FilterRow
        selectDate={selectDay}
        type={displayType}
        onChangeDate={setSelectDay}
        onChangeType={setDisplayType}
      />

      <MDBox py={2}>
        {displayType === "WEEK" && (
          <ButtonGroup>
            {courts?.map((c) => (
              <MDButton
                key={c.id}
                color={c.id === court?.id ? "primary" : "default"}
                onClick={() => setCourt(c)}
              >
                {c.name}
              </MDButton>
            ))}
          </ButtonGroup>
        )}
      </MDBox>
      {displayType === "DAY" && (
        <RKDayReservationTable
          reservations={filteredReservationList}
          courts={courts}
          date={selectDay}
          onClick={handleClickTime}
        />
      )}
      {displayType === "WEEK" && (
        <RKWeekReservationTable
          reservations={filteredReservationList}
          start={startDay}
          end={endDay}
          onClick={handleClickTime}
        />
      )}
      <Drawer
        anchor="right"
        open={isDetailOpen}
        onClose={handleClose}
        // onAnimationEnd={() => setSelectReservation(null)}
      >
        <RKReservationDetailDrawer
          onClose={handleClose}
          onCancel={handleCancel}
          reservation={selectReservation}
          code={code?.code}
        />
      </Drawer>
    </DashboardLayout>
  );
};

export default ReservationTimeTable;
