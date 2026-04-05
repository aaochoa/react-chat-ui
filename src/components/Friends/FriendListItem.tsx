import React from "react";
import type { FriendUser } from "../../types/models";

interface Props {
    friend: FriendUser;
}

function displayName(user: FriendUser): string {
    const full = [user.first_name, user.last_name].filter(Boolean).join(" ");
    return full || user.email;
}

export const FriendListItem: React.FC<Props> = ({ friend }) => (
    <div className="friend-list-item">
        <div className="friend-list-avatar" aria-hidden="true">
            {friend.email.charAt(0).toUpperCase()}
        </div>
        <div className="friend-list-info">
            <span className="friend-list-name">{displayName(friend)}</span>
            <span className="friend-list-email">{friend.email}</span>
        </div>
    </div>
);
