import { ReactElement } from "react";
import DataGaugesProps from "../DataGauges/DataGaugesProps";
import ReactECharts from "echarts-for-react";

export default function BoostPressureGauge(
  dataGaugesProps: DataGaugesProps
): ReactElement {
  const boostPressure =
    dataGaugesProps.datalogs[dataGaugesProps.currentIndex].boostPressure;

  const option = {
    series: [
      {
        type: "gauge",
        max: 30,
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
          formatter: "{value} PSI",
          color: "inherit",
        },
        title: {
          offsetCenter: [0, "90%"],
          fontSize: 20,
        },
        data: [
          {
            name: "Boost Pressure",
            value: boostPressure,
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}
