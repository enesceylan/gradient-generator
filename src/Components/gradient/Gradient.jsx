import { useEffect, useState } from "react";

import "../../css/Gradient.css";

import ColorStopPoint from "./ColorStopPoint";

import RGBtoHSV from "../../utils/RGBtoHSV";
import GetBoundingOffset from "../../utils/GetBoundingOffset";

export default function Gradient({
  colorStops,
  setColorStops,
  handleStopChange,
  selectedColorStop,
  setSelectedColorStop,
  setHue,
}) {
  const [container, setContainer] = useState();
  const [isStopDragging, setIsStopDragging] = useState(false);

  useEffect(() => {
    setContainer(document.querySelector(".gradient-points-wrapper"));
    generateGradient(colorStops);
  }, []);

  useEffect(() => {
    generateGradient(colorStops);
  }, [colorStops]);

  //Delete a color stop when delete key is pressed
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.repeat) return;

      if (e.key === "Delete" && colorStops.length > 2) {
        const stopToDelete = colorStops[selectedColorStop];
        const newColorStops = colorStops.filter(
          (colorStop) => colorStop.position !== stopToDelete.position
        );

        setColorStops(newColorStops);
        setSelectedColorStop(0);
      }
    });
  }, [selectedColorStop]);

  const generateStopPoint = (e) => {
    if (e.target.className === "gradient-points-wrapper") {
      const generatePosition = Math.round(
        GetBoundingOffset(e, container, "left")
      );
      let posArr = colorStops.map((colorStop) => colorStop.position);
      posArr.push(generatePosition);
      posArr.sort((a, b) => a - b);
      const newStopIndex = posArr.indexOf(generatePosition);

      //new element hasn't been added yet, therefore the next item index is equal to current newStopIndex
      const nextRgb = [
        colorStops[newStopIndex].rgba.r,
        colorStops[newStopIndex].rgba.g,
        colorStops[newStopIndex].rgba.b,
      ];
      const prevRgb = [
        colorStops[newStopIndex - 1].rgba.r,
        colorStops[newStopIndex - 1].rgba.g,
        colorStops[newStopIndex - 1].rgba.b,
      ];

      const getPointValue = (index) => {
        let x;
        const x1 = prevRgb[index];
        const x2 = nextRgb[index];

        const y = generatePosition - posArr[newStopIndex - 1];
        const y1 = posArr[newStopIndex - 1];
        const y2 = posArr[newStopIndex + 1];

        x = x1 + Math.round(((x2 - x1) / (y2 - y1)) * y);
        return x;
      };

      const newRgb = [getPointValue(0), getPointValue(1), getPointValue(2)];
      setHue(RGBtoHSV(newRgb[0], newRgb[1], newRgb[2])[0]);

      let newColorStops = [...colorStops];
      newColorStops.splice(newStopIndex, 0, {
        rgba: { r: newRgb[0], g: newRgb[1], b: newRgb[2], a: 1 },
        position: generatePosition,
      });
      setColorStops(newColorStops);
      setSelectedColorStop(newStopIndex);
    }
  };

  const handleStopDrag = (e) => {
    const left = Math.round(GetBoundingOffset(e, container, "left"));

    handleStopChange({
      rgba: {
        r: colorStops[selectedColorStop].rgba.r,
        g: colorStops[selectedColorStop].rgba.g,
        b: colorStops[selectedColorStop].rgba.b,
        a: colorStops[selectedColorStop].rgba.a,
      },
      position: left,
    });
  };

  const generateGradient = (colorStops) => {
    let gradientColors = "";

    const bg = document.querySelector(".gradient-background");
    colorStops.forEach((colorStop, index) => {
      gradientColors += `rgb(${colorStop.rgba.r}, ${colorStop.rgba.g}, ${colorStop.rgba.b}) ${colorStop.position}%`;
      if (index < colorStops.length - 1) gradientColors += ", ";
    });
    bg.style.background = `linear-gradient(to right, ${gradientColors})`;
  };

  return (
    <div
      className="panel-gradient"
      onPointerUp={() => setIsStopDragging(false)}
    >
      <div className="gradient-background"></div>
      <div
        className="gradient-points-wrapper"
        onPointerDown={(e) => generateStopPoint(e)}
        onPointerMove={(e) => isStopDragging && handleStopDrag(e)}
      >
        {colorStops.map((colorStop, index) => {
          return (
            <ColorStopPoint
              key={index}
              color={colorStops[index]}
              selectedColorStop={selectedColorStop}
              setSelectedColorStop={setSelectedColorStop}
              setIsStopDragging={setIsStopDragging}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
}
