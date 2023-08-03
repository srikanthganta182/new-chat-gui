import React, {FC, FormEvent, useState} from "react";
import config from "../config";
import axios from "axios";
import {Chat} from "../App";

interface ChatFormProps {
    addToChatLog: (chat: Chat) => void;
    sessionId: string;
}

const ChatForm: FC<ChatFormProps> = ({addToChatLog, sessionId}) => {
    const [text, setText] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const fakeChat: Chat = {
            user: text,
            assistant: "",
            reference: null,
            created_at: new Date()
        };

        addToChatLog(fakeChat);
        setText("");

        const url = config.backend.path + "session/" + sessionId;
        const reply = await axios.post(url, {input: text});
        fakeChat.assistant = reply.data.text; // update the assistant's response
        addToChatLog(fakeChat); // update the chat log again with the complete chat
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
