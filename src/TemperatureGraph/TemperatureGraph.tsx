import { ReactElement } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { LinesChart } from "echarts/charts";
import {
  GridComponent,
  ToolboxComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import TemperatureGraphProps from "./TemperatureGraphProps";
import { Box } from "@mui/system";
import { format, parseISO } from "date-fns";

export default function TemperatureGraph(
  temperatureGraphProps: TemperatureGraphProps
): ReactElement {
  echarts.use([
    TitleComponent,
    GridComponent,
    CanvasRenderer,
    LinesChart,
    ToolboxComponent,
    TooltipComponent,
  ]);

  const labels = Array<string>();
  const intakeTemperatureDataPoints = Array<number>();
  const coolantTemperatureDataPoints = Array<number>();
  temperatureGraphProps.datalogs.forEach((datalog) => {
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
    },
    yAxis: {
      name: "\u2109",
      min: "dataMin",
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
    },
  };

  return (
    <Box sx={{ paddingTop: 2 }}>
      <ReactECharts option={option}></ReactECharts>
    </Box>
  );
}
