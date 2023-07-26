import React, {FC, FormEvent, useState} from 'react';

interface ChatFormProps {
    update: () => void;
    updateTempText: (tempText: string) => void;
}

const ChatForm: FC<ChatFormProps> = ({update, updateTempText}) => {

    const [text, setText] = useState("");
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        updateTempText(text)
        update();

        await new Promise(r => setTimeout(r, 3000));

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
