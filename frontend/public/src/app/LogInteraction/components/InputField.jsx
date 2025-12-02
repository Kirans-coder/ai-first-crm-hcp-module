import React from "react";

export default function InputField({ label, ...props }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label className="label">{label}</label>
      <input className="input" {...props} />
    </div>
  );
}
