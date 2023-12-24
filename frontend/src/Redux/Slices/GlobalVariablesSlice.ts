import { createSlice } from "@reduxjs/toolkit";

const GlobalVariables = createSlice({
    name: "GlobalVariables",
    initialState: {
        header: true,
        footer: true,
        loginModal: false,
        token:""
    },
    reducers: {
        setHeader: (state, { payload }) => {
            state.header = payload;
        },
        setFooter: (state, { payload }) => {
            state.footer = payload;
        },
        setLoginModal: (state, { payload }) => {
            state.loginModal = payload;
        },
        setToken: (state, { payload }) => {
            state.token = payload;
        },
    },
});

export const GlobalVariablesActions = GlobalVariables.actions;
export default GlobalVariables.reducer;
