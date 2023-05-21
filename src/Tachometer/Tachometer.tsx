import { ReactElement } from "react";
import DataGaugesProps from "../DataGauges/DataGaugesProps";
import ReactECharts from "echarts-for-react";

export default function Tachometer(
  dataGaugesProps: DataGaugesProps
): ReactElement {
  const engineRpm =
    dataGaugesProps.datalogs[dataGaugesProps.currentIndex].engineRpm;

  const option = {
    series: [
      {
        type: "gauge",
        max: 8,
        splitNumber: 8,
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
          formatter: "{value} RPM",
          color: "inherit",
        },
        title: {
          offsetCenter: [0, "90%"],
          fontSize: 20,
        },
        data: [
          {
            name: "Tachometer",
            value: engineRpm / 1000,
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}
