import { useEffect } from "react";

import RGBtoHSV from "../../utils/RGBtoHSV";
import HSVtoRGB from "../../utils/HSVtoRGB";

export default function ColorControls({
  colorStops,
  selectedColorStop,
  setSelectedColor,
  setHue,
}) {
  useEffect(() => {
    const hsla = RGBtoHSV(
      colorStops[selectedColorStop].rgba.r,
      colorStops[selectedColorStop].rgba.g,
      colorStops[selectedColorStop].rgba.b
    );

    document.getElementById("color-slider").value = hsla[0] * 1000;
    document.getElementById("alpha-slider").value =
      colorStops[selectedColorStop].rgba.a * 100;
  }, [selectedColorStop]);

  const handleColorChange = (e) => {
    const h = (e.target.value / 1000) * 360;

    let hsv = RGBtoHSV(
      colorStops[selectedColorStop].rgba.r,
      colorStops[selectedColorStop].rgba.g,
      colorStops[selectedColorStop].rgba.b
    );
    hsv[0] = h / 360;
    setHue(hsv[0]);

    const rgb = HSVtoRGB(hsv[0], hsv[1], hsv[2]);

    setSelectedColor({
      rgba: {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2],
        a: colorStops[selectedColorStop].rgba.a,
      },
      position: colorStops[selectedColorStop].position,
    });
  };

  const handleAlphaChange = (e) => {
    const a = e.target.value / 100;

    setSelectedColor({
      rgba: {
        r: colorStops[selectedColorStop].rgba.r,
        g: colorStops[selectedColorStop].rgba.g,
        b: colorStops[selectedColorStop].rgba.b,
        a: a,
      },
      position: colorStops[selectedColorStop].position,
    });
  };

  return (
    <div className="color-controls">
      <div className="controls-title">Color Code</div>
      <div className="controls-values">
        <div className="hex">
          <input type="text" maxLength={7} id="colorPickerInputHex" readOnly />
          <label htmlFor="">Hex</label>
        </div>
        <div className="color-fields">
          <div className="color r">
            <input type="text" maxLength={3} id="colorPickerInputR" readOnly />
            <label htmlFor="">R</label>
          </div>
          <div className="color g">
            <input type="text" maxLength={3} id="colorPickerInputG" readOnly />
            <label htmlFor="">G</label>
          </div>
          <div className="color b">
            <input type="text" maxLength={3} id="colorPickerInputB" readOnly />
            <label htmlFor="">B</label>
          </div>
          <div className="color a">
            <input type="text" maxLength={3} id="colorPickerInputA" readOnly />
            <label htmlFor="">A</label>
          </div>
        </div>
      </div>
      <input
        type="range"
        name="color-slider"
        id="color-slider"
        max={1000}
        onChange={(e) => {
          handleColorChange(e);
        }}
      />
      <input
        type="range"
        name="alpha-slider"
        id="alpha-slider"
        defaultValue={100}
        onChange={(e) => {
          handleAlphaChange(e);
        }}
        style={{
          background: `linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(${colorStops[selectedColorStop].rgba.r}, ${colorStops[selectedColorStop].rgba.g}, ${colorStops[selectedColorStop].rgba.b}, 1) 100%)`,
        }}
      />
    </div>
  );
}
