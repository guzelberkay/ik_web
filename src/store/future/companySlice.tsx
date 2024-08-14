import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Rest from '../../config/RestApis';
import { IResponse } from "../../components/models/IResponse";
export interface ICompany {
    companyId: number;
    companyName: string;
}

interface CompanyState {
    companies: ICompany[];
    isLoading: boolean;
}

const initialState: CompanyState = {
    companies: [],
    isLoading: false,
};

export const fetchCompanies = createAsyncThunk(
    'company/fetchCompanies',
    async () => {
        const response = await fetch(Rest.companyService + '/get-companies', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
      
        return result;
    }
)

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCompanies.fulfilled, (state, action :PayloadAction<IResponse> ) => {
                state.isLoading = false;
                console.log('message:  ',action.payload.message);
                console.log('companies:  ',action.payload.data);
                state.companies = action.payload.data;
            })
            .addCase(fetchCompanies.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default companySlice.reducer;