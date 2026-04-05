import { api } from "./api";
import type { FriendUser, Friendship } from "../types/models";

interface FriendshipCreateResponse {
    message: string;
    friendship: Friendship;
}

export const friendshipsService = {
    searchUsers: async (query: string): Promise<FriendUser[]> => {
        if (!query.trim()) return [];
        return api.get<FriendUser[]>(`/users/search?query=${encodeURIComponent(query)}`);
    },

    getFriendships: async (): Promise<FriendUser[]> => {
        return api.get<FriendUser[]>("/friendships");
    },

    sendFriendRequest: async (friendId: number): Promise<FriendshipCreateResponse> => {
        return api.post<FriendshipCreateResponse>("/friendships", {
            friendship: { friend_id: friendId },
        });
    },

    acceptFriendRequest: async (friendshipId: number): Promise<{ message: string }> => {
        return api.post<{ message: string }>(`/friendships/${friendshipId}/acceptance`, {});
    },

    deleteFriendship: async (friendshipId: number): Promise<void> => {
        return api.delete<void>(`/friendships/${friendshipId}`);
    },
};
