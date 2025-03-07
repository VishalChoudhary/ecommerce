import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzRiYjM1NDNlZTdjMDhkNzczOTI3ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0MTM0NzY2MCwiZXhwIjoxNzQxNjA2ODYwfQ.W_WCvqenS0ZLJQHojobJtMMkQuZ_9SM_KoJlXuARS3A";

export const publicRequest = axios.create({
    baseURL : BASE_URL,
});

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : { token: `Bearer ${TOKEN}` },
});