import React from 'react';
import Radium from 'radium'
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import PowerSettingsNew from 'material-ui/lib/svg-icons/action/power-settings-new';
import remote from 'remote'
import { LOGOUT_URL } from '../constants/urls'

import { changeTab, setActiveInbox, logOut, setAppLoading} from '../actions/appActions';

var styles = {
    sideBar: {
        width: 75,
        maxWidth: 75,
        minWidth: 75,
        backgroundColor: '#3262ba'
    },
    logOutButton: {
        margin: '5px 5px 5px 5px',
        boxShadow: 'none'
    },
    addAccountButton: {
        margin: '5px 5px 0 5px',
        boxShadow: 'none'
    },
    fakeImg: {
        width: 56,
        height: 56,
        backgroundSize: '100%',
        borderRadius: '50%',
        position: 'relative',
        margin: '5px 5px 0 5px'
    }
}

@connect(state => ({
    activeTab: state.get('activeTab'),
    accounts: state.get('accounts')
}))
@Radium
export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: -1,
        };
    }

    setAccount(isActive, index){
        if(this.props.activeTab != 'inbox'){
            this.props.dispatch(
                changeTab('inbox')
            );
        }
        if(!isActive){
            this.props.dispatch(
                setActiveInbox(index)
            );
        }
    }

    toggleHover(i){
        this.setState({
            hover: i
        })
    }

    logOut(){
        var self = this
        self.props.dispatch(
            setAppLoading(true)
        );
        remote.session.defaultSession.clearStorageData({}, function(){
            self.props.dispatch(
                logOut()
            );
            self.props.dispatch(
                changeTab('loginTab')
            );
            self.props.dispatch(
                setAppLoading(false)
            );
        });
    }

    render() {

        var inboxTab = (this.props.activeTab == 'inbox');

        return (
            <div
                className='layout-column'
                style={[styles.sideBar, {
                    display: this.props.accounts.length ? 'inherit' : 'none'
                }]}
            >

                <div className='layout-column layout-align-start-center'>
                    {this.props.accounts.map((account, index) => {

                        var active = inboxTab && account.active;

                        return (
                            <div
                                key={index}
                                onMouseEnter={this.toggleHover.bind(this, index)}
                                onMouseLeave={this.toggleHover.bind(this, -1)}
                                onTouchTap={
                                    this.setAccount.bind(this, account.active, index)
                                }
                                style={[styles.fakeImg, {
                                    boxShadow: active ? 'inset 0 0 0 2px white' : 'none',
                                    backgroundImage: `url(${account.image})`,
                                    cursor: active ? 'auto' : 'pointer',
                                    opacity: active ? 1 : this.state.hover == index ? 0.8 : 0.6
                                }]}
                            ></div>
                        );

                    })}
                </div>

                <div className='flex layout-column layout-align-end-center'>

                    <FloatingActionButton
                        backgroundColor='#db4437'
                        style={styles.addAccountButton}
                        onTouchTap={() => this.props.dispatch(
                            changeTab('loginTab')
                        )}
                    >
                        <ContentAdd />
                    </FloatingActionButton>

                    <FloatingActionButton
                        backgroundColor='#db4437'
                        style={styles.logOutButton}
                        onTouchTap={this.logOut.bind(this)}
                    >
                        <PowerSettingsNew />
                    </FloatingActionButton>
                </div>

            </div>
        )
    }
}
