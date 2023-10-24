import MDTypography from "components/MDTypography";
import { STYLES } from "../styled";

interface RKHeaderCellProps {
  label?: string;
  weekend?: string;
}

const RKHeaderCell = ({ label, weekend }: RKHeaderCellProps) => (
  <div className="header-cell" style={{ width: STYLES.CELL_WIDTH }}>
    <MDTypography variant="body3">{label}</MDTypography>
    {weekend && <MDTypography variant="body3">{weekend}</MDTypography>}
  </div>
);
export default RKHeaderCell;
