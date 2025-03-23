import { publicRequest } from "../requestMethod";
import {loginStart, loginSuccess, loginFailure} from "./userRedux";
import {registerStart , registerSuccess, registerFailure } from "./userRedux";

// Function to login user
export const login = (user) => async (dispatch) => {
    dispatch(loginStart()); // Start login process
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data)); // If login is successful, update Redux state
    } catch (error) {
        dispatch(loginFailure()); // Dispatch login failure
        console.error("Login error:", error.response?.data?.message || "Something went wrong");
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