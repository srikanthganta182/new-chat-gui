import React, {FC} from 'react';


interface CreateSessionProps {
    update: () => void
}

const CreateSession: FC<CreateSessionProps> = ({update}) => {

    const createNewSession = () => {

        //     call backend and create a new session
        update();
    }

    return (
        <div>
            <button onClick={createNewSession}>CREATE +</button>
        </div>
    );
};

export default CreateSession;
