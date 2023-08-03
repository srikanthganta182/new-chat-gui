import React, {FC, FormEvent, useState} from "react";
import config from "../config";
import axios from "axios";
import {Chat} from "../App";

interface ChatFormProps {
    setChatLog: (chatLog: Chat[]) => void;
    sessionId: string;
}

const ChatForm: FC<ChatFormProps> = ({setChatLog, sessionId}) => {
    const [text, setText] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const fakeChat = {
            user: text,
            assistant: null,
            reference: null,
            created_at: null
        };

        setChatLog((prevChatLog) => [...prevChatLog, fakeChat]);

        setText("");

        const url = config.backend.path + "session/" + sessionId;
        const reply = await axios.post(url, {text: text});
        addToChatLog(reply.data.text, true, reply.data.reference);
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
