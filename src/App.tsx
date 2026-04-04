import { useState, useEffect } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { useAppDispatch, useAppSelector } from "./store";
import { checkAuthStatus, logout } from "./store/authSlice";

function App() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const isAuthenticated = user !== null;

    const [currentView, setCurrentView] = useState<"login" | "register">("login");

    useEffect(() => {
        dispatch(checkAuthStatus());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
                <p>Establishing session...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return currentView === "login" ? (
            <Login onSwitchView={() => setCurrentView("register")} />
        ) : (
            <Register onSwitchView={() => setCurrentView("login")} />
        );
    }

    return (
        <>
            <header className="app-header glass">
                <div className="header-left">
                    <Link to="/" className="app-logo">
                        <span className="logo-icon">🚀</span>
                        <span className="logo-text">ChatApp</span>
                    </Link>
                    <nav className="main-nav">
                        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                            Home
                        </NavLink>
                        <NavLink to="/conversations" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                            Conversations
                        </NavLink>
                        <NavLink to="/friends" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                            Friends
                        </NavLink>
                    </nav>
                </div>
                <div className="header-right">
                    <div className="user-profile">
                        <div className="avatar">
                            {user?.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-details">
                            <span className="email">{user?.email}</span>
                            <span className="status">Active</span>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={() => dispatch(logout())}>
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                        </svg>
                        Logout
                    </button>
                </div>
            </header>
            <main className="app-main">
                <Outlet />
            </main>
        </>
    );
}

export default App;
