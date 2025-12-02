import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchHCP } from "../redux/slices/hcpSlice";

export default function SelectHCP({ value, onChange }) {
  const dispatch = useDispatch();
  const { list } = useSelector((s) => s.hcp);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(searchHCP(query));
  }, [query, dispatch]);

  return (
    <div style={{ marginBottom: 12 }}>
      <label className="label">HCP Name</label>
      <input
        className="input"
        placeholder="Search or select HCP..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        className="input"
        style={{ marginTop: 6 }}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select HCP</option>
        {list.map((h) => (
          <option key={h.id} value={h.id}>
            {h.name} – {h.specialty || ""} ({h.location || ""})
          </option>
        ))}
      </select>
    </div>
  );
}
