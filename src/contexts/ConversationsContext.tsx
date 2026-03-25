import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Conversation } from '../services/conversations';
import { conversationsService } from '../services/conversations';

interface ConversationsContextType {
    conversations: Conversation[];
    isLoading: boolean;
    error: string | null;
    refreshConversations: () => Promise<void>;
    selectedConversation: Conversation | null;
    setSelectedConversationId: (id: number | null) => void;
}

const ConversationsContext = createContext<ConversationsContextType | undefined>(undefined);

export const ConversationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const refreshConversations = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await conversationsService.getConversations();
            setConversations(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load conversations');
            console.error('Error loading conversations:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshConversations();
    }, [refreshConversations]);

    const value: ConversationsContextType = {
        conversations,
        isLoading,
        error,
        refreshConversations,
        selectedConversation: conversations.find(c => c.id === selectedId) || null,
        setSelectedConversationId: setSelectedId,
    };

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    );
};

export const useConversations = () => {
    const context = useContext(ConversationsContext);
    if (context === undefined) {
        throw new Error('useConversations must be used within a ConversationsProvider');
    }
    return context;
};
