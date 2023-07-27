import React, {FC, useEffect, useState} from 'react';
import config from "../config";
import axios from "axios";

interface SessionListProps {
    sessionListReload: number;
    setSessionId: (sessionId: string) => void;
    renderSessionList: () => void;
}

interface Session {
    session_id: string;
    session_name: string;
}

const SessionList: FC<SessionListProps> = ({
                                               sessionListReload: sessionListReload,
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
            setSessionId("");
        }
        console.log(sessions);
    };

    useEffect(() => {
        return () => {
            fetchSessions();
        };
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
                    className="session-item"
                    onClick={() => setSessionId(session.session_id)} // Set onClick to change the session on click
                >
                    <button className="session-name">
                        {session.session_name}
                    </button>
                    <button onClick={() => deleteSession(session.session_id)} className="delete-button">
                        X
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SessionList;
