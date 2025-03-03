import { configureStore,createSlice } from '@reduxjs/toolkit';

const getUserFromLocalStorage = () => {
    if (typeof window !== "undefined"){
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    } // Ensure it's running in the browser
    return null;
};

const saveUserToLocalStorage = (user) => {
    if (typeof window !== "undefined"){
        localStorage.setItem("user", JSON.stringify(user));
    }
}



const initalState = {
  user: getUserFromLocalStorage(),
}

const userSlice=createSlice({
  name:'user',
  initialState:initalState,
  reducers:{
    setUser(state,action){
      state.user=action.payload;
      saveUserToLocalStorage(action.payload);
    },
    clearUser(state){
      state.user=null;
      localStorage.removeItem("user");
    }
  }
});
export const {setUser,clearUser}=userSlice.actions;

const store = configureStore({
  reducer: {
    user:userSlice.reducer
  },
});
export default store;