import React, { useState } from "react";
import type { FriendUser } from "../../types/models";

interface Props {
    user: FriendUser;
    friendshipId: number;
    direction: "incoming" | "outgoing";
    onAccept?: (friendshipId: number) => Promise<void>;
    onReject: (friendshipId: number) => Promise<void>;
}

function displayName(user: FriendUser): string {
    const full = [user.first_name, user.last_name].filter(Boolean).join(" ");
    return full || user.email;
}

export const PendingRequestItem: React.FC<Props> = ({ user, friendshipId, direction, onAccept, onReject }) => {
    const [isBusy, setIsBusy] = useState(false);

    const handle = async (action: (id: number) => Promise<void>): Promise<void> => {
        setIsBusy(true);
        try {
            await action(friendshipId);
        } finally {
            setIsBusy(false);
        }
    };

    return (
        <div className="pending-request-item">
            <div className="friend-list-avatar" aria-hidden="true">
                {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="friend-list-info">
                <span className="friend-list-name">{displayName(user)}</span>
                <span className="friend-list-email">{user.email}</span>
            </div>
            <div className="pending-request-actions">
                {direction === "incoming" && onAccept && (
                    <button
                        className="friend-accept-btn"
                        onClick={() => handle(onAccept)}
                        disabled={isBusy}
                        aria-label={`Accept friend request from ${displayName(user)}`}
                    >
                        Accept
                    </button>
                )}
                <button
                    className="friend-reject-btn"
                    onClick={() => handle(onReject)}
                    disabled={isBusy}
                    aria-label={direction === "incoming" ? `Reject friend request from ${displayName(user)}` : `Cancel request to ${displayName(user)}`}
                >
                    {direction === "incoming" ? "Reject" : "Cancel"}
                </button>
            </div>
        </div>
    );
};
