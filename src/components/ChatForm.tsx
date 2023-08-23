import React, { FC, FormEvent, useState } from "react";
import axios from "axios";
import { Chat } from "../App";

interface ChatFormProps {
  addToChatLog: (chat: Chat, replaceLastMessage: boolean) => void;
  sessionId: string;
  currentMessageCount: number;
}

const ChatForm: FC<ChatFormProps> = ({
  addToChatLog,
  sessionId,
  currentMessageCount,
}) => {
  const sessionLength = process.env.REACT_APP_SESSION_LENGTH;

  if (typeof sessionLength === "undefined") {
    throw new Error(
      "REACT_APP_SESSION_LENGTH is not defined in the environment"
    );
  }

  const [text, setText] = useState("");
  const isDisabled = currentMessageCount >= parseInt(sessionLength);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const chat: Chat = {
      id: Date.now(),
      user: text,
      assistant: "",
      reference: null,
      created_at: new Date(),
    };

    addToChatLog(chat, false);

    setText("");

    // const url = "http://localhost:8081/chat/" + sessionId;
    const url = process.env.REACT_APP_BACKEND_URL + sessionId;

    const reply = await axios.post(
      url,
      { input: text },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.REACT_APP_APIKEY,
        },
      }
    );

    chat.assistant = reply.data.assistant;
    chat.reference = reply.data.reference;

    addToChatLog(chat, true);
  };

  if (isDisabled) {
    return (
      <div className="chat-input-holder">
        <p className="session-limit-text">Session limit reached.</p>
      </div>
    );
  }

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
