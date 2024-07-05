import * as React from "react";
import { useEffect } from "react";
import {
  CircularGaugeComponent,
  AxesDirective,
  AxisDirective,
  Inject,
  Annotations,
  AnnotationDirective,
  PointersDirective,
  PointerDirective,
  RangesDirective,
  RangeDirective,
  AnnotationsDirective,
} from "@syncfusion/ej2-react-circulargauge";

const ArcGauge = ({ idComp, annotationValue, ranges, colors }) => {
  const [color, setColor] = React.useState("");

  useEffect(() => {
    // Determine the color based on the annotationValue
    for (let i = 0; i < ranges.length - 1; i++) {
      if (annotationValue < ranges[i + 1]) {
        setColor(colors[i]);
        break;
      }
    }
  }, [annotationValue, ranges, colors]);

  return (
    <div>
      <CircularGaugeComponent
        background="transparent"
        id={idComp}
        width="70%"
        height="215px"
      >
        <Inject services={[Annotations]} />
        <AxesDirective>
          <AxisDirective
            startAngle={220}
            endAngle={140}
            radius="100%"
            minimum={0}
            maximum={ranges[ranges.length - 1]}
            lineStyle={{ width: 20, color: "#f6f7f5" }}
            majorTicks={{ height: 0, interval: 20 }}
            minorTicks={{ height: 0 }}
            labelStyle={{
              font: { fontFamily: "inherit", size: "0px" },
              position: "Outside",
              offset: 5,
            }}
          >
            <PointersDirective>
              <PointerDirective
                type="RangeBar"
                color={color}
                value={annotationValue}
                radius="110%"
                pointerWidth={15}
              />
              <PointerDirective
                type="Marker"
                markerShape="Rectangle"
                markerWidth={0}
                markerHeight={0}
                radius="98%"
                color=""
                value={60}
              />
            </PointersDirective>
            <RangesDirective>
              {ranges.slice(1).map((range, index) => (
                <RangeDirective
                  key={index}
                  start={ranges[index]}
                  end={range}
                  startWidth={10}
                  endWidth={10}
                  color={colors[index]}
                  radius="85%"
                />
              ))}
            </RangesDirective>
            <AnnotationsDirective>
              <AnnotationDirective
                content={`<div class="gaugeOneText" style="font-size:28px;font-family:inherit; color: ${color}; font-weight:bold">${annotationValue}</div>`}
                angle={5}
                zIndex="1"
                radius="0%"
              />
            </AnnotationsDirective>
          </AxisDirective>
        </AxesDirective>
      </CircularGaugeComponent>
    </div>
  );
};
export default ArcGauge;
