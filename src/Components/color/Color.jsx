import "../../css/Color.css";

import ColorPicker from "./ColorPicker";
import ColorControls from "./ColorControls";
import ColorStops from "./ColorStops/ColorStops";
import { useState } from "react";

export default function Color({
  colorStops,
  setColorStops,
  selectedColorStop,
  setSelectedColorStop,
  setSelectedColor,
  hue,
  setHue,
  screenWidth,
}) {
  const [currentColor, setCurrentColor] = useState(
    colorStops[selectedColorStop]
  );

  return (
    <div className="panel-color">
      {screenWidth < 768 && (
        <>
          <ColorPicker
            colorStops={colorStops}
            selectedColorStop={selectedColorStop}
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            setSelectedColor={setSelectedColor}
            hue={hue}
          />
          <ColorControls
            colorStops={colorStops}
            selectedColorStop={selectedColorStop}
            setSelectedColor={setSelectedColor}
            setHue={setHue}
          />
        </>
      )}
      {screenWidth >= 768 && (
        <div className="color-selector-wrapper">
          <ColorPicker
            colorStops={colorStops}
            selectedColorStop={selectedColorStop}
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            setSelectedColor={setSelectedColor}
            hue={hue}
          />
          <ColorControls
            colorStops={colorStops}
            selectedColorStop={selectedColorStop}
            setSelectedColor={setSelectedColor}
            setHue={setHue}
          />
        </div>
      )}
      <ColorStops
        colorStops={colorStops}
        setColorStops={setColorStops}
        selectedColorStop={selectedColorStop}
        setSelectedColorStop={setSelectedColorStop}
      />
    </div>
  );
}
