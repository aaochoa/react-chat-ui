import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer, { logout } from "./authSlice";
import conversationsReducer from "./conversationsSlice";
import friendsReducer from "./friendsSlice";
import { setUnauthorizedHandler } from "../services/api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        conversations: conversationsReducer,
        friends: friendsReducer,
    },
});

// When any API call receives a 401, clear the token AND the Redux auth state
// so the app returns to the login screen instead of making more failing requests.
setUnauthorizedHandler(() => store.dispatch(logout()));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
    useSelector<RootState, T>(selector);
