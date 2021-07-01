interface IUsers {
    count: number | 'init';
    pageCount: number;
    items: any[];
}

export type errorType = false
    | 'searchUsers'
    | 'getUser'
    | 'getRepos';

interface IError {
    errorType: errorType;
    errorText: string;
}

export interface IGithubState {
    users: IUsers;
    searchValue: string;
    usersPage: number;
    user: Record<string, any>;
    loading: boolean;
    repos: any[];
    reposPage: number;
    error: IError;
}

export enum GithubActionTypes {
    SEARCH_USERS = 'SEARCH_USERS',
    SEARCH_VALUE = 'SEARCH_VALUE',
    SET_USERS_PAGE = 'SET_USERS_PAGE',
    GET_USER = 'GET_USER',
    GET_REPOS = 'GET_REPOS',
    SET_REPOS_PAGE = 'SET_REPOS_PAGE',
    SET_LOADING = 'SET_LOADING',
    STOP_LOADING = 'STOP_LOADING',
    CLEAR_USERS = 'CLEAR_USERS',
    FETCH_ERROR = 'FETCH_ERROR',
    CLEAR_FETCH_ERROR = 'CLEAR_FETCH_ERROR'
}

interface ISearchUsersAction {
    type: GithubActionTypes.SEARCH_USERS;
    payload: IUsers;
}

interface ISearchValueAction {
    type: GithubActionTypes.SEARCH_VALUE;
    payload: string;
}

interface ISetUsersPageAction {
    type: GithubActionTypes.SET_USERS_PAGE;
    payload: number;
}

interface IGetUserAction {
    type: GithubActionTypes.GET_USER;
    payload: {};
}

interface IGetReposAction {
    type: GithubActionTypes.GET_REPOS;
    payload: any[];
}

interface ISetReposPageAction {
    type: GithubActionTypes.SET_REPOS_PAGE;
    payload: number;
}

interface ISetLoadingAction {
    type: GithubActionTypes.SET_LOADING;
}

interface IClearUsersAction {
    type: GithubActionTypes.CLEAR_USERS;
}

interface IFetchErrorAction {
    type: GithubActionTypes.FETCH_ERROR;
    payload: IError;
}

interface IClearFetchErrorAction {
    type: GithubActionTypes.CLEAR_FETCH_ERROR;
}

interface IStopLoadingAction {
    type: GithubActionTypes.STOP_LOADING;
}

export type GithubAction = ISearchUsersAction
    | ISearchValueAction
    | ISetUsersPageAction
    | IGetUserAction
    | IGetReposAction
    | ISetReposPageAction
    | ISetLoadingAction
    | IClearUsersAction
    | IFetchErrorAction
    | IClearFetchErrorAction
    | IStopLoadingAction;