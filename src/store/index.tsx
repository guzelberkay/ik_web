import { configureStore } from "@reduxjs/toolkit";
import { 
  authSlice, userSlice, employeeSlice,
  companySlice,
  leaveSlice,

  assetManagementSlice,
  assetAssignSlice,

  commentSlice,
  expenseSlice,
  shiftSlice


} from "./future";
import { useSelector} from 'react-redux';

const store = configureStore({
  reducer:{
    auth: authSlice,
    user: userSlice,
    employee: employeeSlice,
    company: companySlice,
    leave: leaveSlice,

    assetManagement: assetManagementSlice,
    assignasset: assetAssignSlice,

    comment: commentSlice,
    shift: shiftSlice,
    expense: expenseSlice

  }
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
export default store;