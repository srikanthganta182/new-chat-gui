import React, {FC, useEffect, useState} from 'react';
import config from "../config";
import axios from "axios";

interface ChatLogProps {
    sessionId: string;
    tempText: string;
    chatLogReload1: number;
    chatLogReload2: number;
}

interface Chat {
    id: string;
    text: string;
    isReply: boolean;
}

const ChatLog: FC<ChatLogProps> = ({sessionId, tempText, chatLogReload1, chatLogReload2}) => {
    const [chatLog, setChatLog] = useState<Chat[]>([]);

    const fetchLogs = async () => {
        const url = config.backend.path + 'session/' + sessionId;
        const logs = (await axios.get<Chat[]>(url)).data;
        console.log(logs);
        setChatLog(logs);
    }

    useEffect(() => {
        fetchLogs();
    }, [chatLogReload1, chatLogReload2]);

    return (
        <div>
            <p>{tempText}</p>
            {chatLog.map(chat => <p key={chat.id}> {chat.text}</p>)}
        </div>
    );
};

export default ChatLog;
