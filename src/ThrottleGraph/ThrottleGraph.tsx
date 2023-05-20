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
import { Box } from "@mui/system";
import { format, parseISO } from "date-fns";
import { useLoaderData } from "react-router-dom";
import Datalog from "../Session/Datalog";

export default function ThrottleGraph(): ReactElement {
  const datalogs: Datalog[] = useLoaderData() as Datalog[];

  echarts.use([
    TitleComponent,
    GridComponent,
    CanvasRenderer,
    LinesChart,
    ToolboxComponent,
    TooltipComponent,
  ]);

  const labels = Array<string>();
  const engineRpmDataPoints = Array<number>();
  const throttlePositionDataPoints = Array<number>();
  datalogs.forEach((datalog) => {
    labels.push(format(parseISO(datalog.timestamp), "h:mm:ss a"));
    engineRpmDataPoints.push(datalog.engineRpm);
    throttlePositionDataPoints.push(datalog.throttlePosition);
  });

  const option = {
    animationDuration: 10000,
    title: {
      text: "Throttle Data",
      left: "center",
    },
    xAxis: {
      data: labels,
      name: "Timestamp",
      nameLocation: "center",
      nameGap: 30,
    },
    yAxis: [
      {
        min: "dataMin",
        axisLabel: {
          formatter: "{value} RPM",
        },
      },
      {
        name: "Throttle Position",
        axisLabel: {
          formatter: "{value} %",
        },
      },
    ],
    series: [
      {
        data: engineRpmDataPoints,
        type: "line",
        name: "Engine RPM",
        yAxisIndex: 0,
        tooltip: {
          valueFormatter: (value: string) => value + " RPM",
        },
      },
      {
        data: throttlePositionDataPoints,
        type: "bar",
        name: "Throttle Position",
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: (value: string) => value + " %",
        },
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
