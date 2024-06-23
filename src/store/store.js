import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/"; // Assuming you have a rootReducer created with combineReducers from Redux Toolkit

const store = configureStore({
  reducer: rootReducer, // Pass your combined reducer here
  // Optionally add middleware, enhancers, and other configurations here
});

export default store;
