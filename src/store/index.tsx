import { configureStore } from "@reduxjs/toolkit";
import { 
  authSlice, userSlice
} from "./future";
import { useSelector} from 'react-redux';
const store = configureStore({
  reducer:{
    auth: authSlice,
    user: userSlice
  }
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
export default store;