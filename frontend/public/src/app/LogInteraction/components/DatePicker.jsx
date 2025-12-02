import React from "react";

export default function DatePicker({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label className="label">{label}</label>
      <input
        className="input"
        type="date"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
