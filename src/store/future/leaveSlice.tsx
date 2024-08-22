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
    isLoading: boolean
    
}
export interface ILeaveRequest{
    token: string;
    leaveType: string;
    startDate: number;
    endDate: number;
    description: string;
}

const initialState: IInitialLeave ={
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
    }
   
})

export default leaveSlice.reducer