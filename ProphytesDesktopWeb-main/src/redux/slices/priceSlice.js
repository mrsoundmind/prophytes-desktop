import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: "monthly",
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setPricePlan: (state, action) => {
      state.price = action.payload;
    },
  },
});

export const { setPricePlan } = priceSlice.actions;
export default priceSlice.reducer;
