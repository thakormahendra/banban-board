import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  priority: 'all',
  status: 'all',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setPriority(state, action) {
      state.priority = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setSearch, setPriority, setStatus, resetFilters } =
  filterSlice.actions;

export const selectFilters = (state) => state.filters;
export const selectSearch = (state) => state.filters.search;
export const selectPriority = (state) => state.filters.priority;
export const selectStatus = (state) => state.filters.status;

export default filterSlice.reducer;
