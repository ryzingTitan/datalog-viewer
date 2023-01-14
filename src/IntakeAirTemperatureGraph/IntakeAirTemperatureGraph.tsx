import {
  BarElement,
  CartesianScaleOptions,
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
  Point,
  PointElement,
  ScaleChartOptions,
  ScaleOptions,
  TimeScale,
  TimeSeriesScale,
  Title,
  TitleOptions,
  Tooltip,
} from "chart.js";
import { ReactElement } from "react";
import { Bar, Line } from "react-chartjs-2";
import IntakeAirTemperatureProps from "./IntakeAirTemperatureProps";
import autocolors from "chartjs-plugin-autocolors";
import zoomPlugin from "chartjs-plugin-zoom";
import "chartjs-adapter-date-fns";
import Datapoint from "./Datapoint";
import getUnixTime from "date-fns/getUnixTime";
import parseISO from "date-fns/parseISO";
import { enUS } from "date-fns/locale";

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
    zoomPlugin,
    TimeScale,
    TimeSeriesScale
  );

  const options = {} as ChartOptions<"line">;
  options.responsive = true;
  options.plugins = {} as PluginOptionsByType<"line">;
  options.plugins.legend = {} as LegendOptions<"line">;
  options.plugins.legend.position = "top";
  options.plugins.title = {} as TitleOptions;
  options.plugins.title.display = true;
  options.plugins.title.text = "Intake Air Temperature";
  options.scales = {
    y: {
      type: "linear",
    },
    x: {
      // type: 'time',
      type: "timeseries",
      ticks: {
        source: "data",
      },
      // time: {
      //   unit: 'minute'
      // },
      adapters: {
        date: {
          locale: enUS,
        },
      },
    },
    // y1: {
    //   type: 'linear',
    //   display: true,
    //   position: 'right',
    //   grid: {
    //     drawOnChartArea: false
    //   }
    // }
  };
  options.indexAxis = "x";
  // options.parsing = false
  options.normalized = true;
  options.plugins = {
    decimation: {
      enabled: false,
      algorithm: "lttb",
      samples: 10,
      threshold: 1000,
    },
  };

  const labels = Array<string>();
  // const dataPoints = Array<Point>();
  const dataPoints = Array<number>();
  intakeAirTemperatureProps.datalogs.forEach((datalog) => {
    if (
      datalog.timestamp !== undefined &&
      datalog.intakeAirTemperature !== undefined &&
      datalog.intakeAirTemperature !== null &&
      datalog.intakeAirTemperature > 150
    ) {
      labels.push(datalog.timestamp);
      const unixTime = getUnixTime(parseISO(datalog.timestamp));
      // labels.push(unixTime)

      // dataPoints.push({ y: datalog.intakeAirTemperature, x : unixTime });
      dataPoints.push(datalog.intakeAirTemperature);
    }
  });

  let dataset = {} as ChartDataset<"line">;
  dataset.label = intakeAirTemperatureProps.sessionId;
  dataset.data = dataPoints;
  dataset.yAxisID = "y";
  dataset.xAxisID = "x";
  dataset.indexAxis = "x";
  dataset.type = "line";
  // dataset.parsing = false

  const dataset2 = {} as ChartDataset<"line">;
  dataset2.label = "boost";
  dataset2.data = [10.5, 11, 15, 5, 0, 20, 19.5];
  dataset2.yAxisID = "y1";

  const data = {} as ChartData<"line">;
  data.labels = labels;
  // data.datasets = [dataset, dataset2];

  data.datasets = [dataset];

  // console.log(data.datasets)

  return (
    <Line options={options} data={data}></Line>
    // <Bar options={options} data={data} />
  );
}
