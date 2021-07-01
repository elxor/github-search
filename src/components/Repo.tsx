import React, { FC } from 'react';

interface IRepoProps {
    name: string;
    description: string;
    url: string;
    forks: number;
    watchers: number;
}

const Repo: FC<IRepoProps> = ({name, description, url, forks, watchers}) => {
    return (
        <div>
            <div className="row">
                <div className="col-md-9">
                    <h4>
                        <a
                            href={url}
                            target="_blank" 
                            rel="noopener noreferrer"    
                        >{name}</a>
                    </h4>
                    <p>{description}</p>
                </div>
                <div className="col-md-3">
                    <span className="badge badge-primary mr-1">{watchers} Watchers</span>
                    <span className="badge badge-secondary">{forks} Forks</span>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Repo;
