import { useRef, useEffect, useState } from "react";

import "./css/App.css";

import Gradient from "./Components/gradient/Gradient.jsx";
import Color from "./Components/color/Color.jsx";
import Options from "./Components/options/Options.jsx";

import SetColorFields from "./utils/SetColorFields";
import CodeEditor from "./Components/code-editor/CodeEditor";

export default function App() {
  //State holding information of all the color stops for the gradient
  const [colorStops, setColorStops] = useState([
    { rgba: { r: 0, g: 0, b: 255, a: 1 }, position: 0 },
    { rgba: { r: 255, g: 0, b: 0, a: 1 }, position: 100 },
  ]);
  //State to determine which one of the color stops is currently being changed.
  const [selectedColorStop, setSelectedColorStop] = useState(0);
  //State for holding the information of currently selected color stop which will be used for updating the colorStops array with an effect.
  const [selectedColor, setSelectedColor] = useState(
    colorStops[selectedColorStop]
  );
  const [hue, setHue] = useState(0);
  const [gradientType, setGradientType] = useState("linear");
  const [angle, setAngle] = useState(90);
  const [gradient, setGradient] = useState(
    "linear-gradient(to right, rgb(255, 255, 255), rgb(255, 0, 0))"
  );

  /*State holding the width of the screen to determine if the gradient should be rendered on mobile
   * Will be changed to a ref later on for single check, temporarily using useEffect to change size at will without page reload.
   */
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // const screenWidth = useRef(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  useEffect(() => {
    let gradientText = "";

    if (gradientType === "linear") {
      gradientText += `linear-gradient(${
        angle >= 0 && angle < 180 ? Math.round(angle) : Math.round(angle + 360)
      }deg,`;
    }
    if (gradientType === "radial") {
      gradientText += `radial-gradient(circle,`;
    }

    colorStops.forEach((colorStop, index) => {
      gradientText += ` rgba(${colorStop.rgba.r}, ${colorStop.rgba.g}, ${colorStop.rgba.b}, ${colorStop.rgba.a}) ${colorStop.position}%`;
      if (index !== colorStops.length - 1) {
        gradientText += ",";
      } else {
        gradientText += ")";
      }
    });

    setGradient(gradientText);
  }, [colorStops, gradientType, angle]);

  useEffect(() => {
    SetColorFields(
      colorStops[selectedColorStop].rgba.r,
      colorStops[selectedColorStop].rgba.g,
      colorStops[selectedColorStop].rgba.b,
      colorStops[selectedColorStop].rgba.a
    );
  }, [selectedColorStop]);

  useEffect(() => {
    const newColorStops = [...colorStops];
    newColorStops[selectedColorStop] = selectedColor;
    setColorStops(newColorStops);

    SetColorFields(
      colorStops[selectedColorStop].rgba.r,
      colorStops[selectedColorStop].rgba.g,
      colorStops[selectedColorStop].rgba.b,
      colorStops[selectedColorStop].rgba.a
    );
  }, [selectedColor]);

  const handleStopChange = (newStop) => {
    let newColorStops = [...colorStops];
    if (typeof newStop === "object") newColorStops[selectedColorStop] = newStop;
    newColorStops.sort((a, b) => a.position - b.position);
    setColorStops(newColorStops);
    setSelectedColorStop(newColorStops.indexOf(newStop));
  };

  return (
    <>
      <header>
        <h1>Gradient Generator</h1>
      </header>
      {/* {screenWidth < 768 && (
      )} */}
      <div className="gradient-bg" style={{ background: gradient }}></div>
      <div className="app-container">
        <div className="app-panel">
          <Gradient
            colorStops={colorStops}
            setColorStops={setColorStops}
            handleStopChange={handleStopChange}
            selectedColorStop={selectedColorStop}
            setSelectedColorStop={setSelectedColorStop}
            setHue={setHue}
          />
          <Color
            colorStops={colorStops}
            setColorStops={setColorStops}
            selectedColorStop={selectedColorStop}
            setSelectedColorStop={setSelectedColorStop}
            setSelectedColor={setSelectedColor}
            hue={hue}
            setHue={setHue}
            screenWidth={screenWidth}
          />
          <Options
            gradientType={gradientType}
            setGradientType={setGradientType}
            angle={angle}
            setAngle={setAngle}
          />
        </div>
        <CodeEditor colorStops={colorStops} gradient={gradient} />
      </div>
    </>
  );
}
