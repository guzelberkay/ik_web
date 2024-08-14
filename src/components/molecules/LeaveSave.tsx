import React, { useEffect, useState } from 'react';
import { ICompany, fetchCompanies } from '../../store/future/companySlice';
import { AppDispatch, useAppSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { fetchEmployeesForLeave, IEmployeeForLeveave } from '../../store/future/employeeSlice';
import { LeaveType } from '../models/enum';

export default function LeaveSave() {
    const dispatch: AppDispatch = useDispatch();
    const [selectedCompany, setSelectedCompany] = useState<number>(0);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedReason, setSelectedReason] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const companyList: ICompany[] = useAppSelector(state => state.company.companies) || [];
    const employeeList: IEmployeeForLeveave [] = useAppSelector(state => state.employee.employeesForLeave) || [];

    useEffect(() => {
        dispatch(fetchCompanies()).then(() => {
            dispatch(fetchEmployeesForLeave(selectedCompany));
        });
    }, [dispatch]);




    const handleCreateLeave = () => {
        
        console.log({
            selectedCompany,
            selectedEmployee,
            selectedReason,
            startDate,
            endDate,
        });
    };

    return (
        <div className='shadow p-5' style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px' }}>
            
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
                    onChange={(e) => setSelectedEmployee(e.target.value)}
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
    );
}
