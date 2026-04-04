import React from "react";
import type { FriendUser } from "../../types/models";
import { PendingRequestItem } from "./PendingRequestItem";

interface PendingEntry {
    user: FriendUser;
    friendshipId: number;
}

interface Props {
    outgoing: PendingEntry[];
    onCancelRequest: (friendshipId: number) => Promise<void>;
}

export const PendingRequestsList: React.FC<Props> = ({ outgoing, onCancelRequest }) => {
    if (outgoing.length === 0) {
        return (
            <div className="friends-empty-state">
                <p>No pending requests. Search for users to send friend requests.</p>
            </div>
        );
    }

    return (
        <div className="pending-requests-sections">
            <section aria-labelledby="outgoing-heading">
                <h3 id="outgoing-heading" className="pending-section-title">Sent Requests</h3>
                <ul className="friends-list" role="list">
                    {outgoing.map(({ user, friendshipId }) => (
                        <li key={friendshipId}>
                            <PendingRequestItem
                                user={user}
                                friendshipId={friendshipId}
                                direction="outgoing"
                                onReject={onCancelRequest}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};
