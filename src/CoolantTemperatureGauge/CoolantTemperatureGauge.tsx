import { ReactElement } from "react";
import DataGaugesProps from "../DataGauges/DataGaugesProps";
import ReactECharts from "echarts-for-react";

export default function CoolantTemperatureGauge(
  dataGaugesProps: DataGaugesProps
): ReactElement {
  let coolantTemperature: number;
  if (dataGaugesProps.datalogs.length > 0) {
    coolantTemperature =
      dataGaugesProps.datalogs[dataGaugesProps.currentIndex].coolantTemperature;
  } else {
    coolantTemperature = 0;
  }

  const option = {
    series: [
      {
        type: "gauge",
        max: 250,
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
          formatter: "{value} °F",
          color: "inherit",
        },
        title: {
          offsetCenter: [0, "90%"],
          fontSize: 20,
        },
        data: [
          {
            name: "Coolant Temperature",
            value: coolantTemperature,
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}
