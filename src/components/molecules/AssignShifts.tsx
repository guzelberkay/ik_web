import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "../../store";
import { fetchEmployeesForLeave, IEmployeeForLeveave } from "../../store/future/employeeSlice";
import swal from "sweetalert";
import { fetchAssignShift, fetchGetAllShift, IShifts } from "../../store/future/shiftSlice";
import { dateToEpoch } from "../../util/dateFormatter";
import { fetchCompanies, ICompany } from "../../store/future/companySlice";

function formatTimestamp(timestamp: string | number): string {
  const time = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
  const date = new Date(time * 1000); // Convert Unix timestamp to milliseconds
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}-${month}-${year}`;
}

function formatTime(timestamp: number | string | undefined): string {
  // Handle cases where timestamp is undefined, null, or empty
  if (timestamp === undefined || timestamp === null || timestamp === '') {
    return 'Invalid time';
  }

  // Convert timestamp to number if it's a string
  const timestampNumber = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;

  // Ensure the timestamp is a valid number
  if (isNaN(timestampNumber)) {
    return 'Invalid time';
  }

  // Create a Date object from the timestamp
  const date = new Date(timestampNumber * 1000); // Convert seconds to milliseconds

  // Extract local hours, minutes, and seconds
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Determine AM/PM period
  const period = hours >= 12 ? 'PM' : 'AM';
  // Convert hours from 24-hour format to 12-hour format
  const formattedHours = ((hours % 12) || 12).toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  // Return formatted time
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${period}`;
}








export default function AssignShifts() {
  const dispatch: AppDispatch = useDispatch();
  const [selectedCompany, setSelectedCompany] = useState<number>(0);
  const [selectedEmployee, setSelectedEmployee] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const shiftList: IShifts[] = useAppSelector((state: RootState) => state.shift.shifts) || [];
  const companyList : ICompany[] = useAppSelector((state) => state.company.companies) || [];
  const employeeList: IEmployeeForLeveave[] = useAppSelector((state) => state.employee.employeesForLeave) || [];

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGetAllShift());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCompany > 0) {
      dispatch(fetchEmployeesForLeave(selectedCompany));
    }
  }, [dispatch, selectedCompany]);

  const handleCreateShift = () => {
    if (selectedEmployee === 0 || selectedCompany === 0) {
      swal("Hata", "Lütfen şirket ve çalışan seçiniz", "error");
      return;
    }

    const epochStart = dateToEpoch(startDate);
    const epochEnd = dateToEpoch(endDate);
    const startEpochTime = dateToEpoch(`${startDate} ${startTime}`);
    const endEpochTime = dateToEpoch(`${endDate} ${endTime}`);

    dispatch(
      fetchAssignShift({
        employeeId: selectedEmployee,
        startDate: epochStart,
        endDate: epochEnd,
        startTime: startEpochTime,
        endTime: endEpochTime,
      })
    ).then((action) => {
      const data = action.payload;
      if (data && data.code === 200) {
        swal("Başarılı", data.message, "success").then(() => {
          resetForm();
        });
      } else {
        swal("Hata", data.message || "Unknown error", "error");
      }
    });
  };

  const resetForm = () => {
    setSelectedCompany(0);
    setSelectedEmployee(0);
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="container">
      <h1>Vardiya Tanımla</h1>
      <div className="row p-5">
        <div className="m-4">
          <select 
            className="form-select"
            id="company"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(Number(e.target.value))}
          >
            <option value="">Şirket Seç</option>
            {companyList.map((company) => (
              <option key={company.companyId} value={company.companyId}>
                {company.companyName}
              </option>
            ))}
          </select>
        </div>
        <div className="m-4">
          <select
            className="form-select"
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(Number(e.target.value))}
          >
            <option value="">Çalışan Seç</option>
            {employeeList.map((employee) => (
              <option key={employee.employeeId} value={employee.employeeId}>
                {employee.employeeName}, {employee.employeeSurname}
              </option>
            ))}
          </select>
        </div>
        <div className="m-4">
          <h5>Vardiya Başlangıç Günü</h5>
          <input
            className="form-select"
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="m-4">
        <h5>Vardiya Bitiş Günü</h5>
          <input
            className="form-select"
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="m-4">
        <h5>Vardiya Başlangıç Saati</h5>
          <input
            className="form-select"
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="m-4">
        <h5>Vardiya Bitiş Saati</h5>
          <input
            className="form-select"
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div className="m-4 text-center">
          <button className="btn btn-success" onClick={handleCreateShift}>
            Vardiya Oluştur
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Başlangıç Tarihi</th>
            <th>Bitiş Tarihi</th>
            <th>Başlangıç Saati</th>
            <th>Bitiş Saati</th>
            <th>Çalışanlar</th> {/* Add this column */}
          </tr>
        </thead>
        <tbody>
          {shiftList.map((shift, index) => (
            <tr key={index}>
              <td>{formatTimestamp(shift.startDate)}</td>
              <td>{formatTimestamp(shift.endDate)}</td>
              <td>{formatTime(shift.startTime)}</td>
              <td>{formatTime(shift.endTime)}</td>
              <td>
                {shift.employees.map((employee) => (
                  <div key={employee.id}>{employee.name} {employee.surname}</div>
                ))}
              </td> {/* Display employees */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

