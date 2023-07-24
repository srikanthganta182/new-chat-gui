import React, {FC} from 'react';

interface ChatProps {
    sessionId: string;
}

const ChatList: FC<ChatProps> = ({sessionId}) => {
    return (
        <div>
            <button>{sessionId}</button>
        </div>
    );
};

export default ChatList;
