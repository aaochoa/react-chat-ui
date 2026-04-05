import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { conversationsService, type Conversation } from "../services/conversations";

interface ConversationsState {
    conversations: Conversation[];
    isLoading: boolean;
    error: string | null;
    selectedId: number | null;
}

const initialState: ConversationsState = {
    conversations: [],
    isLoading: false,
    error: null,
    selectedId: null,
};

export const fetchConversations = createAsyncThunk<Conversation[]>(
    "conversations/fetch",
    async (_, { rejectWithValue }) => {
        try {
            return await conversationsService.getConversations();
        } catch (err: unknown) {
            const message = err && typeof err === "object" && "error" in err
                ? String((err as { error: unknown }).error)
                : "Failed to load conversations";
            return rejectWithValue(message);
        }
    },
);

const conversationsSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        setSelectedId(state, action: PayloadAction<number | null>) {
            state.selectedId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversations.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.conversations = action.payload ?? [];
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSelectedId } = conversationsSlice.actions;
export default conversationsSlice.reducer;
