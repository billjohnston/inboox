import React from 'react';
import Radium from 'radium'
import { connect } from 'react-redux';

import {
    updateAccounts,
    changeTab,
    setAppLoading
} from '../actions/appActions';

import { ACTIVE_ACCOUNTS_URL } from '../constants/urls'

var styles = {
    accountCheck: {
        width: 0,
        height: 0
    }
}

@connect(state => ({
    accounts: state.get('accounts')
}))
@Radium
export default class AccountCheck extends React.Component {

    componentDidMount(){

        var self = this;
        var webview = document.getElementById('accountCheck');

        webview.addEventListener('ipc-message', function(e){

            var matches = e.args[0].replace(/\\x2F/g, '/').match(
                /(\/\/lh[0-9]\.googleusercontent.com\/.*?\/w48-h48\/photo.jpg)/gi
            )
            if(matches){
                var accounts = [];
                matches.forEach(function(imageUrl, index){
                    accounts.push({
                        id: index,
                        image: 'https:' + imageUrl.replace('w48-h48', 's72-c-mo'),
                        active: index == (matches.length - 1)
                    })
                })
                self.props.dispatch(updateAccounts(accounts));
                self.props.dispatch(changeTab('inbox'));
            }
            else{
                self.props.dispatch(changeTab('loginTab'));
            }
            self.props.dispatch(setAppLoading(false));

        });

    }

    render() {

        return (
            <webview
                style={styles.accountCheck}
                id='accountCheck'
                src={ACTIVE_ACCOUNTS_URL}
                preload='./js/accountCheck.js'
            ></webview>
        )
    }
}
