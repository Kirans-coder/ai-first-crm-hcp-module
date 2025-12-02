import React from "react";

export default function SentimentSelect({ value, onChange }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label className="label">Observed/ Inferred HCP Sentiment</label>
      <select
        className="input"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select sentiment</option>
        <option value="Positive">Positive</option>
        <option value="Neutral">Neutral</option>
        <option value="Negative">Negative</option>
      </select>
    </div>
  );
}
