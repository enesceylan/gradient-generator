import { useState, useEffect } from "react";
import RGBtoHex from "../../../utils/RGBtoHex";

export default function ColorStop({
  index,
  colorStops,
  selectedColorStop,
  setSelectedColorStop,
  setColorStops,
}) {
  const [hex, setHex] = useState(
    RGBtoHex(
      colorStops[index].rgba.r,
      colorStops[index].rgba.g,
      colorStops[index].rgba.b
    )
  );

  useEffect(() => {
    setHex(
      RGBtoHex(
        colorStops[index].rgba.r,
        colorStops[index].rgba.g,
        colorStops[index].rgba.b
      )
    );
  }, [colorStops[index]]);

  const handleStopDelete = () => {
    if (colorStops.length > 2) {
      const stopToDelete = colorStops[selectedColorStop];
      const newColorStops = colorStops.filter(
        (colorStop) => colorStop.position !== stopToDelete.position
      );

      setColorStops(newColorStops);
      setSelectedColorStop(0);
    }
  };

  return (
    <div
      className={`color-stop${selectedColorStop === index ? " active" : ""}`}
      onPointerDown={() => setSelectedColorStop(index)}
    >
      <div className="stop-color">
        <div
          className="stop-color-bg"
          style={{
            backgroundColor: `rgb(${colorStops[index].rgba.r}, ${colorStops[index].rgba.g}, ${colorStops[index].rgba.b})`,
          }}
        ></div>
      </div>
      <div className="stop-hex">
        <input type="text" maxLength={7} value={hex} readOnly />
      </div>
      <div className="stop-position">
        <input
          type="text"
          maxLength={3}
          value={`${Math.round(colorStops[index].position)}`}
          readOnly
        />
      </div>
      <div className="stop-action">
        <button
          className="stop-action-button"
          onPointerDown={() => handleStopDelete()}
        >
          x
        </button>
      </div>
    </div>
  );
}
