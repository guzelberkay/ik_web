import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import Rest from '../../config/RestApis';

interface Employee {
    employeeId: number;
    employeeName: string;
    employeeSurname: string;
    annualLeave: number;
    user: number;
}

interface AssetAssignState {
    employees: Employee[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AssetAssignState = {
    employees: [],
    status: 'idle',
};

//Delete this section
export const fetchEmployeesByCompanyId = createAsyncThunk(
    'employee/fetchEmployeesByCompanyId',
    async (companyId: number, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
      
            // Token'ı konsola yazdır
            console.log('Token:', token);

            const response = await fetch(`${Rest.employeeService}/get-employees-by-company-id/${companyId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Yetkisiz erişim: Bu kaynağa erişim izniniz yok.');
                }
                throw new Error('Failed to fetch employees for the selected company');
            }

            const result = await response.json();
            return result.data;
        } catch (error: any) {
            return rejectWithValue({ message: error.message });
        }
    }
);

export const assignAsset = createAsyncThunk(
    'assetAssign/assignAsset',
    async ({ userId, serialNumber }: { userId: number, serialNumber: string }) => {
        const response = await fetch(Rest.assetService + '/assignAsset', {
            method: 'POST',
            body: JSON.stringify({ userId, serialNumber }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            swal('Başarılı!', 'Zimmet eşyası başarıyla atandı.', 'success');
        } else {
            swal('Hata!', 'Zimmet eşyası atanırken bir hata oluştu.', 'error');
        }
    }
);

const assetAssignSlice = createSlice({
    name: 'assetAssign',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeesByCompanyId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployeesByCompanyId.fulfilled, (state, action) => {
                console.log('employeesForAsset fullfilled', action.payload);
                if(action.payload) {
                    state.employees = action.payload; // Data'ya direkt erişim
                }
                state.status = 'idle';
            })            
            .addCase(fetchEmployeesByCompanyId.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export default assetAssignSlice.reducer;
