import React, {useState} from 'react';
import './App.css';
import './normal.css'
import CreateSession from "./components/CreateSession";
import SessionList from "./components/SessionList";
import ChatForm from "./components/ChatForm";
import ChatLog from "./components/ChatLog";

// App component
function App() {
    const [sessionId, setSessionId] = useState<string>("");
    const [sessionListReload, setSessionListReload] = useState<number>(0);
    const [chatLog, setChatLog] = useState<Array<{ text: string, is_reply: boolean }>>([]);

    const addToChatLog = (text: string, is_reply: boolean) => {
        setChatLog(prevChatLog => [...prevChatLog, {text: text, is_reply: is_reply}]);
    };

    const renderSessionList = () => {
        setSessionListReload(sessionListReload + 1);
    };

    return (
        <div className="big-container">
            <aside className="sidemenu">
                <CreateSession update={renderSessionList}></CreateSession>
                <SessionList sessionListReload={sessionListReload} setSessionId={setSessionId}
                             renderSessionList={renderSessionList}></SessionList>
            </aside>
            <section className="chatbox">
                {sessionId && <ChatForm addToChatLog={addToChatLog} sessionId={sessionId}></ChatForm>}
                {sessionId &&
                    <ChatLog chatLog={chatLog} setChatLog={setChatLog} sessionId={sessionId}></ChatLog>}
            </section>
        </div>
    );
}

export default App;
