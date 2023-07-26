import React, {FC, useEffect, useState} from 'react';

interface SessionListProps {
    renderOn: number
    updateCurrentSession: (sessionId: string) => void;
    updateSessionList: () => void;
}


const SessionList: FC<SessionListProps> = ({renderOn: sessionListReload, updateCurrentSession, updateSessionList}) => {

    const [sessionIds, setSessionIds] = useState<string[]>(["temp_sess_id1", "temp_sess_id2"]);

    const fetchSessions = () => {
        //fetch all sessionIds for this customer from backend
        //     setSessions
    }

    useEffect(() => {
        return () => {
            fetchSessions();
        };
    }, [sessionListReload]);

    const deleteSession = (sessionId: string) => {
        //     delete this sesssion
        setSessionIds([[...sessionIds][0]])
        updateSessionList();
        //     update => latest session
    };
    return (
        <div>
            {sessionIds.map(sessionId =>
                <div key={sessionId}>
                    <button onClick={() => updateCurrentSession(sessionId)}>
                        {sessionId}
                    </button>
                    <button onClick={() => deleteSession(sessionId)}>
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
