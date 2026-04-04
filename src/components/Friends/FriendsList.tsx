import React from "react";
import type { FriendUser } from "../../types/models";
import { FriendListItem } from "./FriendListItem";

interface Props {
    friends: FriendUser[];
    isLoading: boolean;
    error: string | null;
}

export const FriendsList: React.FC<Props> = ({ friends, isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="friends-loading">
                <div className="shimmer-list">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="shimmer-item">
                            <div className="shimmer-avatar" />
                            <div className="shimmer-text">
                                <div className="shimmer-line" />
                                <div className="shimmer-line short" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="friends-empty-state">
                <p className="friends-error">{error}</p>
            </div>
        );
    }

    if (friends.length === 0) {
        return (
            <div className="friends-empty-state">
                <p>No friends yet. Use the Search tab to find and add people.</p>
            </div>
        );
    }

    return (
        <ul className="friends-list" role="list">
            {friends.map((friend) => (
                <li key={friend.id}>
                    <FriendListItem friend={friend} />
                </li>
            ))}
        </ul>
    );
};
