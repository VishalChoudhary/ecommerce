import { publicRequest } from "../requestMethod";
import {loginStart, loginSuccess, loginFailure} from "./userRedux";

// Function to login user
export const login = (user) => async (dispatch) => {
    dispatch(loginStart()); // Start login process
    try {
        const res = await publicRequest.post("/auth/login", user);
        console.log(res.data);
        dispatch(loginSuccess(res.data)); // If login is successful, update Redux state
    } catch (error) {
        console.error("Login error:", error.response?.data?.message || "Something went wrong");
        dispatch(loginFailure()); // Dispatch login failure
    }
};