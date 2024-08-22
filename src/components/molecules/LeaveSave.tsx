import React, { useEffect, useState } from 'react';
import { ICompany, fetchCompanies } from '../../store/future/companySlice';
import { AppDispatch, useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { fetchEmployeesForLeave, IEmployeeForLeveave } from '../../store/future/employeeSlice';
import { LeaveType } from '../models/enum';
import { dateToEpoch } from '../../util/dateFormatter';
import { fetchSaveLeave } from '../../store/future/leaveSlice';
import swal from 'sweetalert';

export default function LeaveSave() {
    const dispatch: AppDispatch = useDispatch();
    const [selectedCompany, setSelectedCompany] = useState<number>(0);
    const [selectedEmployee, setSelectedEmployee] = useState<number>(0);
    const [selectedReason, setSelectedReason] = useState('');
    const [description, setDescription] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const companyList: ICompany[] = useAppSelector(state => state.company.companies) || [];
    const employeeList: IEmployeeForLeveave [] = useAppSelector(state => state.employee.employeesForLeave) || [];
    

    useEffect(() => {
        dispatch(fetchCompanies())
    }, [dispatch]);

    useEffect(() => {
        if(selectedCompany>0){
            dispatch(fetchEmployeesForLeave(selectedCompany))
        }
    }, [dispatch, selectedCompany]);
    

    

    const handleCreateLeave = () => {
        const epochstart = dateToEpoch(startDate);
        const epochend = dateToEpoch(endDate);
        dispatch(fetchSaveLeave({employeeId: selectedEmployee, leaveType: selectedReason, startDate: epochstart, endDate: epochend, description: description})).then((data) => {
            if(data.payload.code === 200){
                swal("Basarılı", data.payload.message, "success").then(() => {
                    setSelectedCompany(0);
                    setSelectedEmployee(0);
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
                    id="company"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(Number(e.target.value))}
                >
                    <option value="">Şirket Seç</option>
                    {
                        companyList.length > 0 && companyList.map((company, index) => <option key={index} value={company.companyId}>{company.companyName}</option>)
                    }
                    
                </select>
            </div>
            <div className='m-4'>
                
                <select
                className='form-select'
                    id="employee"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(Number(e.target.value))}
                >
                    <option value="">Çalışan Seç</option>
                    {employeeList.length > 0 && employeeList.map((employee, index) => <option key={index} value={employee.employeeId}>{employee.employeeName}, {employee.employeeSurname}, {employee.annualLeave}</option>)}
                </select>
            </div>
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
                
                <input
                    className='form-select'
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className='m-4'>
                
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
