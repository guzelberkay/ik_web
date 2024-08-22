import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Rest from '../../config/RestApis';
import { IResponse } from "../../components/models/IResponse";

export interface IEmployee {
  id: number;
  name: string;
  surname: string;
}

export interface IShifts {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  employees: IEmployee[]; // Add this line
}

export interface IShift {
    employeeId: number;
    startDate: number;
    endDate: number;
    startTime: number;
    endTime: number;
}

interface IInitialShift {
  isLoading: boolean;
  shifts: IShifts[]; // Updated to use IShifts which matches the backend response
}

const initialState: IInitialShift = {
  isLoading: false,
  shifts: [],
};

export const fetchAssignShift = createAsyncThunk(
  'shift/fetchAssignShift',
  async (shift: IShift) => {
    const response = await fetch(Rest.shiftService + '/assignShifts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(shift)
    }).then(data => data.json());
    return response;
  }
);

export const fetchGetAllShift = createAsyncThunk(
  'shift/fetchGetAllShift',
  async () => {
    try {
      const response = await fetch(`${Rest.shiftService}/getAllShifts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch shifts');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching shifts:', error);
      return [];
    }
  }
);

const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignShift.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAssignShift.fulfilled, (state, action: PayloadAction<IResponse>) => {
        state.isLoading = false;
      })
      .addCase(fetchAssignShift.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchGetAllShift.fulfilled, (state, action: PayloadAction<IShifts[]>) => {
        state.shifts = action.payload;
      });
  },
});

export default shiftSlice.reducer;
