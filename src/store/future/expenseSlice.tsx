import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Rest from '../../config/RestApis';
import { IResponse } from "../../components/models/IResponse";
interface initialStateExpense {
    pendingExpenses: IPendingExpenses[],
    myExpenses: IMyExpences[],
    isLoading: boolean
}
export interface IMyExpences {
    amount: number,
    description: string,
    expenseDate: number,
    expenseStatus: string
}
export interface IPendingExpenses {
    expenseId: number,
    amount: number,
    expenseDate: number,
    description: string,
    expenseStatus: string,
    firstName: string,
    lastName: string

}

const initialState: initialStateExpense = {
    myExpenses:[],
    pendingExpenses: [],
    isLoading: false
}

interface IExpense {
    token: string,
    amount: number,
    description: string,
    expenseDate: number
}

export interface IUpdateExpense {
    expenseId: number,
    isApproved: boolean
}

export const fetchSaveExpense = createAsyncThunk(
    'leave/fetchSaveLeave',
    async (expense: IExpense) => {
        const response = await fetch(Rest.expenseService + '/save-expense', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expense)
        }).then(data => data.json());
        return response;
        
    }
)

export const fetchMyExpenses = createAsyncThunk(
    'leave/fetchMyExpenses',
    async()=>{
        const response = await fetch(Rest.expenseService + '/get-my-expenses', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        }).then(data => data.json());
        return response;
    }
)

export const fetchPendingExpenses = createAsyncThunk(
    'leave/fetchPendingExpenses',
    async(companyId:number)=>{
        const response = await fetch(`${Rest.expenseService}/get-pending-expenses/${companyId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        }).then(data => data.json());
        return response;
    }
)

export const fetchUpdateExpense = createAsyncThunk(
    'leave/fetchUpdateExpense',
    async (updateExpense: IUpdateExpense) => {
        const response = await fetch(Rest.expenseService + '/update-expense-status', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateExpense)
        }).then(data => data.json());
        return response;
        
    }
)


const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSaveExpense.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchSaveExpense.fulfilled, (state, action: PayloadAction<IResponse>) => {
                state.isLoading = false
                alert(action.payload.message)
            })
            .addCase(fetchSaveExpense.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(fetchMyExpenses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchMyExpenses.fulfilled, (state, action: PayloadAction<IResponse>) => {
                state.isLoading = false
                if(action.payload.code === 200){
                    state.myExpenses = action.payload.data
                }
                
            })
            .addCase(fetchMyExpenses.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(fetchPendingExpenses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchPendingExpenses.fulfilled, (state, action: PayloadAction<IResponse>) => {
                state.isLoading = false
                console.log(action.payload.message)
                if(action.payload.code === 200){
                    state.pendingExpenses = action.payload.data
                }
                
            })
            .addCase(fetchPendingExpenses.rejected, (state) => {
                state.isLoading = false
            })
    }
   
})

export default expenseSlice.reducer