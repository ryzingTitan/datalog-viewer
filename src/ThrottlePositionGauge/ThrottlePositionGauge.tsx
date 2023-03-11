import { ReactElement } from "react";
import DataGaugesProps from "../DataGauges/DataGaugesProps";
import ReactECharts from "echarts-for-react";

export default function ThrottlePositionGauge(
  dataGaugesProps: DataGaugesProps
): ReactElement {
  let throttlePosition: number;
  if (dataGaugesProps.datalogs.length > 0) {
    throttlePosition =
      dataGaugesProps.datalogs[dataGaugesProps.currentIndex].throttlePosition;
  } else {
    throttlePosition = 0;
  }

  const option = {
    series: [
      {
        type: "gauge",
        max: 100,
        progress: {
          show: true,
        },
        pointer: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, "-5%"],
          fontSize: 30,
          formatter: "{value}%",
          color: "inherit",
        },
        title: {
          offsetCenter: [0, "90%"],
          fontSize: 20,
        },
        data: [
          {
            name: "Throttle Position",
            value: throttlePosition,
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}
