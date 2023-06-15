import ColorStop from "./ColorStop";

export default function ColorStops({
  colorStops,
  selectedColorStop,
  setSelectedColorStop,
  setColorStops,
}) {
  return (
    <div className="color-stops">
      <div className="color-stops-titles">
        <div className="stop-color-title"></div>
        <div className="stop-hex-title">Hex</div>
        <div className="stop-position-title">Stop</div>
        <div className="stop-action-title">⊕</div>
      </div>
      <div className="color-stops-colors" id="color-stops-container">
        {colorStops.map((colorStop, index) => {
          return (
            <ColorStop
              key={index}
              index={index}
              colorStops={colorStops}
              selectedColorStop={selectedColorStop}
              setSelectedColorStop={setSelectedColorStop}
              setColorStops={setColorStops}
            />
          );
        })}
      </div>
    </div>
  );
}
