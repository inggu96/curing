import { Grid, Card, CardContent, styled } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import RKCheckbox from "components/RKCheckbox";
import { RKLabel } from "components/RKLabel";
import RKTimeRangeWithDay from "components/RKTimeRangeWithDay";
import dayjs, { Dayjs } from "dayjs";
import { useBusinessDay } from "hooks/useBusinessDay";
import { Controller, useFormContext } from "react-hook-form";

import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import MDBoxWithOptionInfinity from "components/MDBoxWithOptionInfinity";

const TICKET_PLAN_DEFAULT_VALUE = {
  MAX_TRYS: 1,
};

interface TicketPlanCouponFormProps {
  courts: ICourt[];
  modify?: boolean;
}

const TicketPlanCouponForm = ({ courts = [], modify }: TicketPlanCouponFormProps) => {
  const {
    watch,
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<TicketPlanSubmitValue>();
  // const [selectCourts, setSelectCourt] = useState<ICourt[]>([]);

  const name = watch("name");

  const accessDurations = watch("accessDuration");
  const { deleteDay, createDay, updateDay, updateSelectDay, nextBusinessDays, renderBusinessDays } =
    useBusinessDay(accessDurations);

  const handleAddTime = () => {
    createDay({
      selectDays: [],
      startDate: null,
      endDate: null,
    });
  };

  const handleToggleCourt = (court: ICourt) => {
    if (modify) return;
    setValue("courts", [court.id]);
    // // 여러 코트 선택이 가능해졌을때 아래 코드 주석해제
    // const selectCourts = getValues("courts") ?? [];
    // if (selectCourts.includes(court.id)) {
    //   setValue(
    //     "courts",
    //     selectCourts.filter((c) => c !== court.id)
    //   );
    // } else {
    //   setValue("courts", [...selectCourts, court.id]);
    // }
  };

  const handleDeleteDay = (key: string) => {
    deleteDay(key);
  };

  useEffect(() => {
    setValue("nextAccessDuration", nextBusinessDays);
  }, [nextBusinessDays]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <MDTypography variant="body3">
              사용자가 구매하여 이용중인 쿠폰의 경우 일부 내용은 추후 수정이 제한되니 신중하게
              작성해주세요. <br />
              필요 시 쿠폰을 미노출 후 새로 생성해주이용
            </MDTypography>

            <Grid container spacing={4} sx={{ display: "flex", flexDirection: "column" }}>
              <Grid item xs={12}>
                <RKLabel>쿠폰의 이름을 입력해주세요.</RKLabel>
                <MDInput
                  fullWidth
                  {...register("name", { required: true, maxLength: 25 })}
                  placeholder="쿠폰 이름"
                />
                <MDBox display="flex" justifyContent="flex-end" p={1}>
                  <MDTypography variant="body3" color={name?.length > 25 ? "error" : "gray"}>
                    {name?.length}자 / 25자
                  </MDTypography>
                </MDBox>
              </Grid>

              <Grid item xs={12}>
                <RKLabel>이 쿠폰은 어떤 코트에서 사용되나요? (수정 제한)</RKLabel>
                <Controller
                  control={control}
                  name="courts"
                  render={({ field: { value }, formState: { errors } }) => (
                    <RKCheckbox
                      selectValues={value}
                      values={courts.map((court) => ({
                        ...court,
                        preview: court.name,
                        key: court.id,
                      }))}
                      onClick={handleToggleCourt}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <RKLabel>이 쿠폰의 시간 단위는 1회에 몇 분인가요? (수정 제한)</RKLabel>
                <MDInput
                  fullWidth
                  {...register("maxTime")}
                  defaultValue={30}
                  type="number"
                  sx={{ flex: 1 }}
                  error={errors.maxTime}
                  disabled={modify}
                  placeholder="20분"
                />
              </Grid>
              <Grid item xs={12}>
                <RKLabel>쿠폰에 포함된 횟수</RKLabel>
                <Controller
                  control={control}
                  name="maxTrys"
                  render={({ field: { value, onChange }, formState: { errors } }) => (
                    <MDBoxWithOptionInfinity
                      onClick={(isOn) => onChange(isOn ? TICKET_PLAN_DEFAULT_VALUE.MAX_TRYS : -1)}
                      value={value}
                      disabled={modify}
                    >
                      <MDInput
                        fullWidth
                        value={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        type="number"
                        error={errors.maxTrys}
                        disabled={modify}
                        placeholder="숫자만 입력, 최대 99"
                      />
                    </MDBoxWithOptionInfinity>
                  )}
                />
              </Grid>

              {/* <Grid item xs={12}>
                <RKLabel>이 쿠폰은 고객이 한번에 최대 몇 회까지 연속 예약 가능한가요?</RKLabel>
                <MDInput fullWidth />
              </Grid> */}
              {/* <Grid item xs={12}>
                <RKLabel>이 쿠폰은 고객이 하루에 최대 몇 회까지 예약 가능한가요?</RKLabel>
                <MDInput fullWidth />
              </Grid> */}

              {/* <Grid item xs={12}>
                <RKLabel>쿠폰 판매 기한 (수정 제한)</RKLabel>
                <Controller
                  control={control}
                  name="expiredTime"
                  render={({ field: { value, onChange } }) => (
                    <MDBoxWithOptionInfinity
                      value={value}
                      onClick={(isOn) => onChange(isOn ? dayjs().add(1, "month") : null)}
                      disabled={modify}
                    >
                      <MobileDateTimePicker
                        sx={{ width: "100%" }}
                        defaultValue={dayjs(value)}
                        onAccept={(e: Dayjs) => onChange(e)}
                        disabled={modify}
                      />
                    </MDBoxWithOptionInfinity>
                  )}
                />
              </Grid> */}

              {/* <Grid item xs={12}>
                <RKLabel>쿠폰 총 판매 수량 (수정 제한)</RKLabel>
                <MDBox>
                  <Controller
                    control={control}
                    name="maxQuantity"
                    render={({ field: { value, onChange } }) => (
                      <MDBoxWithOptionInfinity
                        value={value}
                        onClick={(isOn) => setValue("maxQuantity", isOn ? 0 : -1)}
                        disabled={modify}
                      >
                        <MDInput
                          fullWidth
                          value={value}
                          onChange={(e: any) => onChange(e.target.value)}
                          type="number"
                          error={errors.maxQuantity}
                          disabled={modify}
                        />
                      </MDBoxWithOptionInfinity>
                    )}
                  />
                </MDBox>
              </Grid> */}

              {/* <Grid item xs={12}>
                <RKLabel>1인당 쿠폰 구매 수량 제한</RKLabel>
                <MDInput fullWidth {...register("maxQuantity")} />
              </Grid> */}

              {/* <Grid item xs={12}>
                <RKLabel>재구매 가능 기간(일)</RKLabel>

                <Controller
                  control={control}
                  name="purchaseDuration"
                  render={({ field: { value, onChange } }) => (
                    <MDBoxWithOptionInfinity
                      value={value}
                      onClick={(isOn) => onChange(isOn ? 0 : -1)}
                      label="언제나 구매가능"
                      disabled={modify}
                    >
                      <MDInput
                        fullWidth
                        value={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        error={errors.purchaseDuration}
                        disabled={modify}
                      />
                    </MDBoxWithOptionInfinity>
                  )}
                />
              </Grid> */}
              <Grid item xs={12}>
                <RKLabel>발급 후 이용가능 일수 (수정 제한)</RKLabel>
                <Controller
                  control={control}
                  name="availableDays"
                  render={({ field: { value, onChange } }) => (
                    <MDBoxWithOptionInfinity
                      value={value}
                      onClick={(isOn) => setValue("availableDays", isOn ? 0 : 180)}
                      label="최대 이용일수"
                      disabled={modify}
                    >
                      <MDInput
                        fullWidth
                        type="number"
                        value={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        hintText="구매후 이후 가능"
                        error={errors.availableDays}
                        disabled={modify}
                        placeholder="숫자만 입력, 최대 99"
                      />
                    </MDBoxWithOptionInfinity>
                  )}
                />
                <MDTypography variant="caption" color="gray">
                  사용자가 쿠폰발급시점 기준 최대 몇일까지 이용가능한지 설정합니다.
                </MDTypography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <MDTypography variant="body3">
                  쿠폰의 운영시간을 설정해주세요. 해당 코트의 운영시간을 고려하여 설정해주세요.{" "}
                  <br />
                  쿠폰의 예약시간은 사용자에게 이번 주 월요일을 기준으로 2주 단위로 노출됩니다.
                </MDTypography>
              </Grid>
              <Grid item xs={12}>
                <MDBox sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {renderBusinessDays.map(([key, value]) => (
                    <RKTimeRangeWithDay
                      key={key}
                      startDate={value.startDate}
                      endDate={value.endDate}
                      selectDays={value.selectDays}
                      labels={["첫 예약시간", "마지막 예약시간"]}
                      onChangeStartDate={(date: Dayjs) => {
                        updateDay(key, { ...value, startDate: date });
                      }}
                      onChangeEndDate={(date: Dayjs) => {
                        updateDay(key, { ...value, endDate: date });
                      }}
                      onSelectDay={(day) => {
                        updateSelectDay(key, day as IBusinessDay["day"]);
                      }}
                      onDelete={() => {
                        handleDeleteDay(key);
                      }}
                    />
                  ))}
                </MDBox>
                <MDBox
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 1,
                    marginTop: 2,
                  }}
                >
                  <MDTypography variant="body3">시간단위 - 10분</MDTypography>
                  <MDButton variant="outlined" color="dark" onClick={handleAddTime}>
                    <AddIcon style={{ marginRight: 10 }} /> 운영시간 추가
                  </MDButton>
                </MDBox>
              </Grid>
              <Grid item xs={12}>
                <RKLabel>쿠폰에 대한 설명을 적어주세요</RKLabel>
                <MDInput
                  fullWidth
                  rows={8}
                  multiline
                  {...register("description")}
                  placeholder="쿠폰 설명"
                />
              </Grid>

              {/* <Grid item xs={12}>
                <RKLabel>쿠폰 가격을 설정해주세요.</RKLabel>
                <MDInput
                  fullWidth
                  type="number"
                  {...register("price", { required: false })}
                  disabled={modify}
                />
              </Grid> */}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TicketPlanCouponForm;
