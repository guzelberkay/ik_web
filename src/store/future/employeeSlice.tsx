import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Rest from '../../config/RestApis';

export interface Employee {
  user: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  hireDate: number;
  birthDate: number;
  annualLeave: number;
  active: boolean;
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string;
}

const initialState: EmployeeState = {
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

export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async (employee: Employee, { rejectWithValue }) => {
    try {
      const response = await fetch(Rest.employeeService + '/add', {
        method: 'POST',
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
/* // Add or Update Employee
export const addOrUpdateEmployee = createAsyncThunk(
    'employee/addOrUpdateEmployee',
    async (employee: Employee, { rejectWithValue }) => {
        try {
            const response = await fetch(
                Rest.employeeService + (employee.userId ? `/update/${employee.userId}` : '/add'), 
                {
                    method: employee.userId ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(employee),
                }
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return (await response.json()).data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
 */

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
      });

  },
});


export default employeeSlice.reducer;
