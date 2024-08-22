import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Rest from '../../config/RestApis';
import { IResponse } from "../../components/models/IResponse";


export interface IComment{
    token: string;
    companyId: number;
    content: string;
    
}

export interface ICommentList{
    page: number,
    size: number
}

export interface IComments{
    companyName: string;
    companyManagerFirstName: string;
    companyManagerLastName: string;
    companyManagerAvatar: string;
    content: string;
}
interface CommentState {
    comments: IComments[],
    loading: boolean,
    error: number | null,
    page: number,
    size: number
}

const initialState: CommentState = {
    comments: [],
    loading: false,
    error: null,
    page: 0,
    size: 5,
  };

export const fetchSaveComment = createAsyncThunk(
    'comment/fetchSaveComment',
    async (comment: IComment) => {
        const response = await fetch(Rest.commentService + '/save-comment', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        }).then(data => data.json());
        return response;
        
    }
)

export const fetchGetCommentList = createAsyncThunk(
    'comment/fetchGetCommentList',
    async (payload: ICommentList) => {
        const response = await fetch(Rest.commentService + '/get-comment-list?page=' + payload.page + '&size=' + payload.size, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        return data.data; 
    }
)

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            
            .addCase(fetchSaveComment.fulfilled, (state, action: PayloadAction<IResponse>) => {
                
            })
            .addCase(fetchGetCommentList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetCommentList.fulfilled, (state, action: PayloadAction<IComments[]>) => {
                state.loading = false;
                state.comments = [...state.comments, ...action.payload]; // Append new comments
                state.page += 1; // Increment page
            })
            .addCase(fetchGetCommentList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.code ? parseInt(action.error.code, 10) : null;
            });
            
    }
   
})

export default commentSlice.reducer