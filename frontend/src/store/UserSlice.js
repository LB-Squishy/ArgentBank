import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (userLoginData) => {
        const request = await axios.post(
            "http://localhost:3001/api/v1/user/login",
            userLoginData
        );
        const response = await request.data;
        localStorage.setItem("token", JSON.stringify(response.body.token));
        console.log(response);
        const test = localStorage.getItem("token");
        console.log(test);
        return response;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        userName: null,
        token: null,
        log: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.log = true;
                state.token = action.payload.body.token;
                // console.log(action.payload);
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.log = false;
                state.token = null;
                if (
                    action.error.message ===
                    "Request failed with status code 400"
                ) {
                    state.error = "Accès refusé. Identifiants non reconnus.";
                } else {
                    state.error = action.error.message;
                }
            });
    },
});

export default userSlice.reducer;
