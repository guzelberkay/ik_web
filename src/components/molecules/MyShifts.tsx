import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, useAppSelector } from '../../store';
import { fetchMyShifts, IMyShifts } from '../../store/future/shiftSlice'; 
import { epochToDate } from '../../util/dateFormatter';

export default function MyShifts() {
  const myShifts: IMyShifts[] =  useAppSelector(state => state.shift.myShifts)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMyShifts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Vardiyalarım</h1>
      <div className="row p-3">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Vardiya Başlangıç Tarihi</th>
              <th>Vardiya Bitiş Tarihi</th>
              <th>Vardiya Başlangıç Saati</th>
              <th>Vardiya Bitiş Saati</th>
            </tr>
          </thead>
          <tbody>
            {myShifts.map((shift, index) => (
              <tr key={index}>
                <td>{epochToDate(shift.startDate)}</td>
                <td>{epochToDate(shift.endDate)}</td>
                <td>{new Date(shift.startTime * 1000).toLocaleTimeString()}</td> {/* Convert to time */}
                <td>{new Date(shift.endTime * 1000).toLocaleTimeString()}</td> {/* Convert to time */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
