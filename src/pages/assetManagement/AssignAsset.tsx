import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, useAppSelector } from '../../store';
import { fetchEmployeesByCompanyId, assignAsset } from '../../store/future/assetAssignSlice';
import { fetchCompanies, ICompany } from '../../store/future/companySlice';
import './AssignAsset.css';
import { fetchEmployeesForLeave, IEmployeeForLeveave } from '../../store/future/employeeSlice';

const AssignAsset: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
/*     const { employees } = useSelector((state: RootState) => state.assignasset); */
    const { companies } = useSelector((state: RootState) => state.company);
    const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
    const [serialNumber, setSerialNumber] = useState<string>('');
    const employeeList: IEmployeeForLeveave [] = useAppSelector(state => state.employee.employeesForLeave) || [];

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    useEffect(() => {
        if (selectedCompanyId) {
            dispatch(fetchEmployeesForLeave(selectedCompanyId));
        }
    }, [dispatch, selectedCompanyId]);
    
    useEffect(() => {
        console.log('Fetched employees:', employeeList);
    }, [employeeList]);    

    const handleCompanySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const companyId = parseInt(e.target.value);
        setSelectedCompanyId(companyId);
        setSelectedEmployeeId(null); // Reset employee selection when company changes
    };

    const handleEmployeeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = parseInt(e.target.value);
        setSelectedEmployeeId(userId);
    };

    const handleAssignAsset = () => {
        if (selectedEmployeeId && serialNumber) {
            dispatch(assignAsset({ userId: selectedEmployeeId, serialNumber }));
            setSelectedEmployeeId(null);
            setSerialNumber('');
        }
    };

    return (
        <div className="assign-asset">
            <h1>Zimmet Eşyası Atama</h1>
            <div className="form-group">
                <label htmlFor="company-select">Şirket Seçin:</label>
                <select
                    id="company-select"
                    value={selectedCompanyId || ''}
                    onChange={handleCompanySelect}
                >
                    <option value="">Şirket Seçin</option>
                    {companies.map((company) => (
                        <option key={company.companyId} value={company.companyId}>
                            {company.companyName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="employee-select">Çalışan Seçin:</label>
                <select
                    id="employee-select"
                    value={selectedEmployeeId || ''}
                    onChange={handleEmployeeSelect}
                    disabled={!selectedCompanyId}
                >
                    <option value="">Çalışan Seç</option>
                    {employeeList.length > 0 && employeeList.map((employeeList, index) => <option key={index} value={employeeList.user}>{employeeList.employeeName} {employeeList.employeeSurname}</option>)}
                </select>

            </div>
            <div className="form-group">
                <label htmlFor="serial-number">Seri Numarası:</label>
                <input
                    type="text"
                    id="serial-number"
                    placeholder="Seri Numarası"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                />
            </div>
            <button onClick={handleAssignAsset} disabled={!selectedEmployeeId || !serialNumber}>
                Ata
            </button>
        </div>
    );
};

export default AssignAsset;
