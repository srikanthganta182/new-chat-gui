import React, {FC, useEffect} from 'react';
import config from "../config";
import axios from "axios";

import ixordocsLogo from '../logos/ixordocs-logo.png';
import userLogo from '../logos/people.png';
import {Chat} from "../App";

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
        <div className="chat-log">
            {chatLog.map(chat =>
                <div className={`chat-message ${chat.is_reply ? 'chatgpt' : ''}`}>
                    <div className="chat-message-center">
                        {/* Conditionally render the avatar */}
                        {chat.is_reply ? (
                            <div className="avatar">
                                <img src={ixordocsLogo} alt="Backend Logo"/>
                            </div>
                        ) : (
                            <div className="avatar">
                                <img src={userLogo} alt="Customer Logo"/>
                            </div>
                        )}
                        <div className="message"> {chat.text}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatLog;
