import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { agentChat } from "../../redux/slices/interactionSlice";

export default function ChatInterface() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { selected, agentResponse } = useSelector((s) => s.interaction);

  const handleSend = () => {
    if (!message.trim()) return;
    const payload = {
      message,
      interaction_id: selected?.id ?? null,
    };
    dispatch(agentChat(payload));
    setMessage("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: 8,
          marginBottom: 8,
          fontSize: 14,
        }}
      >
        {!agentResponse && (
          <p style={{ color: "#6b7280" }}>
            Ask me to log, edit, or summarize an interaction, or suggest
            follow-up actions.
          </p>
        )}
        {agentResponse && (
          <>
            <p style={{ fontWeight: 500, marginBottom: 4 }}>
              Tool used: {agentResponse.tool}
            </p>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontSize: 13,
              }}
            >
              {typeof agentResponse.result === "string"
                ? agentResponse.result
                : JSON.stringify(agentResponse.result, null, 2)}
            </pre>
          </>
        )}
      </div>
      <textarea
        className="input"
        rows={3}
        placeholder="Describe interaction details here (e.g. 'Met Dr. Smith, discussed product X efficacy...') or ask for help."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="button"
        className="button-primary"
        style={{ marginTop: 8, alignSelf: "flex-end" }}
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}
