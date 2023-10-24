import MDBox from "components/MDBox";
import dayjs from "dayjs";
import RKHeaderCell from "./components/RKHeaderCell";
import { RKWeekReservationTableRoot } from "./styled";
import RKHourCell from "./components/RKHourCell";
import RenderReservationCell from "./components/RenderReservationCell";
import { convertToReservation, convertToReservationDayMap } from "./util";

interface RKWeekReservationTableProps {
  reservations: IReservation[];
  start?: dayjs.Dayjs;
  end?: dayjs.Dayjs;
  onClick: (reservation: IReservation) => void;
}

const RKWeekReservationTable = ({
  reservations,
  start,
  end,
  onClick,
}: RKWeekReservationTableProps) => {
  const reservatonPointMap = convertToReservationDayMap(
    reservations?.map(convertToReservation) ?? []
  );

  return (
    <RKWeekReservationTableRoot>
      <RKHeaderCell label="시간" />
      <RKHeaderCell label={`${start.date()}일`} weekend="일" />
      <RKHeaderCell label={`${start.add(1, "day").date()}일`} weekend="월" />
      <RKHeaderCell label={`${start.add(2, "day").date()}일`} weekend="화" />
      <RKHeaderCell label={`${start.add(3, "day").date()}일`} weekend="수" />
      <RKHeaderCell label={`${start.add(4, "day").date()}일`} weekend="목" />
      <RKHeaderCell label={`${start.add(5, "day").date()}일`} weekend="금" />
      <RKHeaderCell label={`${start.add(6, "day").date()}일`} weekend="토" />
      {/* 다음 row */}
      <MDBox className="hour-group-wrapper">
        {new Array(24).fill(0).map((_, index) => (
          <RKHourCell hour={`${index}`.padStart(2, "0")} key={index} />
        ))}
      </MDBox>
      {/* 데이터 타임테이블 */}
      {new Array(7).fill(0).map((_, day) => (
        <MDBox className="time-group" key={day}>
          {new Array(6 * 24).fill(0).map((_, index) => (
            <div
              key={index}
              className={(index + 1) % 6 === 0 ? "time-cell no-border" : "time-cell"}
            />
          ))}
          {reservatonPointMap.get(day)?.map((reservationPoint) => {
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

export default RKWeekReservationTable;
