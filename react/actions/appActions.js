import {
    CHANGE_TAB,
    SET_APP_LOADING,
    UPDATE_ACCOUNTS,
    SET_LOGGED_IN,
    SET_ACTIVE_INBOX,
    LOG_OUT
} from '../constants/accountOperations'

import { ACTIVE_ACCOUNTS_URL } from '../constants/urls'

export function changeTab(tab){
    return {
        type: CHANGE_TAB,
        tab: tab
    }
}

export function setAppLoading(loadingState){
    return {
        type: SET_APP_LOADING,
        loadingState: loadingState
    }
}

export function updateAccounts(accounts){
    return {
        type: UPDATE_ACCOUNTS,
        accounts: accounts
    }
}

export function logOut(){
    return {
        type: LOG_OUT
    }
}

export function setActiveInbox(accountId){
    return {
        type: SET_ACTIVE_INBOX,
        accountId: accountId
    }
}
