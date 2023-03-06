import { ReactElement } from "react";
import ReactECharts from "echarts-for-react";
import GraphProps from "../Session/GraphProps";
import { Box } from "@mui/system";
import { format, parseISO } from "date-fns";

export default function TemperatureGraph(graphProps: GraphProps): ReactElement {
  const labels = Array<string>();
  const intakeTemperatureDataPoints = Array<number>();
  const coolantTemperatureDataPoints = Array<number>();
  graphProps.datalogs.forEach((datalog) => {
    labels.push(format(parseISO(datalog.timestamp), "h:mm:ss a"));
    intakeTemperatureDataPoints.push(datalog.intakeAirTemperature);
    coolantTemperatureDataPoints.push(datalog.coolantTemperature);
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
