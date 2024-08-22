import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Rest from '../../config/RestApis';
import { IResponse } from "../../components/models/IResponse";

export interface ILeave{
    employeeId: number;
    leaveType: string;
    startDate: number;
    endDate: number;
    description: string;
}
interface IInitialLeave{
    pendingLeaves: IPendingLeaves[]
    isLoading: boolean
    
}
export interface ILeaveRequest{
    token: string;
    leaveType: string;
    startDate: number;
    endDate: number;
    description: string;
}
export interface IPendingLeaves{
    leaveId: number;
    employeeId: number;
    employeeName: string;
    employeeSurname: string;
    leaveType: string;
    startDate: number;
    endDate: number;
    description: string;
    leaveStatus: string;
}
export interface IUpdateLeave{
    leaveId: number;
    isApproved: boolean;
}

const initialState: IInitialLeave ={
    pendingLeaves: [],
    isLoading: false
}
export const fetchSaveLeave = createAsyncThunk(
    'leave/fetchSaveLeave',
    async (leave: ILeave) => {
        const response = await fetch(Rest.leaveService + '/save-leave', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leave)
        }).then(data => data.json());
        return response;
        
    }
)
export const fetchLeaveRequest = createAsyncThunk(
    'leave/fetchLeaveRequest',
    async (leave:ILeaveRequest) => {
        const response = await fetch(Rest.leaveService + '/leave-request', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leave)
        }).then(data => data.json());
        return response;
    }
)
export const fetchGetPendingLeaves = createAsyncThunk(
    'leave/fetchGetPendingLeaves',
    async (companyId: number) => {
        const response = await fetch(Rest.leaveService + '/get-pending-leaves/'+companyId, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        }).then(data => data.json());
        return response;
    }
)
export const fetchUpdateLeaveStatus = createAsyncThunk(
    'leave/fetchUpdateLeaveStatus',
    async (leave: IUpdateLeave) => {
        const response = await fetch(Rest.leaveService + '/update-leave-status', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leave)
        }).then(data => data.json());
        return response;
        
    }
)

const leaveSlice = createSlice({
    name: 'leave',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSaveLeave.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchSaveLeave.fulfilled, (state, action: PayloadAction<IResponse>) => {
                state.isLoading = false
            
            })
            .addCase(fetchSaveLeave.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(fetchLeaveRequest.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchLeaveRequest.fulfilled, (state, action: PayloadAction<IResponse>) => {
                state.isLoading = false
            
            })
            .addCase(fetchLeaveRequest.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(fetchGetPendingLeaves.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchGetPendingLeaves.fulfilled, (state, action: PayloadAction<IResponse>) => {
                state.isLoading = false
                if(action.payload.code === 200){
                    state.pendingLeaves = action.payload.data
                }
                
            })
            .addCase(fetchGetPendingLeaves.rejected, (state) => {
                state.isLoading = false
            })
            
    }
   
})

export default leaveSlice.reducer