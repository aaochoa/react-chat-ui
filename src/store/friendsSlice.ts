import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { FriendUser } from "../types/models";
import { friendshipsService } from "../services/friendships";

interface FriendsState {
    searchQuery: string;
    searchResults: FriendUser[];
    isSearching: boolean;
    searchError: string | null;
    friends: FriendUser[];
    isLoadingFriends: boolean;
    friendsError: string | null;
    // Maps friendId (as string key) → friendshipId. Tracked per session after sending a request.
    sentRequestIds: Record<string, number>;
}

const initialState: FriendsState = {
    searchQuery: "",
    searchResults: [],
    isSearching: false,
    searchError: null,
    friends: [],
    isLoadingFriends: false,
    friendsError: null,
    sentRequestIds: {},
};

export const searchUsers = createAsyncThunk<FriendUser[], string>(
    "friends/search",
    async (query, { rejectWithValue }) => {
        try {
            return await friendshipsService.searchUsers(query);
        } catch (err: unknown) {
            const message = err && typeof err === "object" && "error" in err
                ? String((err as { error: unknown }).error)
                : "Search failed";
            return rejectWithValue(message);
        }
    },
);

export const loadFriends = createAsyncThunk<FriendUser[]>(
    "friends/load",
    async (_, { rejectWithValue }) => {
        try {
            return await friendshipsService.getFriendships();
        } catch (err: unknown) {
            const message = err && typeof err === "object" && "error" in err
                ? String((err as { error: unknown }).error)
                : "Failed to load friends";
            return rejectWithValue(message);
        }
    },
);

export const sendFriendRequest = createAsyncThunk<
    { friendId: number; friendshipId: number },
    number
>(
    "friends/sendRequest",
    async (friendId, { rejectWithValue }) => {
        try {
            const response = await friendshipsService.sendFriendRequest(friendId);
            return { friendId, friendshipId: response.friendship.id };
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

export const cancelFriendRequest = createAsyncThunk<number, number>(
    "friends/cancelRequest",
    async (friendshipId, { rejectWithValue }) => {
        try {
            await friendshipsService.deleteFriendship(friendshipId);
            return friendshipId;
        } catch (err) {
            return rejectWithValue(err);
        }
    },
);

const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        clearSearch(state) {
            state.searchQuery = "";
            state.searchResults = [];
            state.searchError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchUsers.pending, (state, action) => {
                state.isSearching = true;
                state.searchError = null;
                state.searchQuery = action.meta.arg;
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.isSearching = false;
                state.searchResults = action.payload;
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.isSearching = false;
                state.searchError = action.payload as string;
            })
            .addCase(loadFriends.pending, (state) => {
                state.isLoadingFriends = true;
                state.friendsError = null;
            })
            .addCase(loadFriends.fulfilled, (state, action) => {
                state.isLoadingFriends = false;
                state.friends = action.payload ?? [];
            })
            .addCase(loadFriends.rejected, (state, action) => {
                state.isLoadingFriends = false;
                state.friendsError = action.payload as string;
            })
            .addCase(sendFriendRequest.fulfilled, (state, action) => {
                const { friendId, friendshipId } = action.payload;
                state.sentRequestIds[String(friendId)] = friendshipId;
            })
            .addCase(cancelFriendRequest.fulfilled, (state, action) => {
                const cancelledId = action.payload;
                state.sentRequestIds = Object.fromEntries(
                    Object.entries(state.sentRequestIds).filter(([, id]) => id !== cancelledId),
                );
            });
    },
});

export const { clearSearch } = friendsSlice.actions;
export default friendsSlice.reducer;
