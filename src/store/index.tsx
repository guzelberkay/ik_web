import { configureStore } from "@reduxjs/toolkit";
import { 
  authSlice, userSlice, employeeSlice,
  companySlice,
  leaveSlice,
  commentSlice
} from "./future";
import { useSelector} from 'react-redux';
const store = configureStore({
  reducer:{
    auth: authSlice,
    user: userSlice,
    employee: employeeSlice,
    company: companySlice,
    leave: leaveSlice,
    comment: commentSlice
  }
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
export default store;