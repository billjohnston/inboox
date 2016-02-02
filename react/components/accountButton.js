import React from 'react';
import Radium from 'radium'
import { connect } from 'react-redux';

import { changeTab, setActiveInbox} from '../actions/appActions';

var styles = {
    accountButton: {
        width: 56,
        height: 56,
        backgroundSize: '100%',
        borderRadius: '50%',
        position: 'relative',
        margin: '5px 5px 0 5px',
    }
}

@connect(state => ({}))
@Radium
export default class AccountButton extends React.Component {

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

    render() {
        var inboxTab = (this.props.activeTab == 'inbox');
        var active = inboxTab && this.props.account.active;

        styles.accountButton.boxShadow = active ? 'inset 0 0 0 2px white' : 'none'
        styles.accountButton.backgroundImage = `url(${this.props.account.image})`
        styles.accountButton.cursor = active ? 'auto' : 'pointer'

        if(active){
            styles.accountButton.opacity = 1
        }
        else{
            styles.accountButton.opacity = 0.6
            styles.accountButton[':hover'] = {
                opacity: 0.8
            }
        }

        return (
            <div
                onTouchTap={
                    this.setAccount.bind(
                        this,
                        this.props.account.active,
                        this.props.account.id
                    )
                }
                style={styles.accountButton}
            ></div>
        )

    }
}
