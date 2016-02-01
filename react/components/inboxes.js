import React, { Component } from 'react';
import { connect } from 'react-redux';
import shell from 'shell'
import each from 'lodash/each'


import { updateUnreadCount } from '../actions/appActions';

@connect(state => ({
    accounts: state.get('accounts'),
    activeTab: state.get('activeTab')
}))
export default class Inboxes extends Component {

    componentDidUpdate(){

        var self = this;
        var webviews = document.getElementsByClassName('InboxWebview');

        if(webviews.length){
            each(webviews, function(webview){
                if(!webview.getAttribute('has-listeners')){

                    webview.setAttribute('has-listeners', true);
                    webview.addEventListener('ipc-message', function(e){
                        if(e.channel == 'unreadCount'){
                            var uucObj = e.args[0]
                            console.log(e.args[0])
                            self.props.dispatch(updateUnreadCount(
                                uucObj.accountIndex,
                                uucObj.unreadCount
                            ))
                        }
                    });

                    webview.addEventListener('new-window', function(e) {
                        shell.openExternal(e.url);
                    });

                }
            })
        }

    }

    render() {

        var inboxTab = (this.props.activeTab == 'inbox');

        return (
            <div className='layout-column layout-fill' style={{
                display: inboxTab ? 'flex' : 'none'
            }}>
                {this.props.accounts.map((inbox, index) => {

                    var active = inboxTab && inbox.active;

                    return (
                        <webview
                            key={index}
                            className='InboxWebview'
                            style={{
                                display: active ? 'flex' : 'block',
                                width: active ? '100%' : 0,
                                height: active ? '100%' : 0
                            }}
                            src={`https://inbox.google.com/u/${index}/`}
                            preload='./inboxListeners.js'
                        ></webview>
                    );
                })}
            </div>
        )
    }
}
