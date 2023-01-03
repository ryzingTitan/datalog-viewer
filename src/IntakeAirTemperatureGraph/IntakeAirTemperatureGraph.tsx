import {
  BarElement,
  CategoryScale,
  Chart,
  ChartData,
  ChartDataset,
  ChartOptions,
  Legend,
  LegendOptions,
  LinearScale,
  LineElement,
  PluginOptionsByType,
  PointElement,
  Title,
  TitleOptions,
  Tooltip,
} from "chart.js";
import { ReactElement } from "react";
import { Bar, Line } from "react-chartjs-2";
import IntakeAirTemperatureProps from "./IntakeAirTemperatureProps";
import autocolors from "chartjs-plugin-autocolors";
import zoomPlugin from "chartjs-plugin-zoom";

export default function IntakeAirTemperatureGraph(
  intakeAirTemperatureProps: IntakeAirTemperatureProps
): ReactElement {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    autocolors,
    zoomPlugin
  );

  const options = {} as ChartOptions<"bar">;
  options.responsive = true;
  options.plugins = {} as PluginOptionsByType<"bar">;
  options.plugins.legend = {} as LegendOptions<"bar">;
  options.plugins.legend.position = "top";
  options.plugins.title = {} as TitleOptions;
  options.plugins.title.display = true;
  options.plugins.title.text = "Intake Air Temperature";

  const labels = Array<string>();
  const dataPoints = Array<number>();
  intakeAirTemperatureProps.datalogs.forEach((datalog) => {
    if (
      datalog.timestamp !== undefined &&
      datalog.intakeAirTemperature !== undefined
    ) {
      labels.push(datalog.timestamp);
      dataPoints.push(datalog.intakeAirTemperature);
    }
  });

  const dataset = {} as ChartDataset<"bar">;
  dataset.label = intakeAirTemperatureProps.sessionId;
  dataset.data = dataPoints;

  const data = {} as ChartData<"bar">;
  data.labels = labels;
  data.datasets = [dataset];

  return (
    // <Line options={options} data={data}></Line>
    <Bar options={options} data={data} />
  );
}
