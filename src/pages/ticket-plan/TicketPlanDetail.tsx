import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAcademyStore } from "store";
import TicketPlanForm from "components/TicketPlanForm";
import { useCourtList } from "operations/queries/court";
import { useUpdateTicketPlan } from "operations/mutations/ticket-plan";
import { useEffect } from "react";
import FormSubmit from "components/FormSubmit";
import { useTicketPlanDetail } from "operations/queries/ticket-plan";
import { validTicketPlan } from "utils/validate";
import { ITicketWithPlan } from "types/ticket";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { typeToText } from "utils/ticket";
import MDButton from "components/MDButton";
import StickyGroup from "components/StickyGroup";

interface TicketPlanDetailProps {
  type?: TicketPlanWithAcademy["type"];
}

const TicketPlanDetail = ({ type = "ticket" }: TicketPlanDetailProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const academy = useAcademyStore((state) => state.academy);
  const { data, isSuccess: isSuccessTicketPlan } = useTicketPlanDetail(id);
  const methods = useForm<TicketPlanSubmitValue>({
    defaultValues: {
      ...data,
      expiredTime: null,
      academy: academy?.id,
      type: type,
    },
  });

  const { data: courts } = useCourtList(academy?.id);
  const { mutate, isSuccess } = useUpdateTicketPlan();

  const handleSave = (ticketPlan: TicketPlanSubmitValue) => {
    const validResult = validTicketPlan(ticketPlan);

    if (validResult.length > 0) {
      validResult.forEach((item) => {
        methods.setError(item.fieldName, {
          type: item.type,
          message: item.message,
        });
      });
      return;
    }

    mutate(ticketPlan);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessTicketPlan) {
      methods.reset({
        ...data,
        expiredTime: null,
        academy: academy?.id,
        type: "ticket",
      });
    }
  }, [isSuccessTicketPlan]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox sx={{ mb: 1 }}>
        <MDTypography variant="h5">{typeToText(type)} 상세 페이지</MDTypography>
      </MDBox>
      <MDBox mb={1} justifyContent="flex-end" display="flex">
        <MDButton onClick={() => navigate(`/admin/ticket-plan/${id}/user`)}>
          이용권 보유자 목록 보기
        </MDButton>
      </MDBox>
      {isSuccessTicketPlan && (
        <FormProvider {...methods}>
          <TicketPlanForm courts={courts} modify />
        </FormProvider>
      )}

      <FormSubmit onSubmit={methods.handleSubmit(handleSave)} />
    </DashboardLayout>
  );
};

export default TicketPlanDetail;
