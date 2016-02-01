// const ipcRenderer = require('commonjs')['ipc-renderer'];
import ipcRenderer from 'ipc-renderer'
import { combineReducers } from 'redux'
import Immutable from 'immutable'
import {
    CHANGE_TAB,
    SET_APP_LOADING,
    UPDATE_ACCOUNTS,
    SET_ACTIVE_INBOX,
    UPDATE_UNREAD_COUNT,
    LOG_OUT
} from '../constants/accountOperations'

import {
    LOGGED_IN_LOGIN_URL,
    LOGGED_OUT_LOGIN_URL,
    LOGOUT_URL
} from '../constants/urls'

const initialState = Immutable.Map({
    appLoading: true,
    accounts: [],
    activeTab: ''
});

export default function appStore(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TAB:
            if(action.tab == 'loginTab'){
                var webview = document.getElementById('loginTab');
            }
            return state.set('activeTab', action.tab);
        case SET_APP_LOADING:
            return state.set('appLoading', action.loadingState);
        case UPDATE_ACCOUNTS:
            return state.set('accounts', action.accounts);
        case SET_ACTIVE_INBOX:
            var currentAccounts = state.get('accounts');
            var newAccounts = [];
            currentAccounts.forEach(function(account, index){
                newAccounts.push({
                    image: account.image,
                    active: (index == action.accountIndex),
                })
            });
            return state.set('accounts', newAccounts);
        case UPDATE_UNREAD_COUNT:
            var currentAccounts = state.get('accounts');
            var newAccounts = [];
            var totalUnreadCount = 0;
            currentAccounts.forEach(function(account, index){
                var unreadCount = (index == action.accountIndex) ? action.unreadCount : account.unreadCount
                newAccounts.push({
                    image: account.image,
                    active: account.active,
                });
                totalUnreadCount = totalUnreadCount + unreadCount;
            });
            ipcRenderer.send('updateBadge', totalUnreadCount);
            return state.set('accounts', newAccounts);
        case LOG_OUT:
            return state
                .set('accounts', [])
                .set('activeTab', 'loginTab')
        default:
            return state
    }
};
