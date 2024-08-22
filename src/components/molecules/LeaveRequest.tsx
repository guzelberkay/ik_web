import React, { useEffect, useState } from 'react'
import { AppDispatch, useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { fetchEmployeesForLeave, IEmployeeForLeveave } from '../../store/future/employeeSlice';
import { fetchCompanies, ICompany } from '../../store/future/companySlice';
import { dateToEpoch } from '../../util/dateFormatter';
import { fetchLeaveRequest, fetchSaveLeave } from '../../store/future/leaveSlice';
import swal from 'sweetalert';
import { LeaveType } from '../models/enum';

function LeaveRequest() {
    const dispatch: AppDispatch = useDispatch();
    
    const [selectedReason, setSelectedReason] = useState('');
    const [description, setDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    
    

    

    

    const handleCreateLeave = () => {
        const epochstart = dateToEpoch(startDate);
        const epochend = dateToEpoch(endDate);
        const token = localStorage.getItem('token')||'';
        dispatch(fetchLeaveRequest({token: token, leaveType: selectedReason, startDate: epochstart, endDate: epochend, description: description})).then((data) => {
            if(data.payload.code === 200){
                swal("Basarılı", data.payload.message, "success").then(() => {
                    setSelectedReason('');
                    setDescription('');
                    setStartDate('');
                    setEndDate('');
                });
            } else {
                swal("Hata", data.payload.message, "error");
            }
           

        });
    };

    return (
        <div className='container'>
            <h1>İzin Tanımla</h1>
           <div className="row p-5">
           
            <div className='m-4'>
                
                <select
                    className='form-select'
                    id="reason"
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                >
                    <option value="">İzin Sebebi Seç</option>
                    <option value={LeaveType.ANNUAL}>Yıllık İzin</option>
                    <option value={LeaveType.MATERNITY}>Annelik İzni</option>
                    <option value={LeaveType.OTHER}>Diğer</option>
                </select>
            </div>
            <div className='m-4'>
                
                <input
                    className='form-input'
                    type="text"
                    id="description"
                    placeholder='İzin Açıklaması'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='m-4'>
                <label htmlFor="startDate">Başlangıç tarihi</label><label htmlFor="endDate"></label>
                <input
                    className='form-select'
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className='m-4'>
                <label htmlFor="endDate">Bitiş tarihi</label>
                <input
                    className='form-select'
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <div className='m-4 text-center'>
            <button className='btn btn-success' onClick={handleCreateLeave}>İzin Oluştur</button>
            </div>
            
           </div>
        </div>
    );
}

export default LeaveRequest