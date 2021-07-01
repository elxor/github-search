import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getUser } from '../store/actions/github';
import Loader from '../components/Loader';
import Repos from '../components/Repos';
import Alert from '../components/Alert';

interface IState {
    day: string;
    month: string;
    year: string;
    alert: boolean;
    alertText: string;
}

interface IUserProfilePageParams {
    name: string;
}

const Profile: FC = () => {
    const [state, setState] = useState<IState>({
        day: '',
        month: '',
        year: '',
        alert: false,
        alertText: ''
    });

    const params = useParams<IUserProfilePageParams>();

    const dispatch = useDispatch();

    const {user, loading, error} = useTypedSelector(state => state.github);

    useEffect(() => {
        dispatch(getUser(params.name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (error.errorType === 'getUser') {
            setState(state => ({
                ...state,
                alert: true,
                alertText: error.errorText
            }));
        }
    }, [error]);

    const closeAlert = () => {
        setState(state => ({
            ...state,
            alert: false,
            alertText: ''
        }));
    }

    useEffect(() => {
        if (Object.keys(user).length) {
            const date = new Date(user.created_at);

            const year = new Intl.DateTimeFormat(
                'en', { year: 'numeric' }).format(date);
            const month = new Intl.DateTimeFormat(
                'en', { month: 'short' }).format(date);
            const day = new Intl.DateTimeFormat(
                'en', { day: '2-digit' }).format(date);

            setState(state => ({...state, day, month, year}));
        }
    }, [user]);


    if (loading) return <Loader />
    return (
        <div className="container mb-4">
            {state.alert &&
                <Alert
                    messageText={state.alertText}
                    messageType={'danger'}
                    closeClickHandler={closeAlert}
                />
            }
            <div className="card">
                <div className="card-header">{user.name || user.login}</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <img
                                className="img-thumbnail"
                                src={user.avatar_url}
                                alt="user_avatar" />
                            <a
                                className="btn btn-dark btn-block mt-4 mb-4 mb-md-0"
                                href={user.html_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                
                            >View Profile</a>
                        </div>
                        <div className="col-md-8">
                            <div className="mb-4 userProfileStats">
                                <span className="badge badge-primary mr-1">
                                    {user.public_repos} Public Repos
                                </span>
                                <span className="badge badge-secondary mr-1">
                                    {user.public_gists} Public Gists
                                </span>
                                <span className="badge badge-success mr-1">
                                    {user.followers} Followers
                                </span>
                                <span className="badge badge-info">
                                    {user.following} Following
                                </span>
                            </div>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <strong>Username: </strong>
                                    {user.login}
                                </li>
                                <li className="list-group-item">
                                    <strong>Location: </strong>
                                    {user.location}
                                </li>
                                <li className="list-group-item">
                                    <strong>Email: </strong>
                                    {user.email}
                                </li>
                                <li className="list-group-item">
                                    <strong>Blog: </strong>
                                    {user.blog}
                                </li>
                                <li className="list-group-item">
                                    <strong>Member Since: </strong>
                                    <span>{state.month} </span>
                                    <span>{state.day}, </span>
                                    <span>{state.year} </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Repos name={params.name} reposCount={user.public_repos} />
        </div>
    );
}

export default Profile;
