import { ReactElement } from "react";
import ReactECharts from "echarts-for-react";
import GraphProps from "../Session/GraphProps";
import { Box } from "@mui/system";
import { format, parseISO } from "date-fns";

export default function BoostPressureGraph(
  graphProps: GraphProps
): ReactElement {
  const labels = Array<string>();
  const boostPressureDataPoints = Array<number>();
  graphProps.datalogs.forEach((datalog) => {
    labels.push(format(parseISO(datalog.timestamp), "h:mm:ss a"));
    boostPressureDataPoints.push(datalog.boostPressure);
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
