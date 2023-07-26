import React, {FC, FormEvent, useState} from 'react';
import config from "../config";
import axios from "axios";

interface ChatFormProps {
    update: () => void;
    updateTempText: (tempText: string) => void;
    sessionId: string;
}

const ChatForm: FC<ChatFormProps> = ({update, updateTempText, sessionId}) => {

    const [text, setText] = useState("");
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        updateTempText(text)
        update();

        const url = config.backend.path + 'session/' + sessionId
        await axios.post(url, {text: text})
        updateTempText(text + "replyy")
        update();

    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <input type="text" name="chat input" onChange={(event) => setText(event.target.value)}/>
            <button type={"submit"}>SUBMIT</button>
        </form>
    );
};

export default ChatForm;
