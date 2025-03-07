import { configureStore, createSlice } from "@reduxjs/toolkit";


const saveUserToLocalStorage = (user) => {
  if (typeof window !== "undefined") {  // ✅ Prevent server error
      localStorage.setItem("user", JSON.stringify(user));
  }
};


const initialState = {
    user: null,
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
