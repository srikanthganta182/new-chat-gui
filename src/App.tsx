import React, {useState} from 'react';
import './App.css';
import CreateSession from "./components/CreateSession";
import SessionList from "./components/SessionList";
import ChatForm from "./components/ChatForm";
import ChatLog from "./components/ChatLog";

function App() {
    const [sessionId, setSessionId] = useState<string>("x");
    const [tempText, setTempText] = useState<string>("");
    const [sessionListReload, setSessionListReload] = useState<number>(0);
    const [chatLogReload, setChatLogReload] = useState<number>(0);

    const renderSessionList = () => {
        setSessionListReload(sessionListReload + 1)
    }
    const renderChatLog = () => {
        setChatLogReload(chatLogReload + 1)
    }

    return (
        <div>
            <CreateSession update={renderSessionList}></CreateSession>
            <SessionList renderOn={sessionListReload} updateCurrentSessionId={setSessionId}
                         updateSessionList={renderSessionList}></SessionList>
            <ChatForm update={renderChatLog} updateTempText={setTempText} sessionId={sessionId}></ChatForm>
            <ChatLog sessionId={sessionId} tempText={tempText} renderOn={chatLogReload}></ChatLog>
        </div>
    );
}

export default App;
