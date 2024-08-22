import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, useAppSelector } from '../../store';
import { assignAsset, fetchAssignedAssetsByCompanyId } from '../../store/future/assetAssignSlice';
import { fetchCompanies } from '../../store/future/companySlice';
import './AssignAsset.css';
import { fetchEmployeesForLeave, IEmployeeForLeveave } from '../../store/future/employeeSlice';

const AssignAsset: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { companies } = useSelector((state: RootState) => state.company);
    const { assignedAssets } = useSelector((state: RootState) => state.assignasset);
    const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
    const [serialNumber, setSerialNumber] = useState<string>('');
    const [assetName, setAssetName] = useState<string>('');
    const employeeList: IEmployeeForLeveave[] = useAppSelector(state => state.employee.employeesForLeave) || [];

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    useEffect(() => {
        if (selectedCompanyId) {
            dispatch(fetchEmployeesForLeave(selectedCompanyId));
            dispatch(fetchAssignedAssetsByCompanyId(selectedCompanyId));
        }
    }, [dispatch, selectedCompanyId]);

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
        if (selectedEmployeeId && serialNumber && assetName ) {
            dispatch(assignAsset({
                userId: selectedEmployeeId,
                serialNumber,
                assetName,
                verificationStatus: 'Beklemede',
            }))
            .then(() => {
                if (selectedCompanyId) {
                    dispatch(fetchAssignedAssetsByCompanyId(selectedCompanyId));
                }
                setSelectedEmployeeId(null);
                setSerialNumber('');
                setAssetName('');
            })
            .catch(error => {
                console.error('Failed to assign asset:', error);
            });
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
                    {employeeList.length > 0 && employeeList.map((employee, index) => <option key={index} value={employee.user}>{employee.employeeName} {employee.employeeSurname}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="asset-name">Zimmet Adı:</label>
                <input
                    type="text"
                    id="asset-name"
                    placeholder="Zimmet Adı"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                />
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
            <button className='assign-btn' onClick={handleAssignAsset} disabled={!selectedEmployeeId || !serialNumber || !assetName}>
                Ata
            </button>


            <div className="assigned-assets">
                <h1>Atanmış Zimmetler</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Kullanıcı ID</th>
                            <th>İsim</th>
                            <th>Soyisim</th>
                            <th>Zimmet Adı</th>
                            <th>Seri Numarası</th>
                            <th>Durum</th>
                            <th>Not</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignedAssets.length > 0 ? (
                            assignedAssets.map((assignasset) => (
                                <tr key={assignasset.id}>
                                    <td>{assignasset.user.id}</td>
                                    <td>{assignasset.user.firstName}</td>
                                    <td>{assignasset.user.lastName}</td>
                                    <td>{assignasset.assetName}</td>
                                    <td>{assignasset.serialNumber}</td>
                                    <td>{assignasset.verificationStatus}</td>
                                    <td>{assignasset.note ? JSON.parse(assignasset.note).note : 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7}>Atanmış zimmet bulunamadı.</td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AssignAsset;
