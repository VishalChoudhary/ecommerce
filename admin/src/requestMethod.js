import axios from "axios";

const BASE_URL= "http://localhost:5000/api/";

let TOKEN = "";
const storedData = localStorage.getItem("persist:user");

if(storedData){
    try {
        const parsedData = JSON.parse(storedData);
        const user = parsedData.user ? JSON.parse(parsedData.user) : null;
        TOKEN = user?.currentUser?.accessToken || "";
    } catch (error) {
        console.log(error)
    }
}

export const publicRequest = axios.create({
    baseURL : BASE_URL,
});

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : { token: `Bearer ${TOKEN}` },
})