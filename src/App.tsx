import React, { useState } from "react";
import "./App.css";
import "./normal.css";
import CreateSession from "./components/CreateSession";
import SessionList from "./components/SessionList";
import ChatForm from "./components/ChatForm";
import ChatLog from "./components/ChatLog";

function App() {
  const [sessionId, setSessionId] = useState<string>("");
  const [sessionListReload, setSessionListReload] = useState<number>(0);
  const [chatLog, setChatLog] = useState<Array<Chat>>([]);

  const addToChatLog = (chat: Chat, replaceLastMessage: boolean = false) => {
    setChatLog((prevChatLog) => {
      if (replaceLastMessage) {
        return prevChatLog.map((c) => (c.id === chat.id ? chat : c));
      } else {
        return [...prevChatLog, chat];
      }
    });
  };

  const renderSessionList = () => {
    setSessionListReload(sessionListReload + 1);
  };

  return (
    <div className="big-container">
      <aside className="sidemenu">
        <CreateSession update={renderSessionList}></CreateSession>
        <SessionList
          sessionListReload={sessionListReload}
          sessionId={sessionId}
          setSessionId={setSessionId}
          renderSessionList={renderSessionList}
        ></SessionList>
      </aside>
      <section className="chatbox">
        {sessionId && (
          <ChatForm
            addToChatLog={addToChatLog}
            sessionId={sessionId}
            currentMessageCount={chatLog.length}
          ></ChatForm>
        )}
        {sessionId && (
          <ChatLog
            chatLog={chatLog}
            setChatLog={setChatLog}
            sessionId={sessionId}
          ></ChatLog>
        )}
      </section>
    </div>
  );
}

export interface Reference {
  title: string;
  timestamp: Date;
  url: string;
  img: string;
  src: string;
}

export interface Chat {
  id: number;
  user: string;
  assistant: string;
  reference: any;
  created_at: Date;
}

export default App;
