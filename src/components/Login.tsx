import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

interface LoginProps {
    onSwitchView: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSwitchView }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await login({ email, password });
        } catch (err: unknown) {
            const errorObj = err as { error?: string };
            setError(errorObj.error || 'Invalid credentials. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card glass">
                <div className="login-header">
                    <div className="app-logo">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 5L25 15L35 20L25 25L20 35L15 25L5 20L15 15L20 5Z" fill="url(#nebula_gradient_login)" />
                            <defs>
                                <linearGradient id="nebula_gradient_login" x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#4F46E5" />
                                    <stop offset="1" stopColor="#9333EA" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Enter your details to access your chats</p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" disabled={isSubmitting} className="login-button">
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <div className="login-footer">
                    <p>Don't have an account? <button type="button" className="link-btn" onClick={onSwitchView}>Create one</button></p>
                </div>
            </div>
        </div>
    );
};
