import { createSlice } from "@reduxjs/toolkit";

/* when app starts */
const initialState = {
    name: "",
    email: "",
    photo: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        /* when login */
        setUserLoginDetails: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photo = action.payload.photo;
        },

        /* when logout */
        setSignOutState: state => {
            state.name = null;
            state.email = null;
            state.photo = null;
        },
    },
});

export const {setUserLoginDetails, setSignOutState} = userSlice.actions;

/* get access to name,email and photo state values from any of the other files */
export const selectUserName = (state) => state.user.name
export const selectUserEmail = (state) => state.user.email
export const selectUserPhoto = (state) => state.user.photo

export default userSlice.reducer;