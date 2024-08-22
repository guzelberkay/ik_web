import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Rest from '../../config/RestApis';
import { IResponse } from '../../components/models/IResponse';

export interface Employee {
  user: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  hireDate: number;
  birthDate: number;
  company: number,
  annualLeave: number;
  active: boolean;
}
export interface IEmployeeForLeveave { 
  employeeId : number;
  employeeName : string;
  employeeSurname : string;
  annualLeave : number;
  user: number;
}


interface EmployeeState {
  employees: Employee[];
  employeesForLeave: IEmployeeForLeveave[];
  loading: boolean;
  error: string;
}

const initialState: EmployeeState = {
  employeesForLeave: [],
  employees: [],
  loading: false,
  error: '',
};

// Fetch Employees
export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(Rest.employeeService + '/get-employees');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      return (await response.json()).data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchEmployeesByCompanyManagerId = createAsyncThunk(
  'employee/fetchEmployeesByCompanyManagerId',
  async (companyManagerId: number, { rejectWithValue }) => {
    console.log('Received companyManagerId:', companyManagerId);
    try {
      const response = await fetch(`${Rest.employeeService}/get-employees-by-company-manager/${companyManagerId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch employees for the company manager');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (employee: Employee, { rejectWithValue }) => {
    try {
      const response = await fetch(Rest.employeeService + '/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return (await response.json()).data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to update an existing employee
export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async (employee: Employee, { rejectWithValue }) => {
    try {
      const response = await fetch(Rest.employeeService + `/update/${employee.user}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return (await response.json()).data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update Employee Status (Activate/Deactivate)
export const updateEmployeeStatus = createAsyncThunk(
  'employee/updateEmployeeStatus',
  async ({ userId, isActive }: { userId: number; isActive: boolean }) => {
    const endpoint = isActive
      ? `/activate/${userId}`
      : `/deactivate/${userId}`;

    const response = await fetch(Rest.employeeService + endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return (await response.json()).data;
  }
);

// Delete Employee
export const deleteEmployee = createAsyncThunk(
  'employee/deleteEmployee',
  async (userId: number) => {
    await fetch(Rest.employeeService + `/delete/${userId}`, {
      method: 'DELETE',
    });
    return userId;
  }
);

export const fetchEmployeesForLeave = createAsyncThunk(
  'employee/fetchEmployeesForLeave',
  async (payload: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      // Token'ı konsola yazdır
      console.log('Token:', token);

      const response = await fetch(
        `${Rest.employeeService}/get-employee-by-company-id/${payload}`, 
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Yetkisiz erişim: Bu kaynağa erişim izniniz yok.');
        }
        throw new Error('Failed to fetch employees');
      }

      const result = await response.json();
      return result;
    } catch (error: any) {
      return rejectWithValue({ message: error.message });
    }
  }
);


const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.employees.push(action.payload);
        state.loading = false;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        const index = state.employees.findIndex(emp => emp.user === action.payload.user);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.employees = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEmployeesByCompanyManagerId.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchEmployeesByCompanyManagerId.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.employees = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployeesByCompanyManagerId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEmployeesForLeave.pending, (state) => {
        state.loading = true;
      })
      
      .addCase(fetchEmployeesForLeave.fulfilled, (state, action: PayloadAction<IResponse>) => {
        state.loading = false;
        console.log('employeesForLeave fullfilled', action.payload.data);
        if(action.payload.code === 200){
          state.employeesForLeave = action.payload.data;
        }
      })

      .addCase(fetchEmployeesForLeave.rejected, (state, action) => {
        state.loading = false;
      });
  },
});


export default employeeSlice.reducer;
