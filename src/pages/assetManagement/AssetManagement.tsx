import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchUserAssets, rejectAsset, verifyAsset } from '../../store/future/assetManagementSlice';
import './AssetManagement.css';

const AssetManagement: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { assets } = useSelector((state: RootState) => state.assetManagement);
    const [selectedAssetId, setSelectedAssetId] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const employeeIdString = localStorage.getItem('userId');
    const employeeId = employeeIdString ? parseInt(employeeIdString) : null;

    useEffect(() => {
        if (employeeId !== null) {
            dispatch(fetchUserAssets(employeeId));
        }
    }, [dispatch, employeeId]);    

    const handleVerification = (assetId: string, isVerified: boolean) => {
        console.log('Handle Verification - Asset ID:', assetId, 'Is Verified:', isVerified); // Debugging line
        dispatch(verifyAsset({ assetId, isVerified, note }));
        setSelectedAssetId('');
        setNote('');
    };

    const handleRejection = (assetId: string) => {
        dispatch(rejectAsset({ assetId, note }));
        setSelectedAssetId('');
        setNote('');
    };

    return (
        <div className="asset-verification">
            <h1>Zimmetlerim</h1>
            <table>
                <thead>
                    <tr>
                        <th>Eşya Adı</th>
                        <th>Seri Numarası</th>
                        <th>Durum</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.length > 0 ? (
                        assets.map((assetManagement) => (
                            <tr key={assetManagement.id}>
                                <td>{assetManagement.name}</td>
                                <td>{assetManagement.serialNumber}</td>
                                <td>{assetManagement.verificationStatus}</td>
                                <td>
                                    {assetManagement.verificationStatus === "Beklemede" ? (
                                        <>
                                            <button onClick={() => handleVerification(assetManagement.id, true)}>Evet, Onayla</button>
                                            <button onClick={() => setSelectedAssetId(assetManagement.id)}>Hayır, Not Ekle</button>
                                            {selectedAssetId === assetManagement.id && (
                                                <>
                                                    <textarea
                                                        placeholder="Durumunuza dair not ekleyin..."
                                                        value={note}
                                                        onChange={(e) => setNote(e.target.value)}
                                                    />
                                                    <button onClick={() => handleRejection(assetManagement.id)}>Reddet</button>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <span>{assetManagement.verificationStatus === 'Onaylandı' ? 'Onaylanmış' : 'Reddedildi'}</span>
                                    )}
                                </td>
                            </tr>
                        ))) : (
                        <tr>
                            <td colSpan={4}>Zimmetli eşya bulunamadı.</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}

export default AssetManagement;
