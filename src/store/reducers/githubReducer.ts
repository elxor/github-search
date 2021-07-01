import { GithubActionTypes, GithubAction, IGithubState } from '../../types/github';

const initialState: IGithubState = {
    users: { count: 'init', pageCount: 1, items: [] },
    searchValue: '',
    usersPage: 1,
    user: {},
    loading: false,
    repos: [],
    reposPage: 1,
    error: {errorType: false, errorText: ''},
}

export const githubReducer = (state = initialState, action: GithubAction): IGithubState => {
    switch (action.type) {
        case GithubActionTypes.SEARCH_USERS:
            return {
                ...state,
                loading: false,
                error: {errorType: false, errorText: ''},
                users: {
                    count: action.payload.count,
                    pageCount: action.payload.pageCount,
                    items: action.payload.items
                }
            }
        case GithubActionTypes.SEARCH_VALUE:
            return {...state, searchValue: action.payload}
        case GithubActionTypes.SET_USERS_PAGE:
            return {...state, usersPage: action.payload}
        case GithubActionTypes.GET_USER:
            return {
                ...state, loading: false,
                error: {errorType: false, errorText: ''},
                user: action.payload
            }
        case GithubActionTypes.GET_REPOS:
            return {
                ...state,
                loading: false,
                error: {errorType: false, errorText: ''},
                repos: action.payload
            }
        case GithubActionTypes.SET_REPOS_PAGE:
            return {...state, reposPage: action.payload}
        case GithubActionTypes.SET_LOADING:
            return {...state, loading: true}
        case GithubActionTypes.STOP_LOADING:
            return {...state, loading: false}
        case GithubActionTypes.CLEAR_USERS:
            return {...state, users: {count: 'init', pageCount: 1, items: []}}
        case GithubActionTypes.FETCH_ERROR:
            return {
                ...state,
                error: {
                    errorType: action.payload.errorType,
                    errorText: action.payload.errorText}
                }
        case GithubActionTypes.CLEAR_FETCH_ERROR:
            return {...state, error: {errorType: false, errorText: ''}}
        default:
            return state
    }
}