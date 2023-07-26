import React, {FC, FormEvent, useState} from 'react';
import config from "../config";
import axios from "axios";

// ChatForm component
interface ChatFormProps {
    addToChatLog: (text: string, isReply: boolean) => void;
    sessionId: string;
}

const ChatForm: FC<ChatFormProps> = ({addToChatLog, sessionId}) => {
    const [text, setText] = useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        addToChatLog(text, false);
        setText("");

        const url = config.backend.path + 'session/' + sessionId;
        const reply = await axios.post(url, {text: text});
        addToChatLog(reply.data.text, true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={(event) => setText(event.target.value)}/>
            <button type={"submit"}>SUBMIT</button>
        </form>
    );
};

export default ChatForm;
