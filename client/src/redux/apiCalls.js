import { publicRequest } from "../requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = (user) =>async (dispatch)=>{
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login",user);
        console.log("Login Response:", res.data); // ✅ Log response data
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
};