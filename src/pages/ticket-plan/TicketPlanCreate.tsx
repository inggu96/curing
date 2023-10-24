import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { FormProvider, useForm } from "react-hook-form";
import TicketPlanForm from "components/TicketPlanForm";
import { useCourtList } from "operations/queries/court";
import { useAcademyStore } from "store";
import FormSubmit from "components/FormSubmit";
import MDTypography from "components/MDTypography";
import { useCreateTicketPlan } from "operations/mutations/ticket-plan";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validTicketPlan } from "utils/validate";

const TicketPlanCreate = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const academy = useAcademyStore((state) => state.academy);
  const methods = useForm<TicketPlanSubmitValue>({
    defaultValues: state ?? {
      expiredTime: null,
      academy: academy?.id,
      type: "ticket",
    },
  });

  const { data: courts } = useCourtList(academy?.id);
  const { mutate, isSuccess } = useCreateTicketPlan();

  const handleSave = (ticketPlan: TicketPlanSubmitValue) => {
    const validResult = validTicketPlan(ticketPlan);
    if (validResult.length !== 0) {
      validResult.forEach((result) => {
        const { fieldName, ...error } = result;
        methods.setError(fieldName, {
          type: error.type,
          message: error.message,
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

  if (!academy?.id) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDTypography>선택된 아카데미가 없습니다.</MDTypography>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FormProvider {...methods}>
        <TicketPlanForm courts={courts} />
      </FormProvider>
      <FormSubmit onSubmit={methods.handleSubmit(handleSave)} />
    </DashboardLayout>
  );
};

export default TicketPlanCreate;
