import React, { FC } from 'react';

interface IAlertProps {
    messageText: string;
    messageType?: string;
    closeClickHandler: () => void;
}

const Alert: FC<IAlertProps> = ({
    messageText,
    messageType = 'warning',
    closeClickHandler
}) => {
    return (
        <div 
            className={`alert alert-${messageType} alert-dismissible`}
            role="alert"
        >{messageText}
            <button 
                type="button"
                className="close"
                aria-label="Close"
                onClick={closeClickHandler}
            >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}

export default Alert;
