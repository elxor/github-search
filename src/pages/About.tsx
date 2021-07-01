import React, { FC } from 'react';

const About: FC = () => {
    return (
        <div className="bg-light pt-4 pb-4">
            <div className="container">
                <h2 className="text-center mb-3">About</h2>
                <p className="text-center lead"><strong>Search Github by username. This is a demo application.</strong></p>
                <p className="text-center mb-2 lead">
                    <a
                        href="https://github.com/elxor/github-search"
                        target="_blank" rel="noopener noreferrer"
                    ><strong>Source code</strong></a>
                </p>
            </div>
        </div>
    );
}

export default About;
