export default function ColorStopPoint({
  color,
  selectedColorStop,
  setSelectedColorStop,
  setIsStopDragging,
  index,
}) {
  const handlePointerDown = () => {
    setSelectedColorStop(index);
    setIsStopDragging(true);
  };

  return (
    <div
      className={`gradient-point ${
        selectedColorStop === index ? "selected" : ""
      }`}
      style={{
        left: `${color.position}%`,
      }}
      onPointerDown={() => handlePointerDown()}
    >
      <div
        className="gradient-point-color"
        style={{
          backgroundColor: `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, 1)`,
        }}
      ></div>
    </div>
  );
}
