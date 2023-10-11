import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "../thunks/userThunks";

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
            // reset du state au logOut
            .addCase(logoutUser.fulfilled, (state) => {
                state.firstName = null;
                state.lastName = null;
                state.userName = null;
                state.token = null;
                state.isLog = false;
                state.error = null;
            });
    },
});

export default userSlice.reducer;
