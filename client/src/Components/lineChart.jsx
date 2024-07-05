import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Tooltip,
  Category,
  LineSeries,
} from "@syncfusion/ej2-react-charts";

import { Browser } from "@syncfusion/ej2-base";

const PollutantChart = ({ data, pollutant }) => {
  const chartData = data.map((item) => {
    const { dt, components, main } = item;
    const date = new Date(dt * 1000).toLocaleString(); // Convert Unix timestamp to JavaScript Date object

    return {
      date,
      ...components,
      aqi: main.aqi, // Include AQI in the chart data
    };
  });

  return (
    <div className="w-full h-full">
      <ChartComponent
        title={`${pollutant.toUpperCase()} Concentration Trends`}
        primaryXAxis={{
          title: "Time",
          valueType: "Category",
          labelIntersectAction: "Rotate45",
        }}
        primaryYAxis={{ title: "Concentration (units)" }}
        legendSettings={{ visible: true }}
        tooltip={{ enable: true }}
        width={Browser.isDevice ? "100%" : "100%"}
        height={Browser.isDevice ? "80%" : "80%"}
      >
        <Inject services={[Legend, Tooltip, Category, LineSeries]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            type="Line"
            dataSource={chartData}
            xName="date"
            yName={pollutant}
            name={pollutant.toUpperCase()}
            marker={{ visible: true }}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default PollutantChart;
