import React, { useRef, useState } from "react";

export default function UploadPanel({ onImageSelect, preview }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file) return;
    onImageSelect(file);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Chest X-Ray</h2>
      </div>
      <div className="card-body">
        {!preview ? (
          <div
            className={`upload-zone ${drag ? "drag-over" : ""}`}
            onClick={() => inputRef.current.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              handleFile(e.dataTransfer.files[0]);
            }}
          >
            <input
              ref={inputRef}
              type="file"
              onChange={(e) => handleFile(e.target.files[0])}
              hidden
            />
            <p>Drop X-ray here</p>
          </div>
        ) : (
          <img src={preview} width="100%" alt="Chest X-ray preview"/>
        )}
      </div>
    </div>
  );
}