import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  modules: [],
  module: {
    name: "New Module 123",
    description: "New Module Description",
  }
}

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state: any, action: any) => {
      state.modules = [action.payload, ...state.modules];
    },
    deleteModule: (state: any, action) => {
      state.modules = state.modules.filter((module: any) => module._id !== action.payload)
    },
    updateModule: (state: any, action) => {
      state.modules = state.modules.map((module: any) => {
        if (module._id === action.payload._id) {
          return action.payload;
        } else {
          return module;
        }
      })
    },
    setModule: (state, action) => {
      state.module = action.payload;
    }
  }
})

export const {addModule, deleteModule, updateModule, setModule, setModules} = modulesSlice.actions;
export default modulesSlice.reducer;