import React, { FC, useState, useEffect, useRef, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Alert from './Alert';
import { searchUsers, clearUsers, setUsersPage, setSearchValue } from '../store/actions/github';


interface ISearchState {
    inputValue: string;
    alert: boolean;
    alertText: string;
}

const Search: FC = () => {
    const [state, setState] = useState<ISearchState>({
        inputValue: '',
        alert: false,
        alertText: ''
    });

    const firstUpdate = useRef(true);

    const dispatch = useDispatch();

    const count = useTypedSelector(state => state.github.users.count);
    const currentPage = useTypedSelector(state => state.github.usersPage);
    const searchValue = useTypedSelector(state => state.github.searchValue);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(state => ({
            ...state,
            inputValue: e.target.value
        }));
    }

    const keyPressHandler = (e: React.KeyboardEvent) => {
        if(e.key !== 'Enter') {
            return;
        }

        if (state.inputValue.trim()) {
            dispatch(clearUsers());
            dispatch(setUsersPage(1));

            setState(state => ({
                ...state,
                inputValue: '',
                alert: false,
                alertText: ''
            }));

            dispatch(setSearchValue(state.inputValue.trim()));
        } else {
            setState(state => ({
                ...state,
                alert: true,
                alertText: 'Please enter username'
            }));
        }
    }


    const closeAlert = () => {
        setState(state => ({
            ...state,
            alert: false,
            alertText: ''
        }));
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false; 
            return;
        }
        if (searchValue !== '') {
            dispatch(searchUsers(searchValue, currentPage));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, currentPage]);


    useEffect(() => {
        if (count === 0 && searchValue !== '') {
            setState(state => ({
                ...state,
                alert: true,
                alertText: 'Username not found'
            }));

            dispatch(clearUsers());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count, searchValue]);


    return (
        <Fragment>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username..."
                    onChange={changeHandler}
                    onKeyPress={keyPressHandler}
                    value={state.inputValue}
                />
                {count !== 'init'
                    ? <span className="text-secondary">Results: {count}</span>
                    : ''
                }
            </div>
            {state.alert && <Alert
                messageText={state.alertText}
                closeClickHandler={closeAlert}
                />
            }
        </Fragment>
    );
}

export default Search;
