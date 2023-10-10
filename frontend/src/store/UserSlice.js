import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

// pour suppression du token dans redux states
export const logoutUser = createAsyncThunk("user/logoutUser", () => {});

// création de la Slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        firstName: null,
        lastName: null,
        userName: null,
        token: null,
        isLog: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // login réussi
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLog = true;
                state.token = action.payload.body.token;
                state.error = null;
            })
            // login échoué
            .addCase(loginUser.rejected, (state, action) => {
                state.isLog = false;
                state.token = null;
                if (
                    action.error.message ===
                    "Request failed with status code 400"
                ) {
                    state.error = "Accès refusé. Identifiants non reconnus.";
                } else {
                    state.error = action.error.message;
                }
            })
            // suppression du token au logOut
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLog = false;
                state.token = null;
            });
    },
});

export default userSlice.reducer;
