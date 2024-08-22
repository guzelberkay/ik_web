import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchUserAssets, rejectAsset, verifyAsset } from '../../store/future/assetSlice';
import './AssetManagement.css';

const AssetManagement: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { assets, status } = useSelector((state: RootState) => state.asset);
    const [selectedAssetId, setSelectedAssetId] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const employeeIdString = localStorage.getItem('userId');
    const employeeId = employeeIdString ? parseInt(employeeIdString) : null;

    useEffect(() => {
        if (employeeId !== null) {
            dispatch(fetchUserAssets(employeeId));
        }
    }, [dispatch, employeeId]);    

    /*   useEffect(() => {
          console.log('Assets:', assets); // Debugging line
      }, [assets]);
   */
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

    /*     if (status === 'loading') return <div>Loading...</div>;
        if (status === 'failed') return <div>Error loading assets</div>; */

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
                        assets.map((asset) => (
                            <tr key={asset.id}>
                                <td>{asset.name}</td>
                                <td>{asset.serialNumber}</td>
                                <td>{asset.verificationStatus}</td>
                                <td>
                                    {asset.verificationStatus === "Beklemede" ? (
                                        <>
                                            <button onClick={() => handleVerification(asset.id, true)}>Evet, Onayla</button>
                                            <button onClick={() => setSelectedAssetId(asset.id)}>Hayır, Not Ekle</button>
                                            {selectedAssetId === asset.id && (
                                                <>
                                                    <textarea
                                                        placeholder="Durumunuza dair not ekleyin..."
                                                        value={note}
                                                        onChange={(e) => setNote(e.target.value)}
                                                    />
                                                    <button onClick={() => handleRejection(asset.id)}>Reddet</button>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <span>{asset.verificationStatus === 'Onaylandı' ? 'Onaylanmış' : 'Reddedildi'}</span>
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
