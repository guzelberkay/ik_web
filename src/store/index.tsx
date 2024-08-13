import { configureStore } from "@reduxjs/toolkit";
import { 
  authSlice, userSlice, employeeSlice
} from "./future";
import { useSelector} from 'react-redux';
const store = configureStore({
  reducer:{
    auth: authSlice,
    user: userSlice,
    employee: employeeSlice,
  }
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
export default store;