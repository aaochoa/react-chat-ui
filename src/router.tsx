import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Home } from './components/Home';
import { ConversationsLayout } from './components/Conversations/ConversationsLayout';
import { ConversationsSidebar } from './components/Conversations/ConversationsSidebar';
import { EmptyConversationState } from './components/Conversations/EmptyConversationState';
import { ChatView } from './components/Conversations/ChatView';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'conversations',
                element: <ConversationsLayout sidebar={<ConversationsSidebar />} />,
                children: [
                    {
                        index: true,
                        element: <EmptyConversationState />,
                    },
                    {
                        path: ':id',
                        element: <ChatView />,
                    },
                ],
            },
        ],
    },
]);
