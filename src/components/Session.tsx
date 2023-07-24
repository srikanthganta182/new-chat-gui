import React, {FC} from 'react';

interface SessionProps {
    sessionId: string;
    sessionName: string;
    setSessionId: (sessionId: string) => void;
}

const Session: FC<SessionProps> = ({sessionId, sessionName, setSessionId}) => {
    return (
        <div>
            <button onClick={() => setSessionId(sessionId + sessionId)}>CLICK</button>
        </div>
    );
};

export default Session;
