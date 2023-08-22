import React, { FC } from "react";
import config from "../config";
import axios from "axios";

interface CreateSessionProps {
  update: () => void;
}

interface SessionResponse {
  session_id: string;
  customer: string;
  session_name: string;
  updated_at: Date;
}

const CreateSession: FC<CreateSessionProps> = ({ update }) => {
  const createNewSession = async () => {
    const url = config.backend.path + "create";

    try {
      // Make POST request to create a session in the backend
      const response = await axios.post<SessionResponse>(url, {
        customer: config.customer.name,
      });

      // Extract the created session from the response
      const newSession = response.data;

      // Fetch existing sessions from local storage or default to an empty array
      const existingSessions = JSON.parse(
        localStorage.getItem("sessions") || "[]"
      );

      // Add the new session to the list
      const updatedSessions = [...existingSessions, newSession];

      // Save the updated list to local storage
      localStorage.setItem("sessions", JSON.stringify(updatedSessions));

      // Update the UI
      update();
    } catch (error) {
      console.error("Error creating session in the backend:", error);
      // Handle the error according to your needs, e.g., show a notification to the user
    }
  };

  return (
    <div>
      <button className="create-button" onClick={createNewSession}>
        <span>+</span> New Chat
      </button>
    </div>
  );
};

export default CreateSession;
