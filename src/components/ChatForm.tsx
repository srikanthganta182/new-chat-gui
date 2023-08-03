// ChatForm.tsx

import React, {FC, FormEvent, useState} from "react";
import config from "../config";
import axios from "axios";
import {Chat} from "../App";

interface ChatFormProps {
    addToChatLog: (chat: Chat) => void;
    sessionId: string;
}

const ChatForm: FC<ChatFormProps> = ({ addToChatLog, sessionId }) => {
    const [text, setText] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const chat: Chat = {
            user: text,
            assistant: "", // initial empty assistant message
            reference: null,
            created_at: new Date()
        };

        addToChatLog(chat); // Add user message to chat log as soon as it's sent

        const url = config.backend.path + "session/" + sessionId;
        const reply = await axios.post(url, { input: text });

        console.log(reply)
        chat.assistant = reply.data.assistant; // update the assistant message

        addToChatLog(chat); // Add the complete chat (user message and assistant reply) to the chat log

        setText("");
    };

    return (
        <form className="chat-input-holder" onSubmit={handleSubmit}>
            <div className="chat-input-wrapper">
                <input
                    className="chat-input-textarea"
                    type="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
                <button type="submit" className="submit-button">
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>
        </form>
    );
};

export default ChatForm;
