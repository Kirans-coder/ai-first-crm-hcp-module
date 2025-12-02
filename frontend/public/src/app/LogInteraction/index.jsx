import React from "react";
import LogForm from "./LogForm";
import ChatInterface from "./ChatInterface";
import InteractionSummary from "./InteractionSummary";

export default function LogInteractionScreen() {
  return (
    <div className="app-container">
      <div
        className="card"
        style={{ flex: 2, display: "flex", flexDirection: "column" }}
      >
        <h2>Log HCP Interaction</h2>
        <LogForm />
        <InteractionSummary />
      </div>
      <div className="card" style={{ flex: 1 }}>
        <h2>AI Assistant</h2>
        <ChatInterface />
      </div>
    </div>
  );
}
