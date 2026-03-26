import { api } from './api';

export interface User {
    id: number;
    email: string;
}

export interface Message {
    id: number;
    content: string;
    senderId: number;
    createdAt: string;
}

export interface Conversation {
    id: number;
    name: string;
    lastMessage?: Message;
    otherParticipants: User[];
    updatedAt: string;
}

export const conversationsService = {
    getConversations: async (): Promise<Conversation[]> => {
        return api.get<Conversation[]>('/conversations');
    },
    getConversation: async (id: number | string): Promise<Conversation> => {
        return api.get<Conversation>(`/conversations/${id}`);
    },
};
