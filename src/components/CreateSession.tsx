import React, {FC} from 'react';
import config from "../config";
import axios from 'axios';

interface CreateSessionProps {
    update: () => void
}

const CreateSession: FC<CreateSessionProps> = ({update}) => {

    const createNewSession = async () => {
        const url = config.backend.path + 'session/create'
        await axios.post(url, {customer: config.customer.name});
        update();
    }

    return (
        <div>
            <button className="side-menu-button" onClick={createNewSession}>CREATE +</button>
        </div>
    );
};

export default CreateSession;
