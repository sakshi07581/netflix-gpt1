// store/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminUser: null,
  },
  reducers: {
    setAdminUser: (state, action) => {
      state.adminUser = action.payload;
    },
    clearAdminUser: (state) => {
      state.adminUser = null;
    },
  },
});

export const { setAdminUser, clearAdminUser } = adminSlice.actions;
export default adminSlice.reducer;
