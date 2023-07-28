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
        // todo
        let logs = (await axios.get<Chat[]>(url)).data;
        logs[0].reference = {
            title: "Boekhoudapp Dexxter is Antwerpse \u2018Beloftevolle KMO van het jaar\u2019",
            timestamp: new Date("2022-11-14"),
            url: "https://dexxter.be/beloftevolle-kmo-van-het-jaar/",
            img: "https://dexxter.be/wp-content/uploads/2022/11/DSC_2774-1024x683.jpg",
            src: "dexxter"
        }
        console.log(logs)

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
