import React, {useState} from 'react';
import './App.css';
import Session from "./components/Session";
import ChatList from "./components/ChatList";

function App() {
    const [sessionId, setSessionId] = useState<string>("x");

    return (
        <div>
            <Session sessionId={sessionId} sessionName={"SESS-NAME"} setSessionId={setSessionId}></Session>
            <ChatList sessionId={sessionId}></ChatList>
            {sessionId}
            {/*    Session List:
        1. Should refresh on new session.
        2. Should refresh on delete session.
        */}


            {/*  Chat List:
        1. Should refresh on selected session.
        2. Should refresh on new chat
        */}


            {/*  Chat Form
        1. Should refresh on text sent => Set to empty
        */}

        </div>
    );
}

export default App;
