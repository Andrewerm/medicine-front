import {
    IGetDataUsers,
    IUser,
    IUserWithoutID,
    LoadingStatusesEnum, IUserPost
} from "../types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {AjaxRoutes} from "../configs/ajaxRoutes";

export interface UsersState {
    users: Array<IUser>
    status: LoadingStatusesEnum
    edit_status: LoadingStatusesEnum;
    error_message?:string,
    delete_status: LoadingStatusesEnum;
}

const initialState: UsersState = {
    edit_status: LoadingStatusesEnum.idle,
    status: LoadingStatusesEnum.idle,
    users: [],
    delete_status: LoadingStatusesEnum.idle
};

export const fetchUsers = createAsyncThunk<Array<IUser>|undefined, undefined, {rejectValue:string, state:{users: UsersState}}>(
    'users/fetchUsers',
    async (_, {getState, rejectWithValue} ) => {
        getState();
        if (!getState().users.users.length) {
            try {
                const response = await axios.get<IGetDataUsers>(AjaxRoutes.GET_USERS,{ withCredentials: true } )
                console.log('запрос на сервер');
                return response.data.items;
            }
            catch (e: unknown) {
                const error=e as AxiosError
                return rejectWithValue(error.message)
            }
        }

    }
);

export const createUser = createAsyncThunk<IUser, IUserWithoutID, { rejectValue: string }>(
    'users/createUser',
    async (user, {rejectWithValue}) => {
        try {
            const response = await axios.put<IUserPost>(AjaxRoutes.POST_USER, user, { withCredentials: true })
            // debugger
            return {id: response.data.user_id, ...user};
        } catch (e: unknown) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)

export const updateUser = createAsyncThunk<IUser, IUser, { rejectValue: string,  }>(
    'users/updateUser',
    async (user, {rejectWithValue}) => {
        try {
            await axios.patch(AjaxRoutes.PATCH_USER+user.id,user, { withCredentials: true })
            return user
            // debugger
        } catch (e: unknown) {
            const error = e as AxiosError
            return rejectWithValue(error.message)
        }
    }
)


export const deleteUser=createAsyncThunk<number,number, { rejectValue: string,  }>(
    'hospitals/deleteUser',
    async (idUser, {rejectWithValue})=>{
        try {
            await axios.delete(AjaxRoutes.DELETE_HOSPITAL+idUser, { withCredentials: true })
            return idUser
            // debugger
        } catch (e: unknown) {
            const error = e as AxiosError<{message: string}>
            if (error.response?.status===422 &&  error.response?.data) return rejectWithValue(error.response.data.message)
            else return rejectWithValue(error.message)
        }
    }
)

export const usersSlice=createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
            .addCase(fetchUsers.pending, state=>{
                state.status=LoadingStatusesEnum.loading
            } )
            .addCase(fetchUsers.rejected, (state,action) => {
                state.status=LoadingStatusesEnum.failed
                state.error_message=action.payload
            })
            .addCase(fetchUsers.fulfilled, (state, action)=>{
                state.status=LoadingStatusesEnum.idle
                if (action.payload) state.users=action.payload
            })
            .addCase(createUser.pending, state => {
                state.edit_status = LoadingStatusesEnum.loading
            })
            .addCase(createUser.rejected, state => {
                state.edit_status = LoadingStatusesEnum.failed
            })
            .addCase(createUser.fulfilled, (state, action) => {
                const temp = action.payload
                state.users.unshift(temp)
                state.edit_status = LoadingStatusesEnum.done
            })
            .addCase(updateUser.pending, state => {
                state.edit_status = LoadingStatusesEnum.loading
            })
            .addCase(updateUser.rejected, (state,action) => {
                state.edit_status = LoadingStatusesEnum.failed
                state.error_message=action.payload
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const hospitalID=state.users.findIndex(item=>item.id===action.payload.id)
                state.users[hospitalID]=action.payload
                state.edit_status = LoadingStatusesEnum.done
            })
            .addCase(deleteUser.pending, state => {
                state.delete_status = LoadingStatusesEnum.loading
            })
            .addCase(deleteUser.rejected, (state,action) => {
                state.delete_status = LoadingStatusesEnum.failed
                state.error_message=action.payload
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users=state.users.filter(item=>item.id!==action.payload)
                state.delete_status = LoadingStatusesEnum.done
            })
}

})

export default usersSlice.reducer
