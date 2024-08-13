import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IResponse } from "../../components/models/IResponse"
import Rest from '../../config/RestApis';

export interface IUserProfile {
    name: string;
    email: string;
    avatar: string;
    company: string;
    title: string;
    phone: string;
    numberOfEmployee: number;
}
export interface ISearchUser {
    id: number,
    email: string,
    name: string,
    company: string,
    title: string,
    avatar: string;
    phone: string;
    numberOfEmployee: number;
    status: string;
}

export interface IPendingUsers {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    userStatus: string,
    companyId: number,
    companyName: string,
    numberOfEmployee: number;
}

interface IUserState {
    userProfile: IUserProfile | null,
    isLoading: boolean,
    userSearchList: ISearchUser[],
    searchEmail: string,
    pendingUsers: IPendingUsers[];
}
const initialUserState: IUserState = {
    userProfile: null,
    isLoading: false,
    userSearchList: [],
    searchEmail: '',
    pendingUsers: []
}

// Fetch Pending Users
export const fetchGetPendingUsers = createAsyncThunk(
    'user/fetchGetPendingUsers',
    async (token:string) => {
      const response = await fetch(`${Rest.adminService}/get-pending-user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      
      return result;
    }
  );

//Update Pending Users
interface IUpdateUserStatusPayload {
    userId: number;
    token: string;
    companyId: number;
    email: string;
}
export const updatePendingUserStatus = createAsyncThunk(
    'user/updatePendingUserStatus',
    async (payload: IUpdateUserStatusPayload) => {
        console.log('Approving user payload:', payload.userId, payload.email, payload.companyId ,payload.token);
        const res = await fetch(Rest.adminService + '/send-activation-mail', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${payload.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: payload.userId,
                email: payload.email,
                companyId: payload.companyId,
                token: payload.token
            })
        }).then(data => data.json());
        console.log('Approving user response:',res);
        return res;
    }
);

//Get User Profile
export const fetchgetUserProfile = createAsyncThunk(
    'user/fetchgetUserProfile',
    async (payload: string) => {
        const result = await fetch(Rest.userService + '/get-profile?token=' + payload)
            .then(data => data.json());
        return result;
    }
)

//Search User
export interface IFetchSearchUserPayload {
    token: string,
    email: string
}
export const fetchSearchUserList = createAsyncThunk(
    'user/fetchSearchUserList',
    async (payload: IFetchSearchUserPayload) => {
        const res = fetch(Rest.userService + '/search-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'token': payload.token,
                'email': payload.email
            })
        }).then(data => data.json())
        return res;
    }
)

//Update User
/* interface IFetchUpdateProfilePayload {
    name: string
    email: string
    avatar: string
    company: string
    title: string
    phone: string
    numberOfEmployee: string
    purposeOfRequest: string
    token: string
} */
/* export const fetchUpdateProfile = createAsyncThunk(
    'user/fetchUpdateProfile',
    async (payload: IFetchUpdateProfilePayload) => {
        const res = await fetch(Rest.userService + '/edit-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: payload.email,
                avatar: payload.avatar,
                name: payload.name,
                about: payload.company,
                title: payload.title,
                phone: payload.phone,
                numberOfEmployee: payload.numberOfEmployee,
                purposeOfRequest: payload.purposeOfRequest,
                token: payload.token
            })
        }).then(data => data.json());
        return res;
    }
) */
    interface IFetchForgotPasswordPayload {
        email: string
    }

    export const fetchForgotPassword = createAsyncThunk(
        'user/fetchForgotPassword',
        async (payload: IFetchForgotPasswordPayload) => {
            const res = await fetch(Rest.userService + '/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: payload.email
                })
            }).then(data => data.json());
            return res;
        }
    )

    interface IResetPassword {
        code: string
        password: string
    }
    export const fetchResetPassword = createAsyncThunk(
        'user/fetchResetPassword',
        async (payload: IResetPassword) => {
            const res = await fetch(Rest.userService + '/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: payload.code,
                    password: payload.password
                })
            }).then(data => data.json());
            return res;
        }
    )



const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setSearchEmail(state, action) {
            state.searchEmail = action.payload;
        }
    },
    extraReducers: (build) => {
        build.addCase(fetchgetUserProfile.fulfilled, (state, action: PayloadAction<IResponse>) => {
            if (action.payload.code === 200) {
                state.userProfile = action.payload.data;
            }
        });
        build.addCase(fetchSearchUserList.fulfilled, (state, action: PayloadAction<IResponse>) => {
            state.userSearchList = action.payload.data;
        });
        build.addCase(fetchGetPendingUsers.fulfilled, (state, action: PayloadAction<IResponse>) => {
            
            if (action.payload.code === 200) {
                
                state.pendingUsers = action.payload.data;
            }
        });
        build.addCase(updatePendingUserStatus.fulfilled, (state, action: PayloadAction<IResponse>) => {
            if (action.payload.code === 200) {
                const updatedUser = action.payload.data;
                state.userSearchList = state.userSearchList.map(user =>
                    user.id === updatedUser.id ? updatedUser : user
                );
            }
        });
        build.addCase(fetchForgotPassword.fulfilled, (state, action: PayloadAction<IResponse>) => {
            if (action.payload.code === 200) {
                
            }
        })
    }
});

export const {
    setSearchEmail
} = userSlice.actions;
export default userSlice.reducer;
