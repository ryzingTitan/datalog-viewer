import { ReactElement } from "react";
import ReactECharts from "echarts-for-react";
import { Box } from "@mui/system";
import { format, parseISO } from "date-fns";
import { useLoaderData } from "react-router-dom";
import Datalog from "../Session/Datalog";

export default function BoostPressureGraph(): ReactElement {
  const datalogs: Datalog[] = useLoaderData() as Datalog[];

  const labels = Array<string>();
  const boostPressureDataPoints = Array<number>();
  datalogs.forEach((datalog) => {
    labels.push(format(parseISO(datalog.timestamp), "h:mm:ss a"));
    boostPressureDataPoints.push(datalog.data.boostPressure);
  });

  const option = {
    animationDuration: 10000,
    title: {
      text: "Boost Pressure",
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
        formatter: "{value} PSI",
      },
    },
    series: [
      {
        data: boostPressureDataPoints,
        type: "line",
        name: "Boost Pressure",
      },
    ],
    tooltip: {
      trigger: "axis",
      valueFormatter: (value: string) => value + " PSI",
    },
  };

  return (
    <Box sx={{ paddingTop: 2 }}>
      <ReactECharts option={option}></ReactECharts>
    </Box>
  );
}
