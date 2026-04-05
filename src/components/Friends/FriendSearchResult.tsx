import React, { useState } from "react";
import type { FriendUser } from "../../types/models";

interface Props {
    user: FriendUser;
    isPending: boolean;
    onAddFriend: (userId: number) => Promise<void>;
}

function displayName(user: FriendUser): string {
    const full = [user.first_name, user.last_name].filter(Boolean).join(" ");
    return full || user.email;
}

export const FriendSearchResult: React.FC<Props> = ({ user, isPending, onAddFriend }) => {
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAdd = async (): Promise<void> => {
        setIsSending(true);
        setError(null);
        try {
            await onAddFriend(user.id);
        } catch (err: unknown) {
            const message = err && typeof err === "object" && "errors" in err
                ? (err as { errors: string[] }).errors.join(", ")
                : "Could not send request";
            setError(message);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="friend-result-item">
            <div className="friend-result-avatar" aria-hidden="true">
                {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="friend-result-info">
                <span className="friend-result-name">{displayName(user)}</span>
                <span className="friend-result-email">{user.email}</span>
                {error && <span className="friend-result-error">{error}</span>}
            </div>
            <button
                className={`friend-add-btn ${isPending ? "pending" : ""}`}
                onClick={handleAdd}
                disabled={isPending || isSending}
                aria-label={isPending ? "Friend request pending" : `Add ${displayName(user)} as friend`}
            >
                {isSending ? (
                    <span className="spinner-sm" aria-hidden="true" />
                ) : isPending ? (
                    "Pending"
                ) : (
                    "+ Add Friend"
                )}
            </button>
        </div>
    );
};
