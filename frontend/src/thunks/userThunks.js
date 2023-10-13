import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**  fetch au login pour recuperation du token
/* @param {string} userLoginData {email,password}
/* @returns {Promise} string {token}
*/
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (userLoginData) => {
        const response = await axios.post(
            "http://localhost:3001/api/v1/user/login",
            userLoginData
        );
        return response.data;
    }
);

// pour reset du state au Logout
export const logoutUser = createAsyncThunk("user/logoutUser", () => {});

/**  fetch pour recuperation des données utilisateur
/* @param {string} token
/* @returns {Promise} createdAt,email,firstname,id,lastName,updateAt,userName
*/
export const addProfilUser = createAsyncThunk(
    "user/addProfilUser",
    async (token) => {
        const response = await axios.post(
            "http://localhost:3001/api/v1/user/profile",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    }
);

/**  fetch pour changer les données utilisateur
/* @param {string} newUsername
/* @returns {Promise}
*/
export const changeProfilUser = createAsyncThunk(
    "user/changeProfilUser",
    async ({ token, newUserName }) => {
        const response = await axios.put(
            "http://localhost:3001/api/v1/user/profile",
            { userName: `${newUserName}` },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    }
);
