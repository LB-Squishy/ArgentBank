import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch au login pour recuperation du token
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (userLoginData) => {
        const request = await axios.post(
            "http://localhost:3001/api/v1/user/login",
            userLoginData
        );
        const response = await request.data;
        return response;
    }
);

// pour reset du state au Logout
export const logoutUser = createAsyncThunk("user/logoutUser", () => {});
