import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const searchHCP = createAsyncThunk("hcp/search", async (q) => {
  const res = await api.get(`/hcp`, { params: { q } });
  return res.data;
});

const hcpSlice = createSlice({
  name: "hcp",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchHCP.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default hcpSlice.reducer;
