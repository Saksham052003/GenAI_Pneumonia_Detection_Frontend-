export default function ResultPanel({ result }) {
  return (
    <div className="card">
      <div className="card-body">
        <h2>{result.prediction}</h2>
        <h3>{result.confidence.toFixed(2)}%</h3>

        {result.image && (
          <img
            src={`data:image/png;base64,${result.image}`}
            width="300"
            alt="result"
          />
        )}

        <div className="report-box">{result.report}</div>
      </div>
    </div>
  );
}