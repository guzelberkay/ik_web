// src/store/future/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IRegister } from "../../components/models/IRegister";
import { ILogin } from "../../components/models/ILogin";
import { IResponse } from "../../components/models/IResponse";
import swal from 'sweetalert';
import Rest from '../../config/RestApis';
import { jwtDecode } from 'jwt-decode';

const initialAuthState = {
    token: '',
    user: {
        role: ''
    },
    isLoadingLogin: false,
    isLoadingRegister: false,
    isAuth: false
}

interface DecodedToken {
    userId: number;
    role: string;
    iss: string;
    iat: number;
    exp: number;
}

// JWT token'ı decode eden yardımcı fonksiyon
export const decodeToken = (token: string): DecodedToken => {
    return jwtDecode<DecodedToken>(token);
}

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (payload: IRegister) => {
        try {
            const response = await fetch(Rest.authService + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (!data.code) {
                throw new Error('Response does not contain expected "code" property');
            }

            return data;
        } catch (error) {
            console.error('Error in fetchRegister:', error);
            throw error;
        }
    }
);


export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (payload: ILogin) => {

        try {
            const response = await fetch(Rest.authService + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }).then(data => data.json())

            return response;
        } catch (error) {
            console.error('Error in fetchLogin:', error);
        }
    
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.isAuth = true;
            state.token = action.payload;
        },
        clearToken(state) {
            state.isAuth = false;
            state.token = '';
        }
    },
    extraReducers: (build) => {
        build.addCase(fetchRegister.pending, (state) => {
            state.isLoadingRegister = true;
        });
        build.addCase(fetchRegister.fulfilled, (state, action) => {
            state.isLoadingRegister = false;
            if (action.payload.code === 200) {
                swal("Başarılı!", "Kullanıcı kayıt edilmiştir!", "success");
            } else {
                swal("Hata", action.payload.message || "Kayıt işlemi başarısız oldu!", "error");
            }
        });
        build.addCase(fetchRegister.rejected, (state, action) => {
            state.isLoadingRegister = false;
            swal("Hata", action.error.message || "Kayıt işlemi sırasında bir hata oluştu!", "error");
        });



        build.addCase(fetchLogin.pending, (state) => {
            state.isLoadingLogin = true;
        });
        build.addCase(fetchLogin.fulfilled, (state, action: PayloadAction<IResponse>) => {
            state.isLoadingLogin = false;
            if (action.payload.code === 200) {
                state.token = action.payload.data;
                state.isAuth = true;

                console.log('Token.....:', state.token);

                const decodedToken = decodeToken(state.token);
                state.user = { ...state.user, role: decodedToken.role };
            } else {
                swal('Hata!', action.payload.message, 'error');
            }
        });
        build.addCase(fetchLogin.rejected, (state, action) => {
            state.isLoadingLogin = false;
            swal('Hata!', action.error.message || 'Giriş işlemi sırasında bir hata oluştu!', 'error');
        });
    }
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
