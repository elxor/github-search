import React, { FC, Fragment, useEffect, useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import Search from '../components/Search';
import Card from '../components/Card';
import { setUsersPage } from '../store/actions/github';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import Alert from '../components/Alert';


interface IHomeState {
    alert: boolean;
    alertText: string;
}

const Home: FC = () => {
    const [state, setState] = useState<IHomeState>({
        alert: false,
        alertText: ''
    });

    const {users, loading, error, usersPage} = useTypedSelector(
        state => state.github
    );

    const dispatch = useDispatch();

    const paginationHandler = (pageNum: number) => {
        dispatch(setUsersPage(pageNum));
    }

    const closeAlert = () => {
        setState(state => ({
            ...state,
            alert: false,
            alertText: ''
        }));
    }

    useEffect(() => {
        if (error.errorType === 'searchUsers') {
            setState(state => ({
                ...state,
                alert: true,
                alertText: error.errorText
            }));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);


    return (
        <Fragment>
            <Search />
            {state.alert &&
                <Alert
                    messageText={state.alertText}
                    messageType={'danger'}
                    closeClickHandler={closeAlert}
                />
            }

            <div className="row">
                {loading
                    ? <Loader />
                    : users.items.map(user => {
                        return (
                            <div className="col-sm-6 col-md-3 mb-4" key={user.id}>
                                <Card user={user}/>
                            </div>
                        )
                    })
                }
            </div>

            <Pagination
                page={usersPage}
                totalPages={users.pageCount}
                paginationHandler={paginationHandler}
            />

        </Fragment>
    );
}

export default Home;
