import {configureStore} from "@reduxjs/toolkit";
import helloReducer from "../a4/ReduxExamples/HelloRedux/helloReducer";

export interface LabState {
  helloReducer: {
    message: string;
  };
}

const store = configureStore({
  reducer: {
    helloReducer,
  },
});
export default store;