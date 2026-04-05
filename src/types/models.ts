export interface FriendUser {
    id: number;
    email: string;
    first_name: string | null;
    last_name: string | null;
    created_at: string;
}

export type FriendshipStatus = "pending" | "accepted" | "rejected";

export interface Friendship {
    id: number;
    user_id: number;
    friend_id: number;
    status: FriendshipStatus;
    created_at: string;
    updated_at: string;
}
