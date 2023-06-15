import { useState } from "react";
import "../../css/Options.css";

export default function Options({
  gradientType,
  setGradientType,
  angle,
  setAngle,
}) {
  const [isRotating, setIsRotating] = useState(false);

  const getCenter = (element) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    return { x: left + width / 2, y: top + height / 2 };
  };

  const handleRotation = (e) => {
    if (e.target.classList.contains("point-wrapper")) {
      const circle = e.target;
      const circleCenter = getCenter(circle);

      let deg =
        Math.atan2(e.clientY - circleCenter.y, e.clientX - circleCenter.x) *
        (180 / Math.PI);

      setAngle(deg);
    }
  };

  const handleAngleChange = (e) => {
    let deg = e.target.value % 360;

    if (deg > 0 && deg < 180) {
      setAngle(deg);
    } else {
      deg -= 360;
      setAngle(deg);
    }
  };

  return (
    <div className="panel-options">
      <div className="gradient-type-wrapper">
        <button
          className={`linear ${gradientType === "linear" ? "active" : ""}`}
          onPointerDown={() => setGradientType("linear")}
        >
          Linear
        </button>
        <button
          className={`radial ${gradientType === "radial" ? "active" : ""}`}
          onPointerDown={() => setGradientType("radial")}
        >
          Radial
        </button>
      </div>
      {gradientType === "linear" && (
        <div className="gradient-direction-wrapper">
          <div
            className="gradient-angle"
            onPointerDown={() => setIsRotating(true)}
            onPointerUp={() => setIsRotating(false)}
            onPointerMove={(e) => isRotating && handleRotation(e)}
          >
            <div
              className="point-wrapper"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div className="point"></div>
            </div>
          </div>
          <input
            type="text"
            maxLength={3}
            onChange={(e) => handleAngleChange(e)}
            value={
              angle >= 0 && angle < 180
                ? Math.round(angle)
                : Math.round(angle + 360)
            }
          />
        </div>
      )}
    </div>
  );
}
