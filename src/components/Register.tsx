import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Register.css';

interface RegisterProps {
    onSwitchView: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onSwitchView }) => {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }

        setIsSubmitting(true);
        try {
            await register({ 
                email, 
                password, 
                password_confirmation: passwordConfirmation 
            });
        } catch (err: unknown) {
            const errorObj = err as { errors?: string[]; error?: string };
            const errorMessage = errorObj.errors ? errorObj.errors.join(', ') : (errorObj.error || 'Registration failed. Please try again.');
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card glass">
                <div className="register-header">
                    <div className="app-logo">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 5L25 15L35 20L25 25L20 35L15 25L5 20L15 15L20 5Z" fill="url(#nebula_gradient)" />
                            <defs>
                                <linearGradient id="nebula_gradient" x1="5" y1="5" x2="35" y2="35" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#4F46E5" />
                                    <stop offset="1" stopColor="#9333EA" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <h1>Create your account</h1>
                    <p>Join the Nebula Chat community today</p>
                </div>
                <form onSubmit={handleSubmit} className="register-form">
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
                    <div className="input-group">
                        <label htmlFor="password_confirmation">Confirm Password</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            placeholder="••••••••"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" disabled={isSubmitting} className="register-button">
                        {isSubmitting ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>
                <div className="register-footer">
                    <p>Already have an account? <button type="button" className="link-btn" onClick={onSwitchView}>Log in</button></p>
                </div>
            </div>
        </div>
    );
};
