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

export default RKHourCell;
