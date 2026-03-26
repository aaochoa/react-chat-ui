import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
    return (
        <div className="home-landing">
            <div className="nebula-sphere"></div>
            <section className="hero-section">
                <span className="hero-tagline">Communication Redefined</span>
                <h1>beyond connections</h1>
                <p className="hero-description">
                    The next-generation chat platform designed for precision, speed, and privacy. 
                    Experience a universe of seamless interaction.
                </p>
                <div className="hero-cta">
                    <Link to="/conversations" className="primary-btn">
                        Go to Chats
                    </Link>
                    <a href="#features" className="secondary-btn">
                        Explore
                    </a>
                </div>
            </section>

            <section className="features-grid" id="features">
                <div className="feature-card">
                    <div className="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <h3>Stellar Design</h3>
                    <p>Meticulously crafted interfaces with glassmorphic depth and premium typography.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <h3>Sub-second Latency</h3>
                    <p>Experience real-time interaction with a performance-optimized orbital engine.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <h3>Secure Isolation</h3>
                    <p>Your messages are protected by end-to-end galactic encryption standards.</p>
                </div>
            </section>
        </div>
    );
};
