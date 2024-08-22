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

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface AssignedAsset {
    id: number;
    user: User;
    serialNumber: string;
    assetName: string;
    verificationStatus: string;
    note: string | null;
    returned: boolean;
}

interface AssetAssignState {
    employees: Employee[];
    assignedAssets: AssignedAsset[];
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AssetAssignState = {
    employees: [],
    assignedAssets: [],
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
    async ({ userId, serialNumber, assetName, verificationStatus }: { userId: number, serialNumber: string, assetName: string, verificationStatus: string }) => {
        const response = await fetch(Rest.assetService + '/assignAsset', {
            method: 'POST',
            body: JSON.stringify({ userId, serialNumber, assetName, verificationStatus: 'Beklemede' }),
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

export const fetchAssignedAssetsByCompanyId = createAsyncThunk(
    'assetAssign/fetchAssignedAssetsByCompanyId',
    async (companyId: number, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${Rest.assetService}/get-employee-assets-by-company-id/${companyId}`, {
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
                throw new Error('Failed to fetch assigned assets for the selected company');
            }

            const result = await response.json();
            return result.data;
        } catch (error: any) {
            return rejectWithValue({ message: error.message });
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
                console.log('employeesForAsset fulfilled', action.payload);
                if (action.payload) {
                    state.employees = action.payload;
                }
                state.status = 'idle';
            })
            .addCase(fetchEmployeesByCompanyId.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchAssignedAssetsByCompanyId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAssignedAssetsByCompanyId.fulfilled, (state, action) => {
                console.log('assignedAssets fulfilled', action.payload);
                if (action.payload) {
                    state.assignedAssets = action.payload;
                }
                state.status = 'idle';
            })
            .addCase(fetchAssignedAssetsByCompanyId.rejected, (state) => {
                state.status = 'failed';
            });
    }
});

export default assetAssignSlice.reducer;
