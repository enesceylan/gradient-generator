import "../../css/Editor.css";

export default function CodeEditor({ colorStops, gradient }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(
      "background: " +
        `rgba(${colorStops[0].rgba.r}, ${colorStops[0].rgba.g}, ${colorStops[0].rgba.b}, ${colorStops[0].rgba.a});\n` +
        "background: " +
        gradient +
        ";"
    );
  };

  return (
    <section className="panel-code">
      <div className="code-editor">
        <h3>css</h3>
        <div className="code-editor-output">
          <span className="blue">background</span>
          {`: rgba(${colorStops[0].rgba.r}, ${colorStops[0].rgba.g}, ${colorStops[0].rgba.b}, ${colorStops[0].rgba.a});`}
          <br />
          <span className="blue">background</span>
          {`: ${gradient};`}
        </div>
      </div>
      <div className="code-copy" onPointerDown={() => handleCopy()}>
        <svg
          className="code-option__button-svg"
          width="13"
          height="17"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#ffffff" strokeWidth="2" fill="none" fillRule="evenodd">
            <path d="M5 5h7v11H5z"></path>
            <path d="M1 15V1h10"></path>
          </g>
        </svg>
        <span>Copy to Clipboard</span>
      </div>
    </section>
  );
}
