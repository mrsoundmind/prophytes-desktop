import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: "",
  country: {
    id: "",
    name: "",
  },
  state: {
    id: "",
    name: "",
  },
  city: {
    id: "",
    name: "",
  },
};

export const onboardPage = createSlice({
  name: "onboardPage",
  initialState,
  reducers: {
    setOnboardPage: (state, action) => {
      localStorage.setItem("currentPage", action.payload);
      state.currentPage = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOnboardPage, setCountry, setState, setCity } =
  onboardPage.actions;

export default onboardPage.reducer;
