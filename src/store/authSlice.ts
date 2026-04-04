import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, getAuthToken, setAuthToken, clearAuthToken } from "../services/api";

interface User {
    id: number;
    email: string;
}

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: true,
    error: null,
};

export const checkAuthStatus = createAsyncThunk<User, void>(
    "auth/checkStatus",
    async (_, { rejectWithValue }) => {
        const token = getAuthToken();
        if (!token) return rejectWithValue("No token");
        try {
            return await api.get<User>("/auth/profile");
        } catch {
            clearAuthToken();
            return rejectWithValue("Session expired");
        }
    },
);

export const login = createAsyncThunk<User, { email: string; password: string }>(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post<{ user: User; token: string }>("/auth/login", credentials);
            setAuthToken(response.token);
            return response.user;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const register = createAsyncThunk<
    User,
    { email: string; password: string; password_confirmation: string }
>(
    "auth/register",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post<{ user: User; token: string }>("/auth/register", credentials);
            setAuthToken(response.token);
            return response.user;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            clearAuthToken();
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
