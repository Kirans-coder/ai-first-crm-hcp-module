import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createInteraction } from "../../redux/slices/interactionSlice";
import SelectHCP from "../../components/SelectHCP";
import InputField from "../../components/InputField";
import SentimentSelect from "../../components/SentimentSelect";
import MaterialsComponent from "../../components/MaterialsComponent";
import VoiceToText from "../../components/VoiceToText";

export default function LogForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    hcp_id: "",
    interaction_type: "Meeting",
    date: "",
    time: "",
    attendees: "",
    topics_discussed: "",
    materials_shared: "",
    samples_distributed: "",
    sentiment: "",
    outcomes: "",
    follow_up_actions: "",
  });
  const [voiceTranscript, setVoiceTranscript] = useState("");

  const handleChange = (key) => (eOrValue) => {
    const value = eOrValue?.target ? eOrValue.target.value : eOrValue;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      hcp_id: Number(form.hcp_id),
    };
    // Optionally append voice transcript to topics
    if (voiceTranscript) {
      payload.topics_discussed =
        (payload.topics_discussed || "") +
        "\n[Voice note transcript]\n" +
        voiceTranscript;
    }
    dispatch(createInteraction(payload));
  };

  return (
    <form onSubmit={handleSubmit}>
      <SelectHCP
        value={form.hcp_id}
        onChange={(val) => handleChange("hcp_id")(val)}
      />

      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <InputField
            label="Interaction Type"
            value={form.interaction_type}
            onChange={handleChange("interaction_type")}
          />
        </div>
        <div style={{ flex: 1 }}>
          <InputField
            label="Date"
            type="date"
            value={form.date}
            onChange={handleChange("date")}
          />
        </div>
        <div style={{ flex: 1 }}>
          <InputField
            label="Time"
            type="time"
            value={form.time}
            onChange={handleChange("time")}
          />
        </div>
      </div>

      <InputField
        label="Attendees"
        value={form.attendees}
        onChange={handleChange("attendees")}
      />

      <div style={{ marginBottom: 12 }}>
        <label className="label">Topics Discussed</label>
        <textarea
          className="input"
          rows={3}
          value={form.topics_discussed}
          onChange={handleChange("topics_discussed")}
        />
      </div>

      <VoiceToText
        transcript={voiceTranscript}
        setTranscript={setVoiceTranscript}
      />

      <MaterialsComponent
        materialsShared={form.materials_shared}
        setMaterialsShared={(val) =>
          setForm((f) => ({ ...f, materials_shared: val }))
        }
        samplesDistributed={form.samples_distributed}
        setSamplesDistributed={(val) =>
          setForm((f) => ({ ...f, samples_distributed: val }))
        }
      />

      <SentimentSelect
        value={form.sentiment}
        onChange={(val) => handleChange("sentiment")(val)}
      />

      <div style={{ marginBottom: 12 }}>
        <label className="label">Outcomes</label>
        <textarea
          className="input"
          rows={3}
          value={form.outcomes}
          onChange={handleChange("outcomes")}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label className="label">Follow-up Actions</label>
        <textarea
          className="input"
          rows={3}
          value={form.follow_up_actions}
          onChange={handleChange("follow_up_actions")}
        />
      </div>

      <button type="submit" className="button-primary">
        Log Interaction
      </button>
    </form>
  );
}
