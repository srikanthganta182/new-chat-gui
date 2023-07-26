import React, {FC, FormEvent, useState} from 'react';
import config from "../config";
import axios from "axios";

interface ChatFormProps {
    renderChatLog1: () => void;
    renderChatLog2: () => void;
    setTempText: (tempText: string) => void;
    sessionId: string;
}

const ChatForm: FC<ChatFormProps> = ({renderChatLog1, renderChatLog2, setTempText, sessionId}) => {

    const [text, setText] = useState("");
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setTempText(text);
        renderChatLog1();
        setText("");

        const url = config.backend.path + 'session/' + sessionId;
        await axios.post(url, {text: text});
        await new Promise(resolve => setTimeout(resolve, 1000));
        renderChatLog2();
    };

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <input type="text" value={text} onChange={(event) => setText(event.target.value)}/>
            <button type={"submit"}>SUBMIT</button>
        </form>
    );
};

export default ChatForm;