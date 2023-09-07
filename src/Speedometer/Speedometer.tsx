import { ReactElement } from "react";
import DataGaugesProps from "../DataGauges/DataGaugesProps";
import ReactECharts from "echarts-for-react";

export default function Speedometer(
  dataGaugesProps: DataGaugesProps,
): ReactElement {
  const speed =
    dataGaugesProps.datalogs[dataGaugesProps.currentIndex].data.speed;

  const option = {
    series: [
      {
        type: "gauge",
        max: 150,
        splitNumber: 15,
        progress: {
          show: true,
        },
        pointer: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, "-5%"],
          fontSize: 20,
          formatter: "{value} MPH",
          color: "inherit",
        },
        title: {
          offsetCenter: [0, "90%"],
          fontSize: 20,
        },
        data: [
          {
            name: "Speedometer",
            value: speed,
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}
