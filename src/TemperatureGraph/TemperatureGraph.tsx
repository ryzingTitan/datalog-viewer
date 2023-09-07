import { ReactElement } from "react";
import ReactECharts from "echarts-for-react";
import { Box } from "@mui/system";
import { format, parseISO } from "date-fns";
import { useLoaderData } from "react-router-dom";
import Datalog from "../Session/Datalog";

export default function TemperatureGraph(): ReactElement {
  const datalogs: Datalog[] = useLoaderData() as Datalog[];

  const labels = Array<string>();
  const intakeTemperatureDataPoints = Array<number>();
  const coolantTemperatureDataPoints = Array<number>();
  datalogs.forEach((datalog) => {
    labels.push(format(parseISO(datalog.timestamp), "h:mm:ss a"));
    intakeTemperatureDataPoints.push(datalog.data.intakeAirTemperature);
    coolantTemperatureDataPoints.push(datalog.data.coolantTemperature);
  });

  const option = {
    animationDuration: 10000,
    title: {
      text: "Temperatures",
      left: "center",
    },
    xAxis: {
      data: labels,
      name: "Timestamp",
      nameLocation: "center",
      nameGap: 30,
    },
    yAxis: {
      min: "dataMin",
      axisLabel: {
        formatter: "{value} \u2109",
      },
    },
    series: [
      {
        data: intakeTemperatureDataPoints,
        type: "line",
        name: "Intake Air Temperature",
      },
      {
        data: coolantTemperatureDataPoints,
        type: "line",
        name: "Coolant Temperature",
      },
    ],
    tooltip: {
      trigger: "axis",
      valueFormatter: (value: string) => `${value} \u2109`,
    },
  };

  return (
    <Box sx={{ paddingTop: 2 }}>
      <ReactECharts option={option}></ReactECharts>
    </Box>
  );
}
