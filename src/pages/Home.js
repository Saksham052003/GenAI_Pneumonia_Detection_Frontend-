import React, { useState, useCallback } from "react";
import Header from "../components/Header";
import Steps from "../components/Steps";
import UploadPanel from "../components/UploadPanel";
import PatientForm from "../components/PatientForm";
import ResultPanel from "../components/ResultPanel";

const API = process.env.REACT_APP_API_URL;
export default function Home() {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    symptoms: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  // ─── Image Upload Handler ───
  const handleImageSelect = useCallback((file) => {
    setImageFile(file);
    setResult(null);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
      setStep(1);
    } else {
      setPreview(null);
      setStep(0);
    }
  }, []);

  // ─── Run AI Prediction ───
  const handleAnalyze = async () => {
    if (!imageFile) {
      alert("Please upload an X-ray image");
      return;
    }

    setLoading(true);
    setStep(2);

    const fd = new FormData();
    fd.append("image", imageFile);
    fd.append("patient", JSON.stringify(patient));

    try {
      const res = await fetch(`${API}/predict`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setResult(data);
      setStep(3);
    } catch (err) {
      console.error(err);
      alert("⚠️ Backend not connected or error occurred");
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  // ─── Reset App ───
  const handleReset = () => {
    setImageFile(null);
    setPreview(null);
    setResult(null);
    setStep(0);

    setPatient({
      name: "",
      age: "",
      gender: "",
      symptoms: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <>
      <Header />

      <div className="main">
        <Steps current={step} />

        {!result ? (
          <>
            <div className="grid-2">
              <UploadPanel
                imageFile={imageFile}
                preview={preview}
                onImageSelect={handleImageSelect}
              />

              {/* 🔥 Safe data passing */}
              <PatientForm data={patient || {}} onChange={setPatient} />
            </div>

            <button
              className="btn btn-primary btn-full"
              onClick={handleAnalyze}
              disabled={!imageFile || loading}
            >
              {loading ? "Analyzing..." : "Run AI Analysis"}
            </button>
          </>
        ) : (
          <>
            <ResultPanel result={result} />

            <button className="btn btn-full" onClick={handleReset}>
              Analyze Another X-ray
            </button>
          </>
        )}
      </div>
    </>
  );
}