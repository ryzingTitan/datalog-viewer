"use client";

import DatalogProps from "@/interfaces/DatalogProps";
import { useEffect, useState, useTransition } from "react";
import Datalog from "@/interfaces/Datalog";
import GetDatalogs from "@/actions/datalogs/GetDatalogs";
import { enqueueSnackbar } from "notistack";
import { format, parseISO } from "date-fns";
import { LineChart } from "@mui/x-charts";

export default function TemperatureGraph(datalogProps: DatalogProps) {
  const [datalogs, setDatalogs] = useState(Array<Datalog>);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        if (datalogProps.sessionId !== null) {
          setDatalogs(await GetDatalogs(datalogProps.sessionId));
        }
      } catch (error: any) {
        setDatalogs(Array());
        enqueueSnackbar(error.message, { variant: "error" });
      }
    });
  }, [datalogProps.sessionId]);

  const labels = Array<Date>();
  const intakeTemperatureDataPoints = Array<number>();
  const coolantTemperatureDataPoints = Array<number>();
  datalogs.forEach((datalog) => {
    labels.push(parseISO(datalog.timestamp));
    intakeTemperatureDataPoints.push(datalog.intakeAirTemperature);
    coolantTemperatureDataPoints.push(datalog.coolantTemperature);
  });

  return (
    <LineChart
      loading={isPending}
      sx={{
        "& .MuiMarkElement-root": {
          display: "none",
        },
      }}
      slotProps={{
        legend: {
          direction: "row",
        },
      }}
      xAxis={[
        {
          data: labels,
          label: "Timestamp",
          scaleType: "time",
          tickMinStep: 300000,
          valueFormatter: (value: Date) => format(value, "h:mm a"),
        },
      ]}
      yAxis={[
        {
          valueFormatter: (value: string) => `${value} \u2109`,
        },
      ]}
      series={[
        {
          data: intakeTemperatureDataPoints,
          label: "Intake Air Temperature",
          valueFormatter: (value) => `${value} \u2109`,
        },
        {
          data: coolantTemperatureDataPoints,
          label: "Coolant Temperature",
          valueFormatter: (value) => `${value} \u2109`,
        },
      ]}
      tooltip={{
        trigger: "axis",
      }}
      height={400}
    />
  );
}
