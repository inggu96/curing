const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
const WeekDays = () => {
  return (
    <thead>
      <tr style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px" }}>
        {weekdays.map((weekday, idx) => {
          return (
            <td
              style={{
                height: "40px",
                lineHeight: "20px",
                textAlign: "left",
                backgroundColor: "#ffff",
                padding: "10px",
                fontSize: "14px",
                fontWeight: "600",
                color: `${(idx === 0 || idx === 6) && "#F44334"}`,
              }}
              key={weekday}
            >
              {weekday}
            </td>
          );
        })}
      </tr>
    </thead>
  );
};

export default WeekDays;
