import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

const PageNotFound: FC = () => {
    const history = useHistory();

    return (
        <div className="text-center mt-4">
            <h2>404</h2>
            <p>Page Not Found</p>
            <button
                className="btn btn-primary"
                onClick={() => history.push('/')}
            >Back Home
            </button>
        </div>
    );
}

export default PageNotFound;
