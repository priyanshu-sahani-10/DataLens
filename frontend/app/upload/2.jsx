"use client";

import { useState } from "react";
import { analyzeCSV } from "@/lib/analyze";
import Overview from "@/components/Overview";
import PreviewTable from "@/components/PreviewTable";
import DataQuality from "@/components/DataQuality";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError("");

      const data = await analyzeCSV(file);

      setResult(data);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Failed to analyze dataset"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">
        Upload Dataset
      </h1>

      <div className="space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={(e) =>
            setFile(e.target.files?.[0])
          }
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="px-6 py-3 rounded-lg bg-black text-white"
        >
          {loading
            ? "Analyzing..."
            : "Analyze Dataset"}
        </button>

        {error && (
          <p className="text-red-500">{error}</p>
        )}
      </div>

      {result && (
        <div className="mt-10 space-y-10">
          <Overview data={result.overview} />

          <PreviewTable
            data={result.preview}
          />

          <DataQuality
            data={result.data_quality}
          />
        </div>
        
      )}
    </div>
  );
}