import { GithubActionTypes, GithubAction, errorType } from '../../types/github';
import { Dispatch } from 'redux';
import axios from 'axios';


const setLoading = (): GithubAction => {
    return {
        type: GithubActionTypes.SET_LOADING
    }
}

export const stopLoading = (): GithubAction => {
    return {
        type: GithubActionTypes.STOP_LOADING
    }
}

const setFetchError = (type: errorType, errorText: string): GithubAction => {
    return {
        type: GithubActionTypes.FETCH_ERROR,
        payload: {errorType: type, errorText}
    }
}

export const clearError = (): GithubAction => {
    return {
        type: GithubActionTypes.CLEAR_FETCH_ERROR,
    }
}

export const searchUsers = (value: string, page = 1) => {
    return async (dispatch: Dispatch<GithubAction>) => {
        try {
            dispatch(setLoading());

            const response = await axios.get(
                `https://api.github.com/search/users?q=${value}`,
                {params: {per_page: 20, page}}
            );

            const usersPageCount = Math.ceil(response.data.total_count / 20);

            dispatch({
                type: GithubActionTypes.SEARCH_USERS,
                payload: {
                    count: response.data.total_count,
                    pageCount: usersPageCount,
                    items: response.data.items
                }
            });

            dispatch(clearError());

        } catch (e) {
            console.log(e);
            dispatch(setFetchError('searchUsers', e.message));
            dispatch(stopLoading());
        }
    }
}

export const setSearchValue = (value: string): GithubAction => {
    return {
        type: GithubActionTypes.SEARCH_VALUE,
        payload: value
    }
}

export const setUsersPage = (page: number): GithubAction => {
    return {
        type: GithubActionTypes.SET_USERS_PAGE,
        payload: page
    }
}

export const getUser = (name: string) => {
    return async (dispatch: Dispatch<GithubAction>) => {
        try {
            dispatch(setLoading());

            const response = await axios.get(
                `https://api.github.com/users/${name}`
            );
            
            dispatch({type: GithubActionTypes.GET_USER, payload: response.data});

            dispatch(clearError());

        } catch (e) {
            console.log(e);
            dispatch(setFetchError('getUser', e.message));
            dispatch(stopLoading());
        }
    }
}

export const getRepos = (name: string, page = 1) => {
    return async (dispatch: Dispatch<GithubAction>) => {
        try {
            const response = await axios.get(
                `https://api.github.com/users/${name}/repos`,
                {params: {per_page: 20, page}}
            );

            dispatch({type: GithubActionTypes.GET_REPOS, payload: response.data});

            dispatch(clearError());

        } catch (e) {
            console.log(e);
            dispatch(setFetchError('getRepos', e.message));
            dispatch(stopLoading());
        }
    }
}

export const setReposPage = (page: number): GithubAction => {
    return {
        type: GithubActionTypes.SET_REPOS_PAGE,
        payload: page
    }
}

export const clearUsers = (): GithubAction => {
    return {
        type: GithubActionTypes.CLEAR_USERS
    }
}