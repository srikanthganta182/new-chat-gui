import React, { FC, useEffect, useState } from "react";
import config from "../config";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";

interface SessionListProps {
  sessionListReload: number;
  sessionId: string;
  setSessionId: (sessionId: string) => void;
  renderSessionList: () => void;
}

interface Session {
  session_id: string;
  session_name: string;
}

const SessionList: FC<SessionListProps> = ({
  sessionListReload,
  sessionId,
  setSessionId,
  renderSessionList,
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const fetchSessions = async () => {
    const url =
      process.env.REACT_APP_BACKEND_URL + "customer/" + config.customer.name;
    // const url = "http://localhost:8081/chat/" + "customer/" + config.customer.name;

    const fetchedSessions = (
      await axios.get<Session[]>(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.APIKEY,
        },
      })
    ).data;

    localStorage.setItem("sessions", JSON.stringify(fetchedSessions)); // Save to local storage after initial fetch
    setSessions(fetchedSessions);

    if (fetchedSessions.length > 0) {
      setSessionId(fetchedSessions[0].session_id);
    } else {
      setSessionId("");
    }
  };

  useEffect(() => {
    const localSessions = localStorage.getItem("sessions");
    if (localSessions) {
      const parsedSessions = JSON.parse(localSessions) as Session[];
      setSessions(parsedSessions);
      if (parsedSessions.length > 0) {
        setSessionId(parsedSessions[0].session_id);
      } else {
        setSessionId("");
      }
    } else {
      fetchSessions(); // Fetch sessions if not present in local storage
    }
  }, [sessionListReload]);

  const deleteSession = (sessionIdToDelete: string) => {
    const updatedSessions = sessions.filter(
      (session) => session.session_id !== sessionIdToDelete
    );
    localStorage.setItem("sessions", JSON.stringify(updatedSessions)); // Update local storage
    setSessions(updatedSessions); // Update component state

    if (updatedSessions.length > 0) {
      setSessionId(updatedSessions[0].session_id);
    } else {
      setSessionId("");
    }

    renderSessionList();
  };

  return (
    <div className="session-list">
      {sessions.map((session) => (
        <div
          key={session.session_id}
          className={`session-item ${
            sessionId === session.session_id ? "selected" : ""
          }`}
          onClick={() => {
            setSessionId(session.session_id);
          }}
        >
          <button className="session-name">{session.session_name}</button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent setting the session ID when delete button is clicked
              deleteSession(session.session_id);
            }}
            className={`delete-button ${
              sessionId === session.session_id ? "selected" : ""
            }`}
          >
            <FiTrash2 />
          </button>
        </div>
      ))}
    </div>
  );
};

export default SessionList;
