import { ReactElement } from "react";
import ReactECharts from "echarts-for-react";
import { Box } from "@mui/system";
import { format, parseISO } from "date-fns";
import { useLoaderData } from "react-router-dom";
import Datalog from "../Session/Datalog";

export default function SpeedGraph(): ReactElement {
  const datalogs: Datalog[] = useLoaderData() as Datalog[];

  const labels = Array<string>();
  const speedDataPoints = Array<number>();
  datalogs.forEach((datalog) => {
    labels.push(format(parseISO(datalog.timestamp), "h:mm:ss a"));
    speedDataPoints.push(datalog.speed);
  });

  const option = {
    animationDuration: 10000,
    title: {
      text: "Speed",
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
        formatter: "{value} MPH",
      },
    },
    series: [
      {
        data: speedDataPoints,
        type: "line",
        name: "Speed",
      },
    ],
    tooltip: {
      trigger: "axis",
      valueFormatter: (value: string) => value + " MPH",
    },
  };

  return (
    <Box sx={{ paddingTop: 2 }}>
      <ReactECharts option={option}></ReactECharts>
    </Box>
  );
}
