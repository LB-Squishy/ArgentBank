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
