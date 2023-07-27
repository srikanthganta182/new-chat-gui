import React, {FC, FormEvent, useState} from "react";
import config from "../config";
import axios from "axios";

// ChatForm component
interface ChatFormProps {
    addToChatLog: (text: string, is_reply: boolean) => void;
    sessionId: string;
}

const ChatForm: FC<ChatFormProps> = ({addToChatLog, sessionId}) => {
    const [text, setText] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        addToChatLog(text, false);
        setText("");

        const url = config.backend.path + "session/" + sessionId;
        const reply = await axios.post(url, {text: text});
        addToChatLog(reply.data.text, true);
    };

    return (
        <form className="chat-input-holder" onSubmit={handleSubmit}>
            <div className="chat-input-wrapper">
                <input
                    className="chat-input-textarea"
                    type="text"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit" className="submit-button">
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>
        </form>
    );
};

export default ChatForm;
