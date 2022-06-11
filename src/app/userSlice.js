import {createSlice} from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem('user'));



const userSlice = createSlice({
    name: "user",
    initialState: {
        user: user ? user : null,
        loading: false,
    },

    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const {login, logout} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;