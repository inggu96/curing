import MDTypography from "components/MDTypography";
import { STYLES } from "../styled";
import { ReservationPoint } from "../types";
import dayjs from "dayjs";

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
      data-start-time={dayjs.tz(point.reservation.time.start, "utc").format("YYYY-MM-DD HH:mm")}
      data-end-time={dayjs.tz(point.reservation.time.end, "utc").format("YYYY-MM-DD HH:mm")}
      data-name={point.reservation.user.name}
    >
      <MDTypography variant="body3">{point.reservation.user.name}님</MDTypography>
    </div>
  );
};

export default RenderReservationCell;
