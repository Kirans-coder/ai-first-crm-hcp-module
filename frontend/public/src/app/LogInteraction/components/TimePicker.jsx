import React from "react";

export default function VoiceToText({ transcript, setTranscript }) {
  return (
    <div style={{ marginTop: 12 }}>
      <label className="label">
        Summarize from Voice Note (assume transcript)
      </label>
      <textarea
        className="input"
        rows={3}
        placeholder="Paste or type voice note transcript..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
      />
    </div>
  );
}
