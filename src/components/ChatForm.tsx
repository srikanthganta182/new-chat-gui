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

        const userChat: Chat = {
            user: text,
            assistant: "", // Leave this empty for now
            reference: null,
            created_at: new Date()
        };

        addToChatLog(userChat); // Add the user's chat to the log immediately
        setText(""); // Clear the input field

        const url = config.backend.path + "session/" + sessionId;
        const reply = await axios.post(url, {input: text});

        // Now update the last user's chat with the assistant's reply
        addToChatLog({...userChat, assistant: reply.data.text});
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
