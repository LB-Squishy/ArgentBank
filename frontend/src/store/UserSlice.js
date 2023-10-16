import { createSlice } from "@reduxjs/toolkit";
import {
    loginUser,
    logoutUser,
    addProfilUser,
    editNameToggle,
} from "../thunks/userThunks";

// création de la Slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        firstName: null,
        lastName: null,
        userName: null,
        token: null,
        error: null,
        isLog: false,
        editNameMode: false,
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
                state.editNameMode = false;
            })
            // toggle le editNameMode
            .addCase(editNameToggle.fulfilled, (state) => {
                state.editNameMode = !state.editNameMode;
            })
            // récupère les infos d'un profil
            .addCase(addProfilUser.fulfilled, (state, action) => {
                state.firstName = action.payload.body.firstName;
                state.lastName = action.payload.body.lastName;
                state.userName = action.payload.body.userName;
            });
    },
});

export default userSlice.reducer;
