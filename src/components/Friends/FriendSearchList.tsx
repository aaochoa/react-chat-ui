import React from "react";
import type { FriendUser } from "../../types/models";
import { FriendSearchResult } from "./FriendSearchResult";

interface Props {
    results: FriendUser[];
    sentRequestIds: Map<number, number>;
    hasSearched: boolean;
    onAddFriend: (userId: number) => Promise<void>;
}

export const FriendSearchList: React.FC<Props> = ({ results, sentRequestIds, hasSearched, onAddFriend }) => {
    if (!hasSearched) {
        return (
            <div className="friends-empty-state">
                <p>Search for users by name or email to add them as friends.</p>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="friends-empty-state">
                <p>No users found. Try a different search term.</p>
            </div>
        );
    }

    return (
        <ul className="friend-result-list" role="list">
            {results.map((user) => (
                <li key={user.id}>
                    <FriendSearchResult
                        user={user}
                        isPending={sentRequestIds.has(user.id)}
                        onAddFriend={onAddFriend}
                    />
                </li>
            ))}
        </ul>
    );
};
