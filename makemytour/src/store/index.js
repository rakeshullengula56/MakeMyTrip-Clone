import { configureStore, createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {

    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;

};

const saveUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const initialState = {
    user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            console.log(action.payload);
            saveUserToLocalStorage(action.payload);
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export default store;
