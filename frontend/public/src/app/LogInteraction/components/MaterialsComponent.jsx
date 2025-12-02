import React from "react";

export default function MaterialsComponent({
  materialsShared,
  setMaterialsShared,
  samplesDistributed,
  setSamplesDistributed,
}) {
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <div style={{ flex: 1 }}>
        <label className="label">Materials Shared / Samples Distributed</label>
        <textarea
          className="input"
          rows={3}
          value={materialsShared || ""}
          onChange={(e) => setMaterialsShared(e.target.value)}
        />
      </div>
      <div style={{ flex: 1 }}>
        <label className="label">Samples (if any)</label>
        <textarea
          className="input"
          rows={3}
          value={samplesDistributed || ""}
          onChange={(e) => setSamplesDistributed(e.target.value)}
        />
      </div>
    </div>
  );
}
