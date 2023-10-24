import { styled } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import dayjs from "dayjs";
import { useCallback } from "react";

const STYLES = {
  CELL_WIDTH: 120,
  CELL_HEIGHT: 24,
};

interface RKHeaderCellProps {
  label?: string;
  weekend?: string;
}

const RKHeaderCell = ({ label, weekend }: RKHeaderCellProps) => (
  <div className="header-cell" style={{ width: STYLES.CELL_WIDTH }}>
    <MDTypography variant="body3">{label}</MDTypography>
    <MDTypography variant="body3">{weekend}</MDTypography>
  </div>
);

const RKHourCell = ({ hour }: { hour: string }) => (
  <div className="hour-group">
    <div className="hour-group-cell hour-cell">{hour}시</div>
    <div className="hour-group-cell minute-cell">00분</div>
    <div className="hour-group-cell minute-cell">10분</div>
    <div className="hour-group-cell minute-cell">20분</div>
    <div className="hour-group-cell minute-cell">30분</div>
    <div className="hour-group-cell minute-cell">40분</div>
    <div className="hour-group-cell minute-cell">50분</div>
  </div>
);

interface RKReservationTimeTableProps {
  reservations: IReservation[];
  start?: dayjs.Dayjs;
  end?: dayjs.Dayjs;
  onClick: (reservation: IReservation) => void;
}

interface ReservationPoint {
  startPoint: number;
  endPoint: number;
  sDay: number;
  eDay: number;
  reservation: IReservation;
}

const convertToReservation = (reservation: IReservation) => {
  const {
    time: { start, end },
  } = reservation;

  const startTime = dayjs(start).subtract(9, "hour");
  const endTime = dayjs(end).subtract(9, "hour");

  const startPoint = startTime.hour() * 6 + Math.floor(startTime.minute() / 10);
  const endPoint = endTime.hour() * 6 + Math.floor(endTime.minute() / 10);

  return { startPoint, endPoint, sDay: startTime.day(), eDay: endTime.day(), reservation };
};

const convertToReservationDayMap = (reservationPoints: ReservationPoint[]) => {
  const reservationDayMap = new Map<number, ReservationPoint[]>();

  reservationPoints?.forEach((reservationPoint) => {
    const { sDay, eDay } = reservationPoint;

    if (sDay === eDay) {
      const reservationPoints = reservationDayMap.get(sDay) || [];
      reservationPoints.push(reservationPoint);
      reservationDayMap.set(sDay, reservationPoints);
    } else {
      const reservationPoints = reservationDayMap.get(sDay) || [];
      reservationPoints.push({ ...reservationPoint, eDay: sDay });
      reservationDayMap.set(sDay, reservationPoints);

      const reservationPoints2 = reservationDayMap.get(eDay) || [];
      reservationPoints2.push({ ...reservationPoint, sDay: 0, eDay: eDay });
      reservationDayMap.set(eDay, reservationPoints2);
    }
  });

  return reservationDayMap;
};

interface RenderReservationCellProps {
  point: ReservationPoint;
  onClick?: () => void;
}

const RenderReservationCell = ({ point, onClick }: RenderReservationCellProps) => {
  const endPoint = point.endPoint === 0 ? 144 : point.endPoint;

  return (
    <div
      className="time-point"
      style={{
        height: STYLES.CELL_HEIGHT * (endPoint - point.startPoint),
        top: STYLES.CELL_HEIGHT * point.startPoint + Math.floor(point.startPoint / 6),
      }}
      onClick={onClick}
    >
      <MDTypography variant="body3">{point.reservation.user.name}님</MDTypography>
    </div>
  );
};

const RKReservationTimeTable = ({
  reservations,
  start,
  end,
  onClick,
}: RKReservationTimeTableProps) => {
  const reservatonPointMap = convertToReservationDayMap(
    reservations?.map(convertToReservation) ?? []
  );

  return (
    <RKReservationTimeTableRoot>
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
    </RKReservationTimeTableRoot>
  );
};

const RKReservationTimeTableRoot = styled(MDBox)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(8, 120px)",

  ".hour-group-wrapper": {
    ".hour-group": {
      display: "grid",
      gridTemplateRows: "repeat(6, 1fr)",
      gridTemplateColumns: "repeat(2, 1fr)",
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor: theme.palette.black,
      borderBottomColor: theme.palette.black,
      borderStyle: "solid",
      gridColumnGap: 4,
      ...theme.typography.body3,

      ".hour-group-cell": {
        backgroundColor: theme.palette.white.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: theme.palette.grey[300],
        height: STYLES.CELL_HEIGHT,

        "&:last-child": {
          borderBottomWidth: 0,
        },
      },

      ".hour-cell": {
        backgroundColor: theme.palette.white,
        gridRow: "span 6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
        borderBottomWidth: 0,
      },
    },
  },
  ".time-group": {
    position: "relative",
    ".time-cell": {
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.grey[300],
      width: STYLES.CELL_WIDTH,
      height: STYLES.CELL_HEIGHT,

      "&.no-border": {
        height: STYLES.CELL_HEIGHT + 1,
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.black.main,
        borderBottomStyle: "solid",
      },
    },

    ".time-point": {
      position: "absolute",
      width: "100%",
      backgroundColor: `${theme.palette.primary.main}99`,
      paddingLeft: 10,
      paddingTop: 5,
    },
  },
  ".header-cell": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 0,
    borderRight: 1,
    borderBottomWidth: 1,
    borderColor: theme.palette.grey[300],
    borderBottomColor: theme.palette.black.main,
    borderStyle: "solid",
    backgroundColor: theme.palette.white.main,
  },
}));

export default RKReservationTimeTable;
