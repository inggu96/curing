import MDBox from "components/MDBox";
import dayjs, { Dayjs } from "dayjs";
import RKHeaderCell from "./components/RKHeaderCell";
import { RKWeekReservationTableRoot } from "./styled";
import RKHourCell from "./components/RKHourCell";
import RenderReservationCell from "./components/RenderReservationCell";
import { convertToReservation, convertToReservationCourtDailyMap } from "./util";
import { useMemo } from "react";

interface RKDayReservationTableProps {
  reservations: IReservation[];
  courts: ICourt[];
  date?: Dayjs;
  onClick: (reservation: IReservation) => void;
}

const RKDayReservationTable = ({
  reservations,
  courts,
  date,
  onClick,
}: RKDayReservationTableProps) => {
  const sDate = useMemo(() => dayjs.tz(date, "Asia/Seoul").startOf("day"), [date]);

  const reservatonPointMap = useMemo(
    () =>
      convertToReservationCourtDailyMap(
        courts,
        reservations?.map(convertToReservation)?.filter((v) => {
          const vs = dayjs.tz(v.reservation.time.start, "utc");

          if (sDate.date() === vs.date()) {
            return true;
          }

          return false;
        }) ?? []
      ),
    [courts, reservations, sDate]
  );

  return (
    <RKWeekReservationTableRoot cellCount={courts?.length ?? 0}>
      <RKHeaderCell label="시간" />
      {courts?.map((court) => (
        <RKHeaderCell label={court.name} key={court.id} />
      ))}
      {/* 다음 row */}
      <MDBox className="hour-group-wrapper">
        {new Array(24).fill(0).map((_, index) => (
          <RKHourCell hour={`${index}`.padStart(2, "0")} key={index} />
        ))}
      </MDBox>
      {/* 데이터 타임테이블 */}
      {courts?.map((court) => (
        <MDBox className="time-group" key={court.id}>
          {new Array(6 * 24).fill(0).map((_, index) => (
            <div
              key={index}
              className={(index + 1) % 6 === 0 ? "time-cell no-border" : "time-cell"}
            />
          ))}
          {reservatonPointMap.get(court.id)?.map((reservationPoint) => {
            return (
              <RenderReservationCell
                key={reservationPoint.startPoint}
                point={reservationPoint}
                onClick={() => onClick(reservationPoint.reservation)}
              />
            );
          }) ?? <></>}
        </MDBox>
      ))}
    </RKWeekReservationTableRoot>
  );
};

export default RKDayReservationTable;
