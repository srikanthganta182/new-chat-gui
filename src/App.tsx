import React, {useState} from 'react';
import './App.css';
import CreateSession from "./components/CreateSession";
import SessionList from "./components/SessionList";
import ChatForm from "./components/ChatForm";
import ChatLog from "./components/ChatLog";

function App() {
    const [sessionId, setSessionId] = useState<string>("");
    const [tempText, setTempText] = useState<string>("");
    const [sessionListReload, setSessionListReload] = useState<number>(0);
    const [chatLogReload, setChatLogReload] = useState<string>("");

    const [chatLogReload1, setChatLogReload1] = useState<number>(0);
    const [chatLogReload2, setChatLogReload2] = useState<number>(10);

    const renderChatLog1 = () => {
        console.log("before")
        setChatLogReload1(chatLogReload1 + 1);
    };

    const renderChatLog2 = () => {
        console.log("after")
        setChatLogReload2(chatLogReload2 + 1);
    };
    const renderSessionList = () => {
        setSessionListReload(sessionListReload + 1)
    }

    return (
        <div>
            <CreateSession update={renderSessionList}></CreateSession>
            <SessionList sessionListReload={sessionListReload} setSessionId={setSessionId}
                         renderSessionList={renderSessionList}></SessionList>
            {sessionId &&
                <ChatForm renderChatLog1={renderChatLog1} renderChatLog2={renderChatLog2} setTempText={setTempText}
                          sessionId={sessionId}></ChatForm>}
            {sessionId && <ChatLog sessionId={sessionId} tempText={tempText} chatLogReload1={chatLogReload1}
                                   chatLogReload2={chatLogReload2}></ChatLog>}
        </div>
    );
}

export default App;
