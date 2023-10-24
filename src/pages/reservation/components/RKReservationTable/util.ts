import dayjs, { Dayjs } from "dayjs";
import { ReservationPoint } from "./types";

export const convertToReservation = (reservation: IReservation) => {
  const {
    time: { start, end },
  } = reservation;

  const startTime = dayjs.tz(start, "utc");
  const endTime = dayjs.tz(end, "utc");

  // console.log(startTime.);
  const startPoint = startTime.hour() * 6 + Math.floor(startTime.minute() / 10);
  const endPoint = endTime.hour() * 6 + Math.floor(endTime.minute() / 10);

  return { startPoint, endPoint, sDay: startTime.day(), eDay: endTime.day(), reservation };
};

export const convertToReservationDayMap = (reservationPoints: ReservationPoint[]) => {
  const reservationDayMap = new Map<number, ReservationPoint[]>();

  reservationPoints.forEach((reservationPoint) => {
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

export const convertToReservationCourtDailyMap = (
  courts: ICourt[],
  reservationPoints: ReservationPoint[]
) => {
  const resultMap = new Map<string, ReservationPoint[]>();

  courts?.forEach((court) => {
    const _reservationPoints = reservationPoints.filter((reservationPoint) => {
      const { reservation } = reservationPoint;
      return reservation.ticketPlan.courts.at(0)?.id === court.id;
    });

    resultMap.set(court.id, _reservationPoints);
  });

  return resultMap;
};
