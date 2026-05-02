export default function Steps({ current }) {
  const steps = ["Upload", "Processing", "Result"];

  return (
    <div className="steps">
      {steps.map((label, index) => {
        const isActive = index === current;
        const isDone = index < current;

        return (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <div
              className={`step 
                ${isActive ? "active" : ""} 
                ${isDone ? "done" : ""}
              `}
            >
              <div className="step-num">
                {isDone ? "✓" : index + 1}
              </div>

              <div className="step-label">{label}</div>
            </div>

            {/* Line between steps */}
            {index !== steps.length - 1 && (
              <div className="step-line"></div>
            )}
          </div>
        );
      })}
    </div>
  );
}