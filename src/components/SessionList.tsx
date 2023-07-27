import React, {FC, useEffect, useState} from 'react';
import config from '../config';
import axios from 'axios';
import {FiTrash2} from "react-icons/fi";

interface SessionListProps {
    sessionListReload: number;
    sessionId: string; // Pass down the sessionId from the parent component
    setSessionId: (sessionId: string) => void;
    renderSessionList: () => void;
}

interface Session {
    session_id: string;
    session_name: string;
}

const SessionList: FC<SessionListProps> = ({
                                               sessionListReload,
                                               sessionId, // Receive the sessionId from the parent component
                                               setSessionId,
                                               renderSessionList,
                                           }) => {
    const [sessions, setSessions] = useState<Session[]>([]);

    const fetchSessions = async () => {
        const url = config.backend.path + 'session/customer/' + config.customer.name;
        const sessions = (await axios.get<Session[]>(url)).data;
        setSessions(sessions);
        if (sessions.length > 0) {
            setSessionId(sessions[0].session_id);
        } else {
            setSessionId('');
        }
        console.log(sessions);
    };

    useEffect(() => {
        fetchSessions(); // Fetch sessions on component mount
        // Remove the return statement to prevent calling fetchSessions on unmount
    }, [sessionListReload]);

    const deleteSession = async (sessionId: string) => {
        const url = config.backend.path + 'session/' + sessionId;
        await axios.delete(url);
        await fetchSessions();
        renderSessionList();
    };

    return (
        <div className="session-list">
            {sessions.map((session) => (
                <div
                    key={session.session_id}
                    className={`session-item ${sessionId === session.session_id ? 'selected' : ''}`} // Add 'selected' class if it's the selected session
                    onClick={() => {
                        setSessionId(session.session_id);
                    }}
                >
                    <button className="session-name">{session.session_name}</button>
                    <button onClick={() => deleteSession(session.session_id)}
                            className={`delete-button ${sessionId === session.session_id ? 'selected' : ''}`}>
                        <FiTrash2/>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SessionList;
