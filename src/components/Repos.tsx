import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRepos, setReposPage } from '../store/actions/github';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Repo from '../components/Repo';
import Pagination from '../components/Pagination';
import Alert from '../components/Alert';

interface IReposProp {
    name: string;
    reposCount: number;
}

interface IReposState {
    alert: boolean;
    alertText: string;
}

const Repos: FC<IReposProp> = ({name, reposCount}) => {

    const [state, setState] = useState<IReposState>({
        alert: false,
        alertText: ''
    });

    const dispatch = useDispatch();

    const {repos, reposPage, error} =  useTypedSelector(state => state.github);

    useEffect(() => {
        dispatch(getRepos(name, reposPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reposPage]);


    useEffect(() => {
        if (error.errorType === 'getRepos') {
            setState(state => ({
                ...state,
                alert: true,
                alertText: error.errorText
            }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    const paginationHandler = (pageNum: number) => {
        dispatch(setReposPage(pageNum));
    }

    const closeAlert = () => {
        setState(state => ({
            ...state,
            alert: false,
            alertText: ''
        }));
    }


    return (
        <div className="card mt-4">
            <div className="card-header">User Public Repos: {reposCount}</div>
            {state.alert &&
                <div className="m-4">
                    <Alert
                        messageText={state.alertText}
                        messageType={'danger'}
                        closeClickHandler={closeAlert}
                    />
                </div>
            }
            <div className="card-body">
                {repos.map(repo => 
                    <Repo
                        key={repo.id}
                        name={repo.name}
                        description={repo.description}
                        url={repo.html_url}
                        forks={repo.forks_count}
                        watchers={repo.watchers_count}
                    />
                )}
            </div>
            <Pagination
                page={reposPage}
                totalPages={Math.ceil(reposCount / 20) || 1}
                paginationHandler={paginationHandler}
            />
        </div>
    );
}

export default Repos;
