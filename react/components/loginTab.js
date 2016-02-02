import React from 'react';
import { connect } from 'react-redux';

import {
    LOGGED_IN_LOGIN_URL,
    LOGGED_OUT_LOGIN_URL
} from '../constants/urls'
import { setAppLoading, accountCheck } from '../actions/appActions';


@connect(state => ({
    activeTab: state.get('activeTab'),
    accounts: state.get('accounts')
}))
export default class LoginTab extends React.Component {

    componentDidMount(){

        var self = this;
        var webview = document.getElementById('loginTab');
        var accountCheckWebview = document.getElementById('accountCheck');

        webview.addEventListener('did-get-redirect-request', function(e){
            if(e.isMainFrame && e.newURL.indexOf('https://myaccount.google.com') == 0){
                self.props.dispatch(
                    setAppLoading(true)
                );
                accountCheckWebview.reload();
                webview.src = self.props.accounts.length ? LOGGED_IN_LOGIN_URL : LOGGED_OUT_LOGIN_URL
            }
        })

    }

    render() {

        var active = this.props.activeTab == 'loginTab'

        return (
            <webview
                id='loginTab'
                className='layout-fill flex'
                src={this.props.accounts.length ? LOGGED_IN_LOGIN_URL : LOGGED_OUT_LOGIN_URL}
                style={{
                    display: active ? 'flex' : 'block',
                    width: active ? '100%' : 0,
                    height: active ? '100%' : 0
                }}
            ></webview>
        )
    }
}
