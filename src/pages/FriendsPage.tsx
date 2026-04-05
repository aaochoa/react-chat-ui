import React, { useState, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
    searchUsers,
    loadFriends,
    sendFriendRequest,
    cancelFriendRequest,
} from "../store/friendsSlice";
import { FriendSearchInput } from "../components/Friends/FriendSearchInput";
import { FriendSearchList } from "../components/Friends/FriendSearchList";
import { FriendsList } from "../components/Friends/FriendsList";
import { PendingRequestsList } from "../components/Friends/PendingRequestsList";
import type { FriendUser } from "../types/models";
import "./FriendsPage.css";

type Tab = "search" | "friends" | "requests";

const FriendsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<Tab>("search");
    const [hasSearched, setHasSearched] = useState(false);

    const searchResults = useAppSelector((state) => state.friends.searchResults);
    const isSearching = useAppSelector((state) => state.friends.isSearching);
    const searchError = useAppSelector((state) => state.friends.searchError);
    const friends = useAppSelector((state) => state.friends.friends);
    const isLoadingFriends = useAppSelector((state) => state.friends.isLoadingFriends);
    const friendsError = useAppSelector((state) => state.friends.friendsError);
    const sentRequestIds = useAppSelector((state) => state.friends.sentRequestIds);

    useEffect(() => {
        if (activeTab === "friends") {
            dispatch(loadFriends());
        }
    }, [activeTab, dispatch]);

    const handleSearch = (query: string): void => {
        setHasSearched(true);
        dispatch(searchUsers(query));
    };

    const handleAddFriend = async (userId: number): Promise<void> => {
        const result = await dispatch(sendFriendRequest(userId));
        if (sendFriendRequest.rejected.match(result)) {
            throw result.payload;
        }
    };

    // Outgoing pending entries visible this session (have a known friendship ID)
    const outgoingEntries = useMemo(() => {
        const entries: Array<{ user: FriendUser; friendshipId: number }> = [];
        for (const [userIdStr, friendshipId] of Object.entries(sentRequestIds)) {
            const user = searchResults.find((u) => String(u.id) === userIdStr);
            if (user) {
                entries.push({ user, friendshipId });
            }
        }
        return entries;
    }, [sentRequestIds, searchResults]);

    const handleCancelRequest = async (friendshipId: number): Promise<void> => {
        await dispatch(cancelFriendRequest(friendshipId));
    };

    // Convert sentRequestIds record keys to a Map for FriendSearchList
    const sentRequestMap = useMemo(
        () => new Map(Object.entries(sentRequestIds).map(([k, v]) => [Number(k), v])),
        [sentRequestIds],
    );

    return (
        <div className="friends-page">
            <header className="friends-page-header">
                <h1>Friends</h1>
                <p>Find people and manage your connections.</p>
            </header>

            <nav className="friends-tabs" role="tablist" aria-label="Friends sections">
                {(["search", "friends", "requests"] as Tab[]).map((tab) => (
                    <button
                        key={tab}
                        role="tab"
                        aria-selected={activeTab === tab}
                        className={`friends-tab-btn ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </nav>

            <div role="tabpanel">
                {activeTab === "search" && (
                    <>
                        <FriendSearchInput onSearch={handleSearch} isLoading={isSearching} />
                        {searchError && <p className="friend-search-error">{searchError}</p>}
                        <FriendSearchList
                            results={searchResults}
                            sentRequestIds={sentRequestMap}
                            hasSearched={hasSearched}
                            onAddFriend={handleAddFriend}
                        />
                    </>
                )}

                {activeTab === "friends" && (
                    <FriendsList
                        friends={friends}
                        isLoading={isLoadingFriends}
                        error={friendsError}
                    />
                )}

                {activeTab === "requests" && (
                    <PendingRequestsList
                        outgoing={outgoingEntries}
                        onCancelRequest={handleCancelRequest}
                    />
                )}
            </div>
        </div>
    );
};

export default FriendsPage;
