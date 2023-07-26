import React, {FC, useEffect, useState} from 'react';
import config from "../config";
import axios from "axios";

interface SessionListProps {
    renderOn: number
    updateCurrentSessionId: (sessionId: string) => void;
    updateSessionList: () => void;
}

interface Session {
    session_id: string
    session_name: string
}

const SessionList: FC<SessionListProps> = ({
                                               renderOn: sessionListReload,
                                               updateCurrentSessionId,
                                               updateSessionList
                                           }) => {

    const [sessions, setSessions] = useState<Session[]>([]);

    const fetchSessions = async () => {
        const url = config.backend.path + 'session/customer/' + config.customer.name
        const sessions = (await axios.get<Session[]>(url)).data;
        setSessions(sessions)
    }

    useEffect(() => {
        return () => {
            fetchSessions();
        };
    }, [sessionListReload]);

    const deleteSession = async (sessionId: string) => {
        const url = config.backend.path + 'session/' + sessionId
        await axios.delete(url)
        await fetchSessions();
        updateSessionList();
    };
    return (
        <div>
            {sessions.map(session =>
                <div key={session.session_id}>
                    <button onClick={() => updateCurrentSessionId(session.session_id)}>
                        {session.session_name}
                    </button>
                    <button onClick={() => deleteSession(session.session_id)}>
                        X
                    </button>
                    <br/>
                </div>
            )
            }
        </div>
    );
};

export default SessionList;
