import React, { useState } from "react";

interface Props {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

export const FriendSearchInput: React.FC<Props> = ({ onSearch, isLoading }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        onSearch(value.trim());
    };

    return (
        <form className="friend-search-form" onSubmit={handleSubmit}>
            <div className="friend-search-input-wrapper">
                <svg className="friend-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    type="text"
                    className="friend-search-input"
                    placeholder="Search by name or email…"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    aria-label="Search users"
                    autoFocus
                />
                <button
                    type="submit"
                    className="friend-search-btn"
                    disabled={isLoading || !value.trim()}
                    aria-label="Submit search"
                >
                    {isLoading ? (
                        <span className="spinner-sm" aria-hidden="true" />
                    ) : (
                        "Search"
                    )}
                </button>
            </div>
        </form>
    );
};
