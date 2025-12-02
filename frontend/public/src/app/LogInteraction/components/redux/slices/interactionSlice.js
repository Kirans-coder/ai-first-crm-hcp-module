import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchInteractions = createAsyncThunk(
  "interaction/fetchAll",
  async () => {
    const res = await api.get("/interactions");
    return res.data;
  }
);

export const createInteraction = createAsyncThunk(
  "interaction/create",
  async (payload) => {
    const res = await api.post("/interactions", payload);
    return res.data;
  }
);

export const updateInteraction = createAsyncThunk(
  "interaction/update",
  async ({ id, data }) => {
    const res = await api.put(`/interactions/${id}`, data);
    return res.data;
  }
);

export const agentChat = createAsyncThunk(
  "interaction/agentChat",
  async (payload) => {
    const res = await api.post("/interactions/agent/chat", payload);
    return res.data;
  }
);

const interactionSlice = createSlice({
  name: "interaction",
  initialState: {
    list: [],
    selected: null,
    agentResponse: null,
    status: "idle",
  },
  reducers: {
    setSelected(state, action) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInteractions.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createInteraction.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.selected = action.payload;
      })
      .addCase(updateInteraction.fulfilled, (state, action) => {
        const idx = state.list.findIndex((i) => i.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        state.selected = action.payload;
      })
      .addCase(agentChat.fulfilled, (state, action) => {
        state.agentResponse = action.payload;
      });
  },
});

export const { setSelected } = interactionSlice.actions;
export default interactionSlice.reducer;
