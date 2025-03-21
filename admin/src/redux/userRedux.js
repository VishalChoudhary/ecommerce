import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers:{
        //Login reducers
        loginStart : (state)=>{
            state.isFetching = true;
        },
        loginSuccess : (state,action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure : (state)=>{
            state.isFetching = false;
            state.error = true;
        }, 
        //Register Reducers
        registerStart : (state)=>{
            state.isFetching = true;
        },
        registerSuccess: (state,action)=>{
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        registerFailure: (state)=>{
            state.isFetching = false;
            state.error = true;
        },
        //Logout reducers
        logout : (state)=>{
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
        },     
    },
});

export const {
    loginStart, loginSuccess, loginFailure,
    registerStart, registerSuccess, registerFailure,
    logout,
} = userSlice.actions;

export default userSlice.reducer;