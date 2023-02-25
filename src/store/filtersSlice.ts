import { createSlice } from "@reduxjs/toolkit";

interface IFilters {
  activeFilter: string;
}

const initialState: IFilters = {
  activeFilter: "All",
};

const filtersSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter(state, action) {
      state.activeFilter = action.payload;
    },
  },
});
const { reducer, actions } = filtersSlice;

export default reducer;

export const { changeFilter } = actions;
