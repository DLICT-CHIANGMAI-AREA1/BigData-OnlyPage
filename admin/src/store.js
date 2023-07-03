import { configureStore } from "@reduxjs/toolkit";
import login from "./Reducer/Reducer";

export default configureStore({
  reducer: {
    user: login,
  },
});
