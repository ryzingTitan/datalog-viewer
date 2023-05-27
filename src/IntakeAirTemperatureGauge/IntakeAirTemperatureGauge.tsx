import { ReactElement } from "react";
import DataGaugesProps from "../DataGauges/DataGaugesProps";
import ReactECharts from "echarts-for-react";

export default function IntakeAirTemperatureGauge(
  dataGaugesProps: DataGaugesProps
): ReactElement {
  const intakeAirTemperature =
    dataGaugesProps.datalogs[dataGaugesProps.currentIndex].intakeAirTemperature;

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
            name: "Intake Air Temperature",
            value: intakeAirTemperature,
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option}></ReactECharts>;
}
