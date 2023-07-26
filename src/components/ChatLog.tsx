import React, {FC, useEffect} from 'react';
import config from "../config";
import axios from "axios";

interface Chat {
    text: string;
    isReply: boolean;
}

interface ChatLogProps {
    chatLog: Chat[];
    setChatLog: (chatLog: Chat[]) => void;
    sessionId: string
}

const ChatLog: FC<ChatLogProps> = ({chatLog, setChatLog, sessionId}) => {
    const fetchLogs = async () => {
        const url = config.backend.path + 'session/' + sessionId;
        const logs = (await axios.get<Chat[]>(url)).data;
        setChatLog(logs);
    }

    useEffect(() => {
        fetchLogs();
        console.log("sessionId CHANGED")
    }, [sessionId]);

    return (
        <div>
            {chatLog.map(chat => <p> {chat.text}</p>)}
        </div>
    );
};

export default ChatLog;
