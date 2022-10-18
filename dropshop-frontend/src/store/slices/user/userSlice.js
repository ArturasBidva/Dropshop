import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    jwtToken: null
}

const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            addUserState(state, {payload}) {
                return payload;
            },
            removeUser() {
                return initialState;
            },
            }

    });

export default userSlice.reducer;
export const {addUserState, removeUser, payWithBalance} = userSlice.actions;
