import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, getAuthToken, setAuthToken, clearAuthToken } from '../services/api';

interface User {
    id: number;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    register: (credentials: { email: string; password: string; password_confirmation: string }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuthStatus = useCallback(async () => {
        const token = getAuthToken();
        if (token) {
            try {
                const userProfile = await api.get<User>('/auth/profile');
                // The profile endpoint returns the user object directly
                setUser(userProfile);
            } catch (error) {
                console.error('Failed to restore session:', error);
                clearAuthToken();
                setUser(null);
            }
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = async (credentials: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            const response = await api.post<{ user: User; token: string }>('/auth/login', credentials);
            const { user: userProfile, token } = response;
            setAuthToken(token);
            setUser(userProfile);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (credentials: { email: string; password: string; password_confirmation: string }) => {
        setIsLoading(true);
        try {
            const response = await api.post<{ user: User; token: string }>('/auth/register', credentials);
            const { user: userProfile, token } = response;
            setAuthToken(token);
            setUser(userProfile);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        clearAuthToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
