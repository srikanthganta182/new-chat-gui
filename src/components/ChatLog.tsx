import React, {FC, useEffect, useState} from 'react';

interface ChatLogProps {
    sessionId: string;
    tempText: string;
    renderOn: number
}

interface Chat {
    id: string;
    text: string;
    isReply: boolean;
}

const ChatLog: FC<ChatLogProps> = ({sessionId, tempText, renderOn}) => {

    const [chatLog, setChatLog] = useState<Chat[]>([{id: "chatId", text: "tempChat1", isReply: true}]);
    useEffect(() => {
        //fetchChats for sessionId
        setChatLog([...chatLog, {
            isReply: false,
            id: "adssa21" + (Math.random() + 1).toString(36).substring(7),
            text: tempText
        }])
        return () => {
        };
    }, [tempText, renderOn]);

    return (
        <div>
            {chatLog.map(chat => <p key={chat.id}> {chat.text}</p>)}
        </div>
    );
};

export default ChatLog;
