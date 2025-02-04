import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  enrollmentDetails:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const {user}= action.payload;
      state.user = {...user};
    },
    clearUser(state) {
      state.user = null;
    },
    setEnrollmentDetails(state,action){
      state.enrollmentDetails = action.payload;
    }
  },
});

export const { setUser, clearUser, setEnrollmentDetails } = userSlice.actions;
export default userSlice.reducer;
