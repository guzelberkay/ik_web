import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import swal from 'sweetalert';
import Rest from '../../config/RestApis';

interface AssetState {
    assets: Array<{
        isVerified: any;
        id: string;
        name: string;
        serialNumber: string;
        verificationStatus: string; 
        note?: string; 
        assignedTo: string | null;
    }>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: AssetState = {
    assets: [],
    status: 'idle',
};

export const fetchUserAssets = createAsyncThunk(
    'asset/fetchUserAssets',
    async (employeeId: number) => {
        const response = await fetch(`${Rest.assetService}/${employeeId}`);
        const data = await response.json();
        console.log('Raw Data:', data);
        return data;
    }
);

/* export const fetchUserAssets = createAsyncThunk(
    'asset/fetchUserAssets',
    async () => {
        const staticData = {
            code: 200,
            message: "Kullanıcının zimmetli eşyaları getirildi",
            data: [
                {
                    id: 1,
                    userId: 1,
                    serialNumber: "123",
                    assignedDate: 0,
                    verificationStatus: null,
                    note: null,
                    returned: false
                }
            ]
        };
        console.log('Static Data:', staticData);
        return staticData;
    }
); */

export const verifyAsset = createAsyncThunk(
    'asset/verifyAsset',
    async ({ assetId, isVerified, note }: { assetId: string, isVerified: boolean, note?: string }) => {
        const verificationStatus = isVerified ? 'Onaylandı' : 'Reddedildi';
        await fetch(Rest.assetService + `/${assetId}/verify`, {
            method: 'PUT',
            body: JSON.stringify({ assetId, verificationStatus, note }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { assetId, verificationStatus, note };
    }
);


export const rejectAsset = createAsyncThunk(
    'asset/rejectAsset',
    async ({ assetId, note }: { assetId: string, note: string }) => {
        await fetch(Rest.assetService + `/${assetId}/reject`, {
            method: 'PUT',
            body: JSON.stringify({ note }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return { assetId, note };
    }
);

const assetSlice = createSlice({
    name: 'asset',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAssets.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserAssets.fulfilled, (state, action) => {
                console.log('Fetched Data:', action.payload);
                state.assets = action.payload.data.map((asset: any) => ({
                    id: asset.id,
                    name: `Asset ${asset.id}`,
                    serialNumber: asset.serialNumber,
                    verificationStatus: asset.verificationStatus || 'Beklemede',
                    note: asset.note || '',
                    assignedTo: asset.userId ? `User ${asset.userId}` : null,
                    isVerified: asset.verificationStatus === 'Onaylandı'
                }));
                state.status = 'idle';
            })            
            .addCase(fetchUserAssets.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(verifyAsset.fulfilled, (state, action) => {
                const asset = state.assets.find(asset => asset.id === action.payload.assetId);
                if (asset) {
                    asset.verificationStatus = action.payload.verificationStatus === 'Onaylandı' ? 'Onaylandı' : 'Not Eklendi';
                    asset.note = action.payload.note || '';
                }                
            })
            .addCase(rejectAsset.fulfilled, (state, action) => {
                const asset = state.assets.find(asset => asset.id === action.payload.assetId);
                if (asset) {
                    asset.verificationStatus = "REJECTED";
                    asset.note = action.payload.note;
                }
            });
    }
});

export default assetSlice.reducer;
