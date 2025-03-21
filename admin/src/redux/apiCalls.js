import { publicRequest } from "../requestMethod";
import {loginStart, loginSuccess, loginFailure} from "./userRedux";
import {registerStart , registerSuccess, registerFailure } from "./userRedux";

// Function to login user
export const login = (user) =>async (dispatch)=>{
    dispatch(loginStart()); // Start the login process
    try {
        const res = await publicRequest.post("/auth/login",user);
        console.log("Login Response:", res.data);
        dispatch(loginSuccess(res.data)); // If successful, update Redux store
    } catch (error) {
        dispatch(loginFailure()); // If error, update Redux store
    }
};

// Function to register a new user
export const register = (user) => async(dispatch) =>{
    dispatch(registerStart()); // Start the registration process
    try {
        const res = await publicRequest.post("/auth/register",user);
        dispatch(registerSuccess(res.data)); // If successful, update Redux store
        //automatically login user after register
        dispatch(loginSuccess(res.data));
    } catch (error) {   
        dispatch(registerFailure()); // If error, update Redux store
    }
};