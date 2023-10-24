import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import AddIcon from "@mui/icons-material/Add";

interface ModalButtonProps {
  onClick?: () => void;
}

const ModalButton = ({ onClick }: ModalButtonProps) => (
  <MDBox>
    <MDButton
      variant="contained"
      color="error"
      sx={{ marginBottom: 1, width: "15rem" }}
      onClick={onClick}
    >
      환불하기
    </MDButton>
  </MDBox>
);

export default ModalButton;
