import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import { useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Register } from './components/Register';

function App() {
    const { isAuthenticated, isLoading, user, logout } = useAuth();
    const [count, setCount] = useState(0);
    const [currentView, setCurrentView] = useState<'login' | 'register'>('login');

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
                <p>Establishing session...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return currentView === 'login' ? (
            <Login onSwitchView={() => setCurrentView('register')} />
        ) : (
            <Register onSwitchView={() => setCurrentView('login')} />
        );
    }

    return (
        <>
            <section id="center">
                <header className="app-header glass">
                    <div className="user-profile">
                        <div className="avatar">
                            {user?.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-details">
                            <span className="email">{user?.email}</span>
                            <span className="status">Active</span>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={logout}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                        </svg>
                        Logout
                    </button>
                </header>
                <div className="hero">
                    <img src={heroImg} className="base" width="170" height="179" alt="" />
                    <img src={reactLogo} className="framework" alt="React logo" />
                    <img src={viteLogo} className="vite" alt="Vite logo" />
                </div>
                <div>
                    <h1>Get started</h1>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
                    </p>
                </div>
                <button className="counter" onClick={() => setCount((count) => count + 1)}>
                    Count is {count}
                </button>
            </section>

            <div className="ticks"></div>

            <section id="next-steps">
                <div id="docs">
                    <svg className="icon" role="presentation" aria-hidden="true">
                        <use href="/icons.svg#documentation-icon"></use>
                    </svg>
                    <h2>Documentation</h2>
                    <p>Your questions, answered</p>
                    <ul>
                        <li>
                            <a href="https://vite.dev/" target="_blank">
                                <img className="logo" src={viteLogo} alt="" />
                                Explore Vite
                            </a>
                        </li>
                        <li>
                            <a href="https://react.dev/" target="_blank">
                                <img className="button-icon" src={reactLogo} alt="" />
                                Learn more
                            </a>
                        </li>
                    </ul>
                </div>
                <div id="social">
                    <svg className="icon" role="presentation" aria-hidden="true">
                        <use href="/icons.svg#social-icon"></use>
                    </svg>
                    <h2>Connect with us</h2>
                    <p>Join the Vite community</p>
                    <ul>
                        <li>
                            <a href="https://github.com/vitejs/vite" target="_blank">
                                <svg className="button-icon" role="presentation" aria-hidden="true">
                                    <use href="/icons.svg#github-icon"></use>
                                </svg>
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a href="https://chat.vite.dev/" target="_blank">
                                <svg className="button-icon" role="presentation" aria-hidden="true">
                                    <use href="/icons.svg#discord-icon"></use>
                                </svg>
                                Discord
                            </a>
                        </li>
                        <li>
                            <a href="https://x.com/vite_js" target="_blank">
                                <svg className="button-icon" role="presentation" aria-hidden="true">
                                    <use href="/icons.svg#x-icon"></use>
                                </svg>
                                X.com
                            </a>
                        </li>
                        <li>
                            <a href="https://bsky.app/profile/vite.dev" target="_blank">
                                <svg className="button-icon" role="presentation" aria-hidden="true">
                                    <use href="/icons.svg#bluesky-icon"></use>
                                </svg>
                                Bluesky
                            </a>
                        </li>
                    </ul>
                </div>
            </section>

            <div className="ticks"></div>
            <section id="spacer"></section>
        </>
    );
}

export default App;
