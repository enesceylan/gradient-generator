import { useState, useEffect } from "react";

import GetBoundingOffset from "../../utils/GetBoundingOffset";
import RGBtoHSV from "../../utils/RGBtoHSV";
import HSVtoRGB from "../../utils/HSVtoRGB";

export default function ColorPicker({
  colorStops,
  selectedColorStop,
  currentColor,
  setCurrentColor,
  setSelectedColor,
  hue,
}) {
  const [isStopDragging, setIsStopDragging] = useState(false);
  const [topOffset, setTopOffset] = useState(0);
  const [leftOffset, setLeftOffset] = useState(100);

  useEffect(() => {
    setCurrentColor(colorStops[selectedColorStop]);
  }, [selectedColorStop]);

  useEffect(() => {
    let hsv = RGBtoHSV(
      currentColor.rgba.r,
      currentColor.rgba.g,
      currentColor.rgba.b
    );

    setTopOffset(100 - hsv[2] * 100);
    setLeftOffset(hsv[1] * 100);
  }, [currentColor]);

  const handleColorPick = (e) => {
    const gradientContainer = document.getElementById("cursor-event-container");

    setTopOffset(GetBoundingOffset(e, gradientContainer, "top"));
    setLeftOffset(GetBoundingOffset(e, gradientContainer, "left"));

    const newRgb = HSVtoRGB(hue, leftOffset / 100, (100 - topOffset) / 100);
    
    setSelectedColor({
      rgba: {
        r: newRgb[0],
        g: newRgb[1],
        b: newRgb[2],
        a: currentColor.rgba.a,
      },
      position: colorStops[selectedColorStop].position,
    });
  };

  return (
    <div
      className="color-picker"
      id="color-picker-gradient"
      style={{
        background: `linear-gradient(to right, transparent, hsl(${
          RGBtoHSV(
            colorStops[selectedColorStop].rgba.r,
            colorStops[selectedColorStop].rgba.g,
            colorStops[selectedColorStop].rgba.b
          )[0] * 360
        }, 100%, 50%))`,
      }}
      onPointerMove={(e) => isStopDragging && handleColorPick(e)}
    >
      <div
        id="gradient-cursor"
        onPointerDown={() => setIsStopDragging(true)}
        onPointerUp={() => setIsStopDragging(false)}
        style={{
          top: `${topOffset}%`,
          left: `${leftOffset}%`,
        }}
      >
        <div className="cursor-ring outer"></div>
        <div className="cursor-ring inner"></div>
      </div>
      <div className="gradient-bg1"></div>
      <div className="gradient-bg2" id="cursor-event-container"></div>
    </div>
  );
}
