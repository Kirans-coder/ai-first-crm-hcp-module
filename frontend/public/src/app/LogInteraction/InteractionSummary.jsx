import React from "react";
import { useSelector } from "react-redux";

export default function InteractionSummary() {
  const { selected } = useSelector((state) => state.interaction);

  if (!selected) {
    return (
      <div style={{ fontSize: 14, color: "#6b7280", marginTop: 16 }}>
        No interaction selected yet. Log an interaction to see its summary here.
      </div>
    );
  }

  return (
    <div style={{ marginTop: 16 }}>
      <h3 style={{ marginBottom: 8 }}>Latest Interaction Summary</h3>

      <div style={{ fontSize: 14 }}>
        <p>
          <strong>Type:</strong> {selected.interaction_type}
        </p>
        <p>
          <strong>Date / Time:</strong> {selected.date} {selected.time}
        </p>
        {selected.sentiment && (
          <p>
            <strong>Sentiment:</strong> {selected.sentiment}
          </p>
        )}

        {selected.topics_discussed && (
          <>
            <p style={{ marginTop: 8, fontWeight: 500 }}>Topics Discussed</p>
            <p>{selected.topics_discussed}</p>
          </>
        )}

        {selected.outcomes && (
          <>
            <p style={{ marginTop: 8, fontWeight: 500 }}>Outcomes</p>
            <p>{selected.outcomes}</p>
          </>
        )}

        {selected.follow_up_actions && (
          <>
            <p style={{ marginTop: 8, fontWeight: 500 }}>Follow-up Actions</p>
            <p>{selected.follow_up_actions}</p>
          </>
        )}

        {selected.ai_summary && (
          <>
            <p style={{ marginTop: 8, fontWeight: 500 }}>AI Summary</p>
            <p>{selected.ai_summary}</p>
          </>
        )}
      </div>
    </div>
  );
}
