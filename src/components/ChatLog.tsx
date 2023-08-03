// ChatLog.tsx

import React, {FC, useEffect} from 'react';
import config from "../config";
import axios from "axios";
import {Card} from 'antd';

import ixordocsLogo from '../logos/ixordocs-logo.png';
import userLogo from '../logos/people.png';
import {Chat} from "../App";

interface ChatLogProps {
    chatLog: Chat[];
    setChatLog: (chatLog: Chat[]) => void;
    sessionId: string;
}

const ChatLog: FC<ChatLogProps> = ({ chatLog, setChatLog, sessionId }) => {

    useEffect(() => {
        const fetchLogs = async () => {
            const url = config.backend.path + 'session/' + sessionId;
            let logs = (await axios.get<Chat[]>(url)).data;

            // if (logs && logs.length > 0 && logs[0]) {
            //     logs[0].reference = {
            //         title: "Boekhoudapp Dexxter is Antwerpse \u2018Beloftevolle KMO van het jaar\u2019",
            //         timestamp: new Date("2022-11-14"),
            //         url: "https://dexxter.be/beloftevolle-kmo-van-het-jaar/",
            //         img: "https://dexxter.be/wp-content/uploads/2022/11/DSC_2774-1024x683.jpg",
            //         src: "dexxter"
            //     }
            // }

            console.log(logs);
            setChatLog(logs);
        };

        fetchLogs();
        console.log("sessionId CHANGED");
    }, [sessionId, setChatLog]);

    return (
        <div className="chat-log">
            {chatLog.map(chat => renderChatMessage(chat))}
        </div>
    );
};


const renderChatMessage = (chat: Chat) => (
    <>
        <div className="chat-message">
            <div className="chat-message-center">
                <div className="avatar">
                    <img src={userLogo} alt="Customer Logo" />
                </div>
                <div className="message"> {chat.user}</div>
            </div>
        </div>
        {chat.assistant && (
            <div className="chat-message chatgpt">
                <div className="chat-message-center">
                    <div className="avatar">
                        <img src={ixordocsLogo} alt="Backend Logo" />
                    </div>
                    <div className="message">
                        {chat.assistant}
                        {chat.reference && (
                            <a href={chat.reference.url} target="_blank" rel="noopener noreferrer">
                                <Card
                                    hoverable
                                    style={{ width: 320, border: 'none' }}  // Increase width and remove border
                                    bodyStyle={{ padding: '12px' }}  // Adjust padding as needed
                                >
                                    <div style={{width: '100%', height: '0', paddingBottom: '75%', position: 'relative'}}>
                                        <img alt={chat.reference.title} src={chat.reference.img} style={{width: '100%', height: 'auto', position: 'absolute', top: '0', left: '0'}} />
                                    </div>
                                    <Card.Meta title={chat.reference.title} description={chat.reference.src} />
                                    <p>{chat.reference.timestamp.toLocaleDateString()}</p>
                                </Card>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        )}
    </>
);



export default ChatLog;
